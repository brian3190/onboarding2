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
                var results = await _context.Customers.Take(10).ToListAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failure");
            }
        }

        // GET: StoresController/Details/5
        public IActionResult Details(int id)
        {
            return Ok();
        }

        // GET: StoresController/Create
        public IActionResult Create()
        {
            return Ok();
        }

        // POST: StoresController/Create
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

        // GET: StoresController/Edit/5
        public IActionResult Edit(int id)
        {
            return Ok();
        }

        // POST: StoresController/Edit/5
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

        // DELETE: StoresController/Delete/5
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            return Ok();
        }

        // DELETE: StoresController/Delete/5
        [HttpPost]
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
