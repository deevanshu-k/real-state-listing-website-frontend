import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  planType: "FREETENANT"| "PREMIUMTENANT"  | "FREELANDLORD" | "STANDARDLANDLORD" | "PREMIUMLANDLORD" | "" = "";
  name:string = "Welcome !";
  profileImage?: string | null;

  constructor(
    private _authService: AuthService,
    private router: Router
    ) {
    _authService.isLogin.subscribe(d => {
      this.isUserLoggedIn = d;
      if (d) {
        let decodedToken = _authService.getDecodedToken(String(localStorage.getItem("token")));
        this.planType = decodedToken.subscription_plan;
        this.name = decodedToken.username;
        this.profileImage = decodedToken.profile_image;
      }
      else {
        this.planType = "";
      }
    })
  }

  ngOnInit(): void {
    if (!this._authService.isTokenExpired()) {
      this._authService.isLogin.next(true);
    }
  }

  logout(): void {
    this._authService.removeUserLogin();
    this.router.navigate(["/login"]);
  }
}
