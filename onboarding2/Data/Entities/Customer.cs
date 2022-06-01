using System.Collections.Generic;

namespace onboarding2.Entities
{
    public class Customer
    {
        public int Id { get; set; }
        public int Name { get; set; }
        public int Address { get; set; }
        public List<Sales> ProductSold { get; set; }
    }
}
