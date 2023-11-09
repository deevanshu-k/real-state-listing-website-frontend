import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandlordRoutingModule } from './landlord-routing.module';
import { LandlordComponent } from './landlord.component';
import { PropertiesComponent } from './properties/properties.component';
import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { MatDialogModule } from '@angular/material/dialog';
import { PasswordChangeComponent } from './account/components/password-change/password-change.component';
import { AccountDetailsComponent } from './account/components/account-details/account-details.component';
import { PlanDetailsComponent } from './account/components/plan-details/plan-details.component';
import { DocumentsComponent } from './account/components/documents/documents.component';
import { AddPropertiesComponent } from './properties/components/add-properties/add-properties.component';
import { AddPropertyImageComponent } from './properties/components/add-property-image/add-property-image.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PropertyTableComponent } from './properties/components/property-table/property-table.component';
import { PropertyCardComponent } from './properties/components/property-card/property-card.component';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    LandlordComponent,
    PropertiesComponent,
    AccountComponent,
    DashboardComponent,
    PasswordChangeComponent,
    AccountDetailsComponent,
    PlanDetailsComponent,
    DocumentsComponent,
    AddPropertiesComponent,
    AddPropertyImageComponent,
    PropertyTableComponent,
    PropertyCardComponent
  ],
  imports: [
    CommonModule,
    LandlordRoutingModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatMenuModule,
    MatProgressBarModule
  ]
})
export class LandlordModule { }
