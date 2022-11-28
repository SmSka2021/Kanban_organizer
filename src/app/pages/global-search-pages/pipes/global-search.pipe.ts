import { Pipe, PipeTransform } from '@angular/core';
import { BoardAndAllTasks } from './../../../shared/models/interfaces/interfaces-board';
import { SearchService } from './../services/search.service';

@Pipe({
  name: 'globalSearch',
})
export class GlobalSearchPipe implements PipeTransform {
  constructor(private searchService: SearchService) {}

  transform(
    boards: BoardAndAllTasks[],
    searchText: string
  ): BoardAndAllTasks[] | null {
    if (boards && searchText.length >= 2) {
      let result = boards.filter(
        (board) =>
          board.taskTitle.toLowerCase().includes(searchText.toLowerCase()) ||
          board.taskDescription
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          board.userLogin.toLowerCase().includes(searchText.toLowerCase())
      );
      if (!result.length) {
        this.searchService.setIsResultSearch$(false);
        return null;
      } else {
        this.searchService.setIsResultSearch$(true);
        return result;
      }
    }
    this.searchService.setIsResultSearch$(true);
    return null;
  }
}
