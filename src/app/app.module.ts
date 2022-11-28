import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundPagesComponent } from './shared/components/not-found-pages/not-found-pages.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderAddTokkenInterceptor } from './shared/interceptors/header-add-tokken.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from './shared/components/footer/footer.component';
import { appReducer } from './shared/store/app.reducer';
import { ModalConfirmComponent } from './shared/components/modal-confirm/modal-confirm.component';
import { ModalService } from './dialog/service/modal-prompt.service';
import { TranslocoRootModule } from './transloco-root.module';
import { UrlInterceptor } from './shared/interceptors/url.interceptor';
import { EditProfileComponent } from './shared/components/edit-profile/edit-profile.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from './dialog/dialog.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpErrorInterceptor } from './shared/interceptors/http-error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPagesComponent,
    HeaderComponent,
    FooterComponent,
    ModalConfirmComponent,
    EditProfileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    StoreModule.forRoot({ appState: appReducer }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    BrowserAnimationsModule,
    MatButtonModule,
    TranslocoRootModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    MatSnackBarModule,
  ],
  providers: [
    ModalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderAddTokkenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UrlInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
