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
  userType:string = "";
  activePlan:string = "";
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
    if(this._authService.isTokenExpired()){
      this._authService.removeUserLogin();
      this._snackBarService.openSnackBar("Your section expired ,login again!","OK","center","bottom");
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
            if(res){
              this.snackBarMessage("Payment successful, login again!");
              this._authService.removeUserLogin();
              this.router.navigate(["/login"]);
            }
            if(error){
              this.snackBarMessage("payment failed !");
            }
          }
        options.modal.ondismiss = () => { 
          this.snackBarMessage("transaction cancelled !"); 
        }
        const rzp = new this.winRef.nativeWindow.Razorpay(options);
        rzp.open();
      },
      error: (error) => {
        this.snackBarMessage(error.error.message);
      }
    });
  }

  snackBarMessage(message:string){
    alert(message);
    // this._snackBarService.openSnackBar(message, "OK", "center", "bottom", 3000);
  }

}
