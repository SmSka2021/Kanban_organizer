import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OneBoard } from 'src/app/shared/models/interfaces/interfaces-board';
import { BoardsDataService } from 'src/app/shared/services/boards-data-service/boards-data.service';
import { AddTaskEvent } from './../../../shared/models/interfaces/interfaces-board';
import { Store } from '@ngrx/store';
import { setCurrentBoard } from './../../../shared/store/app.action';
import { LocalStorageService } from './../../../shared/services/local-storage-service/local-storage.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../shared/services/notification-service/notification.service';

@Injectable({
  providedIn: 'root',
})
export class MainPageService {
  private allBoards$ = new BehaviorSubject<OneBoard[]>([]);

  public searchWord = new BehaviorSubject<string>('');

  public sortOrder = new BehaviorSubject<string>('by A-Z');

  public editModalStatus = new BehaviorSubject<boolean>(false);

  public boardId = new BehaviorSubject<string>('');

  constructor(
    private boardsDataService: BoardsDataService,
    private store: Store,
    private localStorageService: LocalStorageService,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private notificationService: NotificationService
  ) {}

  public getAllBoards$() {
    return this.allBoards$.asObservable();
  }

  public setAllBoards$(data: OneBoard[]) {
    this.allBoards$.next(data);
  }

  public getAllBoard() {
    this.boardsDataService.getAllBoards().subscribe({
      next: (data: OneBoard[]) => {
        this.allBoards$.next(data);
        this.spinnerService.hide();
      },
      error: (error) => {
        if (error.statusCode === 404) {
          this.notificationService.showError('errorHandling.noBoard');
        } else {
          this.notificationService.showError('errorHandling.something');
        }
      },
    });
  }

  public deleteBoard(idBoard: string) {
    this.boardsDataService.deleteBoard(idBoard).subscribe({
      next: () => {
        this.boardsDataService.getAllBoards().subscribe({
          next: (item: OneBoard[]) => {
            this.allBoards$.next(item);
          },
          error: (error) => {
            if (error.statusCode === 404) {
              this.notificationService.showError('errorHandling.noBoard');
            } else {
              this.notificationService.showError('errorHandling.something');
            }
          },
        });
      },
      error: () =>
        this.notificationService.showError('errorHandling.something'),
    });
  }

  public createBoard(data: AddTaskEvent) {
    this.boardsDataService.createBoard(data.value).subscribe({
      next: () => {
        this.boardsDataService.getAllBoards().subscribe({
          next: (item: OneBoard[]) => {
            this.allBoards$.next(item);
          },
          error: (error) => {
            if (error.statusCode === 404) {
              this.notificationService.showError('errorHandling.noBoard');
            } else {
              this.notificationService.showError('errorHandling.something');
            }
          },
        });
      },
      error: () =>
        this.notificationService.showError('errorHandling.something'),
    });
  }

  public saveIdCurrentBoard(id: string) {
    this.localStorageService.saveInLocalStorage('currentBoard', id);
    this.store.dispatch(setCurrentBoard({ id }));
    this.router.navigate(['board', id]);
    this.spinnerService.show();
  }
}
