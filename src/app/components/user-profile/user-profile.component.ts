import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { User } from "../../models/posts.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User = {} as User;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }


  loadUserProfile() {
    const userId = localStorage.getItem('userID');
    if (userId) {
      this.userService.getUserById(userId).subscribe(
        (user: User) => {
          console.log(user);
          this.user = user;
        },
        (error) => {
          console.error('Error al obtener el perfil del usuario', error);
        }
      );
    }
  }



  logout() {
    localStorage.removeItem('userID');
    window.location.href = '/login';
  }
}
