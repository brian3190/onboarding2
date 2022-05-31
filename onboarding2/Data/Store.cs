using System.Collections.Generic;

namespace onboarding2.Data
{
    public class Store
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public List<Sales> ProductSold { get; set; }
    }
}
