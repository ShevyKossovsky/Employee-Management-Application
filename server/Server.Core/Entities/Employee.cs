using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Entities
{
    public enum Gender
    {
        Male,
        Female
    
    }
    public class Employee
    {
        static int count = 0;

        public int Code { get;  }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string IdNumber { get; set; }

        public Gender Gender { get; set; } 

        public DateTime EmploymentStartDate { get; set; }

        public DateTime DateOfBirth { get; set; }

        public bool IsActive { get; set; }


        public List<Position> PositionsList { get; set; }

        public Employee()
        {
            this.Code = count++;
        }
    }
}
