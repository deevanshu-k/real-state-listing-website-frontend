import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Token } from '../interfaces/token';
import { LoginSuccessData } from '../interfaces/login-success-data';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogin:Subject<boolean> = new Subject();

  constructor(private http:HttpClient) { }

  getAuthToken():string {
    return String(localStorage.getItem('token'));
  }

  tenantLogin(email:string,password:string):Observable<LoginSuccessData>{
    return this.http.post<LoginSuccessData>(environment.END_POINT+"/login/tenant",{
      email,
      password
    });
  }
  landlordLogin(email:string,password:string):Observable<LoginSuccessData>{
    return this.http.post<LoginSuccessData>(environment.END_POINT+"/login/landlord",{
      email,
      password
    });
  }

  setUserLogin(loginedData:LoginSuccessData){
    localStorage.setItem("token",loginedData.data.jwtToken);
    localStorage.setItem("role",loginedData.data.role);
    this.isLogin.next(true);
  }

  removeUserLogin(){
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    this.isLogin.next(false);
  }

  isTokenExpired(): boolean {
    let token = localStorage.getItem("token");
    if(!token) return true;
    let tokenData = this.getDecodedToken(token);
    if (Number(tokenData.exp*1000) > (new Date()).getTime()) {
      return false;
    }
    else {
      return true;
    }
  }

  getDecodedToken(token: string): Token {
    return jwt_decode(token);
  }

  getRole(): string {
    let token = this.getDecodedToken(String(localStorage.getItem('token')));
    return token.role;
  }

}
