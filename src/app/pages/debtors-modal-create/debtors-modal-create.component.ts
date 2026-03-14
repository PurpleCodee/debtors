import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

// Necesario para formularios reactivos 
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-debtors-modal-create',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,

    //Formulario reactivos
    CommonModule,
    ReactiveFormsModule

  ],
  templateUrl: './debtors-modal-create.component.html',
  styleUrl: './debtors-modal-create.component.scss'
})
export class DebtorsModalCreateComponent {

  debtorForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DebtorsModalCreateComponent> //cerrar modal

    //Servicio
    //private debtorService: DebtorService 

  ) {

    this.debtorForm = this.fb.group({

      companyName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(150)
      ]],

      country: ['', [
        Validators.required
      ]],

      cif: ['', [
        Validators.required,
        Validators.pattern(/^[A-HJ-NP-SUVW]\d{7}[0-9A-J]$/)
      ]],

      contactPerson: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]],

      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      ]],

      phone: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{9}$/)
      ]],

      mobile: ['', [
        Validators.pattern(/^\+?[0-9]{9,15}$/)
      ]],

      currency: ['', [
        Validators.required
      ]],

      observations: ['', [
        Validators.maxLength(500)
      ]]
    });
  }

  onSubmit() {
    if (this.debtorForm.invalid) {
      this.debtorForm.markAllAsTouched();
      return;
    }

    console.log('Formulario válido:', this.debtorForm.value);

    //Cerrar dialogo
    this.dialogRef.close(this.debtorForm.value);
  }


  //--------ONSUBMIT CON BACKEND----------
//   onSubmit() {
//   if (this.debtorForm.invalid) {
//     this.debtorForm.markAllAsTouched();
//     return;
//   }

//   const debtorData = this.debtorForm.value;

//   this.debtorService.createDebtor(debtorData).subscribe({
//     next: (response) => {
//       console.log('Deudor creado:', response);

    
//       this.dialogRef.close(response);
//     },
//     error: (err) => {
//       console.error('Error al crear deudor:', err);
  
//     }
//   });
// }

}
