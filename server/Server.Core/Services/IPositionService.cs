using Server.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Services
{
    public interface IPositionService
    {
        Task<List<Position>> GetPositionAsync();

        Task<Position> AddPositionAsync(Position position);

    }
}
