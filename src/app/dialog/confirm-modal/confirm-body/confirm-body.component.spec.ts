import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmBodyComponent } from './confirm-body.component';

describe('ConfirmBodyComponent', () => {
  let component: ConfirmBodyComponent;
  let fixture: ComponentFixture<ConfirmBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmBodyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
