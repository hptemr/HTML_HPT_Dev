import { Component, OnInit,ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout'; 
import { Validators, FormGroup, FormBuilder, AbstractControl,FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';//FormArray,
import { StepperOrientation,MatStepper } from '@angular/material/stepper';
//import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgbDateStruct,NgbDateParserFormatter  } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../../../shared/services/api/auth.service';
import { CommonService } from '../../../shared/services/helper/common.service';
import { regex } from '../../../utils/regex-patterns';
import { validationMessages } from '../../../utils/validation-messages';
import { CustomValidators  } from '../../../shared/services/helper/custom-validator';
import { states_data } from '../../../state';
import { cities_data } from '../../../city';
import { FileUploader,FileSelectDirective  } from 'ng2-file-upload';
import { AlertComponent } from '../../../shared/comman/alert/alert.component';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { serverUrl, s3Details,documents_list } from '../../../config';
const URL = serverUrl + '/api/patients/patientDocument';
interface State {
  state: string;
  state_code: string;
}
interface City {
  city: string;
  state_code: string;
}
@Component({
  selector: 'app-signup-patient', 
  templateUrl: './signup-patient.component.html',
  styleUrl: './signup-patient.component.scss', 
  providers: [DatePipe]
})
export class SignupPatientComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  states: State[] = states_data;
  cities: City[] = []
  public show: boolean = false;
  public showConfirmPass: boolean = false;
  validationMessages = validationMessages; 
  mainHeadTxt = "Create your account"
  stepperOrientation: Observable<StepperOrientation>;
  selectedDate: NgbDateStruct;
  selectedCity: string = "";
    //stepper: MatStepper;
  step1: FormGroup;
  step2: FormGroup;
  step3: FormGroup;
  maxEndDate: any
  isRequired: boolean = false;
  emailError = false;
  invalidEmailErrorMessage: string = '';
  readonlyFlag: boolean = false;

  firstFormGroupData: any
  secondFormGroupData: any
  thiredFormGroupData: any
  readonly DT_FORMAT = 'MM/DD/YYYY';

  convertPhoneNumber: string = '';
  filename: any;
  userId: any = '';
  public uploader: FileUploader = new FileUploader({ url: `${URL}?` });
  public hasBaseDropZoneOver: boolean = false;
  documentsMissing = true;
  invalidMessage: string;
  documents_temps = false;
  documentsList: any = [];
  documentsLink: string = '';
  documentsName: string = '';
  selected_date: any = '';
  fileType: string = '';
  document_size: string = '';
  uploadAll: boolean = false;
  fileErrors: string='';
  thirdFormDisabled = false
  currentProgessinPercent: number = 0;
  selectedDocumentsType: string='';
  documents_type_list:any=[];
  isChecked = false
  submitButton:boolean = true;
  maxFileSize:any = 0;
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public thirdFormGroup: FormGroup;
  signUpToken:any = ""
  patientGetByToken:any = null
  public tokenId: any;
  constructor( private route: ActivatedRoute,private router: Router,private fb: FormBuilder,public dialog: MatDialog, breakpointObserver: BreakpointObserver, private authService: AuthService, private commonService:CommonService,private ngbDateParserFormatter: NgbDateParserFormatter,private datePipe: DatePipe,private activateRoute: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => {
      this.tokenId = params['tokenId'];
    })
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
      
    this.signUpToken = this.activateRoute.snapshot.queryParamMap.get('signUpToken');
  }
  
  ngOnInit() {
     this.userId = localStorage.getItem("userId");

     this.documents_type_list = documents_list;
     this.firstFormGroupData = localStorage.getItem("firstFormGroupData");
    if(localStorage.getItem("firstFormGroupData")){
      this.firstFormGroupData = JSON.parse(this.firstFormGroupData)

      if(this.firstFormGroupData.dob){
        this.selected_date = this.datePipe.transform(this.firstFormGroupData.dob, 'MM-dd-yyyy')
        let dateObj = this.selected_date.split('-');
        let dateArray = dateObj.map(Number);
        let obj = {'month':dateArray[0],'day':dateArray[1],'year':dateArray[2]};
        this.selectedDate = obj;
        this.selected_date = this.commonService.formattedDate(obj)
      }     
      //if(this.firstFormGroupData.disply_dob)this.onDateChange(this.firstFormGroupData.disply_dob)
    }

    this.secondFormGroupData = localStorage.getItem("secondFormGroupData");
    if(localStorage.getItem("secondFormGroupData")){
      this.secondFormGroupData = JSON.parse(this.secondFormGroupData)
      if(this.secondFormGroupData && this.secondFormGroupData.city){
        this.selectedCity = this.secondFormGroupData.city;
      }
      if(this.secondFormGroupData.state){
        this.getCitiesByState(this.secondFormGroupData.state);
      }      
    }

    this.thiredFormGroupData = localStorage.getItem("thiredFormGroupData");
    if(localStorage.getItem("thiredFormGroupData")){
      this.thiredFormGroupData = JSON.parse(this.thiredFormGroupData)
      if(this.thiredFormGroupData && this.thiredFormGroupData.filename && this.thiredFormGroupData.original_name){
        if(this.thiredFormGroupData.documents_type === undefined){
          this.selectedDocumentsType = '';
        }else{
          this.selectedDocumentsType = this.thiredFormGroupData.documents_type;
        }
        this.isRequired = true;
        this.getUploadedDocs(this.thiredFormGroupData.filename,this.thiredFormGroupData.original_name);
      }
    }


    this.uploader = new FileUploader({ url: `${URL}?userId=${this.userId}` });
    this.firstFormGroup = this.fb.group({
        firstName: [this.firstFormGroupData ? this.firstFormGroupData.firstName : '', [Validators.pattern("^[ A-Za-z0-9.'-]*$"),CustomValidators.noWhitespaceValidator, Validators.required,Validators.minLength(1), Validators.maxLength(35)]],
        middleName: [this.firstFormGroupData ? this.firstFormGroupData.middleName : '', [Validators.pattern("^[ A-Za-z0-9.'-]*$"),Validators.maxLength(35)]],
        lastName: [this.firstFormGroupData ? this.firstFormGroupData.lastName : '', [Validators.pattern("^[ A-Za-z0-9.'-]*$"), CustomValidators.noWhitespaceValidator, Validators.required,Validators.minLength(1), Validators.maxLength(35)]],
        email: [this.firstFormGroupData ? this.firstFormGroupData.email : '', [Validators.required,Validators.email,CustomValidators.noWhitespaceValidator,]],//Validators.pattern(/^[a-zA-Z0-9+._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,8}$/i)
        dob: ['',[Validators.required]],
        phoneNumber: [this.firstFormGroupData ? this.firstFormGroupData.phoneNumber : '',[Validators.required,Validators.pattern(regex.usPhoneNumber), Validators.maxLength(14)]],
        //,Validators.pattern(/^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/)
        gender: [this.firstFormGroupData ? this.firstFormGroupData.gender : '', [Validators.required]],
        password:[this.firstFormGroupData ? this.firstFormGroupData.password : '', [Validators.required,Validators.pattern(regex.password)]],
        confirmPassword:['', [Validators.required,]]//this.firstFormGroupData ? this.firstFormGroupData.password
      } , {
          validator: this.passwordMatchValidator
      });

    this.secondFormGroup = this.fb.group({      
      address1: [this.secondFormGroupData ? this.secondFormGroupData.address1 : '', [Validators.required]],
      address2: [this.secondFormGroupData ? this.secondFormGroupData.address2 : '', [Validators.required]],
      city: [this.secondFormGroupData ? this.secondFormGroupData.city : '', [Validators.required]],    
      state: [this.secondFormGroupData ? this.secondFormGroupData.state : '', [Validators.required]],
      zipcode: [this.secondFormGroupData ? this.secondFormGroupData.zipcode : '', [Validators.pattern(/^[0-9]+$/i), Validators.required,Validators.minLength(1), Validators.maxLength(6)]],
    });

    this.thirdFormGroup = this.fb.group({    
      documents_type: [this.thiredFormGroupData ? this.thiredFormGroupData.documents_type : '', [Validators.required]],
      documents_temp: ['', []],
      isChecked: [false, [Validators.requiredTrue]]
    } , {
        validator: this.dependentFieldValidator
    }); 
    this.filterStartDate();
    this.getPatientDataThroughToken()
    if(this.tokenId){
      this.getPatientDetailsSignupToken()
    }
  }

  checkSpace(colName: any, event: any) {
 
    colName.setValue(this.commonService.capitalize(event.target.value.trim()))
  }
  
  onPhoneInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.convertPhoneNumber = this.commonService.formatPhoneNumber(inputElement.value);
  }

  dependentFieldValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const field1:any = control.get('documents_type');
    const field2:any = control.get('documents_temp');
    //this.thirdFormGroup.controls["documents_type"].markAsTouched();
    if (field1.value && (!field2.value || field2.value === undefined)) {  
      return { documents_temp_empty: true };
    } else if ((!field1.value || field1.value === undefined) && field2.value) {      
      return { documents_type_empty: true };
    }else{
      return null;
    }

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
      
    this.mainHeadTxt="Create your account";
    if (steps==1 && !this.firstFormGroup.invalid){

      let first_form_data:any = {
        "firstName":userData.firstName,
        "middleName": userData.middleName,
        "lastName": userData.lastName,
        "email": userData.email,
        "disply_dob":this.selectedDate,
        "dob":this.selected_date,
        "phoneNumber": userData.phoneNumber,
        "gender": userData.gender,
        "password": userData.password,
        "ConfirmPassword":''
      }
      localStorage.setItem("firstFormGroupData", JSON.stringify(first_form_data));
      if(this.signUpToken && this.patientGetByToken && this.patientGetByToken!=null){
        first_form_data['patientEmailGetByToken'] = this.patientGetByToken.email ? this.patientGetByToken.email:''
      }
      this.signupSubmit(steps,first_form_data)
    }

    if (steps==2 && !this.secondFormGroup.invalid){
      let second_form_data = {
        "address1":userData.address1,
        "address2": userData.address2,
        "city": userData.city,
        "state": userData.state,
        "zipcode": userData.zipcode
      }
        localStorage.setItem("secondFormGroupData", JSON.stringify(second_form_data));
        this.signupSubmit(steps,second_form_data)
    }

    if (steps==3 && !this.thirdFormGroup.invalid){
      let thiredFormData = {
        "documents_type":userData.documents_type,
        "acceptConsent": userData.isChecked
      }
      
      if(this.thiredFormGroupData){
        this.thiredFormGroupData['documents_type']=userData.documents_type;
        this.thiredFormGroupData['acceptConsent']=userData.isChecked
         localStorage.setItem('thiredFormGroupData', JSON.stringify(this.thiredFormGroupData));
      }      
      this.signupSubmit(steps,thiredFormData)
    }

    if (steps==1 && this.firstFormGroup.invalid) {
      this.mainHeadTxt="Create your account"
      this.firstFormGroup.markAllAsTouched();
      return;
    }else if (steps==2 && this.secondFormGroup.invalid) {
      this.mainHeadTxt="Verify your account";
        this.secondFormGroup.markAllAsTouched();
        return;      
    }else if (steps==3 && this.thirdFormGroup.invalid) {
      this.thirdFormGroup.markAllAsTouched();
      return;  
    }else{          
      //stepper.next();
    }
  }

  async signupSubmit(steps:any, data:any) {
      var query = {};
      data.signupToken = this.tokenId
      const req_vars = {
        query: Object.assign({ _id: this.userId }, query),
        step:steps,
        data: data,
        patientIdRegisterByRefferal: (this.patientGetByToken && this.patientGetByToken!=null && this.patientGetByToken._id) ? this.patientGetByToken._id:''
      }
      if(steps && steps==3){
        this.submitButton = false;
      }
      this.commonService.showLoader();       
    await this.authService.apiRequest('post', 'patients/signup', req_vars).subscribe(async response => { 
      this.commonService.hideLoader();
      if (response.error) {
        if(steps && steps==1){
          if(response.data.email){
            this.firstFormGroup.controls["email"].markAsTouched();
            //this.firstFormGroup.controls['email'].setValue('');
            this.emailError = true;
            this.invalidEmailErrorMessage = response.data.email;
          }
          this.stepper.previous();
        }

        if(response.message){
          this.commonService.openSnackBar(response.message, "ERROR")   
        }
      } else {
        if(response.data.user_id){
          localStorage.setItem("userId", response.data.user_id);
          this.userId = response.data.user_id;
          this.uploader = new FileUploader({ url: `${URL}?userId=${response.data.user_id}` });
        }
        
        if(response.message){
          this.commonService.openSnackBar(response.message, "SUCCESS")   
        }
        if(steps && steps==3){
          localStorage.removeItem('userId');
          localStorage.removeItem('firstFormGroupData');
          localStorage.removeItem('secondFormGroupData');
          localStorage.removeItem('thiredFormGroupData');

          localStorage.removeItem('step1FormData')
          localStorage.removeItem('step2FormData')
          localStorage.removeItem('step3FormData')
          localStorage.removeItem('step4FormData')
          localStorage.removeItem('step5FormData')
          localStorage.removeItem('uploadedInsuranceFiles')
          localStorage.removeItem('uploadedPrescriptionFiles')
          if(response.data.userData){
            this.setLocalStorage(response.data.userData);
          }else{
            this.router.navigate(['/'])
          }
        }  
        this.stepper.next();   
      }      
    })
  }

  filterStartDate() {
    const today = new Date();
    this.maxEndDate = { month: today.getMonth() + 1, day: today.getDate(), year: today.getFullYear()}
  }

  onDateChange(date: NgbDateStruct) {
     this.selectedDate = date;
     return this.formatDate(this.selectedDate);
  }
  
  formatDate(dateObj: NgbDateStruct):any {
    let selected_date:any = '';
    if(typeof dateObj=='object'){
      //this.ngbDateParserFormatter.format(date)
      if(dateObj.day && dateObj.month && dateObj.year){
        // selected_date = this.padNumber(dateObj.month)+'-'+this.padNumber(dateObj.day)+'-'+dateObj.year;
        selected_date = this.commonService.formattedDate(dateObj)
      }
    }
    this.selected_date = selected_date;     
  }

  getMinDate(): NgbDateStruct {
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 80, today.getMonth(), today.getDate());
    return { month: minDate.getMonth() + 1, day: minDate.getDate(),year: minDate.getFullYear() };
  }
  
  public fileOverBase(e: any): void {
    this.thirdFormDisabled = true
    this.hasBaseDropZoneOver = e;
    var cnt = 0;
    this.fileErrors = '';
    let uploadCnt = 0;
    if(this.documentsList && this.documentsList.length>0){
      uploadCnt=this.documentsList.length;
    }
    if(this.uploader.queue.length>1 || uploadCnt>1){
      if(uploadCnt>0){
        this.thirdFormDisabled = false
      }
      this.invalidMessage = "You can't upload more than 1 document.";
      //this.documentsMissing = true;
      this.uploader.clearQueue();
    }else{      
    this.uploader.queue.forEach((fileoOb) => {  
      this.filename = fileoOb.file.name;
      this.maxFileSize = fileoOb.file.size;
      var extension = this.filename.substring(this.filename.lastIndexOf('.') + 1);
      var fileExts = ["jpg", "jpeg", "png","pdf"];//, "docx", "doc"
      let resp = this.isExtension(extension, fileExts);
      
      if (!resp) {
        var FileMsg = "This file '" + this.filename + "' is not supported";
        this.uploader.removeFromQueue(fileoOb);
        this.fileErrors = FileMsg;
        setTimeout(() => {
          this.fileErrors = '';
        }, 8000);
        cnt++;
      }else if(this.maxFileSize>25000000){
        var FileMsg = "File size should be below 25MB";
        this.uploader.removeFromQueue(fileoOb);
        this.fileErrors = FileMsg;
        setTimeout(() => {
          this.fileErrors = '';
        }, 8000);        
      } 
    });
 
    if (this.uploader.getNotUploadedItems().length) {
      this.currentProgessinPercent = 1;
      this.uploader.onProgressItem = (progress: any) => {
        this.updateProgressBar();
      }
      this.uploader.uploadAll();
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        const respFile = JSON.parse(response);
        this.thirdFormGroup.controls['documents_temp'].setValue('');
        let filename = ''; let original_name = '';let size = 0;
        if(respFile.data.filename){
          filename = respFile.data.filename          
        }        
        if(respFile.data.original_name){
          original_name = respFile.data.original_name;          
        }
        if(respFile.data.document_size){
          size = respFile.data.document_size;          
        }
        let thiredGroupData = {
          "filename":filename,
          "original_name": original_name,
          "size": size
        }
        localStorage.setItem("thiredFormGroupData", JSON.stringify(thiredGroupData));
        this.thirdFormGroup.controls['documents_temp'].setValue(filename);       
        setTimeout(() => {
          this.getUploadedDocs(filename,original_name);
        },1200);
      };
      this.uploader.onCompleteAll = () => {
        this.thirdFormDisabled = false
        this.uploader.clearQueue();
      }
    }
   }
  }

  updateProgressBar() {
    if (this.currentProgessinPercent == 0) {
      this.uploader.onProgressItem = (progress: any) => {
        this.currentProgessinPercent = progress;
      }
    }
    this.uploader.onProgressAll = (progress: any) => {
      this.currentProgessinPercent = progress;
    }
  }

  isExtension(ext:any, extnArray:any) {
    var result = false;
    var i;
    if (ext) {
      ext = ext.toLowerCase();
      for (i = 0; i < extnArray.length; i++) {
        if (extnArray[i].toLowerCase() === ext) {
          result = true;
          break;
        }
      }
    }
    return result;
  }

  async getUploadedDocs(filename:string,original_name:string) {
    let query = {};
    let req_vars = {
      query: Object.assign({ _id: this.userId }, query),
      fileName: filename
    }
    await this.authService.apiRequest('post', 'patients/getPreviewDocument', req_vars).subscribe(async response => {   
      if (response.error) {
          this.commonService.openSnackBar(response.message, "ERROR")           
      } else {        
        let profile = response.data;
        this.documentsName = original_name;
        this.documentsLink = profile.document;
        this.document_size = profile.document_size;
        this.documentsMissing = true;
        if (profile.document.length > 0) {
          this.documentsMissing = false;
        }
        if (this.currentProgessinPercent == 100) {
          this.currentProgessinPercent = 0;
        }
        this.thirdFormGroup.controls['documents_temp'].setValue(this.documentsName);
        this.fileType = this.getFileType(this.documentsName);
        this.isRequired = true;
      }
    }, (err) => {
      console.error(err);
    })
  }
  
  getFileType(fileName: any) {
    let status = 'unknown';
    if(fileName){
      const extension = fileName.split('.').pop().toLowerCase();
      if (extension === 'pdf' || extension === 'PDF') {
        status = 'pdf';
      }else if (extension === 'docx' || extension === 'doc') {
        status = 'doc';        
      } else if (['jpg', 'jpeg', 'png', 'gif','JPG', 'JPEG', 'PNF', 'GIF'].includes(extension)) {
          return 'image';
      } 
    }
    return status;
}

  async documentDelete() {
    let dialogRef: MatDialogRef<any> = this.dialog.open(AlertComponent, {
      panelClass: 'custom-alert-container',
      width: '520px',
      data: {
        warningNote: 'Do you really want to delete this file?'
      }
    })
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }else{
        this.commonService.showLoader();
        let query = {}
        const req_vars = {
          query: Object.assign({ _id: this.userId }, query),          
        }
        this.authService.apiRequest('post', 'patients/deleteDocument', req_vars).subscribe(async response => {
          this.commonService.hideLoader();
          
          if (response.error) {
            this.commonService.openSnackBar(response.message, "SUCCESS")           
          } else {          
            this.documentsMissing = true;   
            this.isRequired = false;         
            this.thirdFormGroup.controls['documents_temp'].setValue('');
           
            if(this.thirdFormGroup.controls['documents_type'].value){
              this.thirdFormGroup.controls['documents_temp'].setValidators(Validators.required);  
             // this.dependentFieldValidator(this.thirdFormGroup);  
              this.thirdFormGroup.reset();
            }            
            localStorage.setItem("thiredFormGroupData", '');
            this.commonService.hideLoader();
            this.commonService.openSnackBar(response.message, "SUCCESS")
          }
        }, (err) => {
          console.error(err)
          this.commonService.hideLoader();
        })   
      }
    })

  }

  showPassword() {
    this.show = !this.show;
  }

  showConfirmPassword() {
    this.showConfirmPass = !this.showConfirmPass;
  }

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

  setLocalStorage(res: any) {
    localStorage.setItem('user', JSON.stringify(res));
    this.router.navigate(["/patient/appointments"])
  }

  getPatientDataThroughToken(){
    if(this.signUpToken){
      let bodyData = {signUpToken: this.signUpToken}
      this.authService.apiRequest('post', 'referral/getPatientThroughSignUpToken', bodyData).subscribe(async response => {
        if(response && !response.error){
          this.patientGetByToken = response.data
          if(!localStorage.getItem("firstFormGroupData")){
            this.firstFormGroup.controls['firstName'].setValue((this.patientGetByToken && this.patientGetByToken.firstName)? this.patientGetByToken.firstName : '');
            this.firstFormGroup.controls['lastName'].setValue((this.patientGetByToken && this.patientGetByToken.lastName)? this.patientGetByToken.lastName : '');
            this.firstFormGroup.controls['email'].setValue((this.patientGetByToken && this.patientGetByToken.email)? this.patientGetByToken.email : '');
          }
        }
      }, (err) => {
        console.error(err)
      })
    }
  }

  getPatientDetailsSignupToken(){
    if(this.tokenId){
        let reqVars = {
          query: {signupToken:this.tokenId},
          fields: { firstName: 1, lastName: 1, email: 1,phoneNumber:1, status: 1, _id:1 },     
        }      
      this.authService.apiRequest('post', 'patients/getPatientSignupToken', reqVars).subscribe(async response => {
        if(response && response.error){
          this.commonService.openSnackBar(response.message, "ERROR")
          localStorage.setItem("firstFormGroupData",'');
          localStorage.setItem("secondFormGroupData",'');
           localStorage.setItem('thiredFormGroupData','');
          localStorage.setItem("userId",'');
          this.router.navigate(['/signup']);
        }else if(response.data){
          // localStorage.setItem("userId", response.data._id);
          // this.userId = response.data._id;
          this.firstFormGroup.controls['firstName'].setValue(response.data.firstName);
          this.firstFormGroup.controls['lastName'].setValue(response.data.lastName);
          this.firstFormGroup.controls['email'].setValue(response.data.email);
          if(response.data.phoneNumber){
            this.firstFormGroup.controls['phoneNumber'].setValue(response.data.phoneNumber);
          }          
          this.readonlyFlag = true
        }
      }, (err) => {
        console.error(err)
      })
    }
  }
}
