using ClassSchedulingProject.Models;
namespace ClassSchedulingProject.Models
{
public class publicUserInformation
    {
        public string EventsAuthorId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int? department { get; set; }

        public publicUserInformation(UserInformation user){
            this.EventsAuthorId = user.EventsAuthorId;
            this.FirstName = user.FirstName;
            this.LastName = user.LastName;
            this.department = user.DepartmentId;
        }
    }
}
