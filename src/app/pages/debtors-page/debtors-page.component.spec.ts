import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtorsPageComponent } from './debtors-page.component';

describe('DebtorsPageComponent', () => {
  let component: DebtorsPageComponent;
  let fixture: ComponentFixture<DebtorsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebtorsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebtorsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
