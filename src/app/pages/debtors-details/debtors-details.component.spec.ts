import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtorsDetailsComponent } from './debtors-details.component';

describe('DebtorsDetailsComponent', () => {
  let component: DebtorsDetailsComponent;
  let fixture: ComponentFixture<DebtorsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebtorsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebtorsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
