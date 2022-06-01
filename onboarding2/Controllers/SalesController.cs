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
                var results = await _context.Customers.Take(10).ToListAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failure");
            }
        }

        // GET: SalesController/Details/5
        public IActionResult Details(int id)
        {
            return Ok();
        }

        // GET: SalesController/Create
        public IActionResult Create()
        {
            return Ok();
        }

        // POST: SalesController/Create
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

        // GET: SalesController/Edit/5
        public IActionResult Edit(int id)
        {
            return Ok();
        }

        // POST: SalesController/Edit/5
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

        // GET: SalesController/Delete/5
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            return Ok();
        }

        // DELETE: SalesController/Delete/5
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
