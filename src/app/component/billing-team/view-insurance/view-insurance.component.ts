import { Component } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-insurance',
  templateUrl: './view-insurance.component.html',
  styleUrl: './view-insurance.component.scss'
})
export class ViewInsuranceComponent {
  model: NgbDateStruct;
  
}
