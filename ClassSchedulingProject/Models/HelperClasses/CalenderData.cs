using System.Collections.Generic;
using ClassSchedulingProject.Structs;
using System.Text.Json;
namespace ClassSchedulingProject.Models
{
    public class CalenderData
    {
        public string programOfferings {get; set;} 
        public string FirstName {get; set;}
        public string LastName {get; set;}
        public string UserAccountID {get; set;}
        public int UserAccountLevel {get; set;}
        public string InstitutionId {get; set;}
        public string DepartmentName {get;set;}
        public string userList {get;set;}
        public CalenderData (UserInformation user){
            List<ProgramOfferingStuct> programList = new List<ProgramOfferingStuct>();
            List<publicUserInformation> users = new List<publicUserInformation>();
            this.FirstName = user.FirstName;
            this.LastName = user.LastName;
            this.UserAccountID = user.EventsAuthorId;
            this.InstitutionId = user.PrimaryInstitutionId;
            this.DepartmentName = user.Department.DepartmentName;
            foreach(ProgramOfferings program in user.Department.ProgramOfferings){
                programList.Add(new ProgramOfferingStuct(program));
            }
            this.programOfferings = JsonSerializer.Serialize(programList);
        }
    }
}
