using System.Linq;
using AutoMapper;
using ProductManager.Application.Dtos;
using ProductManager.Domain.Entities;

namespace ProductManager.Application.Automapper.Profiles
{
  public class ProductProfile : Profile
  {
    public ProductProfile()
    {
      CreateMap<Product, ProductReadDto>();
      CreateMap<Product, ProductMinReadDto>()
        .ForMember(dest => dest.CategoryIds, opt => opt.MapFrom(src => src.Categories.Select(c => c.Id)));
      CreateMap<ProductCreateDto, Product>();
      CreateMap<ProductUpdateDto, Product>();
      CreateMap<Product, ProductUpdateDto>();


      CreateMap<Category, CategoryReadDto>();
      CreateMap<Category, CategoryMinReadDto>()
        .ForMember(dest => dest.ProductIds, opt => opt.MapFrom(src => src.Products.Select(p => p.Id)));


      CreateMap<ProductDetail, ProductDetailReadDto>();
      CreateMap<ProductDetail, ProductDetailMinReadDto>();
      CreateMap<ProductDetailUpdateDto, ProductDetail>();
      CreateMap<ProductDetailCreateDto, ProductDetail>();
      CreateMap<ProductDetailCreateDto, ProductDetailUpdateDto>();


      CreateMap<Supplier, SupplierReadDto>();
      CreateMap<Supplier, SupplierMinReadDto>();


      CreateMap<UserCreateDto, AppUser>();
    }
  }
}