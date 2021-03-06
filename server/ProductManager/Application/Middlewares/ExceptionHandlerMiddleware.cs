using System;
using System.Collections.Generic;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace ProductManager.Application.Middlewares
{
  class ExceptionHandlerMiddleware
  {
    private readonly RequestDelegate _next;
    public ExceptionHandlerMiddleware(RequestDelegate next)
    {
      _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
      try
      {
        await _next(context);
      }
      catch (Exception error)
      {
        var response = context.Response;
        response.ContentType = "application/json";

        switch (error)
        {
          case KeyNotFoundException e:
            response.StatusCode = (int)HttpStatusCode.NotFound;
            break;

          default:
            response.StatusCode = (int)HttpStatusCode.InternalServerError;
            break;
        }

        var result = JsonSerializer.Serialize(new { message = error?.Message });
        await response.WriteAsync(result);
      }
    }
  }
}