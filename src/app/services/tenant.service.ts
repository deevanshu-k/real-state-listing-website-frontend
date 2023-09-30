import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterSuccessData } from '../interfaces/register-success-data';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  constructor(private http: HttpClient) { }

  tenantRegister(username: string, email: string, password: string, address: string): Observable<RegisterSuccessData> {
    return this.http.post<RegisterSuccessData>("http://127.0.0.1:3000/api/register/tenant", {
      username,
      email,
      password,
      address
    });
  }
}
