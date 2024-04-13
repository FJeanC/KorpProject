import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "User";
  constructor(private http: HttpClient)  { }
  
  public getUsers() : Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/${this.url}`);
  }

  public getUser(userId  : number) : Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/${this.url}/${userId}`);
  }

  public createUser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/${this.url}`, user);
  }
}
