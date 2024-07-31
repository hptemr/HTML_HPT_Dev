import { Component } from '@angular/core';

@Component({
  selector: 'app-plan', 
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.scss'
})
export class PlanComponent {
  isDisabled: boolean = false;
  clickedIndex = 0;
  clickedIndex2 = 0;
  selectedValue: number;
  
}
