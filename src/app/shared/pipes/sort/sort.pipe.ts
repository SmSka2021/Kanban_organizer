import { Pipe, PipeTransform } from '@angular/core';
import { OneBoard } from '../../models/interfaces/interfaces-board';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(boards: OneBoard[], sortOrder: string) {
    if (boards) {
      let multiplier = 1;

      if (sortOrder === 'by Z-A' || sortOrder === 'от Я-А') {
        multiplier = -1;
      }

      boards.sort((a, b) => {
        if (a.title > b.title) {
          return 1 * multiplier;
        } else if (a.title < b.title) {
          return -1 * multiplier;
        } else {
          return 0;
        }
      });
    }

    return boards;
  }
}
