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
        [Column("ip")]
        [StringLength(512)]
        public string Ip { get; set; }
        [Column("device")]
        [StringLength(128)]
        public string Device { get; set; }
        [Column("created", TypeName = "datetime")]
        public DateTime? Created { get; set; }
        [Column("lastUsed", TypeName = "datetime")]
        public DateTime? LastUsed { get; set; }

        public virtual UserInformation AccountHashNavigation { get; set; }
    }
}
