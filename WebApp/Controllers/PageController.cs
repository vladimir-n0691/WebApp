using Microsoft.AspNetCore.Mvc;
using WebApp.Helpers;

namespace WebApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PageController : ControllerBase
    {
        public PageController()
        {
        }

        [HttpGet]
        [Route("{*path}")]
        public IActionResult Get(string path = "index.html")
        {
            string mimeType = MimeTypeMap.GetMimeType(path);


            return new ContentResult { Content = System.IO.File.ReadAllText($"site/{path}"), ContentType = mimeType /*"text/html"*/ };
        }
    }
}
