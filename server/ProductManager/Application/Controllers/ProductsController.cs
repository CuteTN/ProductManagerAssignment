using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using ProductManager.Application.Dtos;
using ProductManager.Application.Models;
using ProductManager.Application.Services;
using ProductManager.Domain.Entities;
using ProductManager.Domain.Infrastructure.Repositories;
using ProductManager.Domain.Infrastructure.UnitOfWork;

namespace ProductManager.Application.Controllers
{
  // "[controller] will be replaced by the prefix of the class, ie "Products"
  [Authorize(AuthenticationSchemes = "Bearer", Policy = "AccessToken")]
  [Route("api/[controller]")]
  [ApiController]
  public class ProductsController : ControllerBase
  {
    private readonly IUnitOfWork _unitOfWork;
    private readonly IGenericRepository<Product> _productRepo;
    private readonly IGenericRepository<ProductDetail> _productDetailRepo;
    private readonly IGenericRepository<Category> _categoryRepo;
    private readonly IMapper _mapper;
    private readonly ProductsFilterService _productsFilter;
    private readonly CategoryProductService _categoryProduct;

    public ProductsController(
      IUnitOfWork unitOfWork,
      IMapper mapper,
      ProductsFilterService productsFilter,
      CategoryProductService categoryProduct
    )
    {
      _unitOfWork = unitOfWork;
      _productRepo = unitOfWork.GetRepository<Product>();
      _productDetailRepo = unitOfWork.GetRepository<ProductDetail>();
      _categoryRepo = unitOfWork.GetRepository<Category>();
      _mapper = mapper;
      _productsFilter = productsFilter;
      _categoryProduct = categoryProduct;
    }


    [HttpGet]
    [AllowAnonymous]
    public ActionResult<IEnumerable<ProductReadDto>> GetAllProducts([FromQuery] ProductsFilterModel filterParams)
    {
      var products = _productRepo.GetAll();
      var result = _productsFilter.Filter(products, filterParams);
      return Ok(_mapper.Map<IEnumerable<ProductReadDto>>(result));
    }

    [HttpGet("count")]
    [AllowAnonymous]
    public ActionResult<int> GetNumberOfProducts([FromQuery] ProductsFilterModel filterParams)
    {
      var products = _productRepo.GetAll();
      filterParams.Page = null;
      filterParams.Limit = null;
      var result = _productsFilter.Filter(products, filterParams).Count();
      return Ok(result);
    }

    [HttpGet("{id}", Name = "GetProductById")]
    [AllowAnonymous]
    public ActionResult<ProductReadDto> GetProductById(int id)
    {
      var result = _productRepo.GetById(id);

      if (result == null)
        return NotFound();

      return Ok(_mapper.Map<ProductReadDto>(result));
    }

    [HttpPost]
    public ActionResult<ProductReadDto> CreateProduct(ProductCreateDto productCreateDto)
    {
      if (productCreateDto == null)
        return BadRequest();

      var product = _mapper.Map<Product>(productCreateDto);
      _productRepo.Add(product);
      _unitOfWork.SaveChanges(); // this function mutates directly to product. Proof is that the ID were set after this calling

      if (productCreateDto.CategoryIds != null)
        SetProductCategories(product.Id, productCreateDto.CategoryIds);
      if (productCreateDto.ProductDetail != null)
        SetProductDetails(product.Id, _mapper.Map<ProductDetailUpdateDto>(productCreateDto.ProductDetail));

      var productReadDto = _mapper.Map<ProductReadDto>(product);

      return CreatedAtRoute(nameof(GetProductById), new { Id = productReadDto.Id }, productReadDto);
    }


    [HttpPut("{id}")]
    public ActionResult<ProductReadDto> UpdateProduct(int id, ProductUpdateDto productUpdateDto)
    {
      if (productUpdateDto == null)
        return BadRequest();

      var oldProduct = _productRepo.GetById(id);
      if (oldProduct == null)
        return NotFound();

      // var newProduct = _mapper.Map<Product>(productUpdateDto);
      var newProduct = _mapper.Map(productUpdateDto, oldProduct); // CuteTN note: this will mutate directly to the oldProduct
      _productRepo.Update(newProduct);

      if (productUpdateDto.CategoryIds != null)
        SetProductCategories(id, productUpdateDto.CategoryIds);
      if (productUpdateDto.ProductDetail != null)
        SetProductDetails(id, productUpdateDto.ProductDetail);

      _unitOfWork.SaveChanges();

      return Ok(_mapper.Map<ProductReadDto>(newProduct));
    }

    [HttpPatch("{id}")]
    public ActionResult<ProductReadDto> PatchProduct(int id, JsonPatchDocument<ProductUpdateDto> patchDoc)
    {
      var oldProduct = _productRepo.GetById(id);
      if (oldProduct == null)
        return NotFound();

      var productToPatch = _mapper.Map<ProductUpdateDto>(oldProduct);
      patchDoc.ApplyTo(productToPatch, ModelState);

      if (!TryValidateModel(productToPatch))
      {
        return ValidationProblem(ModelState);
      }

      var newProduct = _mapper.Map(productToPatch, oldProduct);
      _productRepo.Update(newProduct);
      _unitOfWork.SaveChanges();

      return Ok(_mapper.Map<ProductReadDto>(newProduct));
    }

    [HttpDelete("{id}")]
    public ActionResult<ProductReadDto> DeleteProduct(int id)
    {
      var oldProduct = _productRepo.GetById(id);
      if (oldProduct == null)
        return NotFound();

      _productRepo.Delete(oldProduct);
      _unitOfWork.SaveChanges();

      return Ok(_mapper.Map<ProductReadDto>(oldProduct));
    }

    [HttpPut("{id}/categories")]
    public ActionResult<ProductReadDto> SetProductCategories(int id, IEnumerable<int> categoryIds)
    {
      if (categoryIds == null)
        return BadRequest();

      var oldProduct = _productRepo.GetById(id);
      if (oldProduct == null)
        return NotFound();

      var categoryIdsList = categoryIds.ToList();
      var categories = categoryIdsList.Select(id => _categoryRepo.GetById(id)).ToList();

      for (int i = 0; i < categories.Count(); i++)
        if (categories[i] == null)
          return NotFound();

      _categoryProduct.SetCategoriesOfProduct(oldProduct, categories);
      _unitOfWork.SaveChanges();

      return Ok(_mapper.Map<ProductReadDto>(oldProduct));
    }

    [HttpPut("{id}/details")]
    public ActionResult<ProductReadDto> SetProductDetails(int id, ProductDetailUpdateDto productDetailUpdateDto)
    {
      if (productDetailUpdateDto == null)
        return BadRequest();

      var product = _productRepo.GetById(id);
      if (product == null)
        return NotFound("No product with id = " + id);

      // BAD CODE: needs to separate these into services
      var productDetail = _productDetailRepo.GetById(id);
      if (productDetail == null)
      {
        productDetail = _mapper.Map<ProductDetail>(productDetailUpdateDto);
        productDetail.ProductId = id;

        _productDetailRepo.Add(productDetail);
      }
      else
      {
        _mapper.Map(productDetailUpdateDto, productDetail);
        productDetail.ProductId = id; // for safety reasons... not really necessary?

        _productDetailRepo.Update(productDetail);
      }

      product.ProductDetail = productDetail;
      _unitOfWork.SaveChanges();
      return Ok(_mapper.Map<ProductReadDto>(product));
    }
  }
}