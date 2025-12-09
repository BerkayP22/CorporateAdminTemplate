using Microsoft.AspNetCore.Mvc;

namespace CorporateTEMPLATE.Controllers
{
    public class AnnouncementController : Controller
    {
        public IActionResult AnnouncementList()
        {
            return View();
        }
        public IActionResult CreateAnnouncement()
        {
            return View();
        }
    }
}
