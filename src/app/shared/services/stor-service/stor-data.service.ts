import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIdBoard, selectUserId } from './../../store/app.selector';

@Injectable({
  providedIn: 'root',
})
export class StorDataService {
  constructor(private store: Store) {}

  public getIdCurrentBoard(): string {
    let id = '';
    const idBoard = this.store.select(selectIdBoard);
    idBoard.subscribe((data) => (id = data));
    return id;
  }

  public getIdUser(): string {
    let id = '';
    const idUser = this.store.select(selectUserId);
    idUser.subscribe((data) => (id = data));
    return id;
  }
}
