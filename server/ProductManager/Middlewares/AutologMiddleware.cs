using System;
using System.Diagnostics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace ProductManager.Middlewares
{
  class AutologMiddleware
  {
    private readonly RequestDelegate _next;
    public AutologMiddleware(RequestDelegate next)
    {
      _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
      Stopwatch stopWatch = new Stopwatch();
      stopWatch.Start();

      await _next(context);

      stopWatch.Stop();
      Console.WriteLine(
        $"{context.Request.Method}: {context.Request.Path}{context.Request.QueryString}"
        + $" - {context.Response.StatusCode} - {stopWatch.Elapsed.TotalSeconds}s"
      );
    }
  }
}