import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalConfirmService {
  private showModalConfirm$ = new BehaviorSubject<boolean>(false);

  public getShowModalConfirm(): Observable<boolean> {
    return this.showModalConfirm$.asObservable();
  }

  public setShowModalConfirm(): void {
    const newValue = !this.showModalConfirm$.getValue();
    this.showModalConfirm$.next(newValue);
  }
}
