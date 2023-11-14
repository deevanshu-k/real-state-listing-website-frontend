import { Component, OnInit } from '@angular/core';
import { NgxPhotoEditorService } from 'ngx-photo-editor';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UploadService } from 'src/app/services/upload.service';
import { DocumentType, UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'user-documents',
  templateUrl: './update-documents.component.html',
  styleUrls: ['./update-documents.component.css']
})
export class UpdateDocumentsComponent implements OnInit {
  aadhar?: string;
  ebill?: string;

  constructor(
    private snackbarService: SnackbarService,
    private ngxPhotoEditorService: NgxPhotoEditorService,
    private uploadServives: UploadService,
    private userServices: UserService
  ){}

  ngOnInit(): void {
    this.userServices.getUserDocuments().subscribe({
      next: (data) => {
        data.forEach(d => {
          if(d.type == 'aadhar'){
            this.aadhar = d.url+"?nocache=" + Date.now();
          }
          else if(d.type == 'ebill'){
            this.ebill = d.url+"?nocache=" + Date.now();
          }
        })
      },
      error: (error) => {
        this.snackbarService.openSnackBar(error.error.message, "OK", "end", "bottom", 3000);
      }
    });
  }

  DocumentImageAddOrUpdateHandler($event: any, type: 'aadhar'|'ebill') {
    this.ngxPhotoEditorService.open($event, {
      // aspectRatio: 6 / 4,
      autoCropArea: 1
    }).subscribe({
      next: (data) => {
        if (data.file) this.uploadDocumentImage(data.file, type);
      }
    });
  }

  uploadDocumentImage(file: File, type: 'aadhar'|'ebill') {
    let input = new FormData();
    input.append('file', file);
    this.uploadServives.updateDocumentImage( type, input).subscribe({
      next: (res) => {
        if(type == 'aadhar'){
          this.aadhar = res.data.url + "?nocache=" + Date.now(); 
        }
        else if(type == 'ebill'){
          this.ebill = res.data.url + "?nocache=" + Date.now(); 
        }
        this.snackbarService.openSnackBar(res.message, "OK", "end", "bottom", 3000);
      },
      error: (e) => {
        if (!environment.production) console.log(e);
        this.snackbarService.openSnackBar(e.error.message, "OK", "end", "bottom", 3000);
      }
    });
  }
}
