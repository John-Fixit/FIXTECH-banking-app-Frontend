import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { SignupComponent } from './signup/signup.component';
import { TransferComponent } from './transfer/transfer.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {path: "", component: LandingComponent, title: "FICOM"},
  {path: "register", component: SignupComponent, title: 'Register'},
  {path: "login", component: LoginComponent, title: 'Login'},
  {path: 'home', children: [
    {path: '', component: DashboardComponent, title: 'Dashboard'},
    {path: 'transfer', component: TransferComponent, title: 'Transfer Page'},
    {path: 'profile/:id', component: UserProfileComponent, title: 'Profile'},
    {path: 'setting', component: SettingsComponent, title: 'Setting'},
  ]},
 
  {path: "**", component: ErrorPageComponent, title: "Page Not Found"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
