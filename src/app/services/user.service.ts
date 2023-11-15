import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject, tap} from 'rxjs';
import { User } from '../models/posts.model';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL = environment.baseURL;
  private usersUrl = `${this.baseURL}/api/users`;
  private authenticated: boolean = false;
  private users: User[] = [];

  constructor(private http: HttpClient) {
    this.authenticated = this.checkIfUserIsAuthenticated();
    this.fetchUsers();
  }

  authenticationChanged = new Subject<boolean>(); // Nuevo Subject para detectar cambios en la autenticación

  private checkIfUserIsAuthenticated(): boolean {
    return !!localStorage.getItem('userID');
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  isUserAuthenticated(): boolean {
    return this.authenticated;
  }

  setUserLoggedIn(userId: string) {
    localStorage.setItem('userID', userId);
    this.authenticated = true;
    this.authenticationChanged.next(true); // Emitir un evento de autenticación
  }

  setUserLoggedOut() {
    localStorage.removeItem('userID');
    this.authenticated = false;
    this.authenticationChanged.next(false);

  }

  fetchUsers() {
    this.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      (error: any) => {
        console.error('Error fetching users', error);
      }
    );
  }

  getUsersData(): User[] {
    return this.users;
  }

  loginUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/api/login`, user).pipe(
      tap((response) => {
        if (response.success) {
          this.setUserLoggedIn(response.userId);
        }
      })
    );
  }
  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user);
  }

  getUserById(userId: string): Observable<User> {
    const url = `${this.usersUrl}/${userId}`;
    return this.http.get<User>(url);
  }

}
