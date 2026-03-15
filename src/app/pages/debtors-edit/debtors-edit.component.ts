import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Debtor, UpdateDebtorDto } from '../../models/debtor.interfaces';
import { DebtorService } from '../../services/debtors.service';

@Component({
  selector: 'app-debtors-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './debtors-edit.component.html',
  styleUrl: './debtors-edit.component.scss'
})
export class DebtorsEditComponent {
  editForm: FormGroup;
  isSubmitting = false;
  submitError: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Debtor,
    private dialogRef: MatDialogRef<DebtorsEditComponent>,
    private fb: FormBuilder,
    private debtorService: DebtorService,
  ) {
    this.editForm = this.fb.group({
      companyName: [data.companyName ?? '', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      country: [data.country ?? '', [Validators.required]],
      cif: [data.cif ?? '', [Validators.required, Validators.pattern(/^[A-HJ-NP-SUVW]\d{7}[0-9A-J]$/)]],
      debtLimit: [data.debtLimit ?? null, [Validators.required, Validators.min(0.01)]],
      contactPerson: [data.contactPerson ?? '', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: [data.email ?? '', [Validators.required, Validators.email, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
      phone: [data.phone ?? '', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      mobile: [data.mobile ?? '', [Validators.pattern(/^\+?[0-9]{9,15}$/)]],
      observations: [data.observations ?? '', [Validators.maxLength(500)]],
    });
  }

  save() {
    if (this.editForm.invalid || this.isSubmitting) {
      this.editForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitError = null;

    const payload: UpdateDebtorDto = {
      ...this.editForm.getRawValue(),
      debtLimit: Number(this.editForm.getRawValue().debtLimit),
      mobile: this.normalizeOptionalText(this.editForm.getRawValue().mobile),
      observations: this.normalizeOptionalText(this.editForm.getRawValue().observations),
    };

    this.debtorService.updateDebtor(this.data.id, payload).subscribe({
      next: (updatedDebtor) => {
        Object.assign(this.data, updatedDebtor);
        this.isSubmitting = false;
        this.dialogRef.close(updatedDebtor);
      },
      error: () => {
        this.isSubmitting = false;
        this.submitError = 'No se pudo actualizar el deudor. Revisa los datos e intenta de nuevo.';
      },
    });
  }

  private normalizeOptionalText(value: string | null | undefined) {
    const trimmed = value?.trim();
    return trimmed ? trimmed : null;
  }
}
