import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  userName!: string;
  userEmail!: string;

  constructor() { }
  ngOnInit(): void {
    const userInfo = localStorage.getItem('userInfo');
    console.log(userInfo)
    if (userInfo) {
      const { name, email } = JSON.parse(userInfo);
      this.userName = name;
      this.userEmail = email;
      console.log('LOG', this.userName, this.userEmail)
    } else {
      console.log('LOG error', this.userName, this.userEmail)
      console.error('Dados do usuário não encontrados no localStorage.');
    }
  }
}
