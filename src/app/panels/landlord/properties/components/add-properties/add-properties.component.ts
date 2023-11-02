import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    }
  ];
  offer_type: { key: string, value: string }[] = [
    { key: 'Rent', value: "RENT" },
    { key: 'Sell', value: "SELL" }
  ];
  states: { code: string, name: string }[] = [];
  districts: string[] = [];

  propertyformgroup = new FormGroup({
    property_type: new FormControl('', [Validators.required]),
    offer_type: new FormControl('', [Validators.required]),
    property_name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    attached_bathroom: new FormControl(false, [Validators.required]),
    attached_kitchen: new FormControl(false, [Validators.required]),
    include_water_price: new FormControl(false, [Validators.required]),
    include_electricity_price: new FormControl(false, [Validators.required]),
    state: new FormControl('', [Validators.required]),
    district: new FormControl('', [Validators.required]),
    zipcode: new FormControl('', [Validators.required]),
    remark: new FormControl(''),
    no_of_rooms: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router){}

  ngOnInit(): void {
    this.states = State.getStatesOfCountry('IN').map(d => {
      return { code: d.isoCode, name: d.name };
    });
  }

  stateChanged(state: string) {
    let code = ((this.states.filter(d => d.name == state))[0]).code;
    this.districts = City.getCitiesOfState('IN', code).map(d => d.name);
  }

  saveProperty() {
    this.router.navigate(['/panel/landlord/properties/addimages/12313']);
    console.log(this.propertyformgroup.value);
  }

}
