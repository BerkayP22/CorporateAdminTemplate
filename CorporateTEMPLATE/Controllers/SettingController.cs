using Microsoft.AspNetCore.Mvc;

namespace CorporateTEMPLATE.Controllers
{
    public class SettingController : Controller
    {
        public IActionResult ThemeSetting()
        {
            return View();
        }
        public IActionResult APISetting()
        {
            return View();
        }
        public IActionResult SystemSetting()
        {
            return View();
        }
    }
}
