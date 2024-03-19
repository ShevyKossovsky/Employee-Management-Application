using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Entities
{
    public class EmployeePosition
    {
        static int count = 0;
        public int Code { get; set; }
        public Employee Employee { get; set; }
        public int EmployeeCode { get; set; }
        public Position Position { get; set; }
        public int PositionCode { get; set; }
        public bool IsManagement { get; set; }
        public DateTime EntryDate { get; set; }

        public EmployeePosition()
        {
            Code = count++;
        }

    }
}
