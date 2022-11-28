import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EditTaskService } from './../../services/edit-task.service';
import { Store } from '@ngrx/store';
import { selectTitleBoard } from './../../store/board.selector';
import { UserBoardService } from './../../services/user-board.service';
import {
  UsersTasks,
  OneUsersTasks,
} from './../../../../shared/models/interfaces/interfaces-board';

@Component({
  selector: 'app-tasks-user',
  templateUrl: './tasks-user.component.html',
  styleUrls: ['./tasks-user.component.scss'],
})
export class TasksUserComponent implements OnInit {
  constructor(
    private editTaskService: EditTaskService,
    private userBoardService: UserBoardService,
    private store: Store
  ) {}

  @Input() public userTasks: OneUsersTasks;

  nameUser = '';

  title$: Observable<string> = this.store.select(selectTitleBoard);

  arrTasksOneUser = new BehaviorSubject<UsersTasks>([]);

  ngOnInit() {
    this.arrTasksOneUser.next(this.userTasks[1]);
    this.nameUser = this.userTasks[0];
  }

  public close() {
    this.editTaskService.setIsOpenTasksOneUser$();
    this.userBoardService.startScroll();
  }
}
