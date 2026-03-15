import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Debtor } from '../../models/debtor.interfaces';
import {
  DebtorOrderParam,
  DebtorOrderType,
  DebtorService,
} from '../../services/debtors.service';
import { DebtorsModalDetailsComponent } from '../debtors-modal-details/debtors-modal-details.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-debtors-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    DatePipe,
    MatIconButton,
    MatIcon,
  ],
  templateUrl: './debtors-table.component.html',
  styleUrls: ['./debtors-table.component.scss'],
})
export class DebtorsTableComponent implements OnInit, AfterViewInit, OnChanges {
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
  totalItems = 0;
  pageSize = 10;
  currentPage = 1;
  isLoading = false;
  orderParam: DebtorOrderParam = 'companyName';
  orderType: DebtorOrderType = 'DESC';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() search: string = '';

  ngOnInit() {
    this.loadDebtors();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['search'] && !changes['search'].firstChange) {
      this.applySearch(this.search);
    }
  }

  ngAfterViewInit() {
    // La paginacion y la ordenacion reales las hace el backend.
    this.dataSource.paginator = null;
    this.dataSource.sort = null;
  }

  applySearch(text: string) {
    this.currentPage = 1;

    if (this.paginator) {
      this.paginator.firstPage();
    }

    this.loadDebtors(1, this.pageSize, text);
  }

  loadDebtors(
    page = this.currentPage,
    limit = this.pageSize,
    search = this.search,
  ) {
    this.isLoading = true;

    this.debtorService
      .getDebtors(page, limit, search, this.orderParam, this.orderType)
      .subscribe((response) => {
        this.dataSource.data = response.data;
        this.totalItems = response.total;
        this.currentPage = response.page;
        this.pageSize = limit;
        this.isLoading = false;
      });
  }

  refreshCurrentSearch() {
    this.loadDebtors(this.currentPage, this.pageSize, this.search);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadDebtors(this.currentPage, this.pageSize, this.search);
  }

  onSortChange(sort: Sort) {
    this.orderParam = (sort.active || 'companyName') as DebtorOrderParam;
    this.orderType = sort.direction === 'asc' ? 'ASC' : 'DESC';
    this.currentPage = 1;

    if (this.paginator) {
      this.paginator.firstPage();
    }

    this.loadDebtors(1, this.pageSize, this.search);
  }

  getCurrencySymbol(currency: Debtor['currency']) {
    switch (currency) {
      case 'USD':
        return '$';
      case 'GBP':
        return '£';
      case 'EUR':
      default:
        return '€';
    }
  }

  openModal(event: MouseEvent, element: Debtor) {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();

    this.dialog
      .open(DebtorsModalDetailsComponent, {
        width: '100px',
        maxWidth: 'none',
        position: {
          top: `${rect.bottom + 5}px`,
          left: `${rect.left - 130}px`,
        },
        data: element,
        panelClass: 'actions-dialog',
      })
      .afterClosed()
      .subscribe((updatedDebtor: Debtor | undefined) => {
        if (!updatedDebtor) {
          return;
        }

        this.dataSource.data = this.dataSource.data.map((debtor) =>
          debtor.id === updatedDebtor.id ? updatedDebtor : debtor,
        );
      });
  }
}
