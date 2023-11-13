import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { FooterComponent } from '../footer/footer.component';
import { GetInTouchButtonFooterComponent } from '../components/get-in-touch-button-footer/get-in-touch-button-footer.component';

const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    FooterComponent,
    GetInTouchButtonFooterComponent,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule {
  constructor() {
    if (!environment.production) console.log("Home Module Loaded!");

  }
}
