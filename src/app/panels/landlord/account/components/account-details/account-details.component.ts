import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  updatebtnloading: boolean = false;

  username?: string;
  useremail?: string;
  userphoneno?: string;
  useraddress?: string;

  userdetails?: User;


  constructor(
    private authService: AuthService,
    private userService: UserService,
    private _snackbarService: SnackbarService,
    private router: Router,
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
    if (!this.userdetails) return;
    this.username = this.userdetails.username;
    this.useremail = this.userdetails.email;
    this.userphoneno = this.userdetails.phone_no;
    this.useraddress = this.userdetails.address;
  }

  updateUserDetails() {
    let data: { username?: string, address?: string, phone_no?: string } = {};
    if (this.username != this.userdetails?.username) data.username = this.username;
    if (this.useraddress != this.userdetails?.address) data.address = this.useraddress;
    if (this.userphoneno != this.userdetails?.phone_no) data.phone_no = this.userphoneno;
    if (Object.keys(data).length <= 0) return;
    this.updatebtnloading = true;

    this.userService.updateUserDetails(data).subscribe({
      next: (d) => {
        this.updatebtnloading = false;
        this._snackbarService.openSnackBar(d.message, "OK", "end", "bottom", 3000);
        this.router.navigate(['/panel/landlord/account']);
      },
      error: (e) => {
        this.updatebtnloading = false;
        this._snackbarService.openSnackBar(e.error.message, "OK", "end", "bottom", 3000);
        this.router.navigate(['/panel/landlord/account']);
      }
    });
  }

}
