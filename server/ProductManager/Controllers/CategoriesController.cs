
using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ProductManager.DAL;
using ProductManager.Dtos;
using ProductManager.Models;

namespace ProductManager.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class CategoriesController : ControllerBase
  {
    private readonly UnitOfWork _unitOfWork;

    private readonly GenericRepository<Category> _categoryRepo;
    private readonly IMapper _mapper;

    public CategoriesController(UnitOfWork unitOfWork, IMapper mapper)
    {
      _unitOfWork = unitOfWork;
      _categoryRepo = unitOfWork.Repository<Category>();
      _mapper = mapper;
    }

    [HttpGet]
    public ActionResult<IEnumerable<CategoryReadDto>> GetAllCategories()
    {
      var result = _categoryRepo.GetAll();
      return Ok(_mapper.Map<IEnumerable<CategoryReadDto>>(result));
    }
  }
}