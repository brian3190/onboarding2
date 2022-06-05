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
    public class StoresController : ControllerBase
    {
        private readonly onboardingContext _context;
        public StoresController(onboardingContext context)
        {
            _context = context;
        }
        // GET: StoresController
        public async Task<IActionResult> GetStores()
        {
            try
            {
                var results = await _context.Stores.Take(10).ToListAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failure");
            }
        }

        // GET: StoresController/GetStores/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetStores(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            try
            {
                var results = await _context.Stores.AsNoTracking().FirstOrDefaultAsync(c => c.Id == id);
                if (results == null) return NotFound();
                return Ok(results);
            }
            catch (Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failure");
            }
        }

        // GET: StoresController/Create
        //public IActionResult Create()
        //{
        //    return Ok();
        //}

        // POST: StoresController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([FromBody] Store store)
        {
            try
            {
                _context.Stores.Add(store);
                await _context.SaveChangesAsync();
                //return Ok();
                return CreatedAtAction(
                    "GetCustomer",
                    new { id = store.Id },
                    store
                );
            }
            catch (Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failure");
            }
        }

        // EDIT: StoresController/Edit/5
        [HttpPut("{id}")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit([FromRoute] int id, [FromBody] Store store)
        {
            if (id != store.Id)
            {
                return BadRequest();
            }
            //_context.Entry(store).State = EntityState.Modified;
            try
            {
                var _editedStore = await _context.Stores.FindAsync(id);
                _editedStore.Name = store.Name;
                _editedStore.Address = store.Address;
                //Concurrency check
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (_context.Customers.Find(id) == null)
                {
                    return NotFound();
                }

                throw;
            }
            return NoContent();
        }

        // DELETE: StoresController/Delete/5
        [HttpDelete("{id}")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult<Store>> Delete(int? id)
        {
            try
            {
                var _stores = await _context.Stores.FindAsync(id);
                _context.Stores.Remove(_stores);
                await _context.SaveChangesAsync();
                return _stores;
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failure");
            }
        }
    }
}
