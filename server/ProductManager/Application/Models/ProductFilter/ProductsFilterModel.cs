using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace ProductManager.Application.Models
{
  [BindProperties(SupportsGet = true)]
  public class ProductsFilterModel
  {
    // searching //////////////////////////////////////////////////////////////////////////////////
    public int? MinId { get; set; }
    public int? MaxId { get; set; }
    public string HasName { get; set; }
    public DateTime? MinReleaseDate { get; set; }
    public DateTime? MaxReleaseDate { get; set; }
    public Int16? MinRating { get; set; }
    public Int16? MaxRating { get; set; }
    public double? MinPrice { get; set; }
    public double? MaxPrice { get; set; }
    public int? SupplierId { get; set; }
    [FromQuery(Name = "CategoryId")]
    public List<int> CategoryIds { get; set; }


    // sort ///////////////////////////////////////////////////////////////////////////////////////
    // sort rules are strings with format: <field>:<"asc"/"des">
    // the first rule in list would have the top priority
    [FromQuery(Name = "SortBy")]
    public List<String>  SortRules { get; set; }


    // pagination /////////////////////////////////////////////////////////////////////////////////
    public int? Page { get; set; }
    public int? Limit { get; set; }
  }
}