using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClassSchedulingProject.Models
{
    public partial class CourseOfferingsTemplates
    {
        public CourseOfferingsTemplates()
        {
            ApiEvents = new HashSet<ApiEvents>();
            CourseOfferings = new HashSet<CourseOfferings>();
        }

        [Key]
        public int Id { get; set; }
        [Column("ProgramID")]
        public int ProgramId { get; set; }
        [Required]
        [Column("InstitutionID")]
        [StringLength(64)]
        public string InstitutionId { get; set; }
        [Required]
        [StringLength(128)]
        public string Title { get; set; }
        [Required]
        [StringLength(24)]
        public string CoursePrefix { get; set; }
        [Required]
        [StringLength(24)]
        public string CourseNumber { get; set; }
        [Required]
        [StringLength(64)]
        public string Component { get; set; }
        [Column("quarterNumber")]
        public int QuarterNumber { get; set; }
        [Column("credits", TypeName = "decimal(3, 1)")]
        public decimal? Credits { get; set; }

        public virtual InstitutionsRegistry Institution { get; set; }
        [ForeignKey(nameof(ProgramId))]
        [InverseProperty(nameof(ProgramOfferings.CourseOfferingsTemplates))]
        public virtual ProgramOfferings Program { get; set; }
        [InverseProperty("Course")]
        public virtual ICollection<ApiEvents> ApiEvents { get; set; }
        [InverseProperty("CourseOffered")]
        public virtual ICollection<CourseOfferings> CourseOfferings { get; set; }
    }
}
