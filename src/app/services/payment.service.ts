import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CreateOrderReturnData } from '../interfaces/create-order-return-data';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  createOrder(userType: string, userId: number, planType: string): Observable<CreateOrderReturnData> {
    return this.http.post<CreateOrderReturnData>("http://127.0.0.1:3000/api/payment/order", {
      userType,
      userId,
      planType
    })
  }
}
