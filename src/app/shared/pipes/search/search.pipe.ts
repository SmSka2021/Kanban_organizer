import { Pipe, PipeTransform } from '@angular/core';
import { OneBoard } from '../../models/interfaces/interfaces-board';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(boards: OneBoard[], searchText: string) {
    if (boards) {
      if (boards.length === 0 || searchText === '') {
        return boards;
      } else {
        return boards.filter((board) => {
          return (
            board.title.toLowerCase().includes(searchText.toLowerCase()) ||
            board.description.toLowerCase().includes(searchText.toLowerCase())
          );
        });
      }
    }

    return boards;
  }
}
