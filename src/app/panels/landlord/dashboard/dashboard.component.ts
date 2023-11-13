import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/interfaces/property';
import { LandlordService } from 'src/app/services/landlord.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  filterbyproperty: any = {};
  property_types: { key: string, label: string }[] = [];
  properties: Property[] = [];
  filteredproperties: Property[] = [];

  constructor(
    private _landlordServices: LandlordService,
    private _snackBarServices: SnackbarService
  ) {
    this.property_types = environment.PROPERTY_TYPES;
    this.property_types.forEach(d => {
      this.filterbyproperty[d.key] = false;
    });
  }

  ngOnInit(): void {
    this._landlordServices.getAllProperties().subscribe({
      next: res => {
        this.properties = res.data;
        this.filteredproperties = this.properties;
      },
      error: (e) => {
        this._snackBarServices.openSnackBar(e.error.message, 'Ok', 'end', 'bottom');
      }
    })
  }

  applyFilter(input: { key: string, label: string }) {
    if (this.property_types.includes(input)) {
      // Check If Input Belongs To Property 
      if (this.filterbyproperty[input.key]) {
        // If Already True
        this.filterbyproperty[input.key] = false;
        this.filterbasedonpropertype();
        return;
      }
      // If Not True
      this.property_types.forEach(d => {
        this.filterbyproperty[d.key] = false;
      });
      this.filterbyproperty[input.key] = true;
      this.filterbasedonpropertype(input.key);
    }
  }

  filterbasedonpropertype(input?: string) {
    // Input = PropertyType Key Value
    if(!input) {
      // No Input
      this.filteredproperties = this.properties;
      return;
    }
    // Apply Filter
    this.filteredproperties = this.properties.filter(d => d.property_type == input);
   }
}
