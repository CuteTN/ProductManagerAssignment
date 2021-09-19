using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using ProductManager.DAL;
using ProductManager.Dtos;
using ProductManager.Models;

namespace ProductManager.Controllers
{
  // "[controller] will be replaced by the prefix of the class, ie "Products"
  [Route("api/[controller]")]
  [ApiController]
  public class ProductsController : ControllerBase
  {
    private readonly UnitOfWork _unitOfWork;
    private readonly GenericRepository<Product> _productRepo;
    private readonly GenericRepository<Category> _categoryRepo;
    private readonly IMapper _mapper;

    public ProductsController(UnitOfWork unitOfWork, IMapper mapper)
    {
      _unitOfWork = unitOfWork;
      _productRepo = unitOfWork.Repository<Product>();
      _categoryRepo = unitOfWork.Repository<Category>();
      _mapper = mapper;
    }


    [HttpGet]
    public ActionResult<IEnumerable<ProductReadDto>> GetAllProducts()
    {
      var result = _productRepo.GetAll();
      return Ok(_mapper.Map<IEnumerable<ProductReadDto>>(result));
    }

    [HttpGet("{id}", Name = "GetProductById")]
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
      var product = _mapper.Map<Product>(productCreateDto);
      _productRepo.Add(product);
      _unitOfWork.SaveChanges(); // this function mutates directly to product. Proof is that the ID were set after this calling

      var commandReadDto = _mapper.Map<ProductReadDto>(product);

      // return Ok(commandReadDto);
      return CreatedAtRoute(nameof(GetProductById), new { Id = commandReadDto.Id }, commandReadDto);
    }

    [HttpPut("{id}")]
    public ActionResult<ProductReadDto> UpdateProduct(int id, ProductUpdateDto productUpdateDto)
    {
      var oldProduct = _productRepo.GetById(id);
      if (oldProduct == null)
        return NotFound();

      // var newProduct = _mapper.Map<Product>(productUpdateDto);
      var newProduct = _mapper.Map(productUpdateDto, oldProduct); // CuteTN note: this will mutate directly to the oldProduct
      _productRepo.Update(newProduct);
      _unitOfWork.SaveChanges();

      return Ok(newProduct);
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

      return Ok(newProduct);
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
    public ActionResult<ProductReadDto> SetProductCategories(int id, IEnumerable<int> categoriesIds)
    {
      var oldProduct = _productRepo.GetById(id);
      if (oldProduct == null)
        return NotFound();

      var categoriesIdsList = categoriesIds.ToList();
      var categories = categoriesIdsList.Select(id => _categoryRepo.GetById(id)).ToList();

      for (int i = 0; i < categories.Count(); i++)
        if (categories[i] == null)
          return NotFound();

      Services.CategoryProduct.SetCategoriesOfProduct(oldProduct, categories);
      _unitOfWork.SaveChanges();

      return Ok(_mapper.Map<ProductReadDto>(oldProduct));
    }
  }
}