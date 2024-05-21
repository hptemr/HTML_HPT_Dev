import { Component } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-intake-step4', 
  templateUrl: './intake-step4.component.html',
  styleUrl: './intake-step4.component.scss'
})
export class IntakeStep4Component {
  toggle:boolean = true;
  selectedValue: number;

  model: NgbDateStruct;
  
  change(){
    this.toggle = !this.toggle;
  }

  onChange(event: MatRadioChange) {
    console.log(this.selectedValue = event.value)
  }
}
