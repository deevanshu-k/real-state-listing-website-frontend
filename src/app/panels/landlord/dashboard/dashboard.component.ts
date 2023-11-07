import { Component } from '@angular/core';
import { Property } from 'src/app/interfaces/property';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  property: Property = {
    id: 3456,
    property_name: "Minimalist and bright flat",
    property_type: "HOUSE",
    offer_type: "SELL",
    price: 3000,
    no_of_rooms: 5,
    attached_bathroom: true,
    attached_kitchen: false,
    include_electricity_price: true,
    include_water_price: true,
    state: "Madhya Pradesh",
    district: "Indore",
    rating: 4.5,
    remark: "",
    images: [
      {
        id: 1,
        img_url: "https://real-state-dev-storage.s3.ap-south-1.amazonaws.com/property_1_1"
      },
      {
        id: 2,
        img_url: "https://real-state-dev-storage.s3.ap-south-1.amazonaws.com/property_1_2"
      },
      {
        id: 3,
        img_url: "https://real-state-dev-storage.s3.ap-south-1.amazonaws.com/property_1_3"
      }
    ],
    verification_status: true,
    zipcode: 453441
  };
}
