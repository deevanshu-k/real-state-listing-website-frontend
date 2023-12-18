import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(
    private http: HttpClient
  ) { }

  requestResetLink(): Observable<{ code: number, message: string }> {
    return this.http.post<{ code: number, message: string }>(environment.END_POINT + "/password/requestpasswordreset", {});
  }

  resetPassword(token: string, password: string): Observable<{ code: number, message: string }> {
    return this.http.post<{ code: number, message: string }>(environment.END_POINT + "/password/resetpassword", {
      token,
      password
    });
  }


}
