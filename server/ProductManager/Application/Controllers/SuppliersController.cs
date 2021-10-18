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
  public class SuppliersController : ControllerBase
  {
    private readonly IUnitOfWork _unitOfWork;
    private readonly IGenericRepository<Supplier> _supplierRepo;
    private readonly IMapper _mapper;

    public SuppliersController(IUnitOfWork unitOfWork, IMapper mapper)
    {
      _unitOfWork = unitOfWork;
      _supplierRepo = unitOfWork.GetRepository<Supplier>();
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