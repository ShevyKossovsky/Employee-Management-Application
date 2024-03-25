using Microsoft.EntityFrameworkCore;
using Server.Core.Entities;
using Server.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Data.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _context;


        public EmployeeRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Employee>> GetEmployeeAsync()
        {
            return await _context.EmployeesList.Include(e => e.PositionsList).ThenInclude(p=>p.Position).ToListAsync();
        }

        public async Task<Employee> GetByIdAsync(int id)
        {
            return await _context.EmployeesList
                                 .Include(e => e.PositionsList)
                                     .ThenInclude(p => p.Position)
                                 .FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<Employee> AddEmployeeAsync(Employee employee)
        {
            _context.EmployeesList.Add(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        public async Task DeleteEmployeeAsync(int id)
        {
            var employee = await _context.EmployeesList.FindAsync(id);
            if (employee != null)
            {
                employee.IsActive = false;

                await _context.SaveChangesAsync();
            }
        }

        public async Task<Employee> UpdateEmployeeAsync(int id, Employee employee)
        {
            var updateEmployee = await _context.EmployeesList.FindAsync(id);

            if (updateEmployee != null)
            {
                updateEmployee.FirstName = employee.FirstName;
                updateEmployee.LastName = employee.LastName;
                updateEmployee.IdNumber = employee.IdNumber;
                updateEmployee.Gender = employee.Gender;
                updateEmployee.EmploymentStartDate = employee.EmploymentStartDate;
                updateEmployee.DateOfBirth = employee.DateOfBirth;
                updateEmployee.IsActive = employee.IsActive;
                updateEmployee.PositionsList = employee.PositionsList;

                await _context.SaveChangesAsync();
            }

            return updateEmployee;
        }


    }
}
