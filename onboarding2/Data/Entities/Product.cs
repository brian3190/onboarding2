using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace onboarding2.Entities
{
    public class Product
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public List<Sales> ProductSold { get; set; }
    }
}
