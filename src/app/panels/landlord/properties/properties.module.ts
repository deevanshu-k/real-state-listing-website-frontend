import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PropertiesComponent } from './properties.component';
import { AddPropertiesComponent } from './components/add-properties/add-properties.component';
import { AddPropertyImageComponent } from './components/add-property-image/add-property-image.component';
import { PropertyTableComponent } from './components/property-table/property-table.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { environment } from 'src/environments/environment.development';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPhotoEditorModule } from 'ngx-photo-editor';

const routes: Routes = [
  { path: "", component: PropertiesComponent },
  { path: "add", component: AddPropertiesComponent },
  { path: "addimages/:propertyId", component: AddPropertyImageComponent }
];

@NgModule({
  declarations: [
    PropertiesComponent,
    AddPropertiesComponent,
    AddPropertyImageComponent,
    PropertyTableComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    NgxPhotoEditorModule,
    RouterModule.forChild(routes)
  ]
})
export class PropertiesModule {
  constructor() {
    if (!environment.production) console.log("Properties Module Loaded !");
  }
 }
