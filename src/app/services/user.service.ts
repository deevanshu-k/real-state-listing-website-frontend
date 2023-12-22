import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable } from "rxjs";
import { User } from '../interfaces/user';

export interface DocumentType {
  id: number,
  type: "aadhar" | "ebill",
  url: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getUserDocuments(): Observable<DocumentType[]> {
    return this.http.get<DocumentType[]>(environment.END_POINT + "/user/documents");
  }

  getUserDetails(): Observable<{ code: number, data: User }> {
    return this.http.get<{ code: number, data: User }>(environment.END_POINT + "/user/details");
  }
}
