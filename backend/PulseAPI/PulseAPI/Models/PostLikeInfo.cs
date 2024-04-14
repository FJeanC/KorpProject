﻿namespace PulseAPI.Models
{
    public class PostLikeInfo
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int PostId { get; set; }
        public bool IsLiked { get; set; }
        public User User { get; set; }
        public Post Post { get; set; }
    }
}
