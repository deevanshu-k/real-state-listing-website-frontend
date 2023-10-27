import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  imgUrl: string = 'https://placehold.co/100x100?text=No \nProfile';

  constructor(
    private authService: AuthService,
    private dialogServices: DialogService
  ) {
    let url = authService.getProfileImage();
    if (url) this.imgUrl = url;
  }

  logOut(){
    this.dialogServices.openLogoutDialog();
  }
}
