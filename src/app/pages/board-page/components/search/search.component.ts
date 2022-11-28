import { Component } from '@angular/core';
import { FilterService } from './../../services/filter.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  constructor(private filterService: FilterService) {}

  public valueInput = '';

  public changeInput(value: string) {
    this.filterService.setValueInputFilter(value);
  }
}
