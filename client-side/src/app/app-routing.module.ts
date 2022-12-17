import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMoneyComponent } from './add-money/add-money.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { SignupComponent } from './signup/signup.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { TransferComponent } from './transfer/transfer.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {path: "", component: LandingComponent, title: "FIXTECH"},
  {path: "register", component: SignupComponent, title: 'Register'},
  {path: "login", component: LoginComponent, title: 'Login'},
  {path: 'home', children: [
    {path: 'dashboard', component: DashboardComponent, title: 'Dashboard'},
    {path: 'transfer', component: TransferComponent, title: 'Transfer Money'},
    {path: 'add_money', component: AddMoneyComponent, title: 'Add Money'},
    {path: 'transaction_history', component: TransactionHistoryComponent, title: 'Transaction History'},
    {path: 'profile/:id', component: UserProfileComponent, title: 'Profile'},
    {path: 'setting', component: SettingsComponent, title: 'Profile Setting'},
  ]},
 
  {path: "**", component: ErrorPageComponent, title: "Page Not Found"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
