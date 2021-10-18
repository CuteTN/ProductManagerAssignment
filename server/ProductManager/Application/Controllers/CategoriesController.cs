using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

using ProductManager.Application.Dtos;

using ProductManager.Domain.Entities;
using ProductManager.Domain.Infrastructure.Repositories;
using ProductManager.Domain.Infrastructure.UnitOfWork;

namespace ProductManager.Application.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class CategoriesController : ControllerBase
  {
    private readonly IUnitOfWork _unitOfWork;

    private readonly IGenericRepository<Category> _categoryRepo;
    private readonly IMapper _mapper;

    public CategoriesController(IUnitOfWork unitOfWork, IMapper mapper)
    {
      _unitOfWork = unitOfWork;
      _categoryRepo = unitOfWork.GetRepository<Category>();
      _mapper = mapper;
    }

    [HttpGet]
    public ActionResult<IEnumerable<CategoryReadDto>> GetAllCategories()
    {
      var result = _categoryRepo.GetAll().ToList();
      return Ok(_mapper.Map<IEnumerable<CategoryReadDto>>(result));
    }
  }
}