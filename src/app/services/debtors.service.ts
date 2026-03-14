import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Debtor {
  id: number;
  companyName: string;
  cif: string;
  debtLimit: number;
  email: string;
  registrationDate: string;
  contactPerson: string;
  phone: string;
  mobile?: string;
  currency: 'EUR' | 'USD' | 'GBP';
  observations?: string;
  country: 'ES' | 'UK' | 'US';
  ownerUserId: string;
  createdByUserId: string;
  updatedByUserId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedDebtors {
  data: Debtor[];
  total: number;
  page: number;
  lastPage: number;
}

@Injectable({
  providedIn: 'root',
})
export class DebtorService {
  private apiUrl = 'http://localhost:3000/debtors'; // API Gateway

  constructor(private http: HttpClient) {}

  // ---------------------------------------------------
  // Obtener lista paginada
  // ---------------------------------------------------
  getDebtors(page = 1, limit = 10, search = ''): Observable<PaginatedDebtors> {
    let params = new HttpParams()
      .set('page', page)
      .set('limit', limit)
      .set('search', search);

    return this.http.get<PaginatedDebtors>(`${this.apiUrl}/search`, { params });
  }

  // ---------------------------------------------------
  // Obtener un deudor por ID
  // ---------------------------------------------------
  getDebtor(id: number): Observable<Debtor> {
    return this.http.get<Debtor>(`${this.apiUrl}/${id}`);
  }

  // ---------------------------------------------------
  // Crear deudor
  // ---------------------------------------------------
  createDebtor(data: any): Observable<Debtor> {
    return this.http.post<Debtor>(this.apiUrl, data);
  }

  // ---------------------------------------------------
  // Actualizar deudor
  // ---------------------------------------------------
  updateDebtor(id: number, data: any): Observable<Debtor> {
    return this.http.patch<Debtor>(`${this.apiUrl}/${id}`, data);
  }
}

