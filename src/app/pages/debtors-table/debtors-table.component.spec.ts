import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtorsTableComponent } from './debtors-table.component';

describe('DebtorsTableComponent', () => {
  let component: DebtorsTableComponent;
  let fixture: ComponentFixture<DebtorsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebtorsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebtorsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
