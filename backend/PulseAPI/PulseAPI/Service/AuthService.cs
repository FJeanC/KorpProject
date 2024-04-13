using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PulseAPI.Contracts;
using PulseAPI.Data;
using PulseAPI.DTO;
using PulseAPI.Models;
using System.Text.RegularExpressions;
using static System.Net.Mime.MediaTypeNames;

namespace PulseAPI.Service
{
    public class AuthService : IAuthService
    {
        private readonly DataContext _context;
        public const string EmailRegex = @"^[a-zA-Z]{3,}[^@\s]+@[^@\s]+\.[^@\s]+$";
        public AuthService(DataContext context) {
            _context = context;
        }
        public async Task<ActionResult<User>> AuthenticateUser(UserLoginDTO userLoginDTO)
        {
            if (EmailIsValid(userLoginDTO.Email) && PasswordIsValid(userLoginDTO.Password))
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userLoginDTO.Email && u.Password == userLoginDTO.Password);

                if (user == null)
                {
                    return new NotFoundResult();
                }
                return user;
            }
            return new UnauthorizedResult();
        }

        public bool EmailIsValid(string email)
        {
          
            if (string.IsNullOrWhiteSpace(email))
            {
                return false;
            }
            try
            {
                return Regex.IsMatch(email, EmailRegex,
                    RegexOptions.IgnoreCase, TimeSpan.FromMilliseconds(250));
            }
            catch (RegexMatchTimeoutException)
            {
                return false;
            }

        }

        public bool PasswordIsValid(string password)
        {
            if (string.IsNullOrWhiteSpace(password))
            {
                return false;
            }
            if (password.Length >= 8 && password.Length <= 16)
            {
                return Regex.IsMatch(password, "[A-Z]")
                    && Regex.IsMatch(password, "[a-z]")
                    && Regex.IsMatch(password, @"\d")
                    && Regex.IsMatch(password, @"[!-/:-@\[-_{-~]")
                    && !Regex.IsMatch(password, @"[^\dA-Za-z!-/:-@\[-_{-~]");
            }
            return false;
                
        }
    }
}
