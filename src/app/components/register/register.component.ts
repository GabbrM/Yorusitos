import { Component } from '@angular/core';
import { UserService } from "../../services/user.service";
import { User } from "../../models/posts.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = {
    username: '',
    name: '',
    email: '',
    password: ''
  };

  constructor(private userService: UserService, private router: Router) {}

  registerUser() {
    this.userService.registerUser(this.user).subscribe(
      (response: any) => {
        console.log('Registro exitoso:', response);
        // Redirige al usuario a la página de login
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.error('Error en el registro:', error);
        // Maneja los errores del registro aquí
      }
    );
  }
}
