using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System.Globalization;
using Microsoft.AspNetCore.Localization;
using Newtonsoft.Json.Serialization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

using ProductManager.Application.Middlewares;
using ProductManager.Infrastructure.DbContext;
using ProductManager.Domain.Entities;
using ProductManager.Infrastructure.UnitOfWork;
using ProductManager.Domain.Infrastructure.UnitOfWork;
using ProductManager.Application.Services;

namespace ProductManager
{
  public class Startup
  {
    readonly string angularLocalhostOrigin = "AngularLocalhostOrigin";

    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      var tokenValidationParameters = new TokenValidationParameters()
      {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidAudience = Configuration["JWT:ValidAudience"],
        ValidIssuer = Configuration["JWT:ValidIssuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Secret"])),
        ClockSkew = TimeSpan.Zero,
      };

      services.AddSingleton(tokenValidationParameters);

      services
        .AddAuthentication(options =>
          {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
          })
        .AddJwtBearer(options =>
          {
            options.SaveToken = true;
            options.RequireHttpsMetadata = false;
            options.TokenValidationParameters = tokenValidationParameters;
          }
        );

      // NOTE: this is to prevent authorization from accepting refresh tokens
      services.AddAuthorization(options =>
      {
        options.AddPolicy("AccessToken", policy =>
        {
          policy.RequireClaim("type", "access");
        });
      });

      services.AddCors(opt =>
        opt.AddPolicy(angularLocalhostOrigin, builder =>
          builder.WithOrigins("http://localhost:4200")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials()
        )
      );

      services.AddDbContext<AppDbContext>(opt =>
        opt
          .UseLazyLoadingProxies()
          .UseSqlServer(Configuration.GetConnectionString("ProductConnection"))
      );

      services
        .AddIdentity<AppUser, IdentityRole>()
        .AddEntityFrameworkStores<AppDbContext>()
        .AddDefaultTokenProviders();

      services.AddControllers()
        .AddNewtonsoftJson(s =>
        {
          s.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
          s.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
        }
        );
      ;

      services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

      services.AddSingleton(new CategoryProductService());
      services.AddSingleton(new ProductsFilterService());
      services.AddSingleton(new TokenGeneratorService());
      services.AddScoped<IUnitOfWork, UnitOfWork>();

      services.AddSwaggerGen(c =>
      {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "ProductManager", Version = "v1" });
      });
    }


    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      app.UseAuthentication();

      if (env.IsDevelopment())
      {
        // app.UseDeveloperExceptionPage();
        app.UseMiddleware<AutologMiddleware>();
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

      app.UseCors(angularLocalhostOrigin);

      app.UseAuthentication();
      app.UseAuthorization();

      app.UseMiddleware<ExceptionHandlerMiddleware>();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}
