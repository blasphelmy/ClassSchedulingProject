using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClassSchedulingProject.Models
{
    public partial class ValidPrefixes
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(12)]
        public string Prefix { get; set; }
        [Column("departmentID")]
        public int DepartmentId { get; set; }

        public virtual Departments Department { get; set; }
    }
}
