using Microsoft.AspNetCore.Mvc;

namespace CorporateTEMPLATE.Controllers
{
    public class ReportsController : Controller
    {
        public IActionResult MonthlyReport()
        {
            return View();
        }
        public IActionResult UserAnalytics()
        {
            return View();
        }
        public IActionResult PerformanceReport() 
        {
            return View();
        }
    }
}
