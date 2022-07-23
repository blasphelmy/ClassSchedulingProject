using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClassSchedulingProject.Models
{
    public partial class CourseOfferings
    {
        [Key]
        public int Id { get; set; }
        [Column("courseOfferedID")]
        public int CourseOfferedId { get; set; }
        public int? ClassNumber { get; set; }
        [Column("quarter")]
        public int? Quarter { get; set; }
        [Column("year")]
        public int? Year { get; set; }

        [ForeignKey(nameof(CourseOfferedId))]
        [InverseProperty(nameof(CourseOfferingsTemplates.CourseOfferings))]
        public virtual CourseOfferingsTemplates CourseOffered { get; set; }
    }
}
