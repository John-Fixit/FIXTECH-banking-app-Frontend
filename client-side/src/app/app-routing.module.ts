import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SettingsComponent } from './settings/settings.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: "register", component: SignupComponent, title: 'Register'},
  {path: "login", component: LoginComponent, title: 'Login'},
  {path: 'home', children: [
    {path: 'dashboard', component: DashboardComponent, title: 'Dashboard'},
    {path: 'setting', component: SettingsComponent, title: 'Setting'},
  ]},

  {path: "**", component: ErrorPageComponent, title: "Page Not Found"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
