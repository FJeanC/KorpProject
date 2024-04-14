import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from '../templates/navbar/navbar.component';
import { MainPageComponent } from '../main-page/main-page.component';
import { CommonModule } from '@angular/common';
import { Post } from '../../model/post';
import { PostService } from '../../services/posts/post.service';
import { FeedPostComponent } from '../templates/feed-post/feed-post.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FeedPostComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  userName!: string;
  userEmail!: string;
  userId!: number;
  posts: Post[] = [];
  
  constructor(private postService: PostService) { }
  ngOnInit(): void {
    const userInfo = localStorage.getItem('userInfo');
    console.log(userInfo)
    if (userInfo) {
      const { name, email, id } = JSON.parse(userInfo);
      this.userName = name;
      this.userEmail = email;
      this.userId = id
      console.log('LOG', this.userName, this.userEmail)
    } else {
      console.log('LOG error', this.userName, this.userEmail)
      console.error('Dados do usuário não encontrados no localStorage.');
    }

    this.postService.getPostsByUser(this.userId).subscribe({
      next: (post) => {
        this.posts = post
        console.log(post)
      },
      error: (error) => {}
    }
  )   
  }
}
