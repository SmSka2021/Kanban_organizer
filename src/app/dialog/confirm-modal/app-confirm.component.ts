import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmBodyComponent } from './confirm-body/confirm-body.component';

@Component({
  selector: 'app-app-confirm',
  templateUrl: './app-confirm.component.html',
  styleUrls: ['./app-confirm.component.scss'],
})
export class AppConfirmComponent {
  @Input() data!: string;

  @Output() emitConfirm: EventEmitter<boolean> = new EventEmitter();

  constructor(private dialog: MatDialog) {}

  confirmDialog() {
    const ref: MatDialogRef<ConfirmBodyComponent> = this.dialog.open(
      ConfirmBodyComponent,
      {
        width: '300px',
        height: '210px',
        data: {
          message: this.data,
          buttonText: {
            ok: 'Save',
            cancel: 'No',
          },
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );
    ref.afterClosed().subscribe((result) => {
      this.emitConfirm.emit(result);
    });
  }
}
