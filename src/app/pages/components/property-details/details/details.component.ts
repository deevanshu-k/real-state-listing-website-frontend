import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Property } from 'src/app/interfaces/property';

@Component({
  selector: 'property-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  propertyId!:string;
  property?: Property;

  constructor(
    private route: ActivatedRoute
  ){}


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.propertyId = String(params.get('propertyId'));
      this.property = JSON.parse(String(params.get('data')));
    });
  }
}
