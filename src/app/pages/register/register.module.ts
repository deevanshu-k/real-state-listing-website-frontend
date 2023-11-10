import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RouterModule, Routes } from '@angular/router';

import { MatMenuModule } from '@angular/material/menu';
import { NgOtpInputModule } from 'ng-otp-input';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment.development';


const routes: Routes = [
  { path: '', component: RegisterComponent }
];

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatMenuModule,
    NgOtpInputModule,

    RouterModule.forChild(routes)
  ]
})
export class RegisterModule {
  constructor(){
    if(!environment.production) console.log("Register Module Loaded!");
  }
 }
