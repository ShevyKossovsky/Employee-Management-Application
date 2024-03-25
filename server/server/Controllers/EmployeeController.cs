using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using server.Models;
using Server.Core.DTOs;
using Server.Core.Entities;
using Server.Core.Services;
using Server.Service.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IPositionService _positionService;
        private readonly IMapper _mapper;

        public EmployeeController(IEmployeeService employeeService,IPositionService positionService, IMapper mapper)
        {
            _positionService= positionService;
            _employeeService = employeeService;
            _mapper = mapper;
        }
        // GET: <EmployeeController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var employees=await _employeeService.GetEmployeeAsync();
            return Ok(_mapper.Map<IEnumerable<EmployeeDto>>(employees));
        }

        // GET <EmployeeController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var employee = await _employeeService.GetByIdAsync(id);
            if (employee is null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<EmployeeDto>(employee));
        }
        // POST <EmployeeController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] EmployeePostModel model)
        {
            Employee employeeToAdd = _mapper.Map<Employee>(model);
            employeeToAdd.PositionsList = new List<EmployeePosition>();
            foreach (EmployeePositionPostModel p in model.PositionsList)
            {
                Position position = await _positionService.GetPositionByIdAsync(p.PositionId);
                EmployeePosition employeePosition = _mapper.Map<EmployeePosition>(p);
                employeePosition.Position = position;
                employeeToAdd.PositionsList.Add(employeePosition);

            }
            await _employeeService.AddEmployeeAsync(employeeToAdd);
            return Ok(_mapper.Map<EmployeeDto>(employeeToAdd));
        }

        // PUT <EmployeeController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] EmployeePostModel model)
        {
            Employee e=_mapper.Map<Employee>(model);
            var updatedEmployee = await _employeeService.UpdateEmployeeAsync(id, e);
            if (updatedEmployee is null)
            {
                return NotFound();  
            }

            return Ok(_mapper.Map<EmployeeDto>(updatedEmployee));
        }


        // DELETE <EmployeeController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var employee =await _employeeService.GetByIdAsync(id);
            if(employee is null)
            { return NotFound(); }
            await _employeeService.DeleteEmployeeAsync(id);
            return NoContent();

        }
    }
}
