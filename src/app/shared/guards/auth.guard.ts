import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../../pages/auth-page/services/login.service';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsLogin } from '../store/app.selector';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private store: Store
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> {
    // @ts-ignore
    return this.store.select(selectIsLogin).pipe((value) => {
      // @ts-ignore
      value.subscribe((data) => {
        if (!data) {
          this.loginService.checkUserStatus().subscribe((isLogin) => {
            if (isLogin) {
              return of(true);
            } else {
              this.router.navigate(['/welcome']);
              return of(false);
            }
          });
        } else {
          return of(true);
        }
      });
    });
  }
}
