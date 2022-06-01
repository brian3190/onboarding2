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
                var results = await _context.Customers.Take(10).ToListAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failure");
            }
        }

        // GET: ProductsController/Details/5
        public async Task<IActionResult> Details(int id)
        {
            try
            {
                var results = await _context.Customers.Take(10).ToListAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failure");
            }
        }

        // POST: ProductsController/Create
        [HttpPost]
        public async Task<IActionResult> Create()
        {
            return Ok();
        }

        // POST: ProductsController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(IFormCollection collection)
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

        // POST: ProductsController/Edit/5
        [HttpPost]
        public async Task<IActionResult> Edit(int id)
        {
            return Ok();
        }

        // POST: ProductsController/Edit/5
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

        // DELETE: ProductsController/Delete/5
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            return Ok();
        }

        // DELETE: ProductsController/Delete/5
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
