using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UpSkill_API.Contexts;
using UpSkill_API.Models;

namespace UpSkill_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("Policy1")]
    public class StudentsController : ControllerBase
    {
        private readonly StudentsContext _context;

        public StudentsController(StudentsContext context)
        {
            _context = context;
        }

        // GET: api/Students
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentsModel>>> GetStudents()
        {
          if (_context.Students == null)
          {
              return NotFound();
          }
            return await _context.Students.ToListAsync();
        }

        // GET: api/Students/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentsModel>> GetStudentsModel(int id)
        {
          if (_context.Students == null)
          {
              return NotFound();
          }
            var studentsModel = await _context.Students.FindAsync(id);

            if (studentsModel == null)
            {
                return NotFound();
            }

            return studentsModel;
        }

        // PUT: api/Students/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudentsModel(int id, StudentsModel studentsModel)
        {
            if (id != studentsModel.StudentId)
            {
                return BadRequest();
            }

            _context.Entry(studentsModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentsModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Students
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StudentsModel>> PostStudentsModel(StudentsModel studentsModel)
        {
          if (_context.Students == null)
          {
              return Problem("Entity set 'StudentsContext.Students' is null.");
          }
            _context.Students.Add(studentsModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudentsModel", new { id = studentsModel.StudentId }, studentsModel);
        }

        // DELETE: api/Students/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudentsModel(int id)
        {
            if (_context.Students == null)
            {
                return NotFound();
            }
            var studentsModel = await _context.Students.FindAsync(id);
            if (studentsModel == null)
            {
                return NotFound();
            }

            _context.Students.Remove(studentsModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StudentsModelExists(int id)
        {
            return (_context.Students?.Any(e => e.StudentId == id)).GetValueOrDefault();
        }
    }
}
