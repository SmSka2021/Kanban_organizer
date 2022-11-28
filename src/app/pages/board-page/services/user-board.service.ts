import { Injectable } from '@angular/core';
import { User } from './../../../shared/models/interfaces/interfaces-board';
import { UserDataService } from './../../../shared/services/user-data-service/user-data.service';
import { saturation } from './../../../shared/constant/color';
import { colorGrey } from 'src/app/shared/constant/color';
import { invokeBoardAPI } from './../store/board.actions';
import { Store } from '@ngrx/store';
import { NotificationService } from '../../../shared/services/notification-service/notification.service';

@Injectable()
export class UserBoardService {
  constructor(
    private userDataService: UserDataService,
    private store: Store,
    private notificationService: NotificationService
  ) {}

  public allUsers: Array<User> = [];

  public getUserNameById(idUser: string): User {
    return this.allUsers.filter((user) => user.id === idUser)[0];
  }

  public getUserColorByName(nameUser: string): string {
    let colorUser = this.allUsers.filter((user) => user.name === nameUser)[0]
      .color;
    if (colorUser) {
      return colorUser;
    } else {
      return colorGrey;
    }
  }

  public getAllUsers() {
    this.userDataService.getAllUsers().subscribe({
      next: (users) => {
        this.allUsers = users;
        for (let user of this.allUsers) {
          user.color = this.randomColor(saturation);
        }
        this.store.dispatch(invokeBoardAPI());
      },
      error: () =>
        this.notificationService.showError('errorHandling.something'),
    });
  }

  private randomColor(brightness: number): string {
    function randomChannel() {
      let pastel = 255 - brightness;
      let color = 0 | (Math.random() * pastel + brightness);
      let saturat = color.toString(16);
      return saturat.length == 1 ? '0' + color : saturat;
    }
    return '#' + randomChannel() + randomChannel() + randomChannel();
  }

  public stopScroll() {
    document.body.style.overflowY = 'hidden';
  }

  public startScroll() {
    document.body.style.overflowY = 'auto';
  }
}
