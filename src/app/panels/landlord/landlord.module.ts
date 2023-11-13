import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandlordRoutingModule } from './landlord-routing.module';
import { LandlordComponent } from './landlord.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { PropertyCardComponent } from './properties/components/property-card/property-card.component';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    LandlordComponent,
    DashboardComponent,
    PropertyCardComponent
  ],
  imports: [
    CommonModule,
    LandlordRoutingModule,
    MatMenuModule,
    MatProgressBarModule
  ]
})
export class LandlordModule { }
