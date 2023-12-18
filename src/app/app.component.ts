import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { ModuleLoaderService } from './services/module-loader.service';
import { environment } from 'src/environments/environment.development';

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
    const splashScreen: HTMLElement | null = document.getElementById('splashScreenClass');
    if (splashScreen) {
      splashScreen.remove();
    }
    const devribbon: HTMLElement | null = document.getElementById('dev-ribbon-1');
    if (environment.production) {
      if(devribbon) devribbon.remove();
    }

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
