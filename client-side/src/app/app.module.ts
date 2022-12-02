import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransferComponent } from './transfer/transfer.component';
import { SettingsComponent } from './settings/settings.component';
import { HeaderComponent } from './header/header.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FooterComponent } from './pages/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { LandingComponent } from './landing/landing.component';
import { LandingNavComponent } from './pages/landing-nav/landing-nav.component';
import { CheckUserPipe } from './pipes/check-user.pipe';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ErrorPageComponent,
    SidenavComponent,
    DashboardComponent,
    TransferComponent,
    SettingsComponent,
    HeaderComponent,
    UserProfileComponent,
    FooterComponent,
    StatisticsComponent,
    LandingComponent,
    LandingNavComponent,
    CheckUserPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
