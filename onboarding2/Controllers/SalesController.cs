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
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : Controller
    {
        private readonly onboardingContext _context;
        public SalesController(onboardingContext context)
        {
            _context = context;
        }
        // GET: SalesController
        public async Task<IActionResult> GetSales()
        {
            try
            {
                var results = await _context.Sales
                    .Include(s => s.Customer)
                    .Include(s => s.Product)
                    .Include(s => s.Store)
                    .Take(10).AsNoTracking().ToListAsync();
                if (results == null) return NotFound();
                return Ok(results);
            }
            catch (Exception)
            {
                return this.StatusCode(StatusCodes.Status501NotImplemented, "Database Failure");
            }
        }

        // GET: SalesController/Details/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSales(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            try
            {
                var results = await _context.Sales
                    .Include("Customer")
                    .Include("Product")
                    .Include("Store")
                    .AsNoTracking().SingleOrDefaultAsync(c => c.Id == id);
                if (results == null) return NotFound();
                return Ok(results);
            }
            catch (Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failure");
            }
        }

        // POST: SalesController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([FromBody] Sales sales)
        {
            try
            {
                _context.Sales.Add(sales);
                await _context.SaveChangesAsync();
                //return Ok();
                return CreatedAtAction(
                    "GetSales",
                    new { id = sales.Id },
                    sales
                );
            }
            catch (Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failure");
            }
        }

        // GET: SalesController/Edit/5
        //public IActionResult Edit(int id)
        //{
        //    return Ok();
        //}

        // POST: SalesController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit([FromRoute] int id, [FromBody] Sales sales)
        { 
            if (id != sales.Id)
            {
                return BadRequest();
            }
            //_context.Entry(sales).State = EntityState.Modified;
            try
            {
                var _editedSale = await _context.Sales
                                  .Include("Customer")
                                  .Include("Product")
                                  .Include("Store")
                                  .SingleOrDefaultAsync(s => s.Id == id);
                _editedSale.Customer.Name = sales.Customer.Name;
                _editedSale.Product.Name = sales.Product.Name;
                _editedSale.Store.Name = sales.Store.Name;
                //Concurrency check
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (_context.Sales.Find(id) == null)
                {
                    return NotFound();
                }

                throw;
            }
            return NoContent();
        }

        // DELETE: SalesController/Delete/5
        [HttpDelete]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult<Sales>> Delete(int? id)
        {
            if (id == null) return NotFound();
            var _sales = await _context.Sales.FindAsync(id);

            _context.Sales.Remove(_sales);
            await _context.SaveChangesAsync();

            return _sales;
        }
    }
}
