// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-debtors-edit',
//   standalone: true,
//   imports: [],
//   templateUrl: './debtors-edit.component.html',
//   styleUrl: './debtors-edit.component.scss'
// })
// export class DebtorsEditComponent {

// }

// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';


// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatOptionModule } from '@angular/material/core';
// import { MatButtonModule } from '@angular/material/button';


// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-debtors-edit',
//   standalone: true,
//   imports: [
//     MatFormFieldModule,
//     MatInputModule,
//     MatSelectModule,
//     MatOptionModule,
//     MatButtonModule,
//     FormsModule,
//     MatDialogModule
//   ],
//   templateUrl: './debtors-edit.component.html',
//   styleUrl: './debtors-edit.component.scss'
// })
// export class DebtorsEditComponent {

//   constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

// }

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

// Para formularios reactivos
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-debtors-edit',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatDialogModule,
    CommonModule,

    // Sustituimos FormsModule por ReactiveFormsModule
    ReactiveFormsModule
  ],
  templateUrl: './debtors-edit.component.html',
  styleUrl: './debtors-edit.component.scss'
})
export class DebtorsEditComponent {

  editForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DebtorsEditComponent>,
    private fb: FormBuilder
  ) {

    // Creamos el formulario reactivo cargando los datos recibidos
    this.editForm = this.fb.group({
      companyName: [data.empresa, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(150)
      ]],

      country: [data.pais, [
        Validators.required
      ]],

      cif: [data.cif, [
        Validators.required,
        Validators.pattern(/^[A-HJ-NP-SUVW]\d{7}[0-9A-J]$/)
      ]],

      contactPerson: [data.contacto, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]],

      email: [data.email, [
        Validators.required,
        Validators.email
      ]],

      phone: [data.telefono, [
        Validators.required,
        Validators.pattern(/^[0-9]{9}$/)
      ]],

      mobile: [data.movil, [
        Validators.pattern(/^\+?[0-9]{9,15}$/)
      ]],

      currency: [data.moneda, [
        Validators.required
      ]],

      observations: [data.observaciones, [
        Validators.maxLength(500)
      ]]
    });
  }

  save() {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    // Devolvemos los datos editados al componente padre
    this.dialogRef.close(this.editForm.value);
  }
}
