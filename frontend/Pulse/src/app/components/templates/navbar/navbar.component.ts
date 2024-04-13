import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isProfilePage: boolean;

  constructor(private router: Router) { 
    this.isProfilePage = this.router.url.includes('/perfil');
  }

  navigateToDestination(): void {
    if (this.isProfilePage) {
      this.router.navigate(['/feed']);
    } else {
      this.router.navigate(['/perfil']);
    }
  }

  logout(): void {
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}
