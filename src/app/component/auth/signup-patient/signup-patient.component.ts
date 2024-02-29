import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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

}
