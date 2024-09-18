import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-select-primary-insu-modal', 
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatDialogModule, MatTableModule, MatCheckboxModule],
  templateUrl: './select-primary-insu-modal.component.html',
  styleUrl: './select-primary-insu-modal.component.scss'
})
export class SelectPrimaryInsuModalComponent {
  displayedColumns: string[] = ['insuranceName', 'payerId', 'address', 'symbol'];
  dataSource = ELEMENT_DATA;
}

export interface PeriodicElement {
  payerId: string;
  insuranceName: string;
  address: string;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {insuranceName: 'Insurance Name 1', payerId: '123456789', address: 'Keas 69 Str. 15234, Chalandri Athens, Greece', symbol: ' '},
  {insuranceName: 'Insurance Name 2', payerId: '987654321', address: '114 W 17th St, Fl 2, New York, NY 10011, US', symbol: ' '},
  {insuranceName: 'Insurance Name 3', payerId: '369852147', address:'Keas 69 Str. 15234, Chalandri Athens', symbol: ' '}, 
];