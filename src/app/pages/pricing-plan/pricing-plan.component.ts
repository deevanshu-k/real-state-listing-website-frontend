import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';
import { WindowRefService } from 'src/app/services/window-ref.service';

interface paymentDone {
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string
}

@Component({
  selector: 'app-pricing-plan',
  templateUrl: './pricing-plan.component.html',
  styleUrls: ['./pricing-plan.component.css']
})
export class PricingPlanComponent implements OnInit {
  plans = [""];
  userType:string = "";
  constructor(
    private winRef: WindowRefService,
    private _paymentService: PaymentService,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    let tokenData = this._authService.getDecodedToken(String(localStorage.getItem('token')));
    this.userType = tokenData.role; 
  }

  getPlan(planType: string) {
    let tokenData = this._authService.getDecodedToken(String(localStorage.getItem('token')));
    console.log(tokenData.role, " ", tokenData.id, " ", planType);

    this._paymentService.createOrder(tokenData.role, tokenData.id, planType).subscribe(d => {

      let options: any = {
        key: d.data.key,
        amount: d.data.amount,
        currency: d.data.currency,
        name: 'Rent Qube',
        order_id: d.data.id,
        modal: {
          // We should prevent closing of the form when esc key is pressed.
          escape: false,
        },
        theme: {
          color: '#3F51F4'
        }
      };
      options.handler =
        (res: paymentDone, error: any) => {
          console.log(res);
          alert("Payment Done " + res.razorpay_payment_id);
        }
      options.modal.ondismiss = () => { alert("Transaction cancelled !") }
      const rzp = new this.winRef.nativeWindow.Razorpay(options);
      rzp.open();
    });
  }

}
