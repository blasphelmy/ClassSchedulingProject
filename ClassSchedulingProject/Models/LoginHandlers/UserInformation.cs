using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClassSchedulingProject.Models
{
    public partial class UserInformation
    {
        public UserInformation()
        {
            ApiEvents = new HashSet<ApiEvents>();
            SessionTokens = new HashSet<SessionTokens>();
        }

        [Key]
        public int Id { get; set; }
        [Required]
        [Column("accountHash")]
        [StringLength(512)]
        public string AccountHash { get; set; }
        [Required]
        [Column("firstName")]
        [StringLength(64)]
        public string FirstName { get; set; }
        [Required]
        [Column("lastName")]
        [StringLength(64)]
        public string LastName { get; set; }
        [Required]
        [Column("primaryEmail")]
        [StringLength(64)]
        public string PrimaryEmail { get; set; }
        [Required]
        [Column("primaryInstitutionID")]
        [StringLength(64)]
        public string PrimaryInstitutionId { get; set; }
        [Column("accountFlag")]
        public int AccountFlag { get; set; }
        [Column("departmentID")]
        public int? DepartmentId { get; set; }

        public virtual Departments Department { get; set; }
        public virtual InstitutionsRegistry PrimaryInstitution { get; set; }
        public virtual ICollection<ApiEvents> ApiEvents { get; set; }
        public virtual ICollection<SessionTokens> SessionTokens { get; set; }
    }
}
