import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtorsButtonCreateComponent } from './debtors-button-create.component';

describe('DebtorsButtonCreateComponent', () => {
  let component: DebtorsButtonCreateComponent;
  let fixture: ComponentFixture<DebtorsButtonCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebtorsButtonCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebtorsButtonCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
