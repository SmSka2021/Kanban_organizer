import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvantageCardComponent } from './advantage-card.component';

describe('AdvantageCardComponent', () => {
  let component: AdvantageCardComponent;
  let fixture: ComponentFixture<AdvantageCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvantageCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdvantageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
