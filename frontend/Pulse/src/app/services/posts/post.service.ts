import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../model/post';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient)  { }

  public getPosts() : Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiUrl}/Post`);
  }

  public createPost(postDto: any) : Observable<Post> {
    return this.http.post<Post>(`${environment.apiUrl}/Post`, postDto);
  }

  public getPostsByUser(userId : number) : Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiUrl}/Post/${userId}`);
  }

  public likePost(postId : number, userId : number) : Observable<number> {
    return this.http.post<number>(`${environment.apiUrl}/Post/like/${postId}/${userId}`, {});
  }

  public deletePost(postId : number, userId : number): Observable<boolean>{
    return this.http.delete<boolean>(`${environment.apiUrl}/Post/${postId}/${userId}`, {})  
  }

  public updatePost(aboutMe : string) : Observable<Post> {
    return this.http.put<Post>(`${environment.apiUrl}/Post`, aboutMe);
  }
  
}
