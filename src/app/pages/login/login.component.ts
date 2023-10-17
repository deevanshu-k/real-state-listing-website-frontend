import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginSuccessData } from 'src/app/interfaces/login-success-data';
import { Token } from 'src/app/interfaces/token';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  submitBtnIsLoading:boolean = false;
  account_type: "TENANT" | "LANDLORD" | "" = "";
  acc_details = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private _authService: AuthService,
    private _snackbarService: SnackbarService,
    private router: Router) {
    if (!this._authService.isTokenExpired()) {
      let tokenData: Token = this._authService.getDecodedToken(String(localStorage.getItem('token')));
      this._snackbarService.openSnackBar(`Already Logged in as ${tokenData.role}`, "OK", 'center', 'bottom', 2000);
      if(tokenData.role == "TENANT"){
        this.router.navigate(['/findrooms']);
      }
      else {
        this.router.navigate(['/panel/landlord/']);
      }
    }
  }

  submit() {
    this.submitBtnIsLoading = true;
    if (this.acc_details.valid && this.account_type && this.acc_details.controls.email.value && this.acc_details.controls.password.value) {
      if (this.account_type == "TENANT") {
        this._authService.tenantLogin(this.acc_details.controls.email.value, this.acc_details.controls.password.value).subscribe({
          next: (data: LoginSuccessData) => {
            this._authService.setUserLogin(data);
            this._snackbarService.openSnackBar(data.message, "OK", "end", "bottom", 3000);
            this.router.navigate(['/findrooms']);
          },
          error: (error: { error: { code: number, message: string } }) => {
            this._authService.removeUserLogin();
            this.acc_details.reset();
            this.account_type = "";
            this.submitBtnIsLoading = false;
            this._snackbarService.openSnackBar(error.error.message, "OK", "end", "bottom", 3000);
          }
        });
      }
      else {
        this._authService.landlordLogin(this.acc_details.controls.email.value, this.acc_details.controls.password.value).subscribe({
          next: (data: LoginSuccessData) => {
            this._authService.setUserLogin(data);
            this._snackbarService.openSnackBar(data.message, "OK", "end", "bottom", 3000);
            this.router.navigate(['/panel/landlord']);
          },
          error: (error: { error: { code: number, message: string } }) => {
            this._authService.removeUserLogin();
            this.acc_details.reset();
            this.account_type = "";
            this.submitBtnIsLoading = false;
            this._snackbarService.openSnackBar(error.error.message, "OK", "end", "bottom", 3000);
          }
        });
      }
    }
    else {
      this.submitBtnIsLoading = false;
      this._snackbarService.openSnackBar("Check all the fields!", "OK", "end", "bottom", 3000);
    }
  }
}
