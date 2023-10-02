import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CreateOrderReturnData } from '../interfaces/create-order-return-data';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  createOrder(userType: string, userId: number, planType: string): Observable<CreateOrderReturnData> {
    return this.http.post<CreateOrderReturnData>(environment.END_POINT+"/payment/order", {
      userType,
      userId,
      planType
    })
  }
}
