import { Injectable } from '@angular/core';
import { UserDataService } from '../../../shared/services/user-data-service/user-data.service';
import { CurrentUserData } from '../../../shared/models/interfaces/edit-profile';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserData } from '../../../shared/store/app.selector';
import { LocalStorageService } from '../../../shared/services/local-storage-service/local-storage.service';
import { UpdateUserRequestBody } from '../../../shared/models/interfaces/interfaces-board';
import { LoginService } from '../../auth-page/services/login.service';
import { NotificationService } from '../../../shared/services/notification-service/notification.service';

@Injectable({
  providedIn: 'root',
})
export class EditProfileService {
  public currentUserId: string;

  constructor(
    private store: Store,
    private userDataService: UserDataService,
    private localStorage: LocalStorageService,
    private loginService: LoginService,
    private notificationService: NotificationService
  ) {}

  public getCurrentUserData(): Observable<CurrentUserData> {
    const userId = this.localStorage.getFromLocalStorage('userId');
    if (typeof userId === 'string') {
      this.currentUserId = userId;
    }
    return this.store.select(selectUserData);
  }

  public changeUserData(newUserData: UpdateUserRequestBody) {
    return this.userDataService.updateUser(this.currentUserId, newUserData);
  }

  public deleteUser() {
    this.userDataService.deleteUser(this.currentUserId).subscribe({
      next: () => this.loginService.logOut(),
      error: () =>
        this.notificationService.showError('errorHandling.something'),
    });
  }
}
