import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectColumnById, selectBoards } from '../store/board.selector';
import { LocalStorageService } from './../../../shared/services/local-storage-service/local-storage.service';
import {
  Column,
  Tasks,
  OneUsersTasks,
  UsersTasksProject,
  AddTaskEvent,
  CreateTaskBody,
  UpdateColumnBody,
  UpdateOneTaskBody,
} from './../../../shared/models/interfaces/interfaces-board';
import { TasksDataService } from 'src/app/shared/services/tasks-data-service/tasks-data.service';
import { invokeBoardAPI } from './../store/board.actions';
import { ColumnDataService } from './../../../shared/services/colums-data-service/column-data.service';
import { UserBoardService } from './user-board.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../shared/services/notification-service/notification.service';
@Injectable()
export class EditTaskService {
  constructor(
    private store: Store,
    private localStorageService: LocalStorageService,
    private tasksDataService: TasksDataService,
    private columnDataService: ColumnDataService,
    private userBoardService: UserBoardService,
    private spinnerService: NgxSpinnerService,
    private notificationService: NotificationService
  ) {}

  public checkIdTask = '';

  public checkIdColumn = '';

  private checkIdBoard$ = new BehaviorSubject<string>('');

  public getcheckIdBoard$() {
    return this.checkIdBoard$.asObservable();
  }

  public getValCheckIdBoard$() {
    return this.checkIdBoard$.getValue();
  }

  public setcheckIdBoard$(data: string) {
    this.checkIdBoard$.next(data);
  }

  public checkColumn!: Column;

  public checkTask!: Tasks;

  private isOpenTasksOneUser$ = new BehaviorSubject<boolean>(false);

  private isShowEditTaskModal$ = new BehaviorSubject<boolean>(false);

  public allColumn$ = new Subject<Column[]>();

  public arrColumns: Column[] = [];

  public map_Users_Tasks = new Map();

  private map_UserId_Name = new Map();

  public arrayUserTasks: UsersTasksProject = [];

  private arrayUserTasks$ = new BehaviorSubject<UsersTasksProject>(
    this.arrayUserTasks
  );

  public getIsOpenTasksOneUser$(): Observable<boolean> {
    return this.isOpenTasksOneUser$.asObservable();
  }

  public getIsOpenTasksOneUserData(): boolean {
    return this.isOpenTasksOneUser$.getValue();
  }

  public setIsOpenTasksOneUser$() {
    this.isOpenTasksOneUser$.next(!this.getIsOpenTasksOneUserData());
  }

  public setAllColumn$(arrColumn: Column[]) {
    this.allColumn$.next([...arrColumn]);
    this.allColumn$.subscribe((arrCol) => {
      this.arrColumns = [...arrCol];
      this.createMapUser();
      setTimeout(() => this.spinnerService.hide(), 500);
    });
  }

  public getAllColumn$() {
    return this.allColumn$.asObservable();
  }

  public isTaskInColumn(arrTasks: Tasks[], idTask: string): boolean {
    for (let i = 0; i <= arrTasks.length - 1; i++) {
      if (arrTasks[i].id === idTask) return true;
    }
    return false;
  }

  public getIdColByidTasks(arrColumn: Column[], idTask: string): string {
    let idColumn = '';
    for (let i = 0; i <= arrColumn.length - 1; i++) {
      if (this.isTaskInColumn(arrColumn[i].tasks, idTask))
        idColumn = arrColumn[i].id;
    }
    return idColumn;
  }

  public showEditModal$(): Observable<boolean> {
    return this.isShowEditTaskModal$.asObservable();
  }

  public openEditModal$() {
    this.userBoardService.stopScroll();
    this.isShowEditTaskModal$.next(true);
  }

  public closeEditModal$() {
    this.userBoardService.startScroll();
    this.isShowEditTaskModal$.next(false);
  }

  public getBoardId() {
    let board = this.store.select(selectBoards);
    board.subscribe((col) => this.setcheckIdBoard$(col.id));
  }

  private getColumnById(idColumn: string) {
    let column: Observable<Column> = this.store.select(
      selectColumnById(idColumn)
    );
    column.subscribe((col) => (this.checkColumn = col));
  }

  public editTask(idTask: string, idColumn: string) {
    this.getBoardId();
    this.getColumnById(idColumn);
    this.checkIdColumn = idColumn;
    this.checkIdTask = idTask;
    const arrTaskOneColumn = this.checkColumn.tasks;
    this.checkTask = arrTaskOneColumn.filter((task) => task.id === idTask)[0];
    this.openEditModal$();
  }

