import { Component } from '@angular/core';
import { SearchService } from './../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  constructor(private searchService: SearchService) {}

  public valueInput = '';

  public changeInput(value: string) {
    this.searchService.setValueInputFilter(value);
  }
}
