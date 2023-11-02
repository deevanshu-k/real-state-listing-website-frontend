import { Component, OnInit } from '@angular/core';

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
  images: Image[] = [];

  ngOnInit(): void {
    this.images = [
      {
        id: 23456,
        url: "https://real-state-dev-storage.s3.ap-south-1.amazonaws.com/ad41428285b6f2b299ed2c8edd64825d?nocache=1698915369440"
      },
      {
        id: 23456,
        url: "https://placehold.co/600x400"
      }
    ];
  }
}
