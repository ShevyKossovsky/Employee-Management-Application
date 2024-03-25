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
            return await _context.EmployeesList.Include(e => e.PositionsList).ThenInclude(p => p.Position).ToListAsync();
        }

        public async Task<Employee> GetByIdAsync(int id)
        {
            return await _context.EmployeesList
                                 .Include(e => e.PositionsList)
                                     .ThenInclude(p => p.Position).FirstOrDefaultAsync(e => e.Id == id);
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

        // בריפוזיטורי
        public async Task<Employee> UpdateEmployeeAsync(int id, Employee employee)
        {
            var updateEmployee = await _context.EmployeesList
                .Include(e => e.PositionsList) // וידוא שנתוני התפקידים יישארו במקומם
                .FirstOrDefaultAsync(e => e.Id == id);

            if (updateEmployee != null)
            {
                // עדכון שדות העובד
                updateEmployee.FirstName = employee.FirstName;
                updateEmployee.LastName = employee.LastName;
                updateEmployee.IdNumber = employee.IdNumber;
                updateEmployee.Gender = employee.Gender;
                updateEmployee.EmploymentStartDate = employee.EmploymentStartDate;
                updateEmployee.DateOfBirth = employee.DateOfBirth;
                updateEmployee.IsActive = employee.IsActive;

                // עדכון רשימת התפקידים
                foreach (var newPosition in employee.PositionsList)
                {
                    var existingPosition = updateEmployee.PositionsList.FirstOrDefault(p => p.Id == newPosition.Id);
                    if (existingPosition != null)
                    {
                        // עדכון התפקיד קיים
                        existingPosition.PositionId = newPosition.PositionId;
                        existingPosition.IsManagement = newPosition.IsManagement;
                        existingPosition.EntryDate = newPosition.EntryDate;
                    }
                    else
                    {
                        // הוספת תפקיד חדש
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
                }

                // שמירת השינויים בבסיס הנתונים
                await _context.SaveChangesAsync();
            }

            return updateEmployee;
        }



    }
}
