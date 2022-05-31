using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace onboarding2.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public int Name { get; set; }
        public int Address { get; set; }
        public List<Sales> ProductSold { get; set; }
    }
}
