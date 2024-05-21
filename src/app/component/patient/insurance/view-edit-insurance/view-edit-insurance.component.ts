import { Component } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-edit-insurance', 
  templateUrl: './view-edit-insurance.component.html',
  styleUrl: './view-edit-insurance.component.scss'
})
export class ViewEditInsuranceComponent {
  model: NgbDateStruct;
}
