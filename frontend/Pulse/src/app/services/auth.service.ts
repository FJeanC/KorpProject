import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  loginUser(email: string, password: string): Observable<any> {
    const url = `${environment.apiUrl}/User/login`;
    const body = { 'email' : email, 'password' : password };
    console.log(url, body)
    return this.http.post<any>(url, body);
  }
}
