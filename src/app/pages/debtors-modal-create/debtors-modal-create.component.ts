import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { CreateDebtorDto, Debtor } from '../../models/debtor.interfaces';
import { DebtorService } from '../../services/debtors.service';

@Component({
  selector: 'app-debtors-modal-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './debtors-modal-create.component.html',
  styleUrl: './debtors-modal-create.component.scss'
})
export class DebtorsModalCreateComponent {
  debtorForm: FormGroup;
  isSubmitting = false;
  submitError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DebtorsModalCreateComponent>,
    private debtorService: DebtorService,
  ) {
    this.debtorForm = this.fb.group({
      companyName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      country: ['', [Validators.required]],
      cif: ['', [Validators.required, Validators.pattern(/^[A-HJ-NP-SUVW]\d{7}[0-9A-J]$/)]],
      debtLimit: [null, [Validators.required, Validators.min(0.01)]],
      contactPerson: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      mobile: ['', [Validators.pattern(/^\+?[0-9]{9,15}$/)]],
      observations: ['', [Validators.maxLength(500)]],
    });
  }

  onSubmit() {
    if (this.debtorForm.invalid || this.isSubmitting) {
      this.debtorForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitError = null;

    const rawValue = this.debtorForm.getRawValue();
    const debtorData: CreateDebtorDto = {
      ...rawValue,
      debtLimit: Number(rawValue.debtLimit),
      registrationDate: this.getLocalDateString(),
      mobile: this.normalizeOptionalText(rawValue.mobile),
      observations: this.normalizeOptionalText(rawValue.observations),
    };

    this.debtorService.createDebtor(debtorData).subscribe({
      next: (createdDebtor: Debtor) => {
        this.isSubmitting = false;
        this.dialogRef.close(createdDebtor);
      },
      error: () => {
        this.isSubmitting = false;
        this.submitError = 'No se pudo crear el deudor. Revisa los datos e intenta de nuevo.';
      },
    });
  }

  private normalizeOptionalText(value: string | null | undefined) {
    const trimmed = value?.trim();
    return trimmed ? trimmed : null;
  }

  private getLocalDateString() {
    const now = new Date();
    const timezoneOffsetMs = now.getTimezoneOffset() * 60000;
    return new Date(now.getTime() - timezoneOffsetMs).toISOString().slice(0, 10);
  }
}
