import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/interfaces/property';
import { LandlordService } from 'src/app/services/landlord.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  properties: Property[] = [];
  paggedProperties: Property[][] = [[]];
  pageSelected: number = 0;
  
  constructor(
    private _landlordServices: LandlordService,
    private _snackBarServices: SnackbarService){}

  ngOnInit(): void {
    this._landlordServices.getAllProperties().subscribe({
      next: res => {
        this.properties = res.data;
        this.pagePropertyData(this.properties);
      },
      error: (e) => {
        this._snackBarServices.openSnackBar(e.error.message,'Ok','end','bottom');
      }
    })
  }

  pagePropertyData(properties:Property[]){
    let limit = 6;
    let temp:Property[] = [];
    for (let i  = 0; i < properties.length; i++) {
      temp.push(properties[i]);
      if((i+1)%limit == 0){
        this.paggedProperties.push(temp);
        temp = [];
      }
    }

    if(temp.length) this.paggedProperties.push(temp);
    if(this.paggedProperties.length) this.pageSelected = 1;
  }

  nextPage(){
    if(this.pageSelected < this.paggedProperties.length-1){
      this.pageSelected++;
    }
  }
  previousPage(){
    if(this.pageSelected > 1){
      this.pageSelected--;
    }
  }
}
