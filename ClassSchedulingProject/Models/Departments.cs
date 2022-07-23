using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClassSchedulingProject.Models
{
    public partial class Departments
    {
        public Departments()
        {
            ProgramOfferings = new HashSet<ProgramOfferings>();
            UserInformation = new HashSet<UserInformation>();
            ValidPrefixes = new HashSet<ValidPrefixes>();
        }

        [Key]
        public int Id { get; set; }
        [Required]
        [Column("departmentName")]
        [StringLength(64)]
        public string DepartmentName { get; set; }
        [Column("departmentID")]
        public int DepartmentId { get; set; }
        [Required]
        [Column("departmentType")]
        [StringLength(12)]
        public string DepartmentType { get; set; }
        [Required]
        [Column("institutionID")]
        [StringLength(64)]
        public string InstitutionId { get; set; }

        public virtual InstitutionsRegistry Institution { get; set; }
        public virtual ICollection<ProgramOfferings> ProgramOfferings { get; set; }
        public virtual ICollection<UserInformation> UserInformation { get; set; }
        public virtual ICollection<ValidPrefixes> ValidPrefixes { get; set; }
    }
}
