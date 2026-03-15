export interface Debtor {
  id: number;
  companyName: string;
  cif: string;
  debtLimit: number;
  email: string;
  registrationDate: string; // ISO string
  contactPerson: string;
  phone: string;
  mobile?: string | null;
  currency: 'EUR' | 'USD' | 'GBP';
  observations?: string | null;
  country: 'ES' | 'FR' | 'DE' | 'IT' | 'PT' | 'UK' | 'US';

  ownerUserId: string;
  createdByUserId: string;
  updatedByUserId?: string | null;

  createdAt: string;
  updatedAt: string;
}


export interface CreateDebtorDto {
  companyName: string;
  cif: string;
  debtLimit: number;
  email: string;
  registrationDate: string;
  contactPerson: string;
  phone: string;
  mobile?: string | null;
  observations?: string | null;
  country: 'ES' | 'FR' | 'DE' | 'IT' | 'PT' | 'UK' | 'US';
}

export interface UpdateDebtorDto {
  companyName?: string;
  cif?: string;
  debtLimit?: number;
  email?: string;
  registrationDate?: string;
  contactPerson?: string;
  phone?: string;
  mobile?: string | null;
  observations?: string | null;
  country?: 'ES' | 'FR' | 'DE' | 'IT' | 'PT' | 'UK' | 'US';
}
