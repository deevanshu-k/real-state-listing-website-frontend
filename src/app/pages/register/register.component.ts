import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterSuccessData } from 'src/app/interfaces/register-success-data';
import { LandlordService } from 'src/app/services/landlord.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TenantService } from 'src/app/services/tenant.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  account_type: string = "";
  verify_otp: boolean = false;
  submitBtnIsLoading:boolean = false;
  email:string = "xyz@gmail.com";

  registration_form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required])
  });

  constructor(
    private _snackbarService:SnackbarService,
    private _tenantService:TenantService,
    private _landlordService:LandlordService
  ){}

  onInputChange(otp:string){
    console.log(otp);
  }

  submitRgForm(){
    this.submitBtnIsLoading = true;
    if (this.registration_form.valid && this.account_type && this.registration_form.controls.name.value && this.registration_form.controls.email.value && this.registration_form.controls.password.value && this.registration_form.controls.address.value) {
      if (this.account_type == "TENANT") {
        this._tenantService.tenantRegister(this.registration_form.controls.name.value,this.registration_form.controls.email.value,this.registration_form.controls.password.value,this.registration_form.controls.address.value).subscribe({
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
        this._landlordService.landlordRegister(this.registration_form.controls.name.value,this.registration_form.controls.email.value,this.registration_form.controls.password.value,this.registration_form.controls.address.value).subscribe({
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
}
