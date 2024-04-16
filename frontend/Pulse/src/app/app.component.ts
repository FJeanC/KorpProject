import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from './model/user';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Pulse';

  constructor() {}
}
