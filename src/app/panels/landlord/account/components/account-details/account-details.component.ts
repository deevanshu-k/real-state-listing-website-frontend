import { Component } from '@angular/core';
import { Token } from 'src/app/interfaces/token';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent {
  imgUrl: string = '/assets/no_profile_image.svg';
  editmode: boolean = false;

  username?: string;
  useremail?: string;
  userphoneno?: string;
  useraddress?: string;

  userdetails?: User;


  constructor(
    private authService: AuthService,
    private userService: UserService,
    private _snackbarService: SnackbarService
  ) {
    let url = this.authService.getProfileImage();
    if (url) this.imgUrl = url + "?nocache=" + Date.now();
    this.userService.getUserDetails().subscribe({
      next: (data) => {
        this.userdetails = data.data;
        this.username = this.userdetails.username;
        this.useremail = this.userdetails.email;
        this.userphoneno = this.userdetails.phone_no;
        this.useraddress = this.userdetails.address;
      },
      error: (e) => {
        this._snackbarService.openSnackBar(e.error.message, "OK", "end", "bottom", 3000);
      }
    });
  }

  cancelEditMode() {
    this.editmode = false;
  }

}
