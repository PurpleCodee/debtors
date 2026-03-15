import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Debtor } from '../../models/debtor.interfaces';

@Component({
  selector: 'debtors-details',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule],
  templateUrl: './debtors-details.component.html',
  styleUrl: './debtors-details.component.scss'
})
export class DebtorsDetailsComponent {
  constructor(
    private dialogRef: MatDialogRef<DebtorsDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public debtor: Debtor,
  ) {}

  close() {
    this.dialogRef.close();
  }

  getCurrencySymbol(currency: Debtor['currency']) {
    switch (currency) {
      case 'USD':
        return '$';
      case 'GBP':
        return '£';
      case 'EUR':
      default:
        return '€';
    }
  }
}
