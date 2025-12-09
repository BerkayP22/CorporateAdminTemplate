using Microsoft.AspNetCore.Mvc;

namespace CorporateTEMPLATE.Controllers
{
    public class VersionController : Controller
    {
        public IActionResult AllVersions()
        {
            return View();
        }
        public IActionResult CreateVersion()
        {
            return View();
        }
        public IActionResult VersionHistory()
        {
            return View();
        }
    }
}
