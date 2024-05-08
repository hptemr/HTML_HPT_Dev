import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout'; 
import { Validators, FormGroup, FormBuilder, AbstractControl,FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';//FormArray,
import { StepperOrientation,MatStepper } from '@angular/material/stepper';
import { NgbDateStruct,NgbDateParserFormatter  } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
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
import { serverUrl, s3Details } from '../../../config';
const URL = serverUrl + '/api/patients/patientDocument';
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
  thiredFormGroupData: any
  readonly DT_FORMAT = 'MM/DD/YYYY';
  //stepper: MatStepper;
  filename: any;
  userId: any = '';
  public uploader: FileUploader = new FileUploader({ url: `${URL}?` });
  public hasBaseDropZoneOver: boolean = false;
  documentsMissing = false;
  invalidMessage: string;
  documents_temps = false;
  documentsList: any = [];
  documentsLink: string = '';
  documentsName: string = '';
  fileType: string = '';
  document_size: string = '';
  uploadAll: boolean = false;
  fileErrors: any;
  thirdFormDisabled = false
  currentProgessinPercent: number = 0;

  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public thirdFormGroup: FormGroup;
  constructor(private router: Router,private fb: FormBuilder,public dialog: MatDialog, breakpointObserver: BreakpointObserver, private authService: AuthService, private commonService:CommonService,private ngbDateParserFormatter: NgbDateParserFormatter) {
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
        this.getUploadedDocs(this.thiredFormGroupData.filename,this.thiredFormGroupData.original_name);
      }
    }

    this.userId = localStorage.getItem("userId");
    this.uploader = new FileUploader({ url: `${URL}?userId=${this.userId}` });
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
        confirmPassword:[this.firstFormGroupData ? this.firstFormGroupData.password :'', [Validators.required,]]
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
      documents_temp: ['']
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
      let dob = '';
      if(userData.dob && typeof userData.dob == 'object'){
        dob = userData.dob.year+'-'+userData.dob.month+'-'+userData.dob.day;
      }
      let first_form_data = {
        "firstName":userData.firstName,
        "middleName": userData.middleName,
        "lastName": userData.lastName,
        "email": userData.email,
        "dob": dob,
        "phoneNumber": userData.phoneNumber,
        "gender": userData.gender,
        "password": userData.password,
        "ConfirmPassword":''
      }
        //localStorage.setItem("signupPatientData",'');
        localStorage.setItem("firstFormGroupData", JSON.stringify(first_form_data));
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

  async signupSubmit(steps:any, data:any) {
      var query = {};
      const req_vars = {
        query: Object.assign({ _id: this.userId }, query),
        step:steps,
        data: data
      }
       this.commonService.showLoader();
    await this.authService.apiRequest('post', 'patients/signup', req_vars).subscribe(async response => {         
      this.commonService.hideLoader();
      if (response.error) {
        if(response.message){
          this.commonService.openSnackBar(response.message, "SUCCESS")   
        }
      } else {
        localStorage.setItem("userId", response.data);
        if(response.message){
          this.commonService.openSnackBar(response.message, "SUCCESS")   
        }
        if(steps && steps==3){
          localStorage.removeItem('firstFormGroupData');
          localStorage.removeItem('secondFormGroupData');
          localStorage.removeItem('thiredFormGroupData');
          this.router.navigate(['/'])
        }     
      }      
    })
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
  
  public fileOverBase(e: any): void {
    
    this.thirdFormDisabled = true
    this.hasBaseDropZoneOver = e;
    var cnt = 0;
    this.fileErrors = [];
    let uploadCnt = 0;
    if(this.documentsList && this.documentsList.length>0){
      uploadCnt=this.documentsList.length;
    }
    if(this.uploader.queue.length>1 || uploadCnt>1){
      if(uploadCnt>0){
        this.thirdFormDisabled = false
      }
      //this.snack.open("You can't upload more than 50 documents.", 'OK', { duration: 4000 })
      this.invalidMessage = "You can't upload more than 1 document.";
      //this.documentsMissing = true;
      this.uploader.clearQueue();
    }else{
      console.log('uploader queue >>>>>',this.uploader.queue)
    this.uploader.queue.forEach((fileoOb) => {      
      this.filename = fileoOb.file.name;
      var extension = this.filename.substring(this.filename.lastIndexOf('.') + 1);
      var fileExts = ["jpg", "jpeg", "png", "txt", "pdf", "docx", "doc"];
      let resp = this.isExtension(extension, fileExts);
      if (!resp) {
        var FileMsg = "This file '" + this.filename + "' is not supported";
        this.uploader.removeFromQueue(fileoOb);
        let pushArry = { "error": FileMsg }
        this.fileErrors.push(pushArry);
        setTimeout(() => {
          this.fileErrors = []
        }, 5000);
        cnt++;
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
        this.getUploadedDocs(filename,original_name);
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

  async getUploadedDocs(filename:any,original_name:any) {
    let query = {};
    let req_vars = {
      //query: Object.assign({ filePath: path }, query),
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
    console.log('status>>>',status)
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
          console.log('Response >>>>',response)
          if (response.error) {
            this.commonService.openSnackBar(response.message, "SUCCESS")           
          } else {          
            this.documentsMissing = true;            
            this.thirdFormGroup.controls['documents_temp'].setValue('');
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

  
 checkimg(link:string,docName:string) {
    console.log('docName>>>',docName)
    let status = '<mat-icon>file_copy</mat-icon>';
    if (docName.substr((docName.lastIndexOf('.') + 1)).toLowerCase() == 'jpg' ||
      docName.substr((docName.lastIndexOf('.') + 1)).toLowerCase() == 'jpeg' ||
      docName.substr((docName.lastIndexOf('.') + 1)).toLowerCase() == 'png' ||
      docName.substr((docName.lastIndexOf('.') + 1)).toLowerCase() == 'JPG' ||
      docName.substr((docName.lastIndexOf('.') + 1)).toLowerCase() == 'JPEG' ||
      docName.substr((docName.lastIndexOf('.') + 1)).toLowerCase() == 'PNG') {
      if (docName) {
        status = '<img src="'+link+'" alt="'+docName+'" class="img-fluid" />';
      }
    } 
    else if (docName.substr((docName.lastIndexOf('.') + 1)).toLowerCase() == 'docx' || docName.substr((docName.lastIndexOf('.') + 1)).toLowerCase() == 'doc') {
      status = '<mat-icon>file_copy</mat-icon>';
    } else if (docName.substr((docName.lastIndexOf('.') + 1)).toLowerCase() == 'PDF' || docName.substr((docName.lastIndexOf('.') + 1)).toLowerCase() == 'pdf') {
      status = '<mat-icon>picture_as_pdf</mat-icon>';
    }
    console.log('docName status>>>',status)
    return status;
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
