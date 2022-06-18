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
    public class ProductsController : ControllerBase
    {
        private readonly onboardingContext _context;
        public ProductsController(onboardingContext context)
        {
            _context = context;
        }
        // GET: ProductsController
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            try
            {
                var results = await _context.Products.Take(10).ToListAsync();
                return Ok(results);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Database Failure. \n {ex}");
            }
        }

        // GET: ProductsController/Products/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            try
            {
                var results = await _context.Products.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id);
                if (results == null) return NotFound();
                return Ok(results);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Database Failure. \n {ex}");
            }
        }

        // POST: ProductsController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([FromBody] Product product)
        {
            try
            {
                _context.Products.Add(product);
                await _context.SaveChangesAsync();
                //return Ok();
                return CreatedAtAction(
                    "GetProduct",
                    new { id = product.Id },
                    product
                );
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Database Failure. \n {ex}");
            }
        }

        // POST: ProductsController/Edit/5
        [HttpPut("{id}")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit([FromRoute] int id, [FromBody] Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }
            _context.Entry(product).State = EntityState.Modified;
            try
            {
                if (_context.Products.Find(id) == null)
                {
                    return NotFound();
                }
                var _editedProduct = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
                _editedProduct.Name = product.Name;
                _editedProduct.Price = product.Price;
                //Concurrency check
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Database Failure. \n {ex}");
            }
        }

        // DELETE: ProductsController/Delete/5
        [HttpDelete("{id}")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult<Product>> Delete(int? id)
        {
            if (id == null) return NotFound();
            try
            {
                var _products = await _context.Products.FindAsync(id);
                _context.Products.Remove(_products);
                await _context.SaveChangesAsync();
                return _products;

            }
            catch(Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Database Failure. \n {ex}");
            }
        }
    }
}
