import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RegisterSuccessData } from '../interfaces/register-success-data';
import { environment } from 'src/environments/environment.development';
import { Property } from '../interfaces/property';

export interface CreatePropertyType {
  property_type: string,
  offer_type: string,
  property_name: string,
  district: string,
  zipcode: number,
  remark: string,
  no_of_rooms: number,
  state: string,
  price: number,
  attached_bathroom: boolean,
  attached_kitchen: boolean,
  include_water_price: boolean,
  include_electricity_price: boolean
}

@Injectable({
  providedIn: 'root'
})
export class LandlordService {

  constructor(private http: HttpClient) { }

  landlordRegister(username: string, email: string, password: string, address: string): Observable<RegisterSuccessData> {
    return this.http.post<RegisterSuccessData>(environment.END_POINT + "/register/landlord", {
      username,
      email,
      password,
      address
    });
  }

  getAllProperties(): Observable<{ code: number, data: Property[] }> {
    return this.http.get<{ code: number, data: Property[] }>(environment.END_POINT + "/property");
  }

  createProperty(data: CreatePropertyType): Observable<{ code: number, message: string, data: Property }> {
    return this.http.put<{ code: number, message: string, data: Property }>(environment.END_POINT + "/property", data);
  }
}
