import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  AddColumn,
  UsersTasksProject,
  OneUsersTasks,
} from './../../shared/models/interfaces/interfaces-board';
import { ModalService } from '../../dialog/service/modal-prompt.service';
import { EditTaskService } from './services/edit-task.service';
import { UserBoardService } from './services/user-board.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  selectDescriptionBoard,
  selectTitleBoard,
} from './store/board.selector';
@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
  constructor(
    private store: Store,
    private editTaskService: EditTaskService,
    private userBoardService: UserBoardService,
    private countFiledFormService: ModalService,
    private activRouter: ActivatedRoute,
    private spinnerService: NgxSpinnerService
  ) {}

  public title$ = this.store.select(selectTitleBoard);

  public description$ = this.store.select(selectDescriptionBoard);

  public today: number = Date.now();

  public openTasksOneUser = this.editTaskService.getIsOpenTasksOneUser$();

  public usersTask$: Observable<UsersTasksProject> =
    this.editTaskService.getArrayUserTasks$();

  public checkUser: OneUsersTasks;

  public setCheckUser(name: string) {
    this.checkUser = this.editTaskService.getOneUserTasks(name);
    this.editTaskService.setIsOpenTasksOneUser$();
    this.userBoardService.stopScroll();
  }

  ngOnInit(): void {
    const idBoard = this.activRouter.snapshot.paramMap.get('id') as string;
    this.editTaskService.setcheckIdBoard$(idBoard);
    this.userBoardService.getAllUsers();
  }

  public setOneFieldForm() {
    this.countFiledFormService.setOneFiledForm();
  }

  public onAddColumn(newTitle: AddColumn) {
    if (newTitle.clicked === 'submit') {
      this.editTaskService.addNewColumn(newTitle.value);
    }
  }

  public colorUser(nameUser: string): string {
    return this.userBoardService.getUserColorByName(nameUser);
  }

  public isEnter() {
    this.spinnerService.show();
  }
}
