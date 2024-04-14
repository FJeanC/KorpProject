import { Component, Input } from '@angular/core';
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

  constructor(private postService : PostService, private authService : AuthService) { 
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
      error: (error) => {
        console.error('Erro ao curtir o post:', error);
      }
    });
  }

  deletePost(post: Post): void {
    this.postService.deletePost(post.id, this.userId).subscribe({
      next: (result) => {
        console.log("Post foi deletado. Id: ", post.id, 'User: ', this.userId)
      },
      error: (error) => {
        console.error('Erro ao deletar o post:', error);
      }
    });
  }
}
