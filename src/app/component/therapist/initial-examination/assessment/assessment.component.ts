import { Component } from '@angular/core';

@Component({
  selector: 'app-assessment', 
  templateUrl: './assessment.component.html',
  styleUrl: './assessment.component.scss'
})
export class AssessmentComponent {
  addNewProblemField:boolean= true;

  addNewProblem(){
    this.addNewProblemField = false;
  }
  removeNewProblem(){
    this.addNewProblemField = true;
  }
}
