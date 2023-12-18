import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordService } from 'src/app/services/password.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  resettoken: string = "";
  email: string = "";

  newpswd: string = "";
  confirmpswd: string = "";

  // Btn Loading
  changebtnloading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private passwordService: PasswordService,
    private snackBarService: SnackbarService,
    private authService: AuthService,
  ) {
    this.route.queryParams.subscribe(params => {
      this.resettoken = params['token'];
    });
  }

  resetPswd() {
    if (this.newpswd != this.confirmpswd) {
      this.snackBarService.openSnackBar("Incorrect confirm password !", "OK", "center", "bottom", 2000);
      this.newpswd = "";
      this.confirmpswd = "";
      return;
    }
    this.changebtnloading = true;
    this.passwordService.resetPassword(this.resettoken, this.newpswd).subscribe({
      next: (d) => {
        this.snackBarService.openSnackBar(d.message, "OK", "end", "bottom", 3000);
        this.authService.removeUserLogin();
        this.router.navigate(["/login"]);
      },
      error: (error) => {
        this.snackBarService.openSnackBar(error.error.message, "OK", "end", "bottom", 3000);
        this.router.navigate(["/home"]);
      }
    });
  }
}
