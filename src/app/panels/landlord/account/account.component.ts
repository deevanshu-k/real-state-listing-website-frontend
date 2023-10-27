import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { NgxCroppedEvent, NgxPhotoEditorService } from "ngx-photo-editor";
import { UploadService } from 'src/app/services/upload.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  output?: NgxCroppedEvent;
  imgUrl: string = 'https://placehold.co/100x100?text=No \nProfile';

  constructor(
    private authService: AuthService,
    private dialogServices: DialogService,
    private ngxPhotoEditorService: NgxPhotoEditorService,
    private uploadServives: UploadService,
    private _snackbarService: SnackbarService,
  ) {
    let url = this.authService.getProfileImage();
    if (url) this.imgUrl = url + "?nocache=" + Date.now();
  }

  logOut() {
    this.dialogServices.openLogoutDialog();
  }

  ProfileImageChangeHandler($event: any) {
    this.ngxPhotoEditorService.open($event, {
      aspectRatio: 1 / 1,
      autoCropArea: 1
    }).subscribe({
      next: (data) => {
        this.output = data;
        if (data.file) this.uploadProfileImage(data.file);
      }
    });
  }

  uploadProfileImage(file: File) {
    let input = new FormData();
    input.append('file', file);
    this.uploadServives.updateProfileImage(input).subscribe({
      next: (res) => {
        this._snackbarService.openSnackBar(res.message, "OK", "end", "bottom", 3000);
      },
      error: (e) => {
        console.log(e);

        this._snackbarService.openSnackBar(e.error.message, "OK", "end", "bottom", 3000);
      }
    });
  }
}
