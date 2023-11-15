import {Component, OnDestroy, OnInit} from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit ,OnDestroy {
  isAuthenticated: boolean = false;
  iconProfile = faUserCircle;
  private authSubscription: Subscription | null = null;


  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.isAuthenticated = this.userService.isUserAuthenticated();
    this.authSubscription = this.userService.authenticationChanged.subscribe((isAuthenticated: boolean) => {
      this.isAuthenticated = isAuthenticated;
    });
    this.userService.authenticationChanged.next(this.isAuthenticated);
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  goToProfileOrLogin() {
    if (this.isAuthenticated) {
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  canAddPost(): boolean {
    return this.isAuthenticated;
  }

  goToAddPost() {
    this.router.navigate(['/add-post']);
  }
  goToLogin() {
    if (this.isAuthenticated) {
      this.userService.setUserLoggedOut();
      this.isAuthenticated = false;
    }
    this.router.navigate(['/login']);
  }
}
