using Microsoft.AspNetCore.Mvc;
using PulseAPI.DTO;
using PulseAPI.Models;

namespace PulseAPI.Contracts
{
    public interface IUserService
    {
        Task<ActionResult<List<User>>> GetUsers();
        Task<ActionResult<User>> GetUser(int id);
        Task<ActionResult<User>> CreateUser(User user);
        Task<ActionResult<User>> UpdateUser(AboutMeDTO aboutMeDTO);
        Task<ActionResult<bool>> DeleteUser(int id);
        Task<ActionResult<User>> LoginUser(UserLoginDTO userLoginDTO);
    }
}
