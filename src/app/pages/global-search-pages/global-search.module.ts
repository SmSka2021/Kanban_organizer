import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalSearchComponent } from './global-search.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { DialogModule } from './../../dialog/dialog.module';
import { SearchComponent } from './../global-search-pages/components/search/search.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { GlobalSearchPipe } from './pipes/global-search.pipe';
const routes: Routes = [{ path: '', component: GlobalSearchComponent }];

@NgModule({
  declarations: [
    GlobalSearchComponent,
    SearchComponent,
    SearchResultComponent,
    GlobalSearchPipe,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    TranslocoModule,
    DialogModule,
  ],
})
export class GlobalSearchModule {}
