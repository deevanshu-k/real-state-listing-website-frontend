import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Property } from 'src/app/interfaces/property';
import { LandlordService } from 'src/app/services/landlord.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-property-table',
  templateUrl: './property-table.component.html',
  styleUrls: ['./property-table.component.css']
})
export class PropertyTableComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['select', 'property_name', 'property_type', 'offer_type', 'verification_status', 'state', 'district', 'zipcode', 'remark', 'no_of_rooms', 'price', 'attached_kitchen', 'attached_bathroom', 'include_water_price', 'include_electricity_price', 'rating'];
  properties: Property[] = [];
  dataSource = new MatTableDataSource<Property>(this.properties);

  dataLoading: Boolean = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _landlordServices: LandlordService,
    private _snackBarServices: SnackbarService
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
}

// const ELEMENT_DATA: Property[] = [
//   {
//     id: 1,
//     property_type: "House",
//     offer_type: "Sale",
//     property_name: "Cozy Cottage",
//     verification_status: true,
//     state: "California",
//     district: "Los Angeles",
//     zipcode: 90001,
//     remark: "A lovely cottage in a quiet neighborhood.",
//     no_of_rooms: 3,
//     price: 250000,
//     attached_kitchen: true,
//     attached_bathroom: true,
//     include_water_price: true,
//     include_electricity_price: true,
//     rating: 4.5,
//     images: [
//       { id: 1, img_url: "https://example.com/image1.jpg" },
//       { id: 2, img_url: "https://example.com/image2.jpg" },
//     ],
//   },
//   {
//     id: 2,
//     property_type: "Apartment",
//     offer_type: "Rent",
//     property_name: "Luxury Penthouse",
//     verification_status: true,
//     state: "New York",
//     district: "Manhattan",
//     zipcode: 10001,
//     remark: "Stunning penthouse with city views.",
//     no_of_rooms: 4,
//     price: 6000,
//     attached_kitchen: true,
//     attached_bathroom: true,
//     include_water_price: true,
//     include_electricity_price: true,
//     rating: 4.8,
//     images: [
//       { id: 3, img_url: "https://example.com/image3.jpg" },
//       { id: 4, img_url: "https://example.com/image4.jpg" },
//     ],
//   },
//   {
//     id: 3,
//     property_type: "Condo",
//     offer_type: "Sale",
//     property_name: "Modern Condo",
//     verification_status: true,
//     state: "Florida",
//     district: "Miami",
//     zipcode: 33101,
//     remark: "Sleek and modern condo in the heart of the city.",
//     no_of_rooms: 2,
//     price: 350000,
//     attached_kitchen: true,
//     attached_bathroom: true,
//     include_water_price: true,
//     include_electricity_price: true,
//     rating: 4.7,
//     images: [
//       { id: 5, img_url: "https://example.com/image5.jpg" },
//       { id: 6, img_url: "https://example.com/image6.jpg" },
//     ],
//   },
//   {
//     id: 4,
//     property_type: "House",
//     offer_type: "Rent",
//     property_name: "Family Home",
//     verification_status: true,
//     state: "Texas",
//     district: "Houston",
//     zipcode: 77001,
//     remark: "Spacious family home with a large backyard.",
//     no_of_rooms: 5,
//     price: 2000,
//     attached_kitchen: true,
//     attached_bathroom: true,
//     include_water_price: true,
//     include_electricity_price: true,
//     rating: 4.4,
//     images: [
//       { id: 7, img_url: "https://example.com/image7.jpg" },
//       { id: 8, img_url: "https://example.com/image8.jpg" },
//     ],
//   },
//   {
//     id: 5,
//     property_type: "Apartment",
//     offer_type: "Sale",
//     property_name: "Downtown Loft",
//     verification_status: true,
//     state: "New York",
//     district: "Brooklyn",
//     zipcode: 11201,
//     remark: "Chic downtown loft with industrial design.",
//     no_of_rooms: 1,
//     price: 450000,
//     attached_kitchen: true,
//     attached_bathroom: true,
//     include_water_price: true,
//     include_electricity_price: true,
//     rating: 4.9,
//     images: [
//       { id: 9, img_url: "https://example.com/image9.jpg" },
//       { id: 10, img_url: "https://example.com/image10.jpg" },
//     ],
//   },
//   {
//     id: 6,
//     property_type: "House",
//     offer_type: "Rent",
//     property_name: "Suburban Retreat",
//     verification_status: true,
//     state: "California",
//     district: "San Francisco",
//     zipcode: 94101,
//     remark: "Peaceful suburban home with a garden.",
//     no_of_rooms: 4,
//     price: 3000,
//     attached_kitchen: true,
//     attached_bathroom: true,
//     include_water_price: true,
//     include_electricity_price: true,
//     rating: 4.6,
//     images: [
//       { id: 11, img_url: "https://example.com/image11.jpg" },
//       { id: 12, img_url: "https://example.com/image12.jpg" },
//     ],
//   }
// ];