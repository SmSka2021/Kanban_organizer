import { Component, OnDestroy, OnInit } from '@angular/core';
import { BoardsDataService } from 'src/app/shared/services/boards-data-service/boards-data.service';
import { MainPageService } from '../../services/main-page.service';
import { OneBoard } from 'src/app/shared/models/interfaces/interfaces-board';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../../../shared/services/notification-service/notification.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit, OnDestroy {
  private subscription: Subscription[] = [];

  public title: string;

  public description: string;

  public id: string;

  constructor(
    private boardsDataService: BoardsDataService,
    private mainPageService: MainPageService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.subscription.push(
      this.mainPageService.boardId.subscribe((data) => (this.id = data))
    );

    this.subscription.push(
      this.mainPageService.getAllBoards$().subscribe((data) => {
        const form = data.filter((item) => this.id === item.id);
        this.title = form[0].title;
        this.description = form[0].description;
      })
    );
  }

  public edit() {
    document.body.style.overflowY = 'auto';
    this.boardsDataService
      .updateBoard(this.id, {
        title: this.title,
        description: this.description,
      })
      .subscribe((item) => {
        if (item) {
          this.boardsDataService.getAllBoards().subscribe({
            next: (data: OneBoard[]) => {
              this.mainPageService.setAllBoards$(data);
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
      });
    this.cancel();
  }

  public cancel() {
    document.body.style.overflowY = 'auto';
    this.mainPageService.editModalStatus.next(false);
  }

  ngOnDestroy() {
    this.subscription.forEach((subs) => subs.unsubscribe());
  }
}
