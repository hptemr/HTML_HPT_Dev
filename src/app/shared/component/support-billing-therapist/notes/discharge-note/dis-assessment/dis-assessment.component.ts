import { Component } from '@angular/core';

@Component({
  selector: 'app-dis-assessment', 
  templateUrl: './dis-assessment.component.html',
  styleUrl: './dis-assessment.component.scss'
})
export class DisAssessmentComponent {
  isDisabled: boolean = false;
  
  addNewProblemField:boolean= true;

  addNewProblem(){
    this.addNewProblemField = false;
  }
  removeNewProblem(){
    this.addNewProblemField = true;
  }
}
