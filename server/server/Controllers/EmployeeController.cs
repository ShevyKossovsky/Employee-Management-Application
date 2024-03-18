using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.Core.Entities;
using Server.Core.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IMapper _mapper;

        public EmployeeController(IEmployeeService employeeService, IMapper mapper)
        {
            _employeeService = employeeService;
            _mapper = mapper;
        }
        // GET: <EmployeeController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _employeeService.GetEmployeeAsync());
        }

        // GET <EmployeeController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int code)
        {
            var employee = _employeeService.GetByIdAsync(code);
            if (employee is null)
            {
                return NotFound();
            }
            return Ok(await employee);
        }


        // POST <EmployeeController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Employee employee)
        {
            return Ok(await _employeeService.AddEmployeeAsync(employee));
        }
        // PUT <EmployeeController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int code, [FromBody] Employee employee)
        {
            return Ok(await _employeeService.UpdateEmployeeAsync(code,employee));

        }

        // DELETE <EmployeeController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int code)
        {
            await _employeeService.DeleteEmployeeAsync(code);
            return NoContent();

        }
    }
}
