using Microsoft.AspNetCore.Mvc;

namespace CorporateTEMPLATE.Controllers
{
    public class CustomerController : Controller
    {
        public IActionResult CustomerList()
        {
            return View();
        }
        public IActionResult CustomerApplication()
        {
            return View();
        }
        public IActionResult CustomerDetails()
        {
            return View();
        }
    }
}
