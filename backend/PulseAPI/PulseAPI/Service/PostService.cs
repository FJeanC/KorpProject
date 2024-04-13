using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PulseAPI.Contracts;
using PulseAPI.Data;
using PulseAPI.DTO;
using PulseAPI.Models;

namespace PulseAPI.Service
{
    public class PostService : IPostService
    {
        private readonly DataContext _context;
        public PostService(DataContext context)
        {
            _context = context;
        }
        public async Task<ActionResult<Post>> CreatePost(PostDTO postDTO)
        {
            Post post = new Post
            {
                Content = postDTO.Content,
                UserId = postDTO.UserId,
                CreatedAt = DateTime.UtcNow,
            };

            _context.Posts.Add(post);
            await _context.SaveChangesAsync();
            return new CreatedAtActionResult(nameof(GetPostById), "Post", new { id = post.Id }, post);
        }

        public async Task<ActionResult<bool>> DeletePost(int id)
        {
            var dbPost = await _context.Posts.FindAsync(id);
            if (dbPost == null)
            {
                return new BadRequestResult();
            }
            _context.Posts.Remove(dbPost);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<ActionResult<Post>> GetPostById(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null)
            {
                return new NotFoundResult();
            }
            return post;
        }

        public async Task<ActionResult<List<Post>>> GetPosts()
        {
            var posts = await _context.Posts.ToListAsync();
            var postsWithUsers = new List<Post>();

            foreach (var post in posts)
            {
                var user = await _context.Users.FindAsync(post.UserId);
                if (user == null)
                {
                    return new NotFoundResult();
                }
                post.User = user;
                postsWithUsers.Add(post);
            }
            return postsWithUsers;
        }

        public async Task<ActionResult<Post>> UpdatePost(Post post)
        {
            var dbPost = await _context.Posts.FindAsync(post.Id);
            if (dbPost == null)
            {
                return new BadRequestResult();
            }
            dbPost.Content = post.Content;

            await _context.SaveChangesAsync();
            return new OkObjectResult(await GetPosts());
        }
    }
}
