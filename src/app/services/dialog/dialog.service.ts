import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LogoutComponent } from './logout/logout.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  dialogRef?: MatDialogRef<LogoutComponent>;

  constructor(private dialog: MatDialog) { }

  openLogoutDialog(){
    this.dialogRef = this.dialog.open(LogoutComponent);
  }
}
