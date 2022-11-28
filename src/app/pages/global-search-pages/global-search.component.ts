import { Component, OnInit } from '@angular/core';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.scss'],
})
export class GlobalSearchComponent implements OnInit {
  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.getAllUsers();
    this.searchService.getAllBoard();
  }
}
