import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  constructor(private http: HttpClient) { }

  verifyRegisteredOtp(email: string, otp: number, userType: "TENANT"|"LANDLORD") {
    return this.http.post<{ code: number, message: string }>("http://127.0.0.1:3000/api/register/verify", {
      email,
      otp,
      user:userType
    });
  }
}
