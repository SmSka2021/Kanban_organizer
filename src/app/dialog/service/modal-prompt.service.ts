import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ModalService {
  private oneFiledForm$ = new BehaviorSubject<boolean>(false);

  private isShowModal$ = new BehaviorSubject<boolean>(false);

  public isOneFiledForm(): boolean {
    return this.oneFiledForm$.getValue();
  }

  public setOneFiledForm() {
    this.oneFiledForm$.next(true);
  }

  public setTwoFiledForm() {
    this.oneFiledForm$.next(false);
  }

  public getIsShowModal$(): Observable<boolean> {
    return this.isShowModal$.asObservable();
  }

  public openEditModal$() {
    this.isShowModal$.next(true);
    document.body.style.overflowY = 'hidden';
  }

  public closeEditModal$() {
    this.isShowModal$.next(false);
    document.body.style.overflowY = 'auto';
  }
}
