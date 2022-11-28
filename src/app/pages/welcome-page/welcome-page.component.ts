/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AdvantagesData,
  TeamData,
} from '../../shared/models/interfaces/welcome-page';
import { teamData } from '../../shared/constant/team-data';
import { WelcomeDataService } from './services/welcome-data.service';
import { Subscription } from 'rxjs';
import { ModalService } from './../../dialog/service/modal-prompt.service';
import { TranslocoService } from '@ngneat/transloco';
import { Video } from './../../shared/models/interfaces/welcome-page';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit, OnDestroy {
  private sub: Subscription[] = [];

  public advantagesData: AdvantagesData[];

  public teemData: TeamData[];

  public message: string = '';

  constructor(
    private welcomeData: WelcomeDataService,
    private modalService: ModalService,
    private translocoService: TranslocoService
  ) {
    this.sub.push(
      translocoService.langChanges$.subscribe((lang) => {
        if (lang === 'en') {
          this.message =
            'Please login and you will be able to create your project';
        } else {
          this.message =
            'Пожалуйста, зарегистируйтесь и Вы сможете создать новый проект';
        }
      })
    );
  }

  ngOnInit() {
    this.sub.push(
      this.welcomeData
        .setAdvantagesData()
        .subscribe((data) => (this.advantagesData = data))
    );
    this.sub.push(
      this.welcomeData
        .setTeamData(teamData)
        .subscribe((data) => (this.teemData = data))
    );
  }

  public showMessage() {
    this.modalService.openEditModal$();
  }

  ngOnDestroy() {
    this.sub.forEach((s) => s.unsubscribe());
  }
}
