using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PulseAPI.Contracts;
using PulseAPI.Data;
using PulseAPI.DTO;
using PulseAPI.Models;
using PulseAPI.Service;

namespace PulseAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IUserService _userService;
        public UserController(IUserService context)
        {
            _userService = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            return await _userService.GetUsers();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            return await _userService.GetUser(id);
        }

        [HttpPost]
        public async Task<ActionResult<User>> CreateUser(User user)
        {
            return await _userService.CreateUser(user);
        }

        [HttpPut]
        public async Task<ActionResult<User>> UpdateUser([FromBody] AboutMeDTO aboutMe)
        {
            return await _userService.UpdateUser(aboutMe);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteUser(int id)
        {
            return await _userService.DeleteUser(id);
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> LoginUser([FromBody] UserLoginDTO userLoginDTO)
        {
            return await _userService.LoginUser(userLoginDTO);
        }
    }
}
