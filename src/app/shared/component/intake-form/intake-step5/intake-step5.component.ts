import { Component } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-intake-step5', 
  templateUrl: './intake-step5.component.html',
  styleUrl: './intake-step5.component.scss'
})
export class IntakeStep5Component {
  toggle:boolean = true;
  selectedValue: number;
  
  change(){
    this.toggle = !this.toggle;
  }

  onChange(event: MatRadioChange) {
    console.log(this.selectedValue = event.value)
  }
}
