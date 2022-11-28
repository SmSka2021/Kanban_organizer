import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnDestroy,
} from '@angular/core';
import { Tasks } from '../../../../shared/models/interfaces/interfaces-board';
import { LocalStorageService } from './../../../../shared/services/local-storage-service/local-storage.service';
import { UserBoardService } from './../../services/user-board.service';
import { colorGrey } from 'src/app/shared/constant/color';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';
import { ModalService } from './../../../../dialog/service/modal-prompt.service';
import { DragnDropService } from './../../services/dragn-drop.service';

@Component({
  selector: 'app-item-board',
  templateUrl: './item-board.component.html',
  styleUrls: ['./item-board.component.scss'],
})
export class ItemBoardComponent implements OnDestroy {
  subscription: Subscription;

  constructor(
    private localStorageService: LocalStorageService,
    private userBoardService: UserBoardService,
    private translocoService: TranslocoService,
    private modalService: ModalService,
    private dragnDropService: DragnDropService
  ) {
    this.subscription = translocoService.langChanges$.subscribe((lang) => {
      if (lang === 'en') {
        this.data = 'Delete task?';
      } else {
        this.data = 'Удалить задачу?';
      }
    });
  }

  public data = 'Delete task?';

  @Input() item!: Tasks;

  @Output() emitDeleteTask: EventEmitter<string> = new EventEmitter();

  @Output() emitEditTask: EventEmitter<string> = new EventEmitter();

  public deleteOneTask(event: any, idTask: string, userIdTask: string) {
    if (event.clicked) {
      const userId: string = this.localStorageService
        .getFromLocalStorage('userId')
        .toString();
      if (userId === userIdTask) {
        this.emitDeleteTask.emit(idTask);
      } else {
        this.modalService.openEditModal$();
      }
    }
  }

  public editTask(idTask: string) {
    this.dragnDropService.setIsDisabledDrop$(true);
    this.emitEditTask.emit(idTask);
  }

  public getNameUserById(idUser: string): string {
    return this.userBoardService.getUserNameById(idUser).name;
  }

  public getColorUserById(idUser: string): string {
    let colorUser = this.userBoardService.getUserNameById(idUser).color;
    if (colorUser) {
      return colorUser;
    } else {
      return colorGrey;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
