using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClassSchedulingProject.Models
{
    public partial class FinalizedCalendar
    {
        [Key]
        public int Id { get; set; }
        [Column("year")]
        public int Year { get; set; }
        [Column("quarter")]
        public int Quarter { get; set; }
        [Column("department")]
        public int Department { get; set; }
        [Column("programID")]
        public int ProgramId { get; set; }
        [Column("isActive")]
        public int IsActive { get; set; }
    }
}
