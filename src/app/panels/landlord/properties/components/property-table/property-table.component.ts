import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Property } from 'src/app/interfaces/property';
import { LandlordService } from 'src/app/services/landlord.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { DeletePropertyDialogComponent } from '../delete-property-dialog/delete-property-dialog.component';

@Component({
  selector: 'app-property-table',
  templateUrl: './property-table.component.html',
  styleUrls: ['./property-table.component.css']
})
export class PropertyTableComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['property_name', 'property_type', 'offer_type', 'verification_status', 'publish_status', 'state', 'district', 'zipcode', 'remark', 'no_of_rooms', 'price', 'attached_kitchen', 'attached_bathroom', 'include_water_price', 'include_electricity_price', 'rating', 'select',];
  properties: Property[] = [];
  dataSource = new MatTableDataSource<Property>(this.properties);
  // selectedIndex: number = -1;

  dataLoading: Boolean = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _landlordServices: LandlordService,
    private _snackBarServices: SnackbarService,
    private router: Router,
    private dialog: MatDialog
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

  editPropertyDetails(id: number) {
    console.log(id);

    this.router.navigate(["/panel/landlord/properties/edit/" + id, { 'data': JSON.stringify(this.properties.find(d => d.id == id)) }]);
  }

  deleteProperty(Id: number) {
    const dialogRef = this.dialog.open(DeletePropertyDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._landlordServices.deleteProperty(Id).subscribe({
          next: (data) => {
            this._snackBarServices.openSnackBar(data.message, "OK", "end", "bottom", 3000);
            this.properties = this.properties.filter(d => d.id != Id);
            this.dataSource.data = this.properties;
          },
          error: (error) => {
            this._snackBarServices.openSnackBar(error.error.message, "OK", "end", "bottom", 3000);
           }
        });
      }
    });
  }

  changePropertyPublishState(Id: number, publish: boolean) {
    this._landlordServices.changePublishStateOfProperty(Id,publish).subscribe({
      next: (data) => {
        this._snackBarServices.openSnackBar(data.message, "OK", "end", "bottom", 3000);
      },
      error: (error) => {
        let id = this.properties.findIndex(d => d.id == Id);
        this.properties[id].verification_status = !this.properties[id].verification_status;
        this._snackBarServices.openSnackBar(error.error.message, "OK", "end", "bottom", 3000);
      }
    });
  }
}