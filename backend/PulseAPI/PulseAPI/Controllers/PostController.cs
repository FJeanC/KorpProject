using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using PulseAPI.Contracts;
using PulseAPI.Data;
using PulseAPI.DTO;
using PulseAPI.Models;

namespace PulseAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;

        public PostController(IPostService postService)
        {
            _postService = postService;
        }
        [HttpGet]
        public async Task<ActionResult<List<Post>>> GetPosts()
        {
            return await _postService.GetPosts();
        }
        [HttpPost]
        public async Task<ActionResult<Post>> CreatePost([FromBody] PostDTO postDTO)
        {
            return await _postService.CreatePost(postDTO);
        }
        [HttpPut]
        public async Task<ActionResult<Post>> UpdatePost(Post post)
        {
            return await _postService.UpdatePost(post);
        }
        [HttpDelete("{id}/{userId}")]
        public async Task<ActionResult<bool>> DeletePost(int id, int userId)
        {
            return await _postService.DeletePost(id, userId);
        }

        [HttpGet("post/{id}")]
        public async Task<ActionResult<Post>> GetPostById(int id)
        {
            return await _postService.GetPostById(id);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Post>>> GetPostByUser(int id)
        {
            return await _postService.GetPostsByUser(id);
        }

        [HttpPost("like/{postId}/{userId}")]
        public async Task<ActionResult<int>> LikePost(int postId, int userId)
        {
            return await _postService.LikePost(postId, userId);
        }
    }
}
