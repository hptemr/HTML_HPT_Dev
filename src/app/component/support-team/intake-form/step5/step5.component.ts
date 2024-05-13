import { Component } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-step5', 
  templateUrl: './step5.component.html',
  styleUrl: './step5.component.scss'
})
export class Step5Component {
  toggle:boolean = true;
  selectedValue: number;
  
  change(){
    this.toggle = !this.toggle;
  }

  onChange(event: MatRadioChange) {
    console.log(this.selectedValue = event.value)
  }

}
