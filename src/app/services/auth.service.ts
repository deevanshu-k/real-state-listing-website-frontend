import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Token } from '../interfaces/token';
import { LoginSuccessData } from '../interfaces/login-success-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  tenantLogin(email:string,password:string):Observable<LoginSuccessData>{
    return this.http.post<LoginSuccessData>("http://127.0.0.1:3000/api/login/tenant",{
      email,
      password
    });
  }
  landlordLogin(email:string,password:string):Observable<LoginSuccessData>{
    return this.http.post<LoginSuccessData>("http://127.0.0.1:3000/api/login/landlord",{
      email,
      password
    });
  }

  setUserLogin(loginedData:LoginSuccessData){
    localStorage.setItem("token",loginedData.data.jwtToken);
    localStorage.setItem("role",loginedData.data.role);
  }

  removeUserLogin(){
    localStorage.removeItem("token");
    localStorage.removeItem("role");
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

}
