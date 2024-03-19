using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.Core.Entities;
using Server.Core.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PositionController : ControllerBase
    {
        private readonly IPositionService _positionService;
        private readonly IMapper _mapper;

        public PositionController(IPositionService positionService, IMapper mapper)
        {
            _positionService = positionService;
            _mapper = mapper;
        }
        // GET: <EmployeeController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _positionService.GetPositionAsync());
        }

        // POST <EmployeeController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Position position)
        {
            return Ok(await _positionService.AddPositionAsync(position));
        }
       

        



    }
}
