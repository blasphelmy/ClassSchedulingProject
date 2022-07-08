using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClassSchedulingProject.Models
{
    public partial class InstitutionsRegistry
    {
        public InstitutionsRegistry()
        {
            ApiEvents = new HashSet<ApiEvents>();
            CalendarBookBackUps = new HashSet<CalendarBookBackUps>();
            InstitutionEmailDomains = new HashSet<InstitutionEmailDomains>();
            UserInformation = new HashSet<UserInformation>();
        }

        [Key]
        public int Id { get; set; }
        [Required]
        [Column("InstitutionID")]
        [StringLength(64)]
        public string InstitutionId { get; set; }
        [StringLength(128)]
        public string InstitutionName { get; set; }

        public virtual ICollection<ApiEvents> ApiEvents { get; set; }
        public virtual ICollection<CalendarBookBackUps> CalendarBookBackUps { get; set; }
        public virtual ICollection<InstitutionEmailDomains> InstitutionEmailDomains { get; set; }
        public virtual ICollection<UserInformation> UserInformation { get; set; }
    }
}
