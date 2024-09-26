import { Component } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-create-appointment-modal', 
  templateUrl: './create-appointment-modal.component.html',
  styleUrl: './create-appointment-modal.component.scss'
})
export class CreateAppointmentModalComponent {
  selectedValue: number;
  onChange(event: MatRadioChange) {
    console.log(this.selectedValue = event.value)
  }
}
