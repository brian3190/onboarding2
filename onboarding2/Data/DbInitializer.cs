using System.Linq;

namespace onboarding2.Data
{
    public static class DbInitializer
    {
        public static void Initialize(onboardingContext context)
        {
            if (context.Customers.Any())
            {
                return; //DB has been seeded
            }
        }
    }
}
