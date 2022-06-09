using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using onboarding2.Data;
using onboarding2.Entities;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace onboarding2.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomersController : ControllerBase
    {
        private readonly onboardingContext _context;
        public CustomersController(onboardingContext context)
        {
            _context = context;
        }
        //private readonly ICustomerRepository _repository;
        //public CustomersController(ICustomerRepository repository)
        //{
        //    _repository = repository;
        //}

        // GET: api/Customers/
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            try
            {
                var results = await _context.Customers.Include(s => s.ProductSold).Take(10).ToListAsync();
                if (results == null) return NotFound();
                return Ok(results);
            }
            catch (Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failure");
            }
        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            try
            {
                var results = await _context.Customers.AsNoTracking().FirstOrDefaultAsync(c => c.Id == id);
                if (results == null) return NotFound();
                return Ok(results);
            }
            catch (Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failure");
            }
        }

        // POST: CustomersController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([FromBody]Customer customer)
        {
            try
            {
                _context.Customers.Add(customer);
                await _context.SaveChangesAsync();
                //return Ok();
                return CreatedAtAction(
                    "GetCustomer",
                    new { id = customer.Id },
                    customer
                );
            }
            catch (Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failure");
            }
        }

        // POST: CustomersController/Edit/5
        [HttpPut("{id}")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit([FromRoute]int id, [FromBody]Customer customer)
        {
            if (id != customer.Id)
            {
                return BadRequest();
            }          
            try
            {
                var _editedCustomer = await _context.Customers.FindAsync(id);
                _editedCustomer.Name = customer.Name;
                _editedCustomer.Address = customer.Address;
                //Concurrency check
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                if (_context.Customers.Find(id) == null)
                {
                    return NotFound();
                }

                throw;
            }
            return NoContent();
        }

        // DELETE: CustomersController/Delete/5
        [HttpDelete("{id}")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult<Customer>> Delete(int? id)
        {
            try
            {
                var _customers = await _context.Customers.FindAsync(id);
                _context.Customers.Remove(_customers);
                await _context.SaveChangesAsync();
                return _customers;
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failure");
            }
        }
    }
}
