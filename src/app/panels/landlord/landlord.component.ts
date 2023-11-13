import { Component } from '@angular/core';
import { HttpLoaderService } from 'src/app/services/http-loader.service';

@Component({
  selector: 'app-landlord',
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.css']
})
export class LandlordComponent {

  constructor(
    public httpLoaderService: HttpLoaderService
  ){}
}
