import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LandlordService } from 'src/app/services/landlord.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

interface Image {
  id: number,
  url: string
}

@Component({
  selector: 'app-add-property-image',
  templateUrl: './add-property-image.component.html',
  styleUrls: ['./add-property-image.component.css']
})
export class AddPropertyImageComponent implements OnInit {
  propertyId!: string;
  maxId: number = 1;
  images: Image[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private landlordServices: LandlordService,
    private snackBar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.propertyId = String(params.get('propertyId'));
      this.landlordServices.getPropertyById(this.propertyId).subscribe({
        next: data => {
          this.images = data.data.images.map(d => {
            this.maxId = Math.max(this.maxId, d.id);
            return { id: d.id, url: d.img_url }
          })
        },
        error: error => {
          this.snackBar.openSnackBar(error.error.message, "Ok", "end", "bottom", 3000);
          this.router.navigate(['/panel/landlord/properties']);
        }
      });
    });
  }

  updateImage(): void {

  }
}
