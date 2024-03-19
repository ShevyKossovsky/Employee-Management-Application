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
    public class PositionRepository:IPositionRepository
    {

        private readonly DataContext _context;

        public PositionRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Position>> GetPositionAsync()
        {
            return await _context.PositionsList.ToListAsync();
        }


        public async Task<Position> AddPositionAsync(Position position)
        {
            _context.PositionsList.Add(position);
            await _context.SaveChangesAsync();
            return position;
        }
    }
}
