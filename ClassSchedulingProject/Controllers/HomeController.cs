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
    public class HomeController : Controller
    {
        private ClassSchedulerDbContext context;
        List<CourseOfferedTemplates> courseTemplates;
        private IDictionary<string, InstitutionsRegistry> institutionsDict;
        private IDictionary<string, int> registeredEmailsDict;
        private IDictionary<string, string> institutionEmailSuffixDict;
        private IDictionary<string, ApiEvents> eventMap;
        private string instutionNames;
        private string institutionEmailSuffix;
        //private CryptTools CryptTool;
        private Random rand = new Random();
        private List<publicUserInformation> userList = new List<publicUserInformation>();

        public HomeController(ClassSchedulerDbContext newContext)
        {
            this.context = newContext;
            courseTemplates = new List<CourseOfferedTemplates>();
            institutionsDict = new Dictionary<string, InstitutionsRegistry>();
            institutionEmailSuffixDict = new Dictionary<string, string>();
            eventMap = new Dictionary<string , ApiEvents>();
            registeredEmailsDict = new Dictionary<string, int>();
            foreach (InstitutionsRegistry i in context.InstitutionsRegistry)
            {
                institutionsDict.Add(i.InstitutionName, i);
                instutionNames = instutionNames + i.InstitutionId + ",," + i.InstitutionName + "--";
            }
            foreach (UserInformation i in context.UserInformation)
            {
                registeredEmailsDict.Add(i.PrimaryEmail, 1);
                if(i.AccountFlag == 3) userList.Add(new publicUserInformation(i));
            }
            foreach (InstitutionEmailDomains d in context.InstitutionEmailDomains)
            {
                institutionEmailSuffixDict.Add(d.InstitutionId, d.EmailSuffix);
                institutionEmailSuffix = institutionEmailSuffix + d.InstitutionId + ",," + d.EmailSuffix + "--";
            }
            foreach(CourseOfferingsTemplates course in context.CourseOfferingsTemplates.ToList()){
                courseTemplates.Add(new CourseOfferedTemplates(course));
            }
        }

        public IActionResult Index()
        {
            string cookieValueFromReq = Request.Cookies["sessionID"];
            if (verifyUser(cookieValueFromReq) == 1)
            {
                ViewBag.isAuthorized = 1;
                SessionTokens thisToken = context.SessionTokens.FirstOrDefault(e => e.SessionId == cookieValueFromReq);
                UserInformation thisUser = context.UserInformation.FirstOrDefault(e => e.AccountHash == thisToken.AccountHash);
                if(thisUser.DepartmentId == null || thisUser.AccountFlag == 4){
                    return RedirectToAction("waitingForAccountActivation", "Home");
                }

                List<BuildingResources> resources = new List<BuildingResources>();

                foreach(Buildings building in thisUser.PrimaryInstitution.Buildings){
                    BuildingResources newBuilding = new BuildingResources();
                    newBuilding.buildingCode = building.BuildingCode;
                    foreach(BuildingRooms room in building.BuildingRooms){
                        newBuilding.buildingRooms.Add(room.Room);
                    }
                    resources.Add(newBuilding);
                }

                ViewBag.resources = JsonSerializer.Serialize(resources);

                ViewData["Title"] = thisUser.PrimaryInstitutionId + " Home";
                if(Request.Cookies["theme"] == null) SetCookie("theme", "1", 99999);
                ViewData["theme"] = Request.Cookies["theme"];
                ViewBag.thisUser = thisUser;
                ViewData["role"] = thisUser.AccountFlag;
                ViewBag.userList = JsonSerializer.Serialize(userList);
                ViewBag.CourseOfferingsTemplates = JsonSerializer.Serialize(courseTemplates);
                return View();
            }
            return RedirectToAction("Register", "Home");
        }
        [HttpGet]
        public IActionResult myAccount()
        {
            string cookieValueFromReq = Request.Cookies["sessionID"];

            if (verifyUser(cookieValueFromReq) == 1)
            {
                ViewBag.isAuthorized = 1;
                SessionTokens thisToken = context.SessionTokens.FirstOrDefault(e => e.SessionId == cookieValueFromReq);
                UserInformation thisUser = context.UserInformation.FirstOrDefault(e => e.AccountHash == thisToken.AccountHash);
                ViewBag.thisUser = thisUser;
                ViewData["Title"] = thisUser.PrimaryInstitutionId + " myAccount";
                if(Request.Cookies["theme"] == null) SetCookie("theme", "1", 99999);
                ViewData["theme"] = Request.Cookies["theme"];
                ViewData["role"] = thisUser.AccountFlag;
                return View(thisUser);
            }
            return RedirectToAction("Index", "Home");
        }
        [HttpGet]
        public IActionResult manageProgram(){
            UserInformation thisUser = getUser(Request.Cookies["sessionID"]);
            if(thisUser == null || thisUser.AccountFlag > 2) return RedirectToAction("Index", "Home");
            ViewData["Title"] = thisUser.PrimaryInstitutionId + " Home";
            if(Request.Cookies["theme"] == null) SetCookie("theme", "1", 99999);
            ViewData["theme"] = Request.Cookies["theme"];
            ViewBag.thisUser = thisUser;
            ViewData["role"] = thisUser.AccountFlag;
            ViewBag.isAuthorized = 1;
            return View(thisUser); 
        }

        public IActionResult Register()
        {
            if (verifyUser(Request.Cookies["sessionID"]) == 1)
            {
                return RedirectToAction("Index");
            }
            ViewData["role"] = 4;
            ViewBag.institutionRegistry = instutionNames;
            ViewBag.institutionEmailSuffix = institutionEmailSuffix;
            return View();
        }
        [HttpGet]
        public IActionResult waitingForAccountActivation(){
            UserInformation thisUser = getUser(Request.Cookies["sessionID"]);
            if(thisUser == null) return Json("");
            ViewData["Title"] = thisUser.PrimaryInstitutionId + " Home";
            if(Request.Cookies["theme"] == null) SetCookie("theme", "1", 99999);
            ViewData["theme"] = Request.Cookies["theme"];
            ViewBag.thisUser = thisUser;
            ViewData["role"] = thisUser.AccountFlag;
            ViewBag.adminList = context.UserInformation.ToList().FindAll(e => e.AccountFlag < 3);
            if(thisUser.AccountFlag < 4 && thisUser.DepartmentId != null) return RedirectToAction("Index", "Home");
            return View(thisUser);
        }
        [HttpGet]
        public IActionResult fetchEvents(string filterterms, string sessionID)
        {
            // System.Console.WriteLine(sessionID);
            if(verifyUser(Request.Cookies["sessionID"] ?? sessionID) == 0){
                return Json("sessionIDNotFound");
            }
            string[] terms = filterterms.Split(",");
            try
            {
                int.Parse(terms[0]);
                int.Parse(terms[1]);
            }
            catch
            {
                return Json("error");
            }
            UserInformation thisUser = getUser(Request.Cookies["sessionID"] ?? sessionID);
            string institutionID = thisUser.PrimaryInstitutionId;
            string institutionEvents = "";

            List<ApiEvents> eventList = context.ApiEvents.ToList();
            if(eventList.Count > 0)
            {
                eventList = eventList.FindAll(e =>
                {
                if (e.InstitutonId == institutionID && 
                    e.Year == int.Parse(terms[0]) && 
                    e.Quarter == int.Parse(terms[1]))
                    {
                        foreach(ProgramOfferings program in thisUser.Department.ProgramOfferings){
                            if(e.ProgramId == program.Id){
                                return true;
                            }
                        }
                    }
                    return false;
                });
            }

            foreach (ApiEvents evnt in eventList)
            {
                if (evnt.InstitutonId == institutionID)
                {
                    institutionEvents = institutionEvents + evnt.EventData + " _--__- ";
                }
            }

            return Json(institutionEvents);
        }
        [HttpGet]
        public IActionResult fetchEventsByUserYear(string InstructorHash, int year)
        {
            System.Console.WriteLine(year.ToString());
            if(verifyUser(Request.Cookies["sessionID"]) == 0){
                return Json("sessionIDNotFound");
            }
            UserInformation thisUser = getUser(Request.Cookies["sessionID"]);
            string institutionID = thisUser.PrimaryInstitutionId;
            string institutionEvents = "";

            List<ApiEvents> eventList = context.ApiEvents.ToList();
            if(eventList.Count > 0)
            {
                eventList = eventList.FindAll(e =>
                {
                if (e.InstitutonId == institutionID && 
                    e.Year == year && 
                    e.InstructorHash == InstructorHash)
                    {
                        foreach(ProgramOfferings program in thisUser.Department.ProgramOfferings){
                            if(e.ProgramId == program.Id){
                                return true;
                            }
                        }
                    }
                    return false;
                });
            }

            foreach (ApiEvents evnt in eventList)
            {
                if (evnt.InstitutonId == institutionID)
                {
                    institutionEvents = institutionEvents + evnt.EventData + " _--__- ";
                }
            }

            return Json(institutionEvents);
        }
        [HttpPost]
        public IActionResult createAccount([FromBody] RegisterAccount newAccountData)
        {
            if(newAccountData.email != null 
                && newAccountData.password == newAccountData.passwordcnf 
                && newAccountData.insitutionID != null
                && newAccountData.firstName != null
                && newAccountData.lastName != null)
            {
                UserInformation newUser = new UserInformation();
                newUser.PrimaryInstitutionId = newAccountData.insitutionID;
                newUser.PrimaryEmail = newAccountData.email + institutionEmailSuffixDict[newAccountData.insitutionID];
                newUser.LastName = newAccountData.lastName;
                newUser.FirstName = newAccountData.firstName;
                newUser.AccountFlag = 4;
                newUser.AccountHash = (newUser.PrimaryEmail + newAccountData.password).ComputeSha256Hash();
                newUser.EventsAuthorId = (DateTime.Now.ToLongDateString() + newUser.PrimaryEmail + newAccountData.password + rand.Next() + rand.Next()).ComputeSha256Hash();
                try
                {
                    context.UserInformation.Add(newUser);
                    context.SaveChanges();
                    SessionTokens newSessionToken = new SessionTokens();
                    newSessionToken.AccountHash = newUser.AccountHash;
                    newSessionToken.SessionId = $"{newUser.PrimaryEmail + newAccountData.password + DateTime.Now.ToString() + rand.Next()}".ComputeSha256Hash();
                    context.SessionTokens.Add(newSessionToken);
                    context.SaveChanges();
                    SetCookie("sessionID", newSessionToken.SessionId, 99);
                    return Json(1);
                }
                catch
                {
                    return Json(0);
                }
            }
            return Json(0);
        }
        [HttpGet]
        public IActionResult fetchEventTemplates(int programID){
            EventTemplateResponse newRes = new EventTemplateResponse();
            List<CourseOfferedTemplates> coursesOffered = new List<CourseOfferedTemplates>();
            ProgramOfferings program = context.ProgramOfferings.FirstOrDefault(e => e.Id == programID);
            
            newRes.ProgramName = program.ProgramName;
            newRes.ProgramType = program.ProgramType;
            newRes.ProgramID = program.Id;

            if(program != null){
                foreach(CourseOfferingsTemplates course in program.CourseOfferingsTemplates){
                    coursesOffered.Add(new CourseOfferedTemplates(course));
                }
            }
            newRes.programTemplates = JsonSerializer.Serialize(coursesOffered);
            return Json(newRes);
        }
        [HttpGet]
        public IActionResult emailCheck(string email)
        {
            if(email == "")
            {
                return Json(2);
            }
            int found = 0;
            try
            {
                found = registeredEmailsDict[email];
            }
            catch
            {
                found = 0;
            }
            if (found == 1)
            {
                return Json(1);
            }
            return Json(0);
        }

        [HttpGet]
        public IActionResult Login()
        {
            if(verifyUser(Request.Cookies["sessionID"]) == 1)
            {
                return RedirectToAction("Index");
            }
            ViewData["role"] = 4;
            ViewBag.institutionRegistry = instutionNames;
            ViewBag.institutionEmailSuffix = institutionEmailSuffix;
            return View();
        }
        [HttpGet]
        public IActionResult Logout(string id)
        {
            string cookieValueFromReq = Request.Cookies["sessionID"];

            if (verifyUser(cookieValueFromReq) == 1)
            {
                ViewBag.isAuthorized = 1;
                SessionTokens thisToken = context.SessionTokens.FirstOrDefault(e => e.SessionId == cookieValueFromReq);
                UserInformation thisUser = context.UserInformation.FirstOrDefault(e => e.AccountHash == thisToken.AccountHash);
                SessionTokens deleteQeue = thisUser.SessionTokens.FirstOrDefault(o => o.SessionId == id);
                if(deleteQeue != null) context.SessionTokens.Remove(deleteQeue);
                context.SaveChanges();
            }

            return Json(0);
        }
        [HttpPost]
        public IActionResult Login([FromBody] Login info)
        {
            if(info.email != null && info.password != null)
            {
                if(context.UserInformation.FirstOrDefault(e => e.AccountHash == $"{info.email + info.password}".ComputeSha256Hash())  != null)
                {
                    SessionTokens newSessionToken = new SessionTokens();
                    newSessionToken.AccountHash = $"{info.email + info.password}".ComputeSha256Hash();
                    newSessionToken.SessionId = $"{info.email + info.password + DateTime.Now.ToString() + rand.Next()}".ComputeSha256Hash();
                    newSessionToken.Device = info.Device;
                    newSessionToken.Created = DateTime.Now;
                    newSessionToken.LastUsed = DateTime.Now;
                    newSessionToken.Ip = Request.HttpContext.Connection.RemoteIpAddress.ToString();
                    context.SessionTokens.Add(newSessionToken);
                    context.SaveChanges();
                    SetCookie("sessionID", newSessionToken.SessionId, 10080);
                    return Json(newSessionToken.SessionId); 
                } 
            }
            return Json(0);
        }
        [HttpPost]
        public IActionResult SaveEventData([FromBody] ApiEvents newEvent, [FromHeader] String sessionID)
        {
            // System.Console.WriteLine("sessionID = " + sessionID);
            if (newEvent.InstructorHash == "") newEvent.InstructorHash = null;
            UserInformation thisUser = getUser(Request.Cookies["sessionID"] ?? sessionID);
            if(thisUser != null)
            {

            FinalizedCalendar calendar = context.FinalizedCalendar.FirstOrDefault(e => e.Department == thisUser.DepartmentId
                                                                                                        && e.Quarter == newEvent.Quarter
                                                                                                        && e.Year == newEvent.Year
                                                                                                        && e.ProgramId == newEvent.ProgramId);
            if(calendar == null || calendar.IsActive == 0) return Json("calendar not active"); 

                // newEvent.EventAuthorHash = thisUser.AccountHash;
                newEvent.InstitutonId = thisUser.PrimaryInstitutionId;
                ApiEvents existing = context.ApiEvents.FirstOrDefault(e => e.EventUuid == newEvent.EventUuid);
                if(existing != null && existing.EventAuthorHash != newEvent.EventAuthorHash){
                    return Json("Error: mismatched hash");
                }
                int status = 0;
                if(existing != null && (existing.EventAuthorHash == thisUser.EventsAuthorId || existing.InstructorHash == thisUser.EventsAuthorId || thisUser.AccountFlag < 3))
                {
                    context.ApiEvents.Remove(existing);
                    status++;
                }
                else if(thisUser.AccountFlag > 2 && existing != null && existing.EventAuthorHash != thisUser.EventsAuthorId && existing.InstructorHash != thisUser.EventsAuthorId)
                {
                    return Json("not authorized to make changes to this event..");
                }
                context.ApiEvents.Add(newEvent);
                status++;
                context.SaveChanges();
                return Json(status);

            }
            return Json("error");
        }
        [HttpGet]
        public IActionResult deleteEvent(string UUID)
        {
            UserInformation thisUser = getUser(Request.Cookies["sessionID"]);
            if(thisUser != null)
            {
                ApiEvents thisEvent = context.ApiEvents.FirstOrDefault(e => e.EventUuid == UUID);
                if (thisEvent != null)
                {
                    context.ApiEvents.Remove(thisEvent);
                    context.SaveChanges();
                    return Json(1);
                }
                else
                {
                    return Json("error: event not found");
                }
            }
            return Json("ERROR DELETING EVENT");
        }
        [HttpGet]
        public IActionResult checkLoginStatus(string sessionID){
            int status = 0;
            SessionTokens token = context.SessionTokens.FirstOrDefault(e => e.SessionId == sessionID);
            if(token != null){
                status++;
            }
            return Json(status);
        }
        [HttpGet]
        public IActionResult caldata(string sessionID){
            // System.Console.WriteLine(sessionID);
            UserInformation thisUser = getUser(sessionID);
            if(thisUser != null){
                CalenderData newCalData = new CalenderData(thisUser);
                newCalData.userList = JsonSerializer.Serialize(userList);
                return Json(newCalData);
            }
            return Json(0);
        }
        [HttpGet]
        public IActionResult toggleTheme(){
            if(Request.Cookies["theme"] == "1") {
                SetCookie("theme", "2", 99999);
            }else{
                SetCookie("theme", "1", 99999);
            }
            return Json(0);
        }
        [HttpPost]
        public IActionResult saveProgramEventTemplate([FromBody] CourseOfferedTemplates eventTemplate){
            System.Console.WriteLine(eventTemplate.Title);

            UserInformation thisUser = getUser(Request.Cookies["sessionID"]);
            if(thisUser != null && thisUser.AccountFlag < 3)
            {
                CourseOfferingsTemplates existing = context.CourseOfferingsTemplates.FirstOrDefault(e => e.Id == eventTemplate.Id);
                existing.Title = eventTemplate.Title;
                existing.QuarterNumber = eventTemplate.QuarterNumber;
                existing.CoursePrefix = eventTemplate.CoursePrefix;
                existing.CourseNumber = eventTemplate.CourseNumber;
                existing.Component = eventTemplate.Component;
                existing.Credits = eventTemplate.Credits;
                context.SaveChanges();
                return Json(1);
            }

            return Json(-1);
        }
        [HttpGet]
        public IActionResult checkCalState(int year, int quarter, int programID){
            UserInformation thisUser = getUser(Request.Cookies["sessionID"]);
            if(thisUser != null){
                FinalizedCalendar calendar = context.FinalizedCalendar.FirstOrDefault(e => e.Department == thisUser.DepartmentId
                                                                                                                        && e.Quarter == quarter
                                                                                                                        && e.Year == year
                                                                                                                        && e.ProgramId == programID);
                
                if(calendar == null){
                    calendar = new FinalizedCalendar();
                    calendar.IsActive = 0;
                    calendar.ProgramId = programID;
                    calendar.Quarter = quarter;
                    calendar.Year = year;
                    calendar.Department = thisUser.DepartmentId ?? 0;
                    context.FinalizedCalendar.Add(calendar);
                    context.SaveChanges();

                    return Json(0);
                }
                return Json(calendar.IsActive);
            }
            return Json(0);
        }
        [HttpGet]
        public IActionResult toggleCalendarState(int year, int quarter, int programID){
        UserInformation thisUser = getUser(Request.Cookies["sessionID"]);
            if(thisUser != null && thisUser.AccountFlag < 3){
                FinalizedCalendar calendar = context.FinalizedCalendar.FirstOrDefault(e => e.Department == thisUser.DepartmentId
                                                                                                                        && e.Quarter == quarter
                                                                                                                        && e.Year == year
                                                                                                                        && e.ProgramId == programID);
                switch(calendar.IsActive){
                    case 1: calendar.IsActive = 0; break;
                    case 0: calendar.IsActive = 1; break;
                }
                context.SaveChanges();
                return Json(calendar.IsActive);
            }
            return Json(0);
        }

        //helper methods
        public int verifyUser(string hash)
        {
            SessionTokens token = context.SessionTokens.FirstOrDefault(o => o.SessionId == hash);
            if (token != null)
            {
                token.LastUsed = DateTime.Now;
                context.SaveChanges();
                if (token.AccountHashNavigation != null)
                {
                    return 1;
                }
            }
            return 0;
        }
        public UserInformation getUser(string cookie)
        {
            SessionTokens token = context.SessionTokens.FirstOrDefault(o => o.SessionId == cookie);
            token.LastUsed = DateTime.Now;
            context.SaveChanges();
            return token.AccountHashNavigation;
        }
        public void SetCookie(string key, string value, int? expireTime)
        {
            CookieOptions option = new CookieOptions();

            if (expireTime.HasValue)
                option.Expires = DateTime.Now.AddMinutes(expireTime.Value);
            else
                option.Expires = DateTime.Now.AddMilliseconds(10);

            Response.Cookies.Append(key, value, option);
        }
    }
}
