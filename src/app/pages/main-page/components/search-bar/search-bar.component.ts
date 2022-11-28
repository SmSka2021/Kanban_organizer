import { Component } from '@angular/core';
import { MainPageService } from '../../services/main-page.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  public searchText = '';

  constructor(private mainPageService: MainPageService) {}

  public search(event: Event) {
    this.searchText = (event.target as HTMLInputElement).value;
    this.mainPageService.searchWord.next(this.searchText);
  }
}
