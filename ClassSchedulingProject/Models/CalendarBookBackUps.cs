using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClassSchedulingProject.Models
{
    [Table("calendarBookBackUps")]
    public partial class CalendarBookBackUps
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [Column("institutonID")]
        [StringLength(64)]
        public string InstitutonId { get; set; }
        [Required]
        [Column("completeBooking")]
        public string CompleteBooking { get; set; }
        [Column("backupNumber")]
        public int? BackupNumber { get; set; }

        public virtual InstitutionsRegistry Instituton { get; set; }
    }
}
