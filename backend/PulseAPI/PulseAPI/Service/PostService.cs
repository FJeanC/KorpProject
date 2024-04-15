using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using PulseAPI.Constants;
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

            if (string.IsNullOrEmpty(postDTO.Content) ||
                postDTO.Content.Length < PostConstants.MinPostLength || 
                postDTO.Content.Length > PostConstants.MaxPostLength)
            {
                return new BadRequestResult();
            }

            Post post = new Post
            {
                Content = postDTO.Content,
                UserId = postDTO.UserId,
                CreatedAt = DateTime.UtcNow.ToLocalTime(),
                Likes = 0
            };

            _context.Posts.Add(post);
            await _context.SaveChangesAsync();
            return new CreatedAtActionResult(nameof(GetPostById), "Post", new { id = post.Id }, post);
        }

        public async Task<ActionResult<bool>> DeletePost(int id, int userId)
        {
            var dbPost = await _context.Posts.FindAsync(id);
            if (dbPost == null || dbPost.UserId != userId)
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
            var posts = await _context.Posts.OrderByDescending(p => p.CreatedAt).ToListAsync();
            return await LoadUsers(posts);
        }

        public async Task<ActionResult<List<Post>>> GetPostsByUser(int userId)
        {
            var posts = await _context.Posts.Where(p => p.UserId == userId).OrderByDescending(p => p.CreatedAt).ToListAsync();
            return await LoadUsers(posts);
        }
        private async Task<ActionResult<List<Post>>> LoadUsers(List<Post> posts)
        {
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

        public async Task<ActionResult<int>> LikePost(int postId, int userId)
        {
            var post = await _context.Posts.FindAsync(postId);
            var postLikeInfo = await _context.PostLikeInfo.FirstOrDefaultAsync(pl => pl.UserId == userId && pl.PostId == postId);

            if (post == null)
            {
                return new BadRequestResult();
            }

            if (postLikeInfo != null && postLikeInfo.IsLiked)
            {
                post.Likes--;
                postLikeInfo.IsLiked = false;
                if (post.Likes <= 0 )
                {
                    post.Likes = 0;
                }
            }
            else
            {
                if (postLikeInfo == null)
                {
                    var likeInfo = new PostLikeInfo
                    {
                        UserId = userId,
                        PostId = postId,
                        IsLiked = true
                    };
                    _context.PostLikeInfo.Add(likeInfo);
                }
                else
                {
                    postLikeInfo.IsLiked = true;
                }
                post.Likes++;
            }
            await _context.SaveChangesAsync();

            return post.Likes;
        }
    }
}
