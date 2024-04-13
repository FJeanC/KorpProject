using Microsoft.AspNetCore.Mvc;
using PulseAPI.DTO;
using PulseAPI.Models;

namespace PulseAPI.Contracts
{
    public interface IAuthService
    {
        Task<ActionResult<User>> AuthenticateUser(UserLoginDTO userLoginDTO);
        bool ValidateEmail(string email);
        bool ValidatePassword(string password);
    }
    
}
