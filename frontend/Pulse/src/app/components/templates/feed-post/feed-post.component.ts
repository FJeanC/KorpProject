import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { Post } from '../../../model/post';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PostService } from '../../../services/posts/post.service';
import { AuthService } from '../../../services/auth.service';
import { UserInfo } from '../../../contracts/userInfo';

@Component({
  selector: 'app-feed-post',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatButtonModule, MatProgressBarModule, CommonModule, MatIconModule],
  templateUrl: './feed-post.component.html',
  styleUrl: './feed-post.component.css'
})
export class FeedPostComponent {
  userId!: number;
  userInfo? : UserInfo | null;
  @Input() post!: Post;
  @Output() deletePost  = new EventEmitter<{ postId: number, userId: number }>();

  constructor(private postService : PostService, private authService : AuthService) { 
  }

  onDeletePost(postId: number): void {
    const userId = this.userId;
    this.deletePost.emit({ postId, userId });
  }

  ngOnInit(): void {
    this.userInfo = this.authService.getUserInfo()
    this.userId = this.userInfo!.id
  }

  likePost(post: Post): void {
    this.postService.likePost(post.id, this.userId ).subscribe({
      next: (number : number) => {
        post.likes = number;
      },
      error: () => {
        alert('Erro ao curtir o post:');
      }
    });
  }
}
