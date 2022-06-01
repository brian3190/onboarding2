using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using onboarding2.Data;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace onboarding2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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

        // GET: CustomersController
        [HttpGet]
        public async Task<IActionResult> GetCustomers()
        {
            try
            {
                var results = await _context.Customers.Take(10).ToListAsync();
                if (results == null) return NotFound();
                return Ok(results);
            }
            catch (Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failure");
            }
            
        }

        // GET: CustomersController/Details/5
        [HttpGet("{id:int}")]
        public async Task<IActionResult> Details(int? id)
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
        public ActionResult Create()
        {
            return Ok();
        }

        // POST: CustomersController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return Ok();
            }
        }

        // GET: CustomersController/Edit/5
        public IActionResult Edit(int id)
        {
            return Ok();
        }

        // POST: CustomersController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return Ok();
            }
        }

        // DELETE: CustomersController/Delete/5
        [HttpDelete]
        public ActionResult Delete(int id)
        {
            return Ok();
        }

        // DELETE: CustomersController/Delete/5
        [HttpDelete]
        [ValidateAntiForgeryToken]
        public IActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return Ok();
            }
        }
    }
}
