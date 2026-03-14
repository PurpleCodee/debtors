// import {
//   Component,
//   ViewChild,
//   AfterViewInit,
// } from '@angular/core';
// import { MatTableDataSource, MatTableModule } from '@angular/material/table';
// import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
// import { DatePipe } from '@angular/common';
// import { Debtor } from './debtor.table.interface';
// import { MatIconButton } from '@angular/material/button';
// import { MatDialog } from '@angular/material/dialog';
// import { MatIcon } from '@angular/material/icon';
// import { DebtorsModalDetailsComponent } from '../debtors-modal-details/debtors-modal-details.component';

// @Component({
//   selector: 'app-debtors-table',
//   standalone: true,
//   imports: [
//     MatTableModule,
//     MatPaginatorModule,
//     DatePipe,
//     MatIconButton,
//     MatIcon,
//   ],
//   templateUrl: './debtors-table.component.html',
//   styleUrls: ['./debtors-table.component.scss'],
// })
// export class DebtorsTableComponent implements AfterViewInit {
//   constructor(private dialog: MatDialog) {}

//   openModal(event: MouseEvent, element: any) {
//     const target = event.currentTarget as HTMLElement;
//     const rect = target.getBoundingClientRect();

//     this.dialog.open(DebtorsModalDetailsComponent, {
//       width: '100px',
//       maxWidth: 'none',

//       position: {
//         top: `${rect.bottom + 5}px`,
//         left: `${rect.left - 130}px`,
//       },
//       data: element,
//       panelClass: 'actions-dialog',
//     });
//   }

//   displayedColumns: string[] = [
//     'nombre',
//     'cif',
//     'limiteDeuda',
//     'email',
//     'fechaAlta',
//     'acciones',
//   ];

//   dataSource = new MatTableDataSource<Debtor>([
//     {
//       nombre: 'Empresa A',
//       cif: 'A12345678',
//       limiteDeuda: 5000,
//       email: 'a@empresa.com',
//       fechaAlta: new Date(),
//     },
//     {
//       nombre: 'Empresa B',
//       cif: 'B87654321',
//       limiteDeuda: 8000,
//       email: 'b@empresa.com',
//       fechaAlta: new Date(),
//     },
//     {
//       nombre: 'Empresa C',
//       cif: 'C11223344',
//       limiteDeuda: 12000,
//       email: 'contacto@empresaC.com',
//       fechaAlta: new Date('2023-01-15'),
//     },
//     {
//       nombre: 'Empresa D',
//       cif: 'D55667788',
//       limiteDeuda: 3000,
//       email: 'info@empresaD.com',
//       fechaAlta: new Date('2022-11-03'),
//     },
//     {
//       nombre: 'Empresa E',
//       cif: 'E99887766',
//       limiteDeuda: 15000,
//       email: 'admin@empresaE.com',
//       fechaAlta: new Date('2021-07-22'),
//     },
//     {
//       nombre: 'Empresa F',
//       cif: 'F44332211',
//       limiteDeuda: 4500,
//       email: 'ventas@empresaF.com',
//       fechaAlta: new Date('2020-05-10'),
//     },
//     {
//       nombre: 'Empresa G',
//       cif: 'G66778899',
//       limiteDeuda: 20000,
//       email: 'soporte@empresaG.com',
//       fechaAlta: new Date('2024-02-01'),
//     },
//     {
//       nombre: 'Empresa H',
//       cif: 'H33445566',
//       limiteDeuda: 2500,
//       email: 'contacto@empresaH.com',
//       fechaAlta: new Date('2023-09-18'),
//     },
//     {
//       nombre: 'Empresa I',
//       cif: 'I77889900',
//       limiteDeuda: 9000,
//       email: 'info@empresaI.com',
//       fechaAlta: new Date('2022-03-27'),
//     },
//   ]);

//   @ViewChild(MatPaginator) paginator!: MatPaginator;

//   ngAfterViewInit() {
//     this.dataSource.paginator = this.paginator;
//   }
// }

import {
  Component,
  ViewChild,
  AfterViewInit,
  OnInit,
  Input,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { Debtor } from '../../models/debtor.interfaces';
import { MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { DebtorsModalDetailsComponent } from '../debtors-modal-details/debtors-modal-details.component';
import { DebtorService } from '../../services/debtors.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-debtors-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    DatePipe,
    MatIconButton,
    MatIcon,
    SearchBarComponent,
  ],
  templateUrl: './debtors-table.component.html',
  styleUrls: ['./debtors-table.component.scss'],
})
export class DebtorsTableComponent implements OnInit, AfterViewInit {
  constructor(
    private dialog: MatDialog,
    private debtorService: DebtorService,
  ) {}

  displayedColumns: string[] = [
    'companyName',
    'cif',
    'debtLimit',
    'email',
    'registrationDate',
    'acciones',
  ];

  dataSource = new MatTableDataSource<Debtor>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.loadDebtors();
  }

  // loadDebtors() {
  //   this.debtorService.getDebtors().subscribe(response => {
  //     this.dataSource.data = response.data;
  //   });
  // }

  //Recuperar el search desde app.component.html
  @Input() search: string = '';

  ngOnChanges() {
    this.applySearch(this.search);
  }

  //Metodo paginacion
  applySearch(text: string) {
    this.loadDebtors(1, 10, text);
  }

  loadDebtors(page = 1, limit = 10, search = '') {
    this.debtorService.getDebtors(page, limit, search).subscribe((response) => {
      this.dataSource.data = response.data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openModal(event: MouseEvent, element: Debtor) {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();

    this.dialog.open(DebtorsModalDetailsComponent, {
      width: '100px',
      maxWidth: 'none',
      position: {
        top: `${rect.bottom + 5}px`,
        left: `${rect.left - 130}px`,
      },
      data: element,
      panelClass: 'actions-dialog',
    });
  }
}
