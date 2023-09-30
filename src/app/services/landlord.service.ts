import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RegisterSuccessData } from '../interfaces/register-success-data';

@Injectable({
  providedIn: 'root'
})
export class LandlordService {

  constructor(private http: HttpClient) { }

  landlordRegister(username: string, email: string, password: string, address: string): Observable<RegisterSuccessData> {
    return this.http.post<RegisterSuccessData>("http://127.0.0.1:3000/api/register/landlord", {
      username,
      email,
      password,
      address
    });
  }
}
