import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';

import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment.development';

const routes: Routes = [
  { path: '', component: LoginComponent }
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatMenuModule,

    RouterModule.forChild(routes)
  ]
})
export class LoginModule {
  constructor(){
    if(!environment.production) console.log("Login Module Loaded!");
  }
 }
