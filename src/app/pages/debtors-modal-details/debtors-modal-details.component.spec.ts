import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtorsModalDetailsComponent } from './debtors-modal-details.component';

describe('DebtorsModalDetailsComponent', () => {
  let component: DebtorsModalDetailsComponent;
  let fixture: ComponentFixture<DebtorsModalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebtorsModalDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebtorsModalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
