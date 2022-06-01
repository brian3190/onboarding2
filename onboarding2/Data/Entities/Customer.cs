using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace onboarding2.Entities
{
    public class Customer
    {
        public int Id { get; set; }
        [Required]
        public int Name { get; set; }
        [Required]
        public int Address { get; set; }
        public List<Sales> ProductSold { get; set; }
    }
}
