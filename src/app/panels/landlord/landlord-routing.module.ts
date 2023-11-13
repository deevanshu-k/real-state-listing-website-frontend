import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandlordComponent } from './landlord.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: "", component: LandlordComponent, children: [
      { path: "", redirectTo: "dashboard", pathMatch: "prefix" },
      { path: "dashboard", component: DashboardComponent },
      {
        path: "properties", loadChildren: () => import("./properties/properties.module").then(m => m.PropertiesModule)
      },
      {
        path: "account", loadChildren: () => import("./account/account.module").then(m => m.AccountModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandlordRoutingModule { }
