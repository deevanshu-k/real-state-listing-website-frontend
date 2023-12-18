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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPhotoEditorModule } from 'ngx-photo-editor';
import { EditPropertyComponent } from './components/edit-property/edit-property.component';
import { DeletePropertyDialogComponent } from './components/delete-property-dialog/delete-property-dialog.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';

const routes: Routes = [
  { path: "", component: PropertiesComponent },
  { path: "add", component: AddPropertiesComponent },
  { path: "addimages/:propertyId", component: AddPropertyImageComponent },
  { path: "edit/:propertyId", component: EditPropertyComponent }
];

@NgModule({
  declarations: [
    PropertiesComponent,
    AddPropertiesComponent,
    AddPropertyImageComponent,
    PropertyTableComponent,
    EditPropertyComponent,
    DeletePropertyDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    NgxPhotoEditorModule,
    MatSlideToggleModule,
    MatTooltipModule,
    RouterModule.forChild(routes)
  ]
})
export class PropertiesModule {
  constructor() {
    if (!environment.production) console.log("Properties Module Loaded !");
  }
}
