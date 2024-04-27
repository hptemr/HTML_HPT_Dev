import { Component } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-step4', 
  templateUrl: './step4.component.html',
  styleUrl: './step4.component.scss'
})
export class Step4Component {
  toggle:boolean = true;
  selectedValue: number;
  
  change(){
    this.toggle = !this.toggle;
  }

  onChange(event: MatRadioChange) {
    console.log(this.selectedValue = event.value)
  }

}
