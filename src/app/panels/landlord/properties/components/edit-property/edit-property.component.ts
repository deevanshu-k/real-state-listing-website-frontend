import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/interfaces/property';
import { UtilService } from 'src/app/services/util.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.css']
})
export class EditPropertyComponent implements OnInit {
  property_type: { key: string, label: string }[] = environment.PROPERTY_TYPES;
  offer_type: { key: string, label: string }[] = environment.OFFER_TYPES;

  property!: Property;

  states: { code: string, name: string }[] = [];
  districts: string[] = [];

  propertyformgroup?: FormGroup;

  savebtnloading: boolean = false;

  constructor(
    private router: ActivatedRoute,
    private utilServices: UtilService
  ) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.property = JSON.parse(String(params.get('data')));
      this.propertyformgroup = new FormGroup({
        property_type: new FormControl(this.property.property_type, [Validators.required]),
        offer_type: new FormControl(this.property.offer_type, [Validators.required]),
        property_name: new FormControl(this.property.property_name, [Validators.required]),
        price: new FormControl(this.property.price, [Validators.required]),
        attached_bathroom: new FormControl(this.property.attached_bathroom, [Validators.required]),
        attached_kitchen: new FormControl(this.property.attached_kitchen, [Validators.required]),
        include_water_price: new FormControl(this.property.include_water_price, [Validators.required]),
        include_electricity_price: new FormControl(this.property.include_electricity_price, [Validators.required]),
        state: new FormControl(this.property.state, [Validators.required]),
        district: new FormControl(this.property.district, [Validators.required]),
        zipcode: new FormControl(this.property.zipcode, [Validators.required]),
        remark: new FormControl(this.property.remark),
        no_of_rooms: new FormControl(this.property.no_of_rooms, [Validators.required]),
      });
    });
    this.utilServices.getAllStates().subscribe({
      next: (data) => {
        this.states = data;
        this.stateChanged(this.property.state);
      },
      error: (e) => {}
    });
  }

  stateChanged(state: string) {
    this.propertyformgroup?.controls['district'].disable();
    let code = ((this.states.filter(d => d.name == state))[0]).code;
    this.utilServices.getAllCities(code).subscribe({
      next: (data) => {
        this.propertyformgroup?.controls['district'].enable();
        this.districts = data;
      },
      error: (e) => {}
    });
  }

  saveChanges(){
    if(this.propertyformgroup?.invalid) return;
    let changedData = this.propertyformgroup?.value;
    let data: any = {};
    if(changedData.property_type != this.property.property_type) data.property_type = changedData.property_type;
    if(changedData.offer_type != this.property.offer_type) data.offer_type = changedData.offer_type;
    if(changedData.property_name != this.property.property_name) data.property_name = changedData.property_name;
    if(changedData.price != this.property.price) data.price = changedData.price;
    if(changedData.attached_bathroom != this.property.attached_bathroom) data.attached_bathroom = changedData.attached_bathroom;
    if(changedData.attached_kitchen != this.property.attached_kitchen) data.attached_kitchen = changedData.attached_kitchen;
    if(changedData.include_water_price != this.property.include_water_price) data.include_water_price = changedData.include_water_price;
    if(changedData.include_electricity_price != this.property.include_electricity_price) data.include_electricity_price = changedData.include_electricity_price;
    if(changedData.state != this.property.state) data.state = changedData.state;
    if(changedData.district != this.property.district) data.district = changedData.district;
    if(changedData.zipcode != this.property.zipcode) data.zipcode = changedData.zipcode;
    if(changedData.remark != this.property.remark) data.remark = changedData.remark;
    if(changedData.no_of_rooms != this.property.no_of_rooms) data.no_of_rooms = changedData.no_of_rooms;

    if(Object.keys(data).length <= 0) return;
    this.savebtnloading = true;
    setTimeout(() => {
      console.log(data)
      this.savebtnloading = false;
    },2000);
  }

}
