using AutoMapper;
using server.Models;
using Server.Core.Entities;

namespace server.Mapping
{
    public class PostModelsMappingProfile : Profile
    {
        public PostModelsMappingProfile()
        {

            CreateMap<EmployeePostModel, Employee>();
         
            CreateMap<EmployeePositionPostModel, EmployeePosition>();

            CreateMap<PositionPostModel, Position>();

        }
    }
}