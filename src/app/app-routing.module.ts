import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPagesComponent } from './shared/components/not-found-pages/not-found-pages.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { EditProfileComponent } from './shared/components/edit-profile/edit-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./pages/welcome-page/welcome-page.module').then(
        (m) => m.WelcomePageModule
      ),
  },
  {
    path: 'auth/:tab',
    loadChildren: () =>
      import('./pages/auth-page/auth-page.module').then(
        (m) => m.AuthPageModule
      ),
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./pages/main-page/main-page.module').then(
        (m) => m.MainPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'board',
    loadChildren: () =>
      import('./pages/board-page/board-page.module').then(
        (m) => m.BoardPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./pages/global-search-pages/global-search.module').then(
        (m) => m.GlobalSearchModule
      ),
    canActivate: [AuthGuard],
  },

  { path: '**', component: NotFoundPagesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
