import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { BoardsDataService } from './../../../shared/services/boards-data-service/boards-data.service';
import { OneBoard } from 'src/app/shared/models/interfaces/interfaces-board';
import { NotificationService } from './../../../shared/services/notification-service/notification.service';
import {
  BoardResponse,
  BoardAndAllTasks,
} from './../../../shared/models/interfaces/interfaces-board';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserDataService } from './../../../shared/services/user-data-service/user-data.service';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private valueInputFilter$ = new BehaviorSubject<string>('');

  private isResultSearch$ = new BehaviorSubject<boolean>(false);

  private arrFullBoards = new BehaviorSubject<BoardResponse[]>([]);

  private map_boards = new Map();

  private map_users = new Map();

  private newArrAllBoards$ = new BehaviorSubject<BoardAndAllTasks[]>([]);

  constructor(
    private boardsDataService: BoardsDataService,
    private notificationService: NotificationService,
    private spinnerService: NgxSpinnerService,
    private userDataService: UserDataService
  ) {}

  public setIsResultSearch$(value: boolean) {
    this.isResultSearch$.next(value);
  }

  public getIsResultSearch$(): Observable<boolean> {
    return this.isResultSearch$.asObservable();
  }

  public getValueInputFilter(): Observable<string> {
    return this.valueInputFilter$.asObservable();
  }

  public setValueInputFilter(val: string): void {
    this.valueInputFilter$.next(val);
  }

  private getAllFullBoards(boards: OneBoard[]) {
    this.createMapBoards(boards);
    const arrRequest = boards.map((board) =>
      this.boardsDataService.getBoardById(board.id)
    );
    forkJoin(arrRequest).subscribe({
      next: (results) => {
        this.arrFullBoards.next(results);
        this.spinnerService.hide();
        this.setMapBoards(results);
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

  public getAllBoard() {
    this.boardsDataService.getAllBoards().subscribe({
      next: (boards: OneBoard[]) => {
        this.getAllFullBoards(boards);
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

  public getAllUsers() {
    this.userDataService.getAllUsers().subscribe({
      next: (users) => {
        for (let user of users) {
          this.map_users.set(user.id, user.name);
        }
      },
      error: () =>
        this.notificationService.showError('errorHandling.something'),
    });
  }

  public createMapBoards(boards: OneBoard[]) {
    for (let board of boards) {
      this.map_boards.set(board.id, [board.title, []]);
    }
  }

  public getNewArrAllBoards$(): Observable<BoardAndAllTasks[]> {
    return this.newArrAllBoards$.asObservable();
  }

  public setMapBoards(arrBoards: BoardResponse[]) {
    let arrTasks: BoardAndAllTasks[] = [];
    for (let board of arrBoards) {
      for (let column of board.columns) {
        for (let task of column.tasks) {
          let newTask: any = {};
          newTask.idBoard = board.id;
          newTask.boardTitle = board.title;
          newTask.taskTitle = task.title;
          newTask.taskDescription = task.description;
          newTask.userLogin = this.map_users.get(task.userId);
          arrTasks.push(newTask);
        }
      }
    }
    this.newArrAllBoards$.next([...arrTasks]);
  }
}
