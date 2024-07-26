using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductController(AppDbContext context)
        {
            _context = context;
        }
        //Returns whats in our Product table
        [HttpGet]
        public async Task<IActionResult> Products(){
            // await Task.Delay(4000);
            return Ok(await _context.Products.AsNoTracking().ToListAsync());
        }
        //Creates a product and saves it to our database
        [HttpPost]
        public async Task<IActionResult> CreateProducts(Product product){
            if (product is null){
                return BadRequest();
            }
            //Adds our product
            await _context.Products.AddAsync(product);
            //Saves it into our database
            await _context.SaveChangesAsync();

            return Ok(product);
        }
        //Looks inside our database for a specific id then returns every info from that id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProducts(int id){
            //Finds if the id exists then stores it in product
            var product = await _context.Products.FindAsync(id);
            
            if (product is null){
                return NotFound();
            }
            return Ok(product);
        }
        //Updates our id and its content
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProducts(int id, Product product){
            // if (id == 0)
            // {
            //     return BadRequest();
            // }
            var thisProduct = await _context.Products.FindAsync(id);
            
            if (thisProduct is null){
                return NotFound();
            }
            product.Id = id;

            _context.Entry(thisProduct).CurrentValues.SetValues(product);
            // _context.Entry(product).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id){
            var product = await _context.Products.FindAsync(id);
            if (product is null){
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return Ok (product);
        }
    }
}