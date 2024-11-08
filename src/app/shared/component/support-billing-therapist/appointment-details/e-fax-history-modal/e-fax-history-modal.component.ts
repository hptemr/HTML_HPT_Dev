import { Component } from '@angular/core';

@Component({
  selector: 'app-e-fax-history-modal', 
  templateUrl: './e-fax-history-modal.component.html',
  styleUrl: './e-fax-history-modal.component.scss'
})
export class EFaxHistoryModalComponent {
  displayedColumns: string[] = ['dateofservice', 'noteType', 'sentOn', 'status'];
  dataSource = ELEMENT_DATA;
}

export interface PeriodicElement {
  noteType: string;
  dateofservice: string;
  sentOn: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    dateofservice: '08/10/2024', 
    noteType: 'Daily Note', 
    sentOn: '08/08/2024', 
    status: 'Success'
  }, 
  {
    dateofservice: '10/10/2024', 
    noteType: 'Progress Note', 
    sentOn: '17/10/2024', 
    status: 'Success'
  },
  {
    dateofservice: '08/10/2024', 
    noteType: 'Daily Note', 
    sentOn: '08/08/2024', 
    status: 'Success'
  }, 
  {
    dateofservice: '10/10/2024', 
    noteType: 'Progress Note', 
    sentOn: '17/10/2024', 
    status: 'Failure'
  },
  {
    dateofservice: '08/10/2024', 
    noteType: 'Daily Note', 
    sentOn: '08/08/2024', 
    status: 'Success'
  }, 
  {
    dateofservice: '10/10/2024', 
    noteType: 'Progress Note', 
    sentOn: '17/10/2024', 
    status: 'Failure'
  },
];