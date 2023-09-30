import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  account_type: string = "";
  verify_otp: boolean = false;
  email:string = "xyz@gmail.com";

  onInputChange(otp:string){
    console.log(otp);
  }
}
