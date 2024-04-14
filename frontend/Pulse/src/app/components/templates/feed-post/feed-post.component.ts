import {Component, Input } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { Post } from '../../../model/post';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feed-post',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatButtonModule, MatProgressBarModule, CommonModule],
  templateUrl: './feed-post.component.html',
  styleUrl: './feed-post.component.css'
})
export class FeedPostComponent {
  @Input() post!: Post;

  constructor() { }
}
