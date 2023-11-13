import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(
    public dialogRef: MatDialogRef<LogoutComponent>,
    private authService: AuthService,
    private router: Router
  ){}

  logout(){
    this.authService.removeUserLogin();
    this.router.navigate(["/login"]);
    this.dialogRef.close();
  }

  cancelLogout(){
    this.dialogRef.close();
  }
}
