using Microsoft.EntityFrameworkCore;
using Server.Core.Entities;
using Server.Core.Repositories;
using Server.Core.Services;
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
        private readonly IPositionService _positionService; 


        public EmployeeRepository(DataContext context, IPositionService positionService)
        {
            _positionService = positionService;
            _context = context;
        }

        public async Task<List<Employee>> GetEmployeeAsync()
        {
            return await _context.EmployeesList
                                 .Include(e => e.PositionsList)
                                     .ThenInclude(p => p.Position)
                                 .Where(e => e.IsActive)
                                 .ToListAsync();
        }

        public async Task<Employee> GetByIdAsync(int id)
        {
            return await _context.EmployeesList
                                 .Include(e => e.PositionsList)
                                     .ThenInclude(p => p.Position)
                                 .FirstOrDefaultAsync(e => e.Id == id && e.IsActive);
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
            var updateEmployee = await _context.EmployeesList
                .Include(e => e.PositionsList)
                .FirstOrDefaultAsync(e => e.Id == id);

            if (!(updateEmployee == null || updateEmployee.IsActive == false))
            {
                updateEmployee.FirstName = employee.FirstName;
                updateEmployee.LastName = employee.LastName;
                updateEmployee.IdNumber = employee.IdNumber;
                updateEmployee.Gender = employee.Gender;
                updateEmployee.EmploymentStartDate = employee.EmploymentStartDate;
                updateEmployee.DateOfBirth = employee.DateOfBirth;
                updateEmployee.IsActive = employee.IsActive;

                // נקה את רשימת התפקידים הקיימת והוסף מחדש
                updateEmployee.PositionsList.Clear();

                foreach (var newPosition in employee.PositionsList)
                {
                    var position = await _positionService.GetPositionByIdAsync(newPosition.PositionId);
                    if (position != null)
                    {
                        updateEmployee.PositionsList.Add(new EmployeePosition
                        {
                            Position = position,
                            IsManagement = newPosition.IsManagement,
                            EntryDate = newPosition.EntryDate
                        });
                    }
                }

                // שמירת השינויים בבסיס הנתונים
                await _context.SaveChangesAsync();
            }

            return updateEmployee;
        }


    }
}
