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
  private apiUrl = 'http://localhost:3000/debtors';

  constructor(private http: HttpClient) {}

  // ----------------------------------------
  // Obtener userId desde el token
  // ----------------------------------------
  private getUserIdFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId;
    } catch {
      return null;
    }
  }

  // ----------------------------------------
  // Obtener lista paginada
  // ----------------------------------------
  getDebtors(page = 1, limit = 10, search = ''): Observable<PaginatedDebtors> {
    const userId = this.getUserIdFromToken();
    if (!userId) throw new Error('No se pudo obtener el userId del token');

    let params = new HttpParams()
      .set('userId', userId)
      .set('page', page)
      .set('limit', limit)
      .set('search', search);

    return this.http.get<PaginatedDebtors>(`${this.apiUrl}/search`, { params });
  }

  // ----------------------------------------
  // Obtener un deudor por ID
  // ----------------------------------------
  getDebtor(id: number): Observable<Debtor> {
    return this.http.get<Debtor>(`${this.apiUrl}/search`);
  }

  // ----------------------------------------
  // Crear deudor
  // ----------------------------------------
  createDebtor(data: any): Observable<Debtor> {
    const userId = this.getUserIdFromToken();
    if (!userId) throw new Error('No se pudo obtener el userId del token');

    const payload = {
      ...data,
      ownerUserId: userId,
      createdByUserId: userId,
    };

    return this.http.post<Debtor>(this.apiUrl, payload);
  }

  // ----------------------------------------
  // Actualizar deudor
  // ----------------------------------------
  updateDebtor(id: number, data: any): Observable<Debtor> {
    const userId = this.getUserIdFromToken();
    if (!userId) throw new Error('No se pudo obtener el userId del token');

    const payload = {
      ...data,
      updatedByUserId: userId,
    };

    return this.http.patch<Debtor>(`${this.apiUrl}/${id}`, payload);
  }
}
