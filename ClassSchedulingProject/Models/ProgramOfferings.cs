using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClassSchedulingProject.Models
{
    public partial class ProgramOfferings
    {
        public ProgramOfferings()
        {
            ApiEvents = new HashSet<ApiEvents>();
            CourseOfferingsTemplates = new HashSet<CourseOfferingsTemplates>();
        }

        [Key]
        public int Id { get; set; }
        [Required]
        [Column("InstitutionID")]
        [StringLength(64)]
        public string InstitutionId { get; set; }
        [Column("AssociatedDepartmentID")]
        public int AssociatedDepartmentId { get; set; }
        [Required]
        [StringLength(256)]
        public string ProgramName { get; set; }
        [Required]
        [StringLength(12)]
        public string ProgramType { get; set; }
        public int ProgramVersion { get; set; }

        public virtual Departments AssociatedDepartment { get; set; }
        public virtual InstitutionsRegistry Institution { get; set; }
        [InverseProperty("Program")]
        public virtual ICollection<ApiEvents> ApiEvents { get; set; }
        [InverseProperty("Program")]
        public virtual ICollection<CourseOfferingsTemplates> CourseOfferingsTemplates { get; set; }
    }
}
