import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Property } from 'src/app/interfaces/property';
import { LandlordService } from 'src/app/services/landlord.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-property-table',
  templateUrl: './property-table.component.html',
  styleUrls: ['./property-table.component.css']
})
export class PropertyTableComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['property_name', 'property_type', 'offer_type', 'verification_status', 'state', 'district', 'zipcode', 'remark', 'no_of_rooms', 'price', 'attached_kitchen', 'attached_bathroom', 'include_water_price', 'include_electricity_price', 'rating', 'select',];
  properties: Property[] = [];
  dataSource = new MatTableDataSource<Property>(this.properties);
  // selectedIndex: number = -1;

  dataLoading: Boolean = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _landlordServices: LandlordService,
    private _snackBarServices: SnackbarService,
    private router: Router
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this._landlordServices.getAllProperties().subscribe({
      next: res => {
        this.properties = res.data;
        this.dataSource.data = this.properties;
        this.dataLoading = false;
      },
      error: (e) => {
        this.dataLoading = false;
        this._snackBarServices.openSnackBar(e.error.message, 'Ok', 'end', 'bottom');
      }
    })
  }

  ngOnInit(): void {
    
  }

  // selectRow( i: number){
  //   if(this.selectedIndex == i){
  //     this.selectedIndex = -1;
  //     return;
  //   }
  //   this.selectedIndex = i;
  // }

  editPropertyDetails(id: number) {
    console.log(id);
    
    this.router.navigate(["/panel/landlord/properties/edit/"+ id, { 'data': JSON.stringify(this.properties.find(d => d.id == id))}]);
  }
}