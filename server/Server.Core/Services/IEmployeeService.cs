﻿using Server.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Services
{
    public interface IEmployeeService
    {

        Task<List<Employee>> GetEmployeeAsync();

        Task<Employee> GetByIdAsync(int code);

        Task<Employee> AddEmployeeAsync(Employee employee);

        Task<Employee> UpdateEmployeeAsync(int code, Employee employee);

        Task DeleteEmployeeAsync(int code);
    }
}
