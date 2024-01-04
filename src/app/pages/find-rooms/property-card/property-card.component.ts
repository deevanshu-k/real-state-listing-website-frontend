import { Component, Input } from '@angular/core';
import { Property } from 'src/app/interfaces/property';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent {
  @Input({ alias: 'pdetails', required: true }) property!: Property;
  @Input({ alias: 'uniqueno', required: true }) uno!: number;
}
