import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable } from "rxjs";

export interface UploadProfileImageSuccess {
  code: number,
  message: string,
  data: {
    url: string
  }
}

export interface UploadPropertyImageSuccess {
  code: number,
  message: string,
  data: {
    id: number,
    img_url: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  updateProfileImage(input: FormData): Observable<UploadProfileImageSuccess> {
    return this.http.post<UploadProfileImageSuccess>(environment.END_POINT + "/upload/profileimage", input);
  }

  updatePropertyImage(propertyId: string, imageNo: number, input: FormData): Observable<UploadPropertyImageSuccess> {
    return this.http.post<UploadPropertyImageSuccess>(environment.END_POINT + `/upload/propertyImages?propertyId=${propertyId}&imageNo=${imageNo}`, input)
  }
}
