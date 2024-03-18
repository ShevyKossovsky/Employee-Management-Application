using Server.Core.Entities;
using Server.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Solid.Service.Services
{
    public class EmployeeService : IEmployeeService
    { 
        private readonly IEmployeeService _employeeService;

        public EmployeeService(IEmployeeService employeeService)
            {
              _employeeService = employeeService;
            }

        public async Task<Employee> AddEmployeeAsync(Employee employee)
        {
            return await _employeeService.AddEmployeeAsync(employee);
        }

        public async Task DeleteEmployeeAsync(int id)
        {
             await _employeeService.DeleteEmployeeAsync(id);
        }

        public async Task<List<Employee>> GetEmployeeAsync()
        {
            return await _employeeService.GetEmployeeAsync();
        }

        public async Task<Employee> GetByIdAsync(int id)
        {
            return await _employeeService.GetByIdAsync(id);
        }

        public async Task<Employee> UpdateEmployeeAsync(int code, Employee employee)
        {
            return await _employeeService.UpdateEmployeeAsync(code, employee);
        }

       
    }
}
