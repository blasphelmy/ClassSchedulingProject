using ClassSchedulingProject.Models;
using System.Collections.Generic;
namespace ClassSchedulingProject.Models
{
public class BuildingResources
    {
        public string buildingCode {get; set;}
        public List<string> buildingRooms {get; set;}
        public BuildingResources(){
            this.buildingRooms = new List<string>();
        }
    }
}
