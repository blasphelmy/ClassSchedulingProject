using Microsoft.AspNetCore.Mvc;

namespace ClassSchedulingProject.Controllers
{
    public class AdminView : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
