import {Component, Input } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { Post } from '../../../model/post';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PostService } from '../../../services/posts/post.service';

@Component({
  selector: 'app-feed-post',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatButtonModule, MatProgressBarModule, CommonModule, MatIconModule],
  templateUrl: './feed-post.component.html',
  styleUrl: './feed-post.component.css'
})
export class FeedPostComponent {
  userId!: number;
  @Input() post!: Post;

  constructor(private postService : PostService) { }

  likePost(post: Post): void {
    const userInfo = localStorage.getItem('userInfo');
    if(userInfo) {
      const { name, email, id } = JSON.parse(userInfo);
      this.userId = id;
    }
    this.postService.likePost(post.id, this.userId ?? post.user.id ).subscribe({
      next: (number : number) => {
        post.likes = number;
      },
      error: (error) => {
        console.error('Erro ao curtir o post:', error);
      }
    });
  }
}
