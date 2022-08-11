using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClassSchedulingProject.Models
{
    public partial class Buildings
    {
        public Buildings()
        {
            BuildingRooms = new HashSet<BuildingRooms>();
        }

        [Key]
        public int Id { get; set; }
        [Required]
        [Column("institutionID")]
        [StringLength(64)]
        public string InstitutionId { get; set; }
        [Column("buildingName")]
        [StringLength(64)]
        public string BuildingName { get; set; }
        [Required]
        [Column("buildingCode")]
        [StringLength(120)]
        public string BuildingCode { get; set; }

        public virtual InstitutionsRegistry Institution { get; set; }
        [InverseProperty("Building")]
        public virtual ICollection<BuildingRooms> BuildingRooms { get; set; }
    }
}
