import { Injectable, OnDestroy } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService implements OnDestroy {
  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  private verticalPosition: MatSnackBarVerticalPosition = 'top';

  private sub: Subscription;

  constructor(
    public snackBar: MatSnackBar,
    private translocoService: TranslocoService
  ) {}

  showSuccess(key: string): void {
    this.sub = this.translocoService
      .selectTranslate(key)
      .subscribe((message) => {
        this.snackBar.open(message, 'Ok');
      });
  }

  showError(key: string): void {
    this.sub = this.translocoService
      .selectTranslate(key)
      .subscribe((message) => {
        this.snackBar.open(message, 'X', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
