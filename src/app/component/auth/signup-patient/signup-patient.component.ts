import { BreakpointObserver } from '@angular/cdk/layout'; 
import { Component } from '@angular/core'; 
import { FormBuilder, Validators } from '@angular/forms'; 
import { MatStepperModule, StepperOrientation } from '@angular/material/stepper';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-signup-patient', 
  templateUrl: './signup-patient.component.html',
  styleUrl: './signup-patient.component.scss', 
})
export class SignupPatientComponent {
  public show: boolean = false;
  mainHeadTxt = "Create your account"
  
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;

  model: NgbDateStruct;

  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  showPassword() {
    this.show = !this.show;
  }

  next(){
    this.mainHeadTxt="Verify your account"
  }
  back(){
    this.mainHeadTxt="Create your account"
  }

}
