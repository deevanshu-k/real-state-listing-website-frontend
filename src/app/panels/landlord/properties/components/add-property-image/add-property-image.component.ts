import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxCroppedEvent, NgxPhotoEditorService } from 'ngx-photo-editor';
import { LandlordService } from 'src/app/services/landlord.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UploadService } from 'src/app/services/upload.service';
import { environment } from 'src/environments/environment';

interface Image {
  id: number,
  url: string
}

@Component({
  selector: 'app-add-property-image',
  templateUrl: './add-property-image.component.html',
  styleUrls: ['./add-property-image.component.css']
})
export class AddPropertyImageComponent implements OnInit {
  propertyId!: string;
  maxId: number = 0;
  images: Image[] = [];
  output?: NgxCroppedEvent;

  // For Image Update
  imageId:number = -1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private landlordServices: LandlordService,
    private snackbarService: SnackbarService,
    private ngxPhotoEditorService: NgxPhotoEditorService,
    private uploadServives: UploadService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.propertyId = String(params.get('propertyId'));
      this.landlordServices.getPropertyById(this.propertyId).subscribe({
        next: data => {
          this.maxId = data.data.images.length;
          this.images = data.data.images.map(d => {
            return { id: d.id, url: d.img_url+"?nocache=" + Date.now() }
          })
        },
        error: error => {
          this.snackbarService.openSnackBar(error.error.message, "Ok", "end", "bottom", 3000);
          this.router.navigate(['/panel/landlord/properties']);
        }
      });
    });
  }

  PropertyImageAddOrUpdateHandler($event: any, imageNo: number) {
    this.ngxPhotoEditorService.open($event, {
      aspectRatio: 1 / 1,
      autoCropArea: 1
    }).subscribe({
      next: (data) => {
        this.output = data;
        if (data.file) this.uploadProfileImage(data.file, imageNo);
      }
    });
  }

  uploadProfileImage(file: File, imageNo: number) {
    let input = new FormData();
    input.append('file', file);
    this.uploadServives.updatePropertyImage(this.propertyId, imageNo, input).subscribe({
      next: (res) => {
        if(imageNo > this.maxId){
          // If Image Add
          this.images.push({
            id: res.data.id,
            url: res.data.img_url+"?nocache=" + Date.now()
          });
        }
        else {
          // If Image Update
          this.images[imageNo-1].url = res.data.img_url+"?nocache=" + Date.now();
        }
        this.maxId = this.images.length;
        this.snackbarService.openSnackBar(res.message, "OK", "end", "bottom", 3000);
      },
      error: (e) => {
        if (!environment.production) console.log(e);
        this.snackbarService.openSnackBar(e.error.message, "OK", "end", "bottom", 3000);
      }
    });
  }
}
