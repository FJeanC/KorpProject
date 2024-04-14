using Microsoft.AspNetCore.Mvc;
using PulseAPI.DTO;
using PulseAPI.Models;

namespace PulseAPI.Contracts
{
    public interface IPostService
    {
        Task<ActionResult<List<Post>>> GetPosts();
        Task<ActionResult<Post>> GetPostById(int id);
        Task<ActionResult<Post>> CreatePost(PostDTO postDTO);
        Task<ActionResult<Post>> UpdatePost(Post post);
        Task<ActionResult<bool>> DeletePost(int id);
        Task<ActionResult<List<Post>>> GetPostsByUser(int userId);
        Task<ActionResult> LikePost(int postId, int userId);
    }
}
