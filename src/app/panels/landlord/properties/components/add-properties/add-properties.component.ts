import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { State, City } from 'country-state-city';
import { CreatePropertyType, LandlordService } from 'src/app/services/landlord.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { environment } from 'src/environments/environment';

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

  // Btn Loading
  nextbtnloading: boolean = false;

  constructor(
    private router: Router,
    private landlordServices: LandlordService,
    private _snackbarServices: SnackbarService
  ) { }

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
    if (!environment.production) console.log(this.propertyformgroup.value);
    if (this.propertyformgroup.valid) {
      this.nextbtnloading = true;
      let data: CreatePropertyType = {
        property_name: String(this.propertyformgroup.controls.property_name.value),
        property_type: String(this.propertyformgroup.controls.property_type.value),
        offer_type: String(this.propertyformgroup.controls.offer_type.value),
        no_of_rooms: Number(this.propertyformgroup.controls.no_of_rooms.value),
        price: Number(this.propertyformgroup.controls.price.value),
        remark: String(this.propertyformgroup.controls.remark.value),
        state: String(this.propertyformgroup.controls.state.value),
        district: String(this.propertyformgroup.controls.district.value),
        zipcode: Number(this.propertyformgroup.controls.zipcode.value),
        attached_bathroom: Boolean(this.propertyformgroup.controls.attached_bathroom.value),
        attached_kitchen: Boolean(this.propertyformgroup.controls.attached_kitchen.value),
        include_electricity_price: Boolean(this.propertyformgroup.controls.include_electricity_price.value),
        include_water_price: Boolean(this.propertyformgroup.controls.include_water_price.value),
      }
      this.landlordServices.createProperty(data).subscribe({
        next: (d) => {
          this._snackbarServices.openSnackBar(d.message, "OK", "end", "bottom", 3000);
          console.log(d);
          this.router.navigate(['/panel/landlord/properties/addimages/' + d.data.id]);
        },
        error: (error) => {
          this.nextbtnloading = false;
          this.propertyformgroup.reset();
          this._snackbarServices.openSnackBar(error.error.message, "OK", "end", "bottom", 3000);
        }
      });
    }
  }

}
