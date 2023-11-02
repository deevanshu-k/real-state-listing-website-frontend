import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { FindRoomsComponent } from './pages/find-rooms/find-rooms.component';
import { RoleGuard } from './role.guard';
import { PricingPlanComponent } from './pages/pricing-plan/pricing-plan.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';

const routes: Routes = [
  { path: "resetpassword", component: ChangePasswordComponent},
  {
    path: "", component: PagesComponent, children: [
      { path: "", redirectTo: "home", pathMatch: 'prefix' },
      { path: "home", component: HomeComponent },
      { path: "aboutus", component: AboutUsComponent },
      { path: "findrooms", component: FindRoomsComponent },
      { path: "contactus", component: ContactUsComponent },
      { path: "plans",data:{roles:["TENANT","LANDLORD"]},canActivate:[RoleGuard], component: PricingPlanComponent },
      { path: "login", component: LoginComponent},
      { path: "register", component: RegisterComponent}
    ]
  },
  {
    path: "panel",data: {roles:["LANDLORD"]},canActivate:[RoleGuard], children: [
      { path: "landlord", loadChildren: () => import("./panels/landlord/landlord.module").then(m => m.LandlordModule) }
    ]
  },
  { path:"**" , redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }