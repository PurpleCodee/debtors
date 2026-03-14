import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtorsEditComponent } from './debtors-edit.component';

describe('DebtorsEditComponent', () => {
  let component: DebtorsEditComponent;
  let fixture: ComponentFixture<DebtorsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebtorsEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebtorsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
