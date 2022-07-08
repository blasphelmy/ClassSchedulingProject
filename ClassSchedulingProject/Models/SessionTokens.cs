using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClassSchedulingProject.Models
{
    public partial class SessionTokens
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [Column("SessionID")]
        [StringLength(256)]
        public string SessionId { get; set; }
        [Required]
        [Column("accountHash")]
        [StringLength(512)]
        public string AccountHash { get; set; }

        public virtual UserInformation AccountHashNavigation { get; set; }
    }
}
