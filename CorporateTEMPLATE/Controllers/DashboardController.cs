using Microsoft.AspNetCore.Mvc;

namespace CorporateTEMPLATE.Controllers
{
    public class DashboardController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
