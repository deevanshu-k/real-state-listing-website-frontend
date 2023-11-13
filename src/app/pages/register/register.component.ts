import { Component,ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterSuccessData } from 'src/app/interfaces/register-success-data';
import { LandlordService } from 'src/app/services/landlord.service';
import { OtpService } from 'src/app/services/otp.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TenantService } from 'src/app/services/tenant.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  account_type: "TENANT"|"LANDLORD"|"" = "";
  verify_otp: boolean = false;
  submitBtnIsLoading:boolean = false;
  email:string = "xyz@gmail.com";
  otp = new FormControl("",[Validators.required,Validators.minLength(4),Validators.maxLength(4)]);
  @ViewChild('ngOtpInput') ngOtpInputRef:any;

  registration_form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone_no: new FormControl('', [Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10), Validators.maxLength(10)])
  });

  constructor(
    private _snackbarService:SnackbarService,
    private _tenantService:TenantService,
    private _landlordService:LandlordService,
    private _otpService:OtpService,
    private _router:Router
  ){}

  submitRgForm(){
    this.submitBtnIsLoading = true;
    if (this.registration_form.valid && this.account_type && this.registration_form.controls.name.value && this.registration_form.controls.email.value && this.registration_form.controls.password.value && this.registration_form.controls.address.value && this.registration_form.controls.phone_no.value) {
      if (this.account_type == "TENANT") {
        this._tenantService.tenantRegister(this.registration_form.controls.name.value,this.registration_form.controls.email.value,this.registration_form.controls.password.value,this.registration_form.controls.address.value,this.registration_form.controls.phone_no.value).subscribe({
          next: (data: RegisterSuccessData) => {
            this._snackbarService.openSnackBar(data.message, "OK", "end", "bottom", 3000);
            this.email = data.data.email;
            this.submitBtnIsLoading = false;
            this.verify_otp = true;
          },
          error: (error: { error: { code: number, message: string } }) => {
            this.registration_form.reset();
            this.account_type = "";
            this.submitBtnIsLoading = false;
            this._snackbarService.openSnackBar(error.error.message, "OK", "end", "bottom", 3000);
          }
        });
      }
      else {
        this._landlordService.landlordRegister(this.registration_form.controls.name.value,this.registration_form.controls.email.value,this.registration_form.controls.password.value,this.registration_form.controls.address.value,this.registration_form.controls.phone_no.value).subscribe({
          next: (data: RegisterSuccessData) => {
            this._snackbarService.openSnackBar(data.message, "OK", "end", "bottom", 3000);
            this.email = data.data.email;
            this.submitBtnIsLoading = false;
            this.verify_otp = true;
          },
          error: (error: { error: { code: number, message: string } }) => {
            this.registration_form.reset();
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

  verifyEmail(){
    if(!(Number(this.otp.value))){
      this.ngOtpInputRef.setValue("");
      this._snackbarService.openSnackBar("Enter valid OTP !", "OK", "end", "bottom", 3000);
      return;
    }
    this.submitBtnIsLoading = true;
    this.ngOtpInputRef.otpForm.disable();
    
    if(this.otp.valid && (this.account_type == "TENANT" || this.account_type == "LANDLORD")){
      this._otpService.verifyRegisteredOtp(this.email,Number(this.otp.value),this.account_type).subscribe({
        next: (data) => {
          this._snackbarService.openSnackBar(data.message, "OK", "end", "bottom", 3000);
          this._router.navigate(["/login"]);
        },
        error: (error: { error: { code: number, message: string } }) => {
          this._snackbarService.openSnackBar(error.error.message, "OK", "end", "bottom", 3000);
          this.ngOtpInputRef.setValue("");
          this.ngOtpInputRef.otpForm.enable();
          this.submitBtnIsLoading = false;
        }
      });
    }
  }
}
