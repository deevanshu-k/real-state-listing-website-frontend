import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
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
  submitBtnIsLoading: {
    _1: Boolean,
    _2: Boolean,
    _3: Boolean
  } = { _1: false, _2: false, _3: false };
  userType: string = "";
  activePlan: string = "";
  constructor(
    private winRef: WindowRefService,
    private _paymentService: PaymentService,
    private _authService: AuthService,
    private _snackBarService: SnackbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let tokenData = this._authService.getDecodedToken(String(localStorage.getItem('token')));
    this.userType = tokenData.role;
    this.activePlan = tokenData.subscription_plan;
  }

  getPlan(planType: string) {
    // If token expired
    if (this._authService.isTokenExpired()) {
      this._authService.removeUserLogin();
      this._snackBarService.openSnackBar("Your section expired ,login again!", "OK", "center", "bottom");
      this.router.navigate(["/login"]);
    }
    let tokenData = this._authService.getDecodedToken(String(localStorage.getItem('token')));

    this._paymentService.createOrder(tokenData.role, tokenData.id, planType).subscribe({
      next: (d) => {
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
            if (res) {
              this.snackBarMessage("Payment successful, login again!");
              this._authService.removeUserLogin();
              this.router.navigate(["/login"]);
            }
            if (error) {
              this.toggleSubmitBtnIsLoading(0);
              this.snackBarMessage("payment failed !");
            }
          }
        options.modal.ondismiss = () => {
          this.toggleSubmitBtnIsLoading(0);
          this.snackBarMessage("transaction cancelled !");
        }
        const rzp = new this.winRef.nativeWindow.Razorpay(options);
        rzp.open();
      },
      error: (error) => {
        this.toggleSubmitBtnIsLoading(0);
        this.snackBarMessage(error.error.message);
      }
    });
  }

  snackBarMessage(message: string) {
    alert(message);
    // this._snackBarService.openSnackBar(message, "OK", "center", "bottom", 3000);
  }

  toggleSubmitBtnIsLoading(i:1|2|3|0){
    this.submitBtnIsLoading._1 = false;
    this.submitBtnIsLoading._2 = false;
    this.submitBtnIsLoading._3 = false;
    if(i == 1){
      this.submitBtnIsLoading._1 = true;
    }
    else if( i == 2){
      this.submitBtnIsLoading._2 = true;
    }
    else if( i == 3) {
      this.submitBtnIsLoading._3 = true;
    }
  }

}
