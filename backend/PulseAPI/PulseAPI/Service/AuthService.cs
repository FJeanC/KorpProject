using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PulseAPI.Contracts;
using PulseAPI.Data;
using PulseAPI.DTO;
using PulseAPI.Models;

namespace PulseAPI.Service
{
    public class AuthService : IAuthService
    {
        private readonly DataContext _context;

        public AuthService(DataContext context) {
            _context = context;
        }
        public async Task<ActionResult<User>> AuthenticateUser(UserLoginDTO userLoginDTO)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userLoginDTO.Email && u.Password == userLoginDTO.Password);

            if (user == null)
            {
                return new NotFoundResult();
            }
            return user;
        }

        public bool ValidateEmail(string email)
        {
            throw new NotImplementedException();
        }

        public bool ValidatePassword(string password)
        {
            throw new NotImplementedException();
        }
    }
}
