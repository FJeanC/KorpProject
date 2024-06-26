import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

FormsModule

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, MatButtonModule],
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
    if (this.validadeUserData()) {
      this.userService.createUser(this.user).subscribe({
        next: () => {
          console.log('Usuário registrado com sucesso!');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.user = { name: '', email: '', password: '' };
          this.errorMessage = 'Ocorreu um erro ao registrar usuário.';
          if (error.status === 400) {
            this.errorMessage = 'Dados de usuário inválidos.';
          } else if (error.status === 409) {
            this.errorMessage = 'Usuário já registrado.';
          }
          else {
            this.errorMessage = "Ocorreu algum erro ao registrar o usuário."
          }
        }
      }); 
    }
    this.user = { name: '', email: '', password: '' };
    this.errorMessage = 'Usuário ou Senha inválidos.';
  }

  validadeUserData() : boolean {
    if (!this.user.email.trim() || !this.user.password.trim()){
      return false;
    }

    if (this.user.email.length < 4) {
      return false;
    }

    if (this.user.password.length < 8 && this.user.password.length > 16){
      return false;
    }

    return true;
  }

  goToLogin() : void {
    this.router.navigate(['/login']);
  }
}
