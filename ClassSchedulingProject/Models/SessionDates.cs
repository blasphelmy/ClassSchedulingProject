using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClassSchedulingProject.Models
{
    public partial class SessionDates
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(24)]
        public string SessionName { get; set; }
        [Column("sessionID")]
        public int SessionId { get; set; }
        [Column("sessionNumber")]
        public int SessionNumber { get; set; }
        [Column("sessionYear")]
        public int SessionYear { get; set; }
        [Column("startDate", TypeName = "date")]
        public DateTime StartDate { get; set; }
        [Column("endDate", TypeName = "date")]
        public DateTime EndDate { get; set; }
        [Required]
        [Column("institutonID")]
        [StringLength(64)]
        public string InstitutonId { get; set; }

        public virtual InstitutionsRegistry Instituton { get; set; }
    }
}
