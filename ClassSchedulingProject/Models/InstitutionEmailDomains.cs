using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClassSchedulingProject.Models
{
    public partial class InstitutionEmailDomains
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [Column("institutionID")]
        [StringLength(64)]
        public string InstitutionId { get; set; }
        [Required]
        [Column("emailSuffix")]
        [StringLength(64)]
        public string EmailSuffix { get; set; }

        public virtual InstitutionsRegistry Institution { get; set; }
    }
}
