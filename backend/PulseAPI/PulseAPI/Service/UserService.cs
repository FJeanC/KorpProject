using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using PulseAPI.Contracts;
using PulseAPI.Data;
using PulseAPI.DTO;
using PulseAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace PulseAPI.Service
{
    public class UserService : IUserService
    {
        private readonly DataContext _context;

        public UserService(DataContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<List<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return new NotFoundResult();
            }

            return user;
        }

        public async Task<ActionResult<User>> CreateUser(User user)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(user.Name) ||
                string.IsNullOrWhiteSpace(user.Email))
                {
                    throw new ValidationException("Name and Email are required fields.");
                }
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
            }
            catch (ValidationException)
            {
                throw;
            } 
            // mudar isso

            return user;
            //return new CreatedAtActionResult(nameof(GetUser), "User", new { id = user.Id }, user);
        }

        public async Task<ActionResult<User>> UpdateUser(User user)
        {
            var dbUser = await _context.Users.FindAsync(user.Id);
            if (dbUser == null)
            {
                return new BadRequestResult();
            }
            dbUser.Name = user.Name;
            dbUser.Email = user.Email;

            await _context.SaveChangesAsync();
            return dbUser;
        }

        public async Task<ActionResult<bool>> DeleteUser(int id)
        {
            var dbUser = await _context.Users.FindAsync(id);
            if (dbUser == null)
            {
                return new BadRequestResult();
            }
            _context.Users.Remove(dbUser);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<ActionResult<User>> LoginUser(UserLoginDTO userLoginDTO)
        {
            var authService = new AuthService(_context);
            return await authService.AuthenticateUser(userLoginDTO);
        }
    }
}
