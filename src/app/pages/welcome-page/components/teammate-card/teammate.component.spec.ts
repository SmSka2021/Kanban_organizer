import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemateComponent } from './teammate.component';

describe('TemateComponent', () => {
  let component: TemateComponent;
  let fixture: ComponentFixture<TemateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TemateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
