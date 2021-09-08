using System.Linq;
using AutoMapper;
using ProductManager.Dtos;
using ProductManager.Models;

namespace ProductManager.Profiles
{
  public class ProductProfile : Profile
  {
    public ProductProfile()
    {
      CreateMap<Product, ProductReadDto>()
        .ForMember(dest => dest.Categories, opt => opt.MapFrom(src =>
          src.Categories.ToList().Select(c => new Category
          {
            Id = c.Id,
            Name = c.Name,
          }
          )
        ))
        .ForMember(dest => dest.ProductDetail, opt => opt.MapFrom(src =>
          new ProductDetail
          {
            ProductId = src.ProductDetail.ProductId,
            Details = src.ProductDetail.Details,
          }
        ))
        .ForMember(dest => dest.Supplier, opt => opt.MapFrom(src => src.Supplier));

      CreateMap<ProductCreateDto, Product>();
      CreateMap<ProductUpdateDto, Product>();
      CreateMap<Product, ProductUpdateDto>();
    }
  }
}