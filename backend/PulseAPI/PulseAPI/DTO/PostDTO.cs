using System.ComponentModel.DataAnnotations.Schema;

namespace PulseAPI.DTO
{
    public class PostDTO
    {
        public required int UserId { get; set; }
        public required string Content { get; set; }
    }
}
