using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ProductManager.DAL;
using ProductManager.Dtos;
using ProductManager.Models;

namespace ProductManager.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class SuppliersController : ControllerBase
  {
    private readonly UnitOfWork _unitOfWork;

    private readonly GenericRepository<Supplier> _supplierRepo;
    private readonly IMapper _mapper;

    public SuppliersController(UnitOfWork unitOfWork, IMapper mapper)
    {
      _unitOfWork = unitOfWork;
      _supplierRepo = unitOfWork.Repository<Supplier>();
      _mapper = mapper;
    }

    [HttpGet]
    public ActionResult<IEnumerable<SupplierReadDto>> GetAllSuppliers()
    {
      var result = _supplierRepo.GetAll().ToList();
      return Ok(_mapper.Map<IEnumerable<SupplierReadDto>>(result));
    }
  }
}