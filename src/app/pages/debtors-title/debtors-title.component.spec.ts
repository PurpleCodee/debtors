import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtorsTitleComponent } from './debtors-title.component';

describe('DebtorsTitleComponent', () => {
  let component: DebtorsTitleComponent;
  let fixture: ComponentFixture<DebtorsTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebtorsTitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebtorsTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
