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
        private CryptTools CryptTool;
        private Random rand = new Random();

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
            }
            foreach (InstitutionEmailDomains d in context.InstitutionEmailDomains)
            {
                institutionEmailSuffixDict.Add(d.InstitutionId, d.EmailSuffix);
                institutionEmailSuffix = institutionEmailSuffix + d.InstitutionId + ",," + d.EmailSuffix + "--";
            }
            foreach(CourseOfferingsTemplates course in context.CourseOfferingsTemplates.ToList()){
                courseTemplates.Add(new CourseOfferedTemplates(course));
            }
            CryptTool = new CryptTools();
        }

        public IActionResult Index(string institution)
        {
            ViewData["Title"] = institution + " Home";
            string cookieValueFromReq = Request.Cookies["sessionID"];

                if (verifyUser(cookieValueFromReq) == 1)
                {
                    ViewBag.isAuthorized = 1;
                    SessionTokens thisToken = context.SessionTokens.FirstOrDefault(e => e.SessionId == cookieValueFromReq);
                    UserInformation thisUser = context.UserInformation.FirstOrDefault(e => e.AccountHash == thisToken.AccountHash);
                    ViewBag.thisUser = thisUser;
                    if(thisUser.AccountFlag < 3){
                       
                        ViewBag.CourseOfferingsTemplates = JsonSerializer.Serialize(courseTemplates);
                    }
                    return View();
                }
            return RedirectToAction("Register", "Home");
        }

        public IActionResult Register()
        {
            if (verifyUser(Request.Cookies["sessionID"]) == 1)
            {
                return RedirectToAction("Index");
            }
            ViewBag.institutionRegistry = instutionNames;
            ViewBag.institutionEmailSuffix = institutionEmailSuffix;
            return View();
        }
        [HttpGet]
        public IActionResult fetchEvents(string filterterms)
        {
            if(verifyUser(Request.Cookies["sessionID"]) == 0){
                return Json("");
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
            string institutionID = getUser(Request.Cookies["sessionID"]).PrimaryInstitutionId;
            string institutionEvents = "";

            List<ApiEvents> eventList = context.ApiEvents.ToList();
            if(eventList.Count > 0)
            {
                eventList = eventList.FindAll(e =>
                {
                if (e.InstitutonId == institutionID && 
                    e.Year == int.Parse(terms[0]) && 
                    e.Quarter == int.Parse(terms[1]) &&
                    e.Building == terms[2] &&
                    e.Room == terms[3])
                    {
                        return true;
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
                newUser.AccountFlag = 2;
                newUser.AccountHash = CryptTool.ComputeSha256Hash(newUser.PrimaryEmail + newAccountData.password);
                try
                {
                    context.UserInformation.Add(newUser);
                    context.SaveChanges();
                    SessionTokens newSessionToken = new SessionTokens();
                    newSessionToken.AccountHash = newUser.AccountHash;
                    newSessionToken.SessionId = CryptTool.ComputeSha256Hash(newUser.PrimaryEmail + newAccountData.password + DateTime.Now.ToString() + rand.Next());
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
            ViewBag.institutionRegistry = instutionNames;
            ViewBag.institutionEmailSuffix = institutionEmailSuffix;
            return View();
        }
        [HttpPost]
        public IActionResult Login([FromBody] Login info)
        {
            if(info.email != null && info.password != null)
            {
                if(context.UserInformation.FirstOrDefault(e => e.AccountHash == CryptTool.ComputeSha256Hash(info.email + info.password))  != null)
                {
                    SessionTokens newSessionToken = new SessionTokens();
                    newSessionToken.AccountHash = CryptTool.ComputeSha256Hash(info.email + info.password);
                    newSessionToken.SessionId = CryptTool.ComputeSha256Hash(info.email + info.password + DateTime.Now.ToString() + rand.Next());
                    context.SessionTokens.Add(newSessionToken);
                    context.SaveChanges();
                    SetCookie("sessionID", newSessionToken.SessionId, 10080);
                    return Json(1); 
                } 
            }
            return Json(0);
        }
        [HttpPost]
        public IActionResult SaveEventData([FromBody] ApiEvents newEvent)
        {
            UserInformation thisUser = getUser(Request.Cookies["sessionID"]);
            if(thisUser != null)
            {
                newEvent.EventAuthorHash = thisUser.AccountHash;
                newEvent.InstitutonId = thisUser.PrimaryInstitutionId;
                ApiEvents existing = context.ApiEvents.FirstOrDefault(e => e.EventUuid == newEvent.EventUuid);
                int status = 0;
                if(existing != null && existing.EventAuthorHash == thisUser.AccountHash)
                {
                    context.ApiEvents.Remove(existing);
                    status++;
                }
                else if(existing != null && existing.EventAuthorHash != thisUser.AccountHash)
                {
                    return Json("not authorized to make changes on this event..");
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
        public int verifyUser(string hash)
        {
            SessionTokens token = context.SessionTokens.FirstOrDefault(o => o.SessionId == hash);
            if (token != null)
            {
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
