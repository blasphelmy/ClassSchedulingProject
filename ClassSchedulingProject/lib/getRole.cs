using ClassSchedulingProject.Models;
using System.Collections.Generic;
namespace ClassSchedulingProject.Models
{
public class getRole
    {
        public getRole(){
        }
        public string role(int role){
            switch(role){
                case 0 : return "Web Admin";
                case 1 : return "Admin";
                case 2 : return "Admin Assistant";
                case 3 : return "Instructor";
                default : return "Unregistered";
            }
        }
    }
}
