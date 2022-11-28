import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-body',
  templateUrl: './confirm-body.component.html',
  styleUrls: ['./confirm-body.component.scss'],
})
export class ConfirmBodyComponent {
  message = '';

  constructor(
    private dialogRef: MatDialogRef<ConfirmBodyComponent>,
    @Inject(MAT_DIALOG_DATA) data: { message: string }
  ) {
    this.message = data ? data.message : '';
  }
}
