using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductManager.Dtos
{
  public class ProductDetailCreateDto
  {
    public String Details { get; set; }
  }
}