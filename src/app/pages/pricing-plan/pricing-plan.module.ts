import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingPlanComponent } from './pricing-plan.component';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { GetInTouchButtonFooterComponent } from '../components/get-in-touch-button-footer/get-in-touch-button-footer.component';

const routes: Routes = [
  { path: '', component: PricingPlanComponent }
];

@NgModule({
  declarations: [
    PricingPlanComponent
  ],
  imports: [
    CommonModule,
    FooterComponent,
    GetInTouchButtonFooterComponent,
    RouterModule.forChild(routes)
  ]
})
export class PricingPlanModule { }
