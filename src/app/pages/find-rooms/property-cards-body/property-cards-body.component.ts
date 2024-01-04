import { Component } from '@angular/core';
import { Property } from 'src/app/interfaces/property';

@Component({
  selector: 'app-property-cards-body',
  templateUrl: './property-cards-body.component.html',
  styleUrls: ['./property-cards-body.component.css']
})
export class PropertyCardsBodyComponent {
  properties: Property[] = [
    {
      zipcode: 453441,
      attached_bathroom: true,
      attached_kitchen: true,
      district: "Indore",
      id: 4567,
      images: [{
        id: 123,
        img_url: "https://placehold.co/600x400"
      },
      {
        id: 123,
        img_url: "https://placehold.co/600x400"
      }],
      include_electricity_price: true,
      include_water_price: true,
      no_of_rooms: 4,
      offer_type: "ROOM",
      price: 34567,
      property_name: "awd",
      property_type: "zsd",
      publish_status: true,
      rating: 5,
      remark: "asd",
      state: "Asd",
      verification_status: true
    }
  ];
}
