import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { LocalStorageService } from '../services/local-storage-service/local-storage.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../services/notification-service/notification.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private spinnerService: NgxSpinnerService,
    private notificationService: NotificationService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error.message === 'Unauthorized') {
          this.localStorageService.clearLocalStorage();
          this.spinnerService.hide();
          this.notificationService.showError('errorHandling.token');
          this.router.navigate(['/welcome']);
        }
        return throwError(error);
      })
    );
  }
}
