import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout'; 
import { Validators, FormGroup, FormBuilder, AbstractControl,FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';//FormArray,
import { StepperOrientation,MatStepper } from '@angular/material/stepper';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable, map } from 'rxjs';
import { AuthService } from '../../../shared/services/api/auth.service';
import { CommonService } from '../../../shared/services/helper/common.service';
import { validationMessages } from '../../../utils/validation-messages'
//import { CustomValidators } from 'ng2-validation';
@Component({
  selector: 'app-signup-patient', 
  templateUrl: './signup-patient.component.html',
  styleUrl: './signup-patient.component.scss', 
})
export class SignupPatientComponent implements OnInit {
  public show: boolean = false;
  validationMessages = validationMessages; 
  mainHeadTxt = "Create your account"
  stepperOrientation: Observable<StepperOrientation>;
  model: NgbDateStruct;
  step1: FormGroup;
  step2: FormGroup;
  step3: FormGroup;
  minStartDate: String = ''
  maxStartDate: String = ''
  //stepper: MatStepper;

  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public thirdFormGroup: FormGroup;
  constructor(private fb: FormBuilder, breakpointObserver: BreakpointObserver, private authService: AuthService, private commonService:CommonService) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }
  
  ngOnInit() {    
    this.firstFormGroup = this.fb.group({
        firstName: new FormControl('', Validators.compose([Validators.pattern("^[ A-Za-z0-9.'-]*$"), Validators.required,this.noWhitespaceValidator, Validators.minLength(1), Validators.maxLength(25)])),
        middleName: new FormControl('', Validators.compose([Validators.pattern("^[ A-Za-z0-9.'-]*$"), Validators.required, this.noWhitespaceValidator, Validators.minLength(1), Validators.maxLength(25)])),
        lastName: new FormControl('', Validators.compose([Validators.pattern("^[ A-Za-z0-9.'-]*$"), Validators.required, this.noWhitespaceValidator, Validators.minLength(1), Validators.maxLength(25)])),
        //increaing last chars from max 4 to 8.
        email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9+._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,8}$/i)]),
        dob: new FormControl("", Validators.required),
        phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/), Validators.maxLength(14)]),
        gender: new FormControl("", Validators.required)
    });

    this.secondFormGroup = this.fb.group({
      
      address1: new FormControl("", Validators.required),
      address2: new FormControl(""),
      city: new FormControl("", Validators.required),    
      state: new FormControl("", Validators.required),
      zipcode: new FormControl("",  Validators.compose([Validators.pattern(/^[0-9]+$/i), Validators.required,Validators.minLength(1), Validators.maxLength(5)])),
    });

    this.thirdFormGroup = this.fb.group({    
      document_name: new FormControl("", Validators.required)
    });
  }

  goToNext(steps:any, data:any,stepper:MatStepper) {
    console.log('steps>>>>',steps)
    console.log('data>>>>',data)
    // if (steps==2){
    //   this.mainHeadTxt="Verify your account"
    // } else{
    //   this.mainHeadTxt="Create your account"
    // }  
    // stepper.next();
    this.mainHeadTxt="Create your account";
    if (steps==1 && this.firstFormGroup.invalid) {
      this.firstFormGroup.markAllAsTouched();
      return;
    }else if (steps==2 && this.secondFormGroup.invalid) {
        this.firstFormGroup.markAllAsTouched();
        return;      
    }else{
      if (steps==2){
        this.mainHeadTxt="Verify your account";
      }       
      stepper.next();
    }
  }

  signupSubmit(steps:any, data:any) {
    console.log('steps>>>>',steps)
    console.log('data>>>>',data)
    console.log('data>>>>',this.firstFormGroup.invalid)
    if (this.firstFormGroup.invalid || this.secondFormGroup.invalid) {
      console.log('  here we are   ')
    }
    const req_vars = {
      // query: Object.assign({ _id: userId, userType: "doctor" }),
      // proquery: Object.assign(doctorData),
      // from: Object.assign({ fromname: msgName }),
      //termsAndCondtion:this.clickTermsAndCondition
    }
    
    //this.loader.open();
    if (this.firstFormGroup.invalid) {
      this.firstFormGroup.markAllAsTouched();
      return;
    }else{
      this.authService.apiRequest('post','patients/signup',req_vars).subscribe(result => {
        //this.loader.close();
        if (result.status == "error") {
          if(result.data.message){
            //this.snack.open(result.data.message, 'OK', { duration: 4000 })
          }
        } else {
          
        }
      }, (err) => {
        console.log("error", err)
        //this.loader.close();
        console.error(err)
      })
    }
  }



  public noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value || control.value.trim() === '') {
            return { whitespace: true };
        }
        return null; 
    };
  }

  showPassword() {
    this.show = !this.show;
  }

  // next(){
  //   this.mainHeadTxt="Verify your account"
  // }
  back(){
    this.mainHeadTxt="Create your account"
  }

}
