import { Injectable } from '@angular/core';
import { ColumnDataService } from './../../../shared/services/colums-data-service/column-data.service';
import { TasksDataService } from 'src/app/shared/services/tasks-data-service/tasks-data.service';
import { EditTaskService } from './edit-task.service';
import {
  Column,
  Tasks,
  UpdateOneTaskBody,
  CreateTaskBody,
  CreateTaskResponse,
  UpdateColumnBody,
} from './../../../shared/models/interfaces/interfaces-board';
import { Store } from '@ngrx/store';
import { invokeBoardAPI } from './../store/board.actions';
import { LocalStorageService } from './../../../shared/services/local-storage-service/local-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationService } from '../../../shared/services/notification-service/notification.service';
@Injectable()
export class DragnDropService {
  constructor(
    private store: Store,
    private tasksDataService: TasksDataService,
    private columnDataService: ColumnDataService,
    private editTaskService: EditTaskService,
    private localStorageService: LocalStorageService,
    private spinnerService: NgxSpinnerService,
    private notificationService: NotificationService
  ) {}

  private isDisabledDrop$ = new BehaviorSubject<boolean>(false);

  public setIsDisabledDrop$(value: boolean) {
    this.isDisabledDrop$.next(value);
  }

  public getIsDisabledDrop$(): Observable<boolean> {
    return this.isDisabledDrop$.asObservable();
  }

  public dropColumn(newOrderColumn: number, checkCol: Column) {
    this.editTaskService.getBoardId();
    const bodyRequest: UpdateColumnBody = {
      title: checkCol.title,
      order: newOrderColumn,
    };
    this.columnDataService
      .updateColumn(
        this.editTaskService.getValCheckIdBoard$(),
        checkCol.id,
        bodyRequest
      )
      .subscribe({
        next: () => {
          this.store.dispatch(invokeBoardAPI());
        },
        error: () =>
          this.notificationService.showError('errorHandling.something'),
      });
  }

  public dropTasks(newOrderTask: number, idColumn: string, checkTask: Tasks) {
    this.spinnerService.show();
    this.editTaskService.getBoardId();
    const bodyRequest: UpdateOneTaskBody = {
      title: checkTask.title,
      order: newOrderTask,
      description: checkTask.description,
      userId: checkTask.userId,
      boardId: this.editTaskService.getValCheckIdBoard$(),
      columnId: idColumn,
    };
    this.tasksDataService
      .updateTask(
        this.editTaskService.getValCheckIdBoard$(),
        idColumn,
        checkTask.id,
        bodyRequest
      )
      .subscribe({
        next: () => {
          this.store.dispatch(invokeBoardAPI());
        },
        error: () =>
          this.notificationService.showError('errorHandling.something'),
      });
  }

  public dropTasksBetweenColumn(
    newOrderTask: number,
    idColumnNew: string,
    checkTask: Tasks,
    oneClass: string
  ) {
    this.spinnerService.show();
    const el = document.getElementsByClassName(oneClass)[0];
    el.remove();
    this.editTaskService.getBoardId();
    const idBoard: string = this.editTaskService.getValCheckIdBoard$();
    const idColumnPrev: string = this.editTaskService.getIdColByidTasks(
      this.editTaskService.arrColumns,
      checkTask.id
    );
    const bodyReqCreate: CreateTaskBody = {
      title: checkTask.title,
      description: checkTask.description,
      userId: checkTask.userId,
    };
    this.tasksDataService
      .createTask(idBoard, idColumnNew, bodyReqCreate)
      .subscribe({
        next: (res: CreateTaskResponse) => {
          const bodyReqUpdate: UpdateOneTaskBody = {
            title: res.title,
            order: newOrderTask,
            description: res.description,
            userId: res.userId,
            boardId: idBoard,
            columnId: idColumnNew,
          };
          this.tasksDataService
            .updateTask(idBoard, idColumnNew, res.id, bodyReqUpdate)
            .subscribe({
              next: () => {
                this.tasksDataService
                  .deleteTask(idBoard, idColumnPrev, checkTask.id)
                  .subscribe({
                    next: () => {
                      this.store.dispatch(invokeBoardAPI());
                    },
                    error: () =>
                      this.notificationService.showError(
                        'errorHandling.something'
                      ),
                  });
              },
              error: () =>
                this.notificationService.showError('errorHandling.something'),
            });
        },
        error: () =>
          this.notificationService.showError('errorHandling.something'),
      });
  }
}
