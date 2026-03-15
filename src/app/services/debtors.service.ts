import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreateDebtorDto,
  Debtor,
  UpdateDebtorDto,
} from '../models/debtor.interfaces';

export type DebtorOrderParam =
  | 'companyName'
  | 'cif'
  | 'email'
  | 'registrationDate';

export type DebtorOrderType = 'ASC' | 'DESC';

export interface PaginatedDebtors {
  data: Debtor[];
  total: number;
  page: number;
  lastPage: number;
  orderParam?: DebtorOrderParam;
  orderType?: DebtorOrderType;
}

@Injectable({
  providedIn: 'root',
})
export class DebtorService {
  private apiUrl = 'http://localhost:3000/debtors';

  constructor(private http: HttpClient) {}

  getDebtors(
    page = 1,
    limit = 10,
    search = '',
    orderParam: DebtorOrderParam = 'companyName',
    orderType: DebtorOrderType = 'DESC',
  ): Observable<PaginatedDebtors> {
    const params = new HttpParams()
      .set('page', page)
      .set('limit', limit)
      .set('search', search)
      .set('order_param', orderParam)
      .set('order_type', orderType);

    return this.http.get<PaginatedDebtors>(`${this.apiUrl}/search`, { params });
  }

  getDebtor(id: number): Observable<Debtor> {
    return this.http.get<Debtor>(`${this.apiUrl}/${id}`);
  }

  createDebtor(data: CreateDebtorDto): Observable<Debtor> {
    return this.http.post<Debtor>(this.apiUrl, data);
  }

  updateDebtor(id: number, data: UpdateDebtorDto): Observable<Debtor> {
    return this.http.patch<Debtor>(`${this.apiUrl}/${id}`, data);
  }
}
