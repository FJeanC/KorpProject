import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { UserInfo } from '../contracts/userInfo';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedUserInfo!: UserInfo;
  constructor(private http: HttpClient) { }

  loginUser(email: string, password: string): Observable<any> {
    const url = `${environment.apiUrl}/User/login`;
    const body = { 'email' : email, 'password' : password };
    console.log(url, body)
    return this.http.post<any>(url, body);
  }

  getUserInfo(): UserInfo | null {
    const userData = localStorage.getItem('userInfo');
    if (userData) {
      const { id, name, email } = JSON.parse(userData);
      const userInfo: UserInfo = { id, name, email };
      return userInfo;
    }
    return null;
  }
}
