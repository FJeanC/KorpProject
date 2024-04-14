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
import { AuthService } from '../../services/auth.service';

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
  aboutMe!: string;
  userId!: number;
  posts: Post[] = [];
  
  constructor(private postService: PostService, private authService: AuthService, private userService: UserService) { }
  ngOnInit(): void {
    const userInfo = this.authService.getUserInfo();
    this.userId = userInfo!.id;
    this.userService.getUser(this.userId).subscribe({
      next: (user) => {
        this.userName = user.name;
        this.userEmail = user.email;
        this.aboutMe = user.aboutMe!;
      }
    })

    this.postService.getPostsByUser(this.userId).subscribe({
      next: (post) => {
        this.posts = post
        console.log(post)
      },
      error: (error) => {}
    })   
  }
}
