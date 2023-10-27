import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandlordRoutingModule } from './landlord-routing.module';
import { LandlordComponent } from './landlord.component';
import { PropertiesComponent } from './properties/properties.component';
import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    LandlordComponent,
    PropertiesComponent,
    AccountComponent,
    DashboardComponent
],
  imports: [
    CommonModule,
    LandlordRoutingModule,
    MatDialogModule
  ]
})
export class LandlordModule { }
