import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  ColumnColor,
  Tasks,
  Column,
  AddTaskEvent,
  UpdateColumnBody,
} from './../../../../shared/models/interfaces/interfaces-board';

import { ModalService } from '../../../../dialog/service/modal-prompt.service';
import { UserBoardService } from './../../services/user-board.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { selectColumnsBoard } from './../../store/board.selector';
import { EditTaskService } from './../../services/edit-task.service';
import { DragnDropService } from './../../services/dragn-drop.service';
import { LocalStorageService } from './../../../../shared/services/local-storage-service/local-storage.service';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';
import { FilterService } from './../../services/filter.service';

@Component({
  selector: 'app-board-container',
  templateUrl: './board-container.component.html',
  styleUrls: ['./board-container.component.scss'],
})
export class BoardContainerComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(
    private countFiledFormService: ModalService,
    private editTaskService: EditTaskService,
    private store: Store,
    private dragnDropService: DragnDropService,
    public userBoardService: UserBoardService,
    private localStorageService: LocalStorageService,
    private translocoService: TranslocoService,
    public filterService: FilterService
  ) {
    this.subscription = translocoService.langChanges$.subscribe((lang) => {
      if (lang === 'en') {
        this.data = 'Delete column?';
      } else {
        this.data = 'Удалить клонку?';
      }
    });
  }

  public data = 'Delete column?';

  public columns$ = this.editTaskService.getAllColumn$();

  public isShow$ = this.editTaskService.showEditModal$();

  public isDisabledDrop$ = this.dragnDropService.getIsDisabledDrop$();

  public colorIdColumn: ColumnColor = {};

  private isOpenEditColumn = false;

  public titleColumn = '';

  ngOnInit() {
    this.store
      .select(selectColumnsBoard)
      // eslint-disable-next-line @ngrx/no-store-subscription
      .subscribe((columns) => {
        this.editTaskService.setAllColumn$(columns);
      });

    this.colorIdColumn =
      this.localStorageService.getColorCulumnLocalStorage('colorColumn') || {};
  }

  public onDeleteTask(idTask: string, idColumn: string) {
    this.editTaskService.deleteTask(idTask, idColumn);
  }

  public addNewTask(userTaskData: AddTaskEvent, idColumn: string) {
    if (userTaskData) {
      this.editTaskService.addNewTask(userTaskData, idColumn);
    }
  }

  public editTask(idTask: string, idColumn: string) {
    this.editTaskService.editTask(idTask, idColumn);
  }

  public deleteColumn(confirmItem: any, columnId: string) {
    if (confirmItem.clicked) {
      this.isOpenEditColumn = false;
      this.editTaskService.deleteColumn(columnId);
    }
  }

  public setTwoFieldForm() {
    this.countFiledFormService.setTwoFiledForm();
  }

  public hideTitleColumn(index: number, columnId: string) {
    if (!this.isOpenEditColumn) {
      this.isOpenEditColumn = true;
      this.editTaskService.hideTitleColumn(index, columnId);
      this.titleColumn = this.editTaskService.checkColumn.title;
    }
  }

  public showTitleColumn(index: number) {
    this.isOpenEditColumn = false;
    this.editTaskService.showTitleColumn(index);
  }

  public updateTitleColumn(idColumn: string, index: number) {
    const item = this.titleColumn.trim();
    if (item.length <= 2 || item.length > 20) {
      return;
    } else {
      this.showTitleColumn(index);
      const orderColumn = this.editTaskService.checkColumn.order;
      const bodyRequest: UpdateColumnBody = {
        title: this.titleColumn,
        order: orderColumn,
      };
      this.editTaskService.updateTitleColumn(idColumn, bodyRequest);
    }
  }

  public drop(event: CdkDragDrop<Tasks[]>, idColumn: string) {
    const classesCheckElement = event.item.element.nativeElement.className;
    const oneClass = classesCheckElement.split(' ')[1];
    if (event.previousContainer === event.container) {
      moveItemInArray(
        Array.from(event.container.data),
        event.previousIndex,
        event.currentIndex
      );
      const checkTask = event.item.dropContainer.data[event.previousIndex];
      const nextOrder = event.currentIndex;
      this.dragnDropService.dropTasks(nextOrder + 1, idColumn, checkTask);
    } else {
      transferArrayItem(
        Array.from(event.previousContainer.data),
        Array.from(event.container.data),
        event.previousIndex,
        event.currentIndex
      );
      const checkTask: Tasks =
        event.previousContainer.data[event.previousIndex];
      const nextOrder: number = event.currentIndex + 1;
      this.dragnDropService.dropTasksBetweenColumn(
        nextOrder,
        idColumn,
        checkTask,
        oneClass
      );
    }
  }

  public ondrop(event: CdkDragDrop<Column[]>) {
    if (event.previousContainer === event.container) {
      if (event) {
        moveItemInArray(
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
      const checkColumn = event.item.dropContainer.data[event.currentIndex];
      const nextOrder = event.currentIndex;
      this.dragnDropService.dropColumn(nextOrder + 1, checkColumn);
    }
  }

  public colorChange(color: string, columnId: string) {
    this.colorIdColumn[columnId] = color;
    this.localStorageService.saveColorCulumnLocalStorage(this.colorIdColumn);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
