import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
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
