import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePageComponent } from './welcome-page.component';
import { RouterModule, Routes } from '@angular/router';
import { AdvantageCardComponent } from './components/advantage-card/advantage-card.component';
import { TeammateComponent } from './components/teammate-card/teammate.component';
import { TranslocoModule } from '@ngneat/transloco';
import { DialogModule } from './../../dialog/dialog.module';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { YouTubePlayerModule } from '@angular/youtube-player';

const routes: Routes = [{ path: '', component: WelcomePageComponent }];

@NgModule({
  declarations: [
    WelcomePageComponent,
    AdvantageCardComponent,
    TeammateComponent,
    VideoPlayerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslocoModule,
    DialogModule,
    YouTubePlayerModule,
  ],
})
export class WelcomePageModule {}
