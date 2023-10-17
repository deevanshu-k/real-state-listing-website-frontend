import { Component, OnInit } from '@angular/core';

interface Property { name: string, category: string, price: string }

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  properties: Property[] = [];
  paggedProperties: Property[][] = [[]];
  pageSelected: number = 0;

  ngOnInit(): void {
    this.properties = [
      { "name": "House C Full ACsf sf sdf sdf", "category": "House", "price": "$250,000" },
      { "name": "House C Full ACsf sf sdf sdf", "category": "House", "price": "$250,000" },
      { "name": "House C Full ACsf sf sdf sdf", "category": "House", "price": "$250,000" },
      { "name": "House C Full ACsf sf sdf sdf", "category": "House", "price": "$250,000" },
      { "name": "House C Full ACsf sf sdf sdf", "category": "House", "price": "$250,000" },
      { "name": "House C Full ACsf sf sdf sdf", "category": "House", "price": "$250,000" },
      { "name": "House C Full ACsf sf sdf sdf", "category": "House", "price": "$250,000" },
      { "name": "House C Full ACsf sf sdf sdf", "category": "House", "price": "$250,000" },
      { "name": "Flat D", "category": "Flat", "price": "$1,200/month" },
      { "name": "Shop E", "category": "Shop", "price": "$2,000/month" },
      { "name": "Room F", "category": "Room", "price": "$700/month" },
      { "name": "House G", "category": "House", "price": "$300,000" },
      { "name": "Flat H", "category": "Flat", "price": "$1,500/month" },
      { "name": "Shop I", "category": "Shop", "price": "$2,500/month" },
      { "name": "Room J", "category": "Room", "price": "$800/month" },
      { "name": "House K", "category": "House", "price": "$350,000" },
      { "name": "Flat L", "category": "Flat", "price": "$1,800/month" },
      { "name": "Shop M", "category": "Shop", "price": "$2,800/month" },
      { "name": "Room N", "category": "Room", "price": "$900/month" },
      { "name": "House O", "category": "House", "price": "$400,000" },
      { "name": "Flat P", "category": "Flat", "price": "$2,000/month" },
      { "name": "Shop Q", "category": "Shop", "price": "$3,000/month" },
      { "name": "Room R", "category": "Room", "price": "$1,000/month" },
      { "name": "House S", "category": "House", "price": "$450,000" },
      { "name": "Flat T", "category": "Flat", "price": "$2,200/month" }
    ];
    this.pagePropertyData(this.properties);
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
