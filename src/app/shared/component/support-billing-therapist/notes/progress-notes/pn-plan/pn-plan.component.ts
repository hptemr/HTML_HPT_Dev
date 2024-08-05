import { Component } from '@angular/core';

@Component({
  selector: 'app-pn-plan', 
  templateUrl: './pn-plan.component.html',
  styleUrl: './pn-plan.component.scss'
})
export class PnPlanComponent {
  isDisabled: boolean = false;
  clickedIndex = 0;
  clickedIndex2 = 0;
  selectedValue: number;
  
}
