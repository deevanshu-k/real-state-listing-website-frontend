import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';

const routes: Routes = [
  {
    path: "", component: PagesComponent, children: [
      { path: "", redirectTo: "home", pathMatch: 'prefix' },
      { path: "home", component: HomeComponent },
      { path: "aboutus", component: AboutUsComponent }
    ]
  },
  {
    path: "panel", children: [
      { path: "landlord", loadChildren: () => import("./panels/landlord/landlord.module").then(m => m.LandlordModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }