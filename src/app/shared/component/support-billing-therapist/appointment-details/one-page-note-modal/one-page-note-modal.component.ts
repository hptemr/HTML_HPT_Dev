import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-one-page-note-modal', 
  templateUrl: './one-page-note-modal.component.html',
  styleUrl: './one-page-note-modal.component.scss'
})
export class OnePageNoteModalComponent {
  patientName = ""
  appointmentDate = ""
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){
    this.patientName = data.patientName;
    this.appointmentDate = data.appointmentDate;
  }

}
