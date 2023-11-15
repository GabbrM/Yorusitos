import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {PostFormsComponent} from "./components/post-forms/post-forms.component";

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "", redirectTo: "/home", pathMatch: "full"},
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "profile", component: UserProfileComponent },
  { path: "add-post", component: PostFormsComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
