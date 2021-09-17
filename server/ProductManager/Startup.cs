using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using ProductManager.DAL;
using AutoMapper;
using System.Globalization;
using Microsoft.AspNetCore.Localization;
using Newtonsoft.Json.Serialization;

namespace ProductManager
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddDbContext<Context>(opt =>
        opt
          .UseLazyLoadingProxies()
          .UseSqlServer(Configuration.GetConnectionString("ProductConnection"))
      );

      services.AddControllers()
              .AddNewtonsoftJson(s =>
                {
                  s.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                  s.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                }
              );
      ;

      services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

      // Auto choose concrete implementation for IProductRepository
      services.AddScoped<IProductRepository, SqlProductRepository>();
      services.AddScoped<ICategoryRepository, SqlCategoryRepository>();

      services.AddSwaggerGen(c =>
      {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "ProductManager", Version = "v1" });
      });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
        app.UseSwagger();
        app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ProductManager v1"));
      }

      // CuteTN Note: this is for DateTime formatting
      // ... and this does NOT work :)
      var defaultCulture = new CultureInfo("tr-TR");
      app.UseRequestLocalization(new RequestLocalizationOptions
      {
        DefaultRequestCulture = new RequestCulture(defaultCulture),
        SupportedCultures = new List<CultureInfo> { defaultCulture },
        SupportedUICultures = new List<CultureInfo> { defaultCulture }
      });

      app.UseHttpsRedirection();

      app.UseRouting();

      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}
