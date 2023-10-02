import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  constructor(private http: HttpClient) { }

  verifyRegisteredOtp(email: string, otp: number, userType: "TENANT"|"LANDLORD") {
    return this.http.post<{ code: number, message: string }>(environment.END_POINT+"/register/verify", {
      email,
      otp,
      user:userType
    });
  }
}
