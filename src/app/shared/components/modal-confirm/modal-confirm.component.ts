import { Component } from '@angular/core';
import { ModalConfirmService } from './../../services/modal-confirm-service/modal-confirm.service';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss'],
})
export class ModalConfirmComponent {
  constructor(private modalConfirmService: ModalConfirmService) {}

  public showModal$ = this.modalConfirmService.getShowModalConfirm();

  public cancel() {
    this.modalConfirmService.setShowModalConfirm();
  }

  public confirm() {
    this.modalConfirmService.setShowModalConfirm();
  }
}
