using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Entities
{

    public enum PositionName
    {
        SoftwareEngineer,
        DataAnalyst,
        GraphicDesigner,
        MarketingManager,
        SalesRepresentative,
        HumanResourcesManager,
        FinancialAnalyst,
        CustomerServiceRepresentative,
        OperationsManager,
        ProjectManager,
        ProductManager,
        Accountant,
        Lawyer,
        Nurse,
        Doctor,
        Teacher,
        Architect,
        Electrician,
        Plumber,
        Chef,
        Journalist,
        Photographer,
        InteriorDesigner
    }

    public class Position
    {
        static int count = 0;

        public int Code { get; }
        public PositionName Name { get; set; }

        public Position()
        {
            Code = count++;
        }
    }

    
}
