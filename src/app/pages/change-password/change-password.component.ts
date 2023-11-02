import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  resettoken: string = "";

  constructor(private route: ActivatedRoute){
    route.queryParams.subscribe(params => {
      this.resettoken = params['token'];
    })
  }
}
