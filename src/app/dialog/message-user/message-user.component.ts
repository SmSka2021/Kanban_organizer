import { Component, Input } from '@angular/core';
import { ModalService } from './../service/modal-prompt.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { union } from './../../shared/constant/union';

@Component({
  selector: 'app-message-user',
  templateUrl: './message-user.component.html',
  styleUrls: ['./message-user.component.scss'],
})
export class MessageUserComponent {
  @Input() title: string;

  public showModal$ = this.modalService.getIsShowModal$();

  public darkBackground = false;

  constructor(
    private modalService: ModalService,
    private router: Router,
    private location: Location
  ) {
    if (location.path() === union.welcome) {
      this.darkBackground = false;
    } else {
      this.darkBackground = true;
    }
  }

  public close() {
    this.modalService.closeEditModal$();
  }
}
