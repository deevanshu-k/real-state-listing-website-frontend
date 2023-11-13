import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { PasswordChangeComponent } from './components/password-change/password-change.component';
import { PlanDetailsComponent } from './components/plan-details/plan-details.component';
import { environment } from 'src/environments/environment.development';
import { NgxPhotoEditorModule } from 'ngx-photo-editor';


const routes: Routes = [
  { path: "", component: AccountComponent },
  { path: "details", component: AccountDetailsComponent },
  { path: "documents", component: DocumentsComponent },
  { path: "pswd", component: PasswordChangeComponent },
  { path: "plan", component: PlanDetailsComponent },
]


@NgModule({
  declarations: [
    AccountComponent,
    AccountDetailsComponent,
    DocumentsComponent,
    PasswordChangeComponent,
    PlanDetailsComponent
  ],
  imports: [
    CommonModule,
    NgxPhotoEditorModule,
    RouterModule.forChild(routes)
  ]
})
export class AccountModule {
  constructor() {
    if (!environment.production) console.log("Account Module Loaded !");
  }
}
