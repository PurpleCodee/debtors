import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DebtorsModalCreateComponent } from '../debtors-modal-create/debtors-modal-create.component';
import { Debtor } from '../../models/debtor.interfaces';

@Component({
  selector: 'app-debtors-button-create',
  standalone: true,
  imports: [MatButtonModule, MatIcon],
  templateUrl: './debtors-button-create.component.html',
  styleUrl: './debtors-button-create.component.scss'
})
export class DebtorsButtonCreateComponent {
  @Output() debtorCreated = new EventEmitter<Debtor>();

  constructor(private dialog: MatDialog) {}

  openCreateModal() {
    this.dialog.open(DebtorsModalCreateComponent, {
      panelClass: 'create-dialog',
    }).afterClosed().subscribe((createdDebtor: Debtor | undefined) => {
      if (createdDebtor) {
        this.debtorCreated.emit(createdDebtor);
      }
    });
  }

}
