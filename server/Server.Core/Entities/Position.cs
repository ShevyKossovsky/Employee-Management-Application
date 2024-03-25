using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Entities
{

    //public enum PositionName
    //{
    //    SoftwareEngineer,
    //    DataAnalyst,
    //    GraphicDesigner,
    //    MarketingManager,
    //    SalesRepresentative,
    //    HumanResourcesManager,
    //    FinancialAnalyst,
    //    CustomerServiceRepresentative,
    //    OperationsManager,
    //    ProjectManager,
    //    ProductManager,
    //    Accountant,
    //    Lawyer,
    //    Nurse,
    //    Doctor,
    //    Teacher,
    //    Architect,
    //    Electrician,
    //    Plumber,
    //    Chef,
    //    Journalist,
    //    Photographer,
    //    InteriorDesigner
    //}

    public class Position
    {
        public int Id { get; set; }

       // public PositionName Name { get; set; }
        public string Name { get; set; }
    
    }


}
