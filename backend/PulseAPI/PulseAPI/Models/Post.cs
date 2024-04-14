using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace PulseAPI.Models
{
    public class Post
    {
        public int Id { get; set; }
        [ForeignKey("User")]
        public int UserId { get; set; }
        public User User { get; set; }
        public string Content { get; set; } = String.Empty;
        public DateTime CreatedAt { get; set; }
        public int Likes { get; set; }
       
    }
}
