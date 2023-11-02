import { Component, OnInit } from '@angular/core';
import { State, City } from 'country-state-city';

@Component({
  selector: 'app-add-properties',
  templateUrl: './add-properties.component.html',
  styleUrls: ['./add-properties.component.css']
})
export class AddPropertiesComponent implements OnInit {
  property_type: { key: string, value: string }[] = [
    { key: 'Room', value: 'ROOM' },
    { key: 'Home', value: 'HOME' },
    { key: 'Flat', value: 'FLAT' },
    {
      key: 'Shop', value: 'COMMERCIAL_SPACE'
    }];
  offer_type: { key: string, value: string }[] = [
    { key: 'Rent', value: "RENT" },
    { key: 'Sell', value: "SELL" }
  ];
  states: { code: string, name: string }[] = [];
  districts: string[] = [];

  ngOnInit(): void {
    this.states = State.getStatesOfCountry('IN').map(d => {
      return { code: d.isoCode, name: d.name };
    });
  }

  stateChanged(code:string) {
    this.districts = City.getCitiesOfState('IN',code).map(d => d.name);
  }

}
