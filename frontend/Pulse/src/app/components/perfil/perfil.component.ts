import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from '../templates/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Post } from '../../model/post';
import { PostService } from '../../services/posts/post.service';
import { FeedPostComponent } from '../templates/feed-post/feed-post.component';
import { AuthService } from '../../services/auth.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { AboutMeInfo } from '../../contracts/aboutMeInfo';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FeedPostComponent, MatIconModule, MatFormField, MatLabel, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  userName!: string;
  userEmail!: string;
  aboutMe!: string;
  userId!: number;
  posts: Post[] = [];
  editingAboutMe: boolean = false;
  
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
      },
      error: () => {
        alert('Erro ao carregar posts do usuário:')
      }
    })   
  }

  startEditing() {
    this.editingAboutMe = true; 
  }

  saveAboutMeChanges() {
    const aboutMeInfo: AboutMeInfo = {
      userId: this.userId, 
      aboutMe: this.aboutMe
    };
    this.userService.updateUser(aboutMeInfo).subscribe({
      next : (user) => {
        this.aboutMe = user.aboutMe!
        this.editingAboutMe = false;
      },
      error: () => {
        alert('Erro ao salvar alterações no about me:')
      }
    })
  }
}
