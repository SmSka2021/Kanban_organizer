import { Injectable } from '@angular/core';
import { UserDataService } from '../../../shared/services/user-data-service/user-data.service';
import { LocalStorageService } from '../../../shared/services/local-storage-service/local-storage.service';
import { LoginData, Token } from '../../../shared/models/auth-models';
import {
  setIsLogin,
  setToken,
  setUserData,
  setUserInfo,
} from '../../../shared/store/app.action';
import { AuthDataService } from '../../../shared/services/auth-data-service/auth-data.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { NotificationService } from '../../../shared/services/notification-service/notification.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private store: Store,
    private router: Router,
    private userDataService: UserDataService,
    private localStorageService: LocalStorageService,
    private authDataService: AuthDataService,
    private notificationService: NotificationService
  ) {}

  checkUserStatus(): Observable<boolean> {
    const token = this.getTokenFromLocalStorage();
    if (!token) {
      return of(false);
    } else {
      const userId = this.getUserIdFromToken(token);
      return this.userDataService.getUserById(userId).pipe(
        catchError(async () =>
          this.notificationService.showError('errorHandling.something')
        ),
        map((value) => {
          this.store.dispatch(setToken({ token: token }));
          this.changeIsLoginStatus();
          this.setUserData(userId);
          return value ? true : false;
        })
      );
    }
  }

  setUserData(userId: string) {
    this.userDataService.getUserById(userId).subscribe((userData) => {
      this.store.dispatch(
        setUserInfo({
          userLogin: userData.login,
          userName: userData.name,
        })
      );
    });
  }

  logIn(userData: LoginData) {
    if (userData.password) {
      this.localStorageService.saveInLocalStorage(
        'password',
        userData.password
      );
    }
    this.authDataService.logIn(userData).subscribe({
      next: (data: Token) => {
        const userId = this.getUserIdFromToken(data.token);
        this.localStorageService.saveInLocalStorage('token', data.token);
        this.localStorageService.saveInLocalStorage('userId', userId);
        this.store.dispatch(
          setUserData({
            token: data.token,
            userId: userId,
            userLogin: '',
            userName: '',
          })
        );
        this.setUserData(userId);
        this.changeIsLoginStatus();
        if (this.localStorageService.getFromLocalStorage('token')) {
          this.router.navigate(['/main']);
        }
      },
      error: (error) => {
        if (error.error.statusCode === 403) {
          this.notificationService.showError('errorHandling.loginError');
        }
      },
    });
  }

  changeIsLoginStatus() {
    this.store.dispatch(setIsLogin({ isLogin: true }));
  }

  singUp(userData: LoginData) {
    this.logIn(userData);
  }

  logOut() {
    this.localStorageService.clearLocalStorage();
    this.router.navigate(['/welcome']);
  }

  getTokenFromLocalStorage(): string | null {
    const tokenFromLocalStorage =
      this.localStorageService.getFromLocalStorage('token');
    if (typeof tokenFromLocalStorage === 'string') {
      return tokenFromLocalStorage;
    }
    return null;
  }

  getUserIdFromToken(token: string): string {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((item) => {
          return '%' + ('00' + item.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload).userId;
  }
}
