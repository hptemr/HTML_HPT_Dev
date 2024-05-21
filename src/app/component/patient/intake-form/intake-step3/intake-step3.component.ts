import { Component } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-intake-step3', 
  templateUrl: './intake-step3.component.html',
  styleUrl: './intake-step3.component.scss'
})
export class IntakeStep3Component {
  model: NgbDateStruct;
  selectedValue: number;
  onChange(event: MatRadioChange) {
    console.log(this.selectedValue = event.value)
  }
}
