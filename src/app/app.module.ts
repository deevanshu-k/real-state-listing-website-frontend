import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PagesComponent } from './pages/pages.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { FooterComponent } from './pages/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

import { FindRoomsComponent } from './pages/find-rooms/find-rooms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GetInTouchButtonFooterComponent } from './pages/components/get-in-touch-button-footer/get-in-touch-button-footer.component';
import { environment } from 'src/environments/environment.development';
import { TokenInterceptor } from './interceptors/token-interceptor.service';
import { LogoutComponent } from './services/dialog/logout/logout.component';
import { NgxPhotoEditorModule } from 'ngx-photo-editor';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    AboutUsComponent,
    NavbarComponent,
    ContactUsComponent,
    FindRoomsComponent,
    LogoutComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    FooterComponent,
    GetInTouchButtonFooterComponent,

    MatMenuModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    if (!environment.production) {
      console.log('APP IS IN DEVELOPMENT!');
    }
  }
}
