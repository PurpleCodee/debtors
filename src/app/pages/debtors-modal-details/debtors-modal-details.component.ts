import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Debtor } from '../../models/debtor.interfaces';
import { DebtorsDetailsComponent } from '../debtors-details/debtors-details.component';
import { DebtorsEditComponent } from '../debtors-edit/debtors-edit.component';

@Component({
  selector: 'app-debtors-modal-details',
  standalone: true,
  imports: [],
  templateUrl: './debtors-modal-details.component.html',
  styleUrl: './debtors-modal-details.component.scss'
})
export class DebtorsModalDetailsComponent {
  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DebtorsModalDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public debtor: Debtor,
  ) {}

  openDetails() {
    this.dialogRef.close();

    this.dialog.open(DebtorsDetailsComponent, {
      panelClass: 'details-dialog',
      data: this.debtor,
    });
  }

  openEdit() {
    this.dialogRef.close();

    this.dialog.open(DebtorsEditComponent, {
      width: '600px',
      data: this.debtor,
    }).afterClosed().subscribe((updatedDebtor: Debtor | undefined) => {
      if (updatedDebtor) {
        Object.assign(this.debtor, updatedDebtor);
      }
    });
  }
}
