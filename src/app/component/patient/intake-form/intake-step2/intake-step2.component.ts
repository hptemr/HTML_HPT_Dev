import { Component } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-intake-step2', 
  templateUrl: './intake-step2.component.html',
  styleUrl: './intake-step2.component.scss'
})
export class IntakeStep2Component {
  model: NgbDateStruct;
}
