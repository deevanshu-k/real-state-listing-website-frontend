import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PagesComponent } from './pages/pages.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { FooterComponent } from './pages/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NgOtpInputModule } from  'ng-otp-input';


import { FindRoomsComponent } from './pages/find-rooms/find-rooms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    HomeComponent,
    AboutUsComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ContactUsComponent,
    FooterComponent,
    FindRoomsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    MatMenuModule,
    MatSnackBarModule,
    NgOtpInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
