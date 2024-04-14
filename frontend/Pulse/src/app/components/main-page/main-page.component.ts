import { Component } from '@angular/core';
import { Post } from '../../model/post';
import { PostService } from '../../services/posts/post.service';
import { FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';
import { NavbarComponent } from "../templates/navbar/navbar.component";
import { FeedPostComponent } from "../templates/feed-post/feed-post.component";
import { NewPostComponent } from "../templates/new-post/new-post.component";

@Component({
    selector: 'app-main-page',
    standalone: true,
    templateUrl: './main-page.component.html',
    styleUrl: './main-page.component.css',
    imports: [CommonModule, NavbarComponent, FeedPostComponent, NewPostComponent]
})
export class MainPageComponent {
  posts: Post[] = [];
  
  constructor(private postService: PostService) { 
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe({
        next: (post) => {
          console.log(post)
          this.posts = post
        },
        error: (error) => {}
      }
    )   
  }

}
