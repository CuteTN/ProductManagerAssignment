using Microsoft.AspNetCore.Mvc;

namespace ProductManager.Application.Controllers
{
  [Route("[controller]")]
  [ApiController]
  public class TestController : ControllerBase
  {
    public TestController()
    { }

    [HttpGet("throw-exception/{msg}")]
    public ActionResult<object> ThrowException(string msg)
    {
      throw new System.Exception($"Test throw exception: {msg}");
    }

    [HttpGet("throw-key-not-found-exception/{msg}")]
    public ActionResult<object> ThrowKeyNotFoundException(string msg)
    {
      throw new System.Collections.Generic.KeyNotFoundException($"Test throw key not found exception: {msg}");
    }
  }
}