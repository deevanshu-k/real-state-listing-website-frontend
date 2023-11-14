import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateDocumentsComponent } from './update-documents/update-documents.component';



@NgModule({
  declarations: [
    UpdateDocumentsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [UpdateDocumentsComponent]
})
export class DocumentsModule { }
