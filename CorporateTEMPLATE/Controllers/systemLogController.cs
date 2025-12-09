using Microsoft.AspNetCore.Mvc;

namespace CorporateTEMPLATE.Controllers
{
    public class systemLogController : Controller
    {
        public IActionResult SystemLog()
        {
            return View();
        }
        public IActionResult Errorlog()
        {
            return View();
        }
        public IActionResult APILogs()
        {
            return View();
        }
    }
}
