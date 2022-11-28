import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBodyComponent } from '../prompt-modal/prompt-body/dialog-body.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  @Output() emitText: EventEmitter<any> = new EventEmitter();

  @Input() oneFieldForm: boolean = false;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBodyComponent, {
      width: '300px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.emitText.emit(result);
    });
  }
}
