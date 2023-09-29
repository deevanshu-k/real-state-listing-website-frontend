import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, button: string, horizontalPosition: MatSnackBarHorizontalPosition, verticalPosition: MatSnackBarVerticalPosition, duration?: number) {
    this._snackBar.open(message, button, {
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
      duration: duration || 2000,
    })
  };
}
