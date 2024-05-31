import { Component } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss'
})
export class Step3Component {
  clickedIndex = 0;
  model: NgbDateStruct;
  selectedValue: number;

  step2FormData: any
  step3FormData: any


  ngOnInit() {
    this.step3FormData = localStorage.getItem("step3FormData")
    if (this.step3FormData == null) {
      let step2: any
      step2 = localStorage.getItem("step2FormData")
      this.step2FormData = JSON.parse(step2)
      console.log(" this.step2FormData :", this.step2FormData)
    } else {
      this.step3FormData = JSON.parse(this.step3FormData)
      console.log(" this.step3FormData :", this.step3FormData)
    }
  }


  onChange(event: MatRadioChange) {
    console.log(this.selectedValue = event.value)
  }
  tabs = [
    { number: '1' }, { number: '2' }, { number: '3' },
    { number: '4' }, { number: '5' }, { number: '6' },
    { number: '7' }, { number: '8' }, { number: '9' },
    { number: '10' }
  ];
}
