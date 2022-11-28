import { Pipe, PipeTransform } from '@angular/core';
import { Column } from './../../../shared/models/interfaces/interfaces-board';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(columns: Column[], searchText: string): Column[] {
    if (columns) {
      if (columns.length === 0 || searchText === '') {
        return columns;
      } else {
        const newArrColumn = [];
        for (let column of columns) {
          const newCol: any = {};
          newCol.id = column.id;
          newCol.title = column.title;
          newCol.order = column.order;
          newCol.tasks = column.tasks.filter(
            (task) =>
              task.title.toLowerCase().includes(searchText.toLowerCase()) ||
              task.description.toLowerCase().includes(searchText.toLowerCase())
          );
          newArrColumn.push(newCol);
        }
        return newArrColumn;
      }
    }
    return columns;
  }
}
