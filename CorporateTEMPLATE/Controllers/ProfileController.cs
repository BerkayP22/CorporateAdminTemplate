using Microsoft.AspNetCore.Mvc;

namespace CorporateTEMPLATE.Controllers
{
    public class ProfileController : Controller
    {
        public IActionResult myProfile()
        {
            return View();
        }
        public IActionResult changePassword()
        {
            return View();
        }
    }
}
