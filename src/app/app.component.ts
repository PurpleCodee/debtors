import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchBarComponent } from './pages/search-bar/search-bar.component';
import { DebtorsTableComponent } from './pages/debtors-table/debtors-table.component';
import { DebtorsButtonCreateComponent } from './pages/debtors-button-create/debtors-button-create.component';
import { DebtorsTitleComponent } from './pages/debtors-title/debtors-title.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SearchBarComponent,
    DebtorsTableComponent,
    DebtorsButtonCreateComponent,
    DebtorsTitleComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'debtors';
  @ViewChild(DebtorsTableComponent) debtorsTable?: DebtorsTableComponent;

  // Aquí guardamos el texto que viene del SearchBar
  searchText: string = '';

  // Este método recibe el texto emitido por el SearchBar
  applySearch(text: string) {
    this.searchText = text;
  }

  handleDebtorCreated() {
    this.debtorsTable?.refreshCurrentSearch();
  }
}