  updateTask(bodyRequest: UpdateOneTaskBody) {
    this.tasksDataService
      .updateTask(
        this.getValCheckIdBoard$(),
        this.checkIdColumn,
        this.checkIdTask,
        bodyRequest
      )
      .subscribe({
        next: () => {
          this.store.dispatch(invokeBoardAPI());
        },
        error: () =>
          this.notificationService.showError('errorHandling.something'),
      });
    this.closeEditModal$();
  }

  public hideTitleColumn(index: number, columnId: string) {
    this.getBoardId();
    this.checkIdColumn = columnId;
    this.getColumnById(columnId);
    const titleColumn = document.getElementsByClassName('title-column')[index];
    titleColumn.classList.add('hide-class');
    const editContainer =
      document.getElementsByClassName('edit-container')[index];
    editContainer.classList.add('visible-class');
  }

  public showTitleColumn(index: number) {
    const titleColumn = document.getElementsByClassName('title-column')[index];
    titleColumn.classList.remove('hide-class');
    const editContainer =
      document.getElementsByClassName('edit-container')[index];
    editContainer.classList.remove('visible-class');
  }

  public addNewTask(userTaskData: AddTaskEvent, idColumn: string) {
    this.getBoardId();
    const userId: string = this.localStorageService
      .getFromLocalStorage('userId')!
      .toString();
    userTaskData.value.userId = userId;
    const bodyRequest: CreateTaskBody = userTaskData.value;
    this.tasksDataService
      .createTask(this.getValCheckIdBoard$(), idColumn, bodyRequest)
      .subscribe({
        next: () => {
          this.store.dispatch(invokeBoardAPI());
        },
        error: () =>
          this.notificationService.showError('errorHandling.something'),
      });
  }

  public deleteTask(idTask: string, idColumn: string) {
    this.getBoardId();
    this.tasksDataService
      .deleteTask(this.getValCheckIdBoard$(), idColumn, idTask)
      .subscribe({
        next: () => {
          this.store.dispatch(invokeBoardAPI());
        },
        error: () =>
          this.notificationService.showError('errorHandling.something'),
      });
  }

  public addNewColumn(newColumnTitle: { title: string }) {
    this.getBoardId();
    this.columnDataService
      .createColumn(this.getValCheckIdBoard$(), newColumnTitle)
      .subscribe({
        next: () => {
          this.store.dispatch(invokeBoardAPI());
        },
        error: () =>
          this.notificationService.showError('errorHandling.something'),
      });
  }

  public deleteColumn(columnId: string) {
    this.getBoardId();
    this.columnDataService
      .deleteColumn(this.getValCheckIdBoard$(), columnId)
      .subscribe({
        next: () => {
          this.store.dispatch(invokeBoardAPI());
        },
        error: () =>
          this.notificationService.showError('errorHandling.something'),
      });
  }

  public updateTitleColumn(idColumn: string, bodyRequest: UpdateColumnBody) {
    this.spinnerService.show();
    this.columnDataService
      .updateColumn(this.getValCheckIdBoard$(), idColumn, bodyRequest)
      .subscribe({
        next: () => {
          this.store.dispatch(invokeBoardAPI());
        },
        error: (error) => {
          if (error.error.statusCode === 400) {
            this.notificationService.showError(
              'errorHandling.emptyColumnTittle'
            );
          } else {
            this.notificationService.showError('errorHandling.something');
          }
        },
      });
  }

  public getArrayUserTasks$(): Observable<UsersTasksProject> {
    return this.arrayUserTasks$.asObservable();
  }

  public getOneUserTasks(name: string): OneUsersTasks {
    return this.arrayUserTasks.filter((user) => user[0] === name)[0];
  }

  public createMapUser() {
    for (let user of this.userBoardService.allUsers) {
      this.map_UserId_Name.set(user.id, user.name);
      this.map_Users_Tasks.set(user.name, []);
    }
    for (let column of this.arrColumns) {
      for (let tasks of column.tasks) {
        let key = this.map_UserId_Name.get(tasks.userId);
        let value = this.map_Users_Tasks.get(key);
        value.push({
          column: column.title,
          task: tasks.title,
        });
        this.map_Users_Tasks.set(key, value);
      }
    }
    for (let [key, value] of this.map_Users_Tasks) {
      if (!value.length) this.map_Users_Tasks.delete(key);
    }
    this.arrayUserTasks = [...Array.from(this.map_Users_Tasks)];
    this.arrayUserTasks$.next([...Array.from(this.map_Users_Tasks)]);
  }
}
