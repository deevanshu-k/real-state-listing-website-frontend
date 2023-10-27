import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandlordComponent } from './landlord.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PropertiesComponent } from './properties/properties.component';
import { AccountComponent } from './account/account.component';
import { AccountDetailsComponent } from './account/components/account-details/account-details.component';
import { DocumentsComponent } from './account/components/documents/documents.component';
import { PasswordChangeComponent } from './account/components/password-change/password-change.component';
import { PlanDetailsComponent } from './account/components/plan-details/plan-details.component';

const routes: Routes = [
  {
    path: "", component: LandlordComponent, children: [
      { path: "", redirectTo: "dashboard", pathMatch: "prefix" },
      { path: "dashboard", component: DashboardComponent },
      { path: "properties", component: PropertiesComponent },
      {
        path: "account", children: [
          { path: "", component: AccountComponent },
          { path: "details", component: AccountDetailsComponent },
          { path: "documents", component: DocumentsComponent },
          { path: "pswd", component: PasswordChangeComponent },
          { path: "plan", component: PlanDetailsComponent },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandlordRoutingModule { }
