import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: "register", component: SignupComponent, title: 'Register'},
  {path: "login", component: LoginComponent, title: 'Login'},
  {path: 'home', children: [
    {path: '', component: HomeComponent, title: 'Dashboard'}
  ]}

  // {path: "**", component: }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
