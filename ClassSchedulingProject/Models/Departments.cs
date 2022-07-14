using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClassSchedulingProject.Models
{
    public partial class Departments
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [Column("departmentName")]
        [StringLength(24)]
        public string DepartmentName { get; set; }
        [Column("departmentID")]
        public int DepartmentId { get; set; }
        [Column("departmentType")]
        public int DepartmentType { get; set; }
        [Required]
        [Column("institutionID")]
        [StringLength(64)]
        public string InstitutionId { get; set; }

        public virtual InstitutionsRegistry Institution { get; set; }
    }
}
