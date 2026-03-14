import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
    private dialogRef: MatDialogRef<DebtorsModalDetailsComponent>
  ) {}

  openDetails() {
    // 1. Cerrar esta modal
    this.dialogRef.close();

    // 2. Abrir la modal de detalles
    this.dialog.open(DebtorsDetailsComponent, {
      panelClass: 'details-dialog'
    });
  }

  openEdit() {
  // Cerrar esta modal de acciones
  this.dialogRef.close();

  // Datos fake por ahora (luego vendrán del backend)
  const fakeDebtor = {
    empresa: 'Logística Delta Norte SL',
    pais: 'ES',
    cif: 'B45891234',
    contacto: 'Marina Gómez Perez',
    email: 'marina@example.com',
    telefono: '948376674',
    movil: '+34 647589398',
    moneda: 'EUR',
    observaciones: 'Cliente recurrente. Buen histórico.'
  };

  // Abrir la modal de edición
  this.dialog.open(DebtorsEditComponent, {
    width: '600px',
    data: fakeDebtor
  });
}

}

