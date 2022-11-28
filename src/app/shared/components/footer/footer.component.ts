import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { union } from '../../constant/union';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  currentRoute: string;

  imgSourceSv: string;

  imgSourceIv: string;

  imgSourceUl: string;

  imgSourceRS: string;

  bgColor: string;

  constructor(private router: Router, private location: Location) {
    router.events.subscribe(() => {
      if (location.path() != '') {
        this.currentRoute = location.path();
        if (
          this.currentRoute === union.welcome ||
          this.currentRoute === union.auth ||
          this.currentRoute === union.login ||
          this.currentRoute === union.signup
        ) {
          this.imgSourceSv = union.darkSv;
          this.imgSourceIv = union.darkIv;
          this.imgSourceUl = union.darkUl;
          this.imgSourceRS = union.darkRS;
          this.bgColor = union.lightBgColor;
        } else {
          this.imgSourceSv = union.lightSv;
          this.imgSourceIv = union.lightIv;
          this.imgSourceUl = union.lightUl;
          this.imgSourceRS = union.lightRs;
          this.bgColor = union.darkBgColor;
        }
      }
    });
  }
}
