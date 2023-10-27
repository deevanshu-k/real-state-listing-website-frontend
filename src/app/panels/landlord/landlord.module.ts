import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandlordRoutingModule } from './landlord-routing.module';
import { LandlordComponent } from './landlord.component';
import { PropertiesComponent } from './properties/properties.component';
import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import {MatDialogModule} from '@angular/material/dialog';
import { PasswordChangeComponent } from './account/components/password-change/password-change.component';
import { AccountDetailsComponent } from './account/components/account-details/account-details.component';
import { PlanDetailsComponent } from './account/components/plan-details/plan-details.component';
import { DocumentsComponent } from './account/components/documents/documents.component';


@NgModule({
  declarations: [
    LandlordComponent,
    PropertiesComponent,
    AccountComponent,
    DashboardComponent,
    PasswordChangeComponent,
    AccountDetailsComponent,
    PlanDetailsComponent,
    DocumentsComponent
],
  imports: [
    CommonModule,
    LandlordRoutingModule,
    MatDialogModule
  ]
})
export class LandlordModule { }
