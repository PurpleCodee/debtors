import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtorsModalCreateComponent } from './debtors-modal-create.component';

describe('DebtorsModalCreateComponent', () => {
  let component: DebtorsModalCreateComponent;
  let fixture: ComponentFixture<DebtorsModalCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebtorsModalCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebtorsModalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
