import {Component, Input } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { Post } from '../../../model/post';
import { PostService } from '../../../services/posts/post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../../model/user';


@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDividerModule,FormsModule ],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent {

  newPostContent: string = "";
  constructor(private postService: PostService) { }

  postNewPost(): void {
    if (this.newPostContent.trim()) {
      const newPost = {
        userId : 11,
        content: this.newPostContent,
      }
      console.log(newPost)
      // trocar pra next, error
      this.postService.createPost(newPost).subscribe(() => {
        this.newPostContent = '';
        console.log('Post feito com sucesso')
      });
    }
  }
}
