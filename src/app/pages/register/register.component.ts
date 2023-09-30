import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  onInputChange(otp:string){
    console.log(otp);
  }

  submitRgForm(){
    this.submitBtnIsLoading = true;
    setTimeout(() => {this.submitBtnIsLoading = false},3000);
    console.log(this.registration_form.value);
    
  }
}
