import { Component, OnInit, OnDestroy } from '@angular/core';
import { OneBoard } from 'src/app/shared/models/interfaces/interfaces-board';
import { MainPageService } from '../../services/main-page.service';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription, Observable } from 'rxjs';
import { ModalService } from './../../../../dialog/service/modal-prompt.service';
import { AddTaskEvent } from './../../../../shared/models/interfaces/interfaces-board';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
})
export class BoardListComponent implements OnInit, OnDestroy {
  private subscription: Subscription[] = [];

  public boards$: Observable<OneBoard[]> = this.mainPageService.getAllBoards$();

  public searchText: string;

  public sortOrder: string;

  public isEditModalOpened: boolean;

  public data = 'Delete project?';

  constructor(
    private mainPageService: MainPageService,
    private translocoService: TranslocoService,
    private modalService: ModalService
  ) {
    this.subscription.push(
      translocoService.langChanges$.subscribe((lang) => {
        if (lang === 'en') {
          this.data = 'Delete project?';
        } else {
          this.data = 'Удалить проект?';
        }
      })
    );
  }

  ngOnInit() {
    this.mainPageService.getAllBoard();

    this.subscription.push(
      this.mainPageService.searchWord.subscribe(
        (data) => (this.searchText = data)
      )
    );

    this.subscription.push(
      this.mainPageService.sortOrder.subscribe(
        (data) => (this.sortOrder = data)
      )
    );

    this.subscription.push(
      this.mainPageService.editModalStatus.subscribe(
        (data) => (this.isEditModalOpened = data)
      )
    );
  }

  public deleteBoard(confirmItem: any, id: string) {
    if (confirmItem.clicked) {
      this.mainPageService.deleteBoard(id);
    }
  }

  public addNewBoard(userTaskData: AddTaskEvent) {
    if (userTaskData) {
      this.mainPageService.createBoard(userTaskData);
    }
  }

  public setTwoFieldForm() {
    this.modalService.setTwoFiledForm();
  }

  public openEditModal(id: string) {
    document.body.style.overflowY = 'hidden';
    this.mainPageService.editModalStatus.next(true);
    this.mainPageService.boardId.next(id);
  }

  public sendBoardId(id: string) {
    this.mainPageService.saveIdCurrentBoard(id);
  }

  ngOnDestroy() {
    this.subscription.forEach((subs) => subs.unsubscribe());
  }
}
