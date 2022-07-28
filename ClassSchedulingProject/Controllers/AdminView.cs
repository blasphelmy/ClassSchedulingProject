using ClassSchedulingProject.Models;
using ClassSchedulingProject.lib;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using ClassSchedulingProject.data;
using Microsoft.AspNetCore.Http;
using System.Text.Json;
using ClassSchedulingProject.Structs;

namespace ClassSchedulingProject.Controllers
{
    public class Api : Controller
    {
        private ClassSchedulerDbContext context;

        public Api(ClassSchedulerDbContext newContext)
        {
            this.context = newContext;
        }
        public IActionResult Test(){
            return Json("Hello there");
        }
    }
}
