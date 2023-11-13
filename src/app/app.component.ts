import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { ModuleLoaderService } from './services/module-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Rent Qube';
  count:number = 0;

  constructor(
    private router: Router,
    private moduleLoader: ModuleLoaderService
  ){}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if(event instanceof RouteConfigLoadStart){
        let n = this.moduleLoader.$moduleloading.getValue();
        this.moduleLoader.$moduleloading.next(n+1);
      }
      else if(event instanceof RouteConfigLoadEnd){
        let n = this.moduleLoader.$moduleloading.getValue();
        this.moduleLoader.$moduleloading.next(n-1);
      }
    });

    this.moduleLoader.$moduleloading.subscribe(d => {
      this.count = d;
    })
  }
}
