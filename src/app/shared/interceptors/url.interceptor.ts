import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from './../constant/url';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {
  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (
      request.url.slice(-7) === 'en.json' ||
      request.url.slice(-7) === 'ru.json'
    ) {
      return next.handle(request.clone());
    } else {
      return next.handle(
        request.clone({
          url: `${BASE_URL}${request.url}`,
        })
      );
    }
  }
}
