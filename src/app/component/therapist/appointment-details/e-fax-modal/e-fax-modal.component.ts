import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-e-fax-modal', 
  templateUrl: './e-fax-modal.component.html',
  styleUrl: './e-fax-modal.component.scss'
})
export class EFaxModalComponent {
  toppings = new FormControl('');

  sendToList: string[] = [
    'Dr. Ponnappa', 
    'Dr.Stanbrige', 
    'Dr.Campbell-Gillies', 
    'Dr.Anderson', 
    'Dr.Kazantzis', 
    'Dr.Meldrum'];
}
