import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { FindRoomsComponent } from './pages/find-rooms/find-rooms.component';
import { RoleGuard } from './role.guard';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';

const routes: Routes = [
  { path: "resetpassword", component: ChangePasswordComponent },
  {
    path: "", component: PagesComponent, children: [
      { path: "", redirectTo: "home", pathMatch: 'prefix' },
      { path: "home", loadChildren: () => import("./pages/home/home.module").then(m => m.HomeModule) },
      { path: "aboutus", component: AboutUsComponent },
      { path: "findrooms", component: FindRoomsComponent },
      { path: "contactus", component: ContactUsComponent },
      { path: "plans", data: { roles: ["TENANT", "LANDLORD"] }, canActivate: [RoleGuard], loadChildren: () => import("./pages/pricing-plan/pricing-plan.module").then(m => m.PricingPlanModule) },
      { path: "login", loadChildren: () => import("./pages/login/login.module").then(m => m.LoginModule) },
      { path: "register", loadChildren: () => import("./pages/register/register.module").then(m => m.RegisterModule) }
    ]
  },
  {
    path: "panel", data: { roles: ["LANDLORD"] }, canActivate: [RoleGuard], children: [
      { path: "landlord", loadChildren: () => import("./panels/landlord/landlord.module").then(m => m.LandlordModule) }
    ]
  },
  { path: "**", redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }