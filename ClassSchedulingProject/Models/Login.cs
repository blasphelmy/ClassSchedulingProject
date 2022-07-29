using System.ComponentModel.DataAnnotations;

namespace ClassSchedulingProject.Models
{
    public class Login
    {
        [Display(Name = "Email address")]
        [Required(ErrorMessage = "The email address is required")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string email { get; set; }

        [Display(Name = "Password")]
        [Required(ErrorMessage = "Password is required")]
        [StringLength(255, ErrorMessage = "Must be between 5 and 255 characters", MinimumLength = 5)]
        [DataType(DataType.Password)]
        public string password { get; set; }

        [Display(Name = "Device")]
        [Required(ErrorMessage = "Device is required")]
        public string Device { get; set; }
    }
}
