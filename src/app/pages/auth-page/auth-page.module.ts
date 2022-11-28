import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPageComponent } from './auth-page.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SingUpComponent } from './components/sing-up/sing-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { DialogModule } from './../../dialog/dialog.module';

const routes: Routes = [{ path: '', component: AuthPageComponent }];
@NgModule({
  declarations: [AuthPageComponent, LoginComponent, SingUpComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    TranslocoModule,
    DialogModule,
  ],
})
export class AuthPageModule {}
