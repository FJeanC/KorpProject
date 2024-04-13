import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

FormsModule

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: User = {
    name: '',
    email: '',
    password: ''
  };
  constructor(private userService: UserService, private router: Router) { }

  registerUser(): void {
    this.userService.createUser(this.user).subscribe({
      next: () => {
        console.log('Usuário registrado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.user = { name: '', email: '', password: '' };
        console.error('Erro ao registrar usuário:', error);
      }
    });
  }
}
