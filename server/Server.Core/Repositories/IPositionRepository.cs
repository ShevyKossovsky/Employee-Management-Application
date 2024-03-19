using Server.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Repositories
{
    public interface IPositionRepository
    {

        Task<List<Position>> GetPositionAsync();

        Task<Position> AddPositionAsync(Position position);


    }
}
