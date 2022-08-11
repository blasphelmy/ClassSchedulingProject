using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClassSchedulingProject.Models
{
    public partial class BuildingRooms
    {
        [Key]
        public int Id { get; set; }
        [Column("buildingID")]
        public int BuildingId { get; set; }
        [Required]
        [Column("room")]
        [StringLength(12)]
        public string Room { get; set; }

        [ForeignKey(nameof(BuildingId))]
        [InverseProperty(nameof(Buildings.BuildingRooms))]
        public virtual Buildings Building { get; set; }
    }
}
