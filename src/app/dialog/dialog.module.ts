import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { AppConfirmComponent } from './confirm-modal/app-confirm.component';
import { ConfirmBodyComponent } from './confirm-modal/confirm-body/confirm-body.component';
import { DialogBodyComponent } from './prompt-modal/prompt-body/dialog-body.component';
import { DialogComponent } from './prompt-modal/dialog.component';
import { TranslocoModule } from '@ngneat/transloco';
import { MessageUserComponent } from './message-user/message-user.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { ClickStopPropagationDirective } from './../shared/directives/stop-propagation';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

const MaterialModules = [
  MatToolbarModule,
  MatExpansionModule,
  MatDialogModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSelectModule,
  MatCheckboxModule,
  MatChipsModule,
  MatTableModule,
  MatMenuModule,
  MatTooltipModule,
  MatTabsModule,
];
@NgModule({
  declarations: [
    AppConfirmComponent,
    ConfirmBodyComponent,
    DialogBodyComponent,
    DialogComponent,
    MessageUserComponent,
    ClickStopPropagationDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModules,
    TranslocoModule,
  ],
  exports: [
    MaterialModules,
    AppConfirmComponent,
    ConfirmBodyComponent,
    DialogBodyComponent,
    DialogComponent,
    MessageUserComponent,
    ClickStopPropagationDirective,
  ],
})
export class DialogModule {}
