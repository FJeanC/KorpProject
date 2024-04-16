import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { PostService } from '../../../services/posts/post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDividerModule, FormsModule ],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent {
  userId!: number;
  newPostContent: string = "";
  constructor(private postService: PostService) { }

  postNewPost(): void {
    if (this.newPostContent.trim()) {
      const userInfo = localStorage.getItem('userInfo');
      if(userInfo) {
        const { id } = JSON.parse(userInfo);
        this.userId = id 
      }
      const newPost = {
        userId : this.userId,
        content: this.newPostContent,
      }
      this.postService.createPost(newPost).subscribe({
        next: () => {
          this.newPostContent = '';
          console.log('Post feito com sucesso')
        },
        error: () => {
          alert('Dados do Post são inválido. Posts válidos tem entre 2 a 256 caracteres.')
        }
      });
    }
  }
}
