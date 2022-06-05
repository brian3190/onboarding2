using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace onboarding2.Entities
{
    public class Store
    {
        public int Id { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(200)")]
        public string Name { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(200)")]
        public string Address { get; set; }
        public List<Sales> ProductSold { get; set; }
    }
}
