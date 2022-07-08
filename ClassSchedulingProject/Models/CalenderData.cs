using System.Collections.Generic;

namespace ClassSchedulingProject.Models
{
    public class CalenderData
    {
        public UserInformation thisUser { get; set; }
        public List<Event> institutionEvents { get; set; }
    }
}
