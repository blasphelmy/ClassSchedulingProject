﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClassSchedulingProject.Models
{
    [Table("apiEvents")]
    public partial class ApiEvents
    {
        [Key]
        public int? Id { get; set; }
        [Required]
        [Column("eventData")]
        public string EventData { get; set; }
        [Required]
        [Column("eventUUID")]
        [StringLength(256)]
        public string EventUuid { get; set; }
        [Required]
        [Column("eventAuthorHash")]
        [StringLength(512)]
        public string EventAuthorHash { get; set; }
        [StringLength(64)]
        public string InstructorHash { get; set; }
        [Required]
        [Column("institutonID")]
        [StringLength(64)]
        public string InstitutonId { get; set; }
        [Column("classQuarterNumber")]
        public int? ClassQuarterNumber { get; set; }
        [Column("year")]
        public int Year { get; set; }
        [Column("quarter")]
        public int Quarter { get; set; }
        [Column("building")]
        [StringLength(64)]
        public string Building { get; set; }
        [Column("room")]
        [StringLength(64)]
        public string Room { get; set; }
        [Column("programID")]
        public int ProgramId { get; set; }
        [Column("courseID")]
        public int CourseId { get; set; }
        [Column("coursePrefix")]
        [StringLength(24)]
        public string CoursePrefix { get; set; }
        [Column("courseNumber")]
        [StringLength(12)]
        public string CourseNumber { get; set; }
        [StringLength(12)]
        public string Section { get; set; }
        [StringLength(64)]
        public string Component { get; set; }

        [ForeignKey(nameof(CourseId))]
        [InverseProperty(nameof(CourseOfferingsTemplates.ApiEvents))]
        public virtual CourseOfferingsTemplates Course { get; set; }
        public virtual UserInformation EventAuthorHashNavigation { get; set; }
        public virtual InstitutionsRegistry Instituton { get; set; }
        [ForeignKey(nameof(ProgramId))]
        [InverseProperty(nameof(ProgramOfferings.ApiEvents))]
        public virtual ProgramOfferings Program { get; set; }
    }
}
