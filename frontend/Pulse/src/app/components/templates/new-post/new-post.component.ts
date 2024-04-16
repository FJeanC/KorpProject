import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { PostService } from '../../../services/posts/post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


const MIN_POST_LENGTH = 2;
const MAX_POST_LENGTH = 256;

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

  createNewPost(): void {
    if (this.newPostContent.trim()) {
      if(this.isValidPostContent()) {
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
          },
          error: () => {
            alert('Erro ao criar um novo post.')
          }
        });
      }   
    }
  }

  isValidPostContent(): boolean {
    if (this.newPostContent.trim().length < MIN_POST_LENGTH || this.newPostContent.trim().length > MAX_POST_LENGTH) {
      alert(`O conteúdo do post deve ter entre ${MIN_POST_LENGTH} e ${MAX_POST_LENGTH} caracteres.`);
      this.newPostContent = '';
      return false;
    }
    return true;
  }
}
