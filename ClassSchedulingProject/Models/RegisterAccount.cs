using System;
using System.ComponentModel.DataAnnotations;

namespace ClassSchedulingProject.Models
{
    public class RegisterAccount
    {
        [Display(Name = "Your first name")]
        [StringLength(20)]
        [Required(ErrorMessage = "First name cannot be blank!")]
        public String firstName { get; set; }


        [Display(Name = "Your last name")]
        [StringLength(20)]
        [Required(ErrorMessage = "Last name cannot be blank!")]
        public String lastName { get; set; }


        [Display(Name = "Email address")]
        [Required(ErrorMessage = "The email address is required")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string email { get; set; }
        public string insitutionID { get; set; }

        [Display(Name = "Create a password")]
        [Required(ErrorMessage = "Password is required")]
        [StringLength(255, ErrorMessage = "Must be between 5 and 255 characters", MinimumLength = 5)]
        [DataType(DataType.Password)]
        public string password { get; set; }

        [Display(Name = "Confirm password")]
        [Required(ErrorMessage = "password confirmation required!")]
        [StringLength(255, ErrorMessage = "Must be between 5 and 255 characters", MinimumLength = 5)]
        [DataType(DataType.Password)]
        [Compare("password")]
        public String passwordcnf { get; set; }
    }
}
