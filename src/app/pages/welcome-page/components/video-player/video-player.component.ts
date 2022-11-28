import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';
import { ScreenEnum } from 'src/app/shared/models/enums/screen-enum';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
  private sub: Subscription[] = [];

  public widthVideo = ScreenEnum.small;

  public lang = 'en';

  public heightVideo = this.widthVideo / ScreenEnum.coefficient;

  public getScreenWidth = new BehaviorSubject<number>(0);

  constructor(private translocoService: TranslocoService) {
    this.sub.push(
      translocoService.langChanges$.subscribe((lang) => {
        if (lang === 'en') {
          this.lang = 'en';
        } else {
          this.lang = 'ru';
        }
      })
    );
  }

  ngOnInit() {
    this.getScreenWidth.next(window.innerWidth);
    this.sub.push(
      this.getScreenWidth.subscribe((value: number) => {
        if (value >= ScreenEnum.XXXL) this.settingVideo(ScreenEnum.XXL);
        if (value < ScreenEnum.XXXL && value >= ScreenEnum.XXL)
          this.settingVideo(ScreenEnum.XL);
        if (value < ScreenEnum.XXL && value >= ScreenEnum.XL)
          this.settingVideo(ScreenEnum.L);
        if (value < ScreenEnum.XL && value >= ScreenEnum.M)
          this.settingVideo(ScreenEnum.S);
        if (value < ScreenEnum.M && value >= ScreenEnum.XS)
          this.settingVideo(ScreenEnum.XXS);
        if (value < ScreenEnum.XS && value >= ScreenEnum.XXXS)
          this.settingVideo(ScreenEnum.small);
        if (value < ScreenEnum.XXXS && value >= ScreenEnum.mobile)
          this.settingVideo(ScreenEnum.min);
      })
    );
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth.next(window.innerWidth);
  }

  private settingVideo(widthScreen: number) {
    this.widthVideo = widthScreen;
    this.heightVideo = widthScreen / ScreenEnum.coefficient;
  }

  ngOnDestroy() {
    this.sub.forEach((s) => s.unsubscribe());
  }
}
