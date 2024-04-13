import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

FormsModule

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: User = {
    name: '',
    email: '',
    password: ''
  };
  errorMessage : string =  '';
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
        this.errorMessage = 'Ocorreu um erro ao registrar usuário.';
        if (error.status === 400) {
          this.errorMessage = 'Dados de usuário inválidos.';
        } else if (error.status === 409) {
          this. errorMessage = 'Usuário já registrado.';
        }
        else {
          this.errorMessage = "Ocorreu algum erro ao registrar o usuário."
        }
      }
    });
  }
}
