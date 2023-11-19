import { Component } from '@angular/core';
import { Token } from 'src/app/interfaces/token';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent {
  username: string = "";
  useremail: string = "";
  imgUrl: string = '/assets/no_profile_image.svg';
  decodedToken?: Token;

  editmode: boolean = false;

  constructor(
    private authService: AuthService
  ){
    let url = this.authService.getProfileImage();
    if (url) this.imgUrl = url + "?nocache=" + Date.now();
    let data = this.authService.getDecodedToken(String(localStorage.getItem('token')));
    this.decodedToken = data;
    this.username = data.username;
    this.useremail = data.email;
  }

}
