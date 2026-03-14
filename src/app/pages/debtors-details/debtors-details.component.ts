// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-debtors-details',
//   standalone: true,
//   imports: [],
//   templateUrl: './debtors-details.component.html',
//   styleUrl: './debtors-details.component.scss'
// })
// export class DebtorsDetailsComponent {

//   closeModal() {
//     const host = (this as any).hostElement || this.getHostElement();
//     host.remove();
//   }

//   getHostElement() {
//     return (this as any).el?.nativeElement || document.querySelector('debtors-details');
//   }
// }

import { Component, ElementRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'debtors-details',
  standalone: true,
  imports: [MatDialogModule, MatIconModule, MatButtonModule],
  templateUrl: './debtors-details.component.html',
  styleUrl: './debtors-details.component.scss'
})
export class DebtorsDetailsComponent {

  constructor(private el: ElementRef) {}

  close() {
    this.el.nativeElement.remove();
  }
}


//------------------------TS CON EL MAT DIALOG REF----------------------------------

// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'debtors-details',
//   standalone: true,
//   imports: [
//     CommonModule,
//     MatDialogModule,
//     MatIconModule,
//     MatButtonModule
//   ],
//   templateUrl: './debtors-details.component.html',
//   styleUrl: './debtors-details.component.scss'
// })
// export class DebtorsDetailsComponent {

//   constructor(
//     private dialogRef: MatDialogRef<DebtorsDetailsComponent>,
//     @Inject(MAT_DIALOG_DATA) public debtor: any
//   ) {}

//   close() {
//     this.dialogRef.close();
//   }
// }



