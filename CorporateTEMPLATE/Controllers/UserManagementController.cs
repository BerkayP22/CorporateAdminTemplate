using Microsoft.AspNetCore.Mvc;

namespace CorporateTEMPLATE.Controllers
{
    public class UserManagementController : Controller
    {
        public IActionResult UserList()
        {
            return View();
        }
        public IActionResult CreateUser()
        {
            return View();
        }
        public IActionResult RolesPermissions()
        {
            return View();
        }
    }
}
