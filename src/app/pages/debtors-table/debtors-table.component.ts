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
