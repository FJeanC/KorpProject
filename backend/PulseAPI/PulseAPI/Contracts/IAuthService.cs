using Microsoft.AspNetCore.Mvc;
using PulseAPI.DTO;
using PulseAPI.Models;

namespace PulseAPI.Contracts
{
    public interface IAuthService
    {
        Task<ActionResult<User>> AuthenticateUser(UserLoginDTO userLoginDTO);
        bool EmailIsValid(string email);
        bool PasswordIsValid(string password);
    }
    
}
