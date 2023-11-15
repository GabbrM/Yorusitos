import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/posts.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = {
    _id: '',
    username: '',
    password: '',
    name: '',
    email: ''
  };

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {

  }

  login() {
    this.userService.loginUser(this.user).subscribe(
      (response: any) => {
        console.log('Inicio de sesión exitoso:', response);
        localStorage.setItem('userID', response.userId); // Establecer el ID del usuario en localStorage
        this.userService.setUserLoggedIn(response.userId);
        this.router.navigate(['/home']);
      },
      (error: any) => {
        console.error('Error en el inicio de sesión:', error);
      }
    );
  }
}
