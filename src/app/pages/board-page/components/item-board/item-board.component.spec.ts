import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemBoardComponent } from './item-board.component';

describe('ItemBoardComponent', () => {
  let component: ItemBoardComponent;
  let fixture: ComponentFixture<ItemBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemBoardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
