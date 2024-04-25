import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout'; 
import { Validators, FormGroup, FormBuilder, AbstractControl,FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';//FormArray,
import { StepperOrientation,MatStepper } from '@angular/material/stepper';
import { NgbDateStruct,NgbDateParserFormatter  } from '@ng-bootstrap/ng-bootstrap';
import { Observable, map } from 'rxjs';
import { AuthService } from '../../../shared/services/api/auth.service';
import { CommonService } from '../../../shared/services/helper/common.service';
import { regex } from '../../../utils/regex-patterns';
import { validationMessages } from '../../../utils/validation-messages';
import { CustomValidators  } from '../../../shared/services/helper/custom-validator';
import { states_data } from '../../../state';
import { cities_data } from '../../../city';

interface State {
  state: string;
  state_code: string;
}

interface City {
  city: string;
  state_code: string;
}

//import { CustomValidators } from 'ng2-validation';
@Component({
  selector: 'app-signup-patient', 
  templateUrl: './signup-patient.component.html',
  styleUrl: './signup-patient.component.scss', 
})
export class SignupPatientComponent implements OnInit {
  states: State[] = states_data;
  cities: City[] = []
  public show: boolean = false;
  public showConfirmPass: boolean = false;
  validationMessages = validationMessages; 
  mainHeadTxt = "Create your account"
  stepperOrientation: Observable<StepperOrientation>;
  selectedDate: NgbDateStruct;
  selectedCity: string;
  //selected_date:string = '';
  step1: FormGroup;
  step2: FormGroup;
  step3: FormGroup;
  minStartDate: any
  maxEndDate: any
  firstFormGroupData: any
  secondFormGroupData: any
  readonly DT_FORMAT = 'MM/DD/YYYY';
  //stepper: MatStepper;

  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public thirdFormGroup: FormGroup;
  constructor(private fb: FormBuilder, breakpointObserver: BreakpointObserver, private authService: AuthService, private commonService:CommonService,private ngbDateParserFormatter: NgbDateParserFormatter) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }
  
  ngOnInit() {    
     this.firstFormGroupData = localStorage.getItem("firstFormGroupData");
    if(localStorage.getItem("firstFormGroupData")){
      this.firstFormGroupData = JSON.parse(this.firstFormGroupData)
    }

    this.secondFormGroupData = localStorage.getItem("secondFormGroupData");
    if(localStorage.getItem("secondFormGroupData")){
      this.secondFormGroupData = JSON.parse(this.secondFormGroupData)
    }


    this.firstFormGroup = this.fb.group({
        firstName: [this.firstFormGroupData ? this.firstFormGroupData.firstName : '', [Validators.pattern("^[ A-Za-z0-9.'-]*$"),CustomValidators.noWhitespaceValidator, Validators.required,Validators.minLength(1), Validators.maxLength(35)]],
        middleName: [this.firstFormGroupData ? this.firstFormGroupData.middleName : '', [Validators.pattern("^[ A-Za-z0-9.'-]*$"),CustomValidators.noWhitespaceValidator,  Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
        lastName: [this.firstFormGroupData ? this.firstFormGroupData.lastName : '', [Validators.pattern("^[ A-Za-z0-9.'-]*$"), CustomValidators.noWhitespaceValidator, Validators.required,Validators.minLength(1), Validators.maxLength(35)]],
        //increaing last chars from max 4 to 8.
        email: [this.firstFormGroupData ? this.firstFormGroupData.email : '', [Validators.required,Validators.email,CustomValidators.noWhitespaceValidator,]],//Validators.pattern(/^[a-zA-Z0-9+._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,8}$/i)
        dob: [this.firstFormGroupData ? this.firstFormGroupData.dob : '',[Validators.required]],
        phoneNumber: [this.firstFormGroupData ? this.firstFormGroupData.phoneNumber : '',[Validators.required,Validators.pattern(/^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/), Validators.maxLength(14)]],
        gender: [this.firstFormGroupData ? this.firstFormGroupData.gender : '', [Validators.required]],
        password:[this.firstFormGroupData ? this.firstFormGroupData.password : '', [Validators.required,Validators.pattern(regex.password)]],
        confirmPassword:['', [Validators.required,]]
      } , {
          validator: this.passwordMatchValidator
      });

    this.secondFormGroup = this.fb.group({      
      address1: [this.secondFormGroupData ? this.secondFormGroupData.address1 : '', [Validators.required]],
      address2: [this.secondFormGroupData ? this.secondFormGroupData.address2 : '', []],
      city: [this.secondFormGroupData ? this.secondFormGroupData.city : '', [Validators.required]],    
      state: [this.secondFormGroupData ? this.secondFormGroupData.state : '', [Validators.required]],
      zipcode: [this.secondFormGroupData ? this.secondFormGroupData.zipcode : '', [Validators.pattern(/^[0-9]+$/i), Validators.required,Validators.minLength(1), Validators.maxLength(5)]],
    });

    this.thirdFormGroup = this.fb.group({    
      document_name: ['', [Validators.required]]
    });
    this.filterStartDate();
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password:any = control.get('password');
    const confirmPassword:any = control.get('confirmPassword');
    if (password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  goToNext(steps:any, userData:any,stepper:MatStepper) {
    // console.log('steps>>>>',steps)
    // console.log('userData>>>>',userData)
    // if (steps==2){
    //   this.mainHeadTxt="Verify your account"
    // } else{
    //   this.mainHeadTxt="Create your account"
    // }  
    // stepper.next();
    
    this.mainHeadTxt="Create your account";
    if (steps==1 && !this.firstFormGroup.invalid){
      //console.log('firstFormGroup >>>>',this.firstFormGroup.invalid,'==========',this.firstFormGroup.dirty,' >>>>> ',this.firstFormGroup)
      let users_data = {
        "firstName":userData.firstName,
        "middleName": userData.middleName,
        "lastName": userData.lastName,
        "email": userData.email,
        "dob": userData.dob,
        "phoneNumber": userData.phoneNumber,
        "gender": userData.gender,
        "password": userData.password,
        "ConfirmPassword":''
      }
        //localStorage.setItem("signupPatientData",'');
        //console.log(' >>>> HERE we WRE>>>>>>>>')
        localStorage.setItem("firstFormGroupData", JSON.stringify(users_data));
    }

    if (steps==2 && !this.secondFormGroup.invalid){
      

      let second_form_data = {
        "address1":userData.address1,
        "address2": userData.address2,
        "city": userData.city,
        "state": userData.state,
        "zipcode": userData.zipcode
      }
        //localStorage.setItem("signupPatientData",'');
       // console.log(' >>>> HERE we WRE second_form_data >>>>>>>>')
        localStorage.setItem("secondFormGroupData", JSON.stringify(second_form_data));
    }

    if (steps==1 && this.firstFormGroup.invalid) {// 
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
  //   console.log('steps>>>>',steps)
  //   console.log('data>>>>',data)
  //   console.log('data>>>>',this.firstFormGroup.invalid)
    if (this.firstFormGroup.invalid || this.secondFormGroup.invalid) {
      //console.log('  here we are   ')
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

  filterStartDate() {
    const today = new Date();
    this.maxEndDate = { month: today.getMonth() + 1, day: today.getDate(), year: today.getFullYear()}
  }

  onDateChange(date: NgbDateStruct) {
     //this.selectedDate = date;
     //this.formatDate(this.selectedDate);
  }
  
  // formatDate(date: NgbDateStruct):string {
  //   let selected_date:any = '';
  //   if(typeof date=='object'){
  //     selected_date = this.convertDateFormat(this.ngbDateParserFormatter.format(date));
  //   }
  //    return selected_date;
  // }

  // convertDateFormat(dateString: string) {
  //   const parts = dateString.split('-');
  //   if (parts.length === 3) {
  //     if(parts[0]!='' && parts[1]!='' && parts[2]!='') {
  //       dateString = `${parts[1]}-${parts[2]}-${parts[0]}`;  
  //       const year = parseInt(parts[2], 1000);
  //       const month = parseInt(parts[0], 10);
  //       const day = parseInt(parts[1], 10);
  //       if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
  //         this.selectedDate =  { month, day, year };
  //       }
  //     }
  //   }
  //   if (!dateString.includes('undefined')) {
  //     this.selected_date = dateString;
  //     this.firstFormGroup.controls['dob'].setValue(this.selectedDate);
  //   }
  //   return this.selected_date;
  // }

  getMinDate(): NgbDateStruct {
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 80, today.getMonth(), today.getDate());
    return { month: minDate.getMonth() + 1, day: minDate.getDate(),year: minDate.getFullYear() };
  }

  showPassword() {
    this.show = !this.show;
  }

  showConfirmPassword() {
    this.showConfirmPass = !this.showConfirmPass;
  }

  // next(){
  //   this.mainHeadTxt="Verify your account"
  // }

  back(){
    this.mainHeadTxt="Create your account"
  }

  onStateChange(selected_state_code:any) {
    this.selectedCity = '';
    this.getCitiesByState(selected_state_code);
  }

  getCitiesByState(state_code: string): City[] {
    return this.cities = cities_data.filter(city => city.state_code === state_code);
  }
}
