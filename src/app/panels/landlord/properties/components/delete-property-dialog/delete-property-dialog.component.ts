import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-property-dialog',
  templateUrl: './delete-property-dialog.component.html',
  styleUrls: ['./delete-property-dialog.component.css']
})
export class DeletePropertyDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeletePropertyDialogComponent>
  ) { }

  approve() {
    this.dialogRef.close(true);
  }

  reject() {
    this.dialogRef.close(false);
  }
}
