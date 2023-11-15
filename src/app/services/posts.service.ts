import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { Post, Comment, User } from '../models/posts.model';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  baseURL = environment.baseURL;
  private postsUrl = `${this.baseURL}/api/posts`;
  private commentsUrl = `${this.baseURL}/api/comments`;
  private usersUrl = `${this.baseURL}/api/users`;

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl);
  }

  getCommentsByPostId(postId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.postsUrl}/${postId}/comments`);
  }

  addComment(postId: string, comment: Comment): Observable<Comment> {
    let userId = localStorage.getItem('userID');

    if (userId) {
      comment.userId = userId;
      // Revisa la construcción de la URL aquí, asegurándote de que no haya una doble barra
      return this.http.post<Comment>(`${this.postsUrl}/${postId}/comments`, comment);
    } else {
      return new Observable(observer => {
        observer.error({ message: 'Usuario no autenticado', code: 401 });
        observer.complete();
      });
    }
  }

  addPost(post: Post): Observable<Post> {
      return this.http.post<Post>(this.postsUrl, post);
  }


  getUserNameForComment(comment: Comment): Observable<Comment> {
    return this.http.get<User>(`${this.baseURL}/api/users/${comment.userId}`).pipe(
      map((user: User) => {
        comment.user = user.name; // Asignar el nombre del usuario al comentario
        return comment; // Devolver el comentario con el nombre del usuario agregado
      })
    );
  }


  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/${userId}`);
  }
}
