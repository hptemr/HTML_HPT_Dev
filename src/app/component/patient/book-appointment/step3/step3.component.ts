import { Component } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-step3', 
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss'
})
export class Step3Component {
  model: NgbDateStruct;
  selectedValue: number;
  onChange(event: MatRadioChange) {
    console.log(this.selectedValue = event.value)
  }
}
