import { Component, Input, OnInit } from '@angular/core';
import { Property } from 'src/app/interfaces/property';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent implements OnInit {
  @Input({ alias: 'pdetails', required: true }) property!: Property;
  @Input({ alias: 'uniqueno', required: true }) uno!: number;

  ngOnInit(): void {
    this.property.images.forEach(d => {
      d.img_url = d.img_url + "?nocache=" + Date.now();
    });
  }
}
