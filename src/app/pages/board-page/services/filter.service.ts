import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FilterService {
  private valueInputFilter = new BehaviorSubject<string>('');

  public getValueInputFilter(): string {
    return this.valueInputFilter.getValue();
  }

  public setValueInputFilter(val: string): void {
    this.valueInputFilter.next(val);
  }
}
