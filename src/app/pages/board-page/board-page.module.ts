import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BoardPageComponent } from './board-page.component';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { boardReducer } from './store/board.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BoardEffect } from './store/board.effect';
import { BoardContainerComponent } from './components/board-container/board-container.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { UserBoardService } from './services/user-board.service';
import { ItemBoardComponent } from './components/item-board/item-board.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { EditTaskService } from './services/edit-task.service';
import { DragnDropService } from './services/dragn-drop.service';
import { TranslocoModule } from '@ngneat/transloco';
import { ColorPanelComponent } from './components/color-panel/color-panel.component';
import { TasksUserComponent } from './components/tasks-user/tasks-user.component';
import { DialogModule } from './../../dialog/dialog.module';
import { NotFoundPagesComponent } from './../../shared/components/not-found-pages/not-found-pages.component';
import { SearchComponent } from './components/search/search.component';
import { FilterService } from './services/filter.service';
import { FilterPipe } from './pipes/filter.pipe';
const routes: Routes = [
  { path: ':id', component: BoardPageComponent },
  { path: '', component: NotFoundPagesComponent },
];
@NgModule({
  declarations: [
    BoardPageComponent,
    BoardContainerComponent,
    ItemBoardComponent,
    EditTaskComponent,
    ColorPanelComponent,
    TasksUserComponent,
    SearchComponent,
    FilterPipe,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('myboard', boardReducer),
    EffectsModule.forFeature([BoardEffect]),
    DragDropModule,
    FormsModule,
    TranslocoModule,
    DialogModule,
  ],
  providers: [
    UserBoardService,
    EditTaskService,
    DragnDropService,
    FilterService,
  ],
  exports: [EditTaskComponent],
})
export class BoardPageModule {}
