import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  loginUser(): void {
    const email = this.email;
    const password = this.password;
  
    this.authService.loginUser(email, password).subscribe({
      next: (user) => {
        console.log('Usuário autenticado com sucesso!');
        console.log(user)
        localStorage.setItem('userInfo', JSON.stringify({email: user.email, id: user.id, name: user.name}))
        this.router.navigate(['/feed']);
      },
      error: (error) => {
        // tratar exceções
        console.error('Erro ao autenticar usuário:', error);
      }
    });
  }
}
