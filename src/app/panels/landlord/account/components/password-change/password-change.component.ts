import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordService } from 'src/app/services/password.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent {
  email: string = "";
  // Btn Loading
  changepswdbtnloading: boolean = false;

  constructor(
    private passwordService: PasswordService,
    private snackbarService: SnackbarService,
    private router: Router,
    private authService: AuthService
  ) {
    let decodedToken = this.authService.getDecodedToken(String(localStorage.getItem("token")));
    this.email = decodedToken.email;
  }

  getPswdResetLink() {
    this.changepswdbtnloading = true;
    this.passwordService.requestResetLink().subscribe({
      next: (d) => {
        this.snackbarService.openSnackBar(d.message, "OK", "end", "bottom", 3000);
        this.router.navigate(['/panel/landlord/account']);
      },
      error: (error) => {
        this.snackbarService.openSnackBar(error.error.message, "OK", "end", "bottom", 3000);
        this.router.navigate(['/panel/landlord/account']);
      }
    });
  }
}
