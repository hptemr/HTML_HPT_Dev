 

 
import { Component, OnInit,ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout'; 
import { Validators, FormGroup, FormBuilder, AbstractControl,FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
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
  selector: 'app-update-patient-profile', 
  templateUrl: './update-patient-profile.component.html',
  styleUrl: './update-patient-profile.component.scss'
})
export class UpdatePatientProfileComponent implements OnInit {
  selectedTab = 0;
  model: NgbDateStruct;

  states: State[] = states_data;
  cities: City[] = []
  validationMessages = validationMessages; 

  selectedDate: NgbDateStruct;
  selectedCity: string = "";


  minStartDate: any
  maxEndDate: any

  emailError = false;
  invalidEmailErrorMessage: string = '';

  firstFormGroupData: any
  secondFormGroupData: any
  thiredFormGroupData: any
  readonly DT_FORMAT = 'MM/DD/YYYY';

  convertPhoneNumber: string = '';
  convertCellPhoneNumber: string = '';
  convertWorkExtensionNumber: string = '';
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
  selected_date: string = '';
  fileType: string = '';
  document_size: string = '';
  uploadAll: boolean = false;
  fileErrors: string='';
  thirdFormDisabled = false
  currentProgessinPercent: number = 0;
  selectedDocumentsType: string;
  documents_type_list:any=[];

  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public thirdFormGroup: FormGroup;
  constructor(private router: Router,private fb: FormBuilder,public dialog: MatDialog, breakpointObserver: BreakpointObserver, private authService: AuthService, private commonService:CommonService,private ngbDateParserFormatter: NgbDateParserFormatter) {}
  //constructor(private _formBuilder: FormBuilder ) {} 

  ngOnInit() {
    this.userId = localStorage.getItem("userId");

    this.uploader = new FileUploader({ url: `${URL}?userId=${this.userId}` });
    this.firstFormGroup = this.fb.group({
        firstName: ['', [Validators.pattern("^[ A-Za-z0-9.'-]*$"),CustomValidators.noWhitespaceValidator, Validators.required,Validators.minLength(1), Validators.maxLength(35)]],
        middleName: ['', [Validators.pattern("^[ A-Za-z0-9.'-]*$"),Validators.maxLength(35)]],
        lastName: ['', [Validators.pattern("^[ A-Za-z0-9.'-]*$"), CustomValidators.noWhitespaceValidator, Validators.required,Validators.minLength(1), Validators.maxLength(35)]],
        //email: ['', [Validators.required,Validators.email,CustomValidators.noWhitespaceValidator,]],//Validators.pattern(/^[a-zA-Z0-9+._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,8}$/i)
        email: [{ value: '', disabled: true }],
        dob: ['',[Validators.required]],
        phoneNumber: ['',[Validators.required,Validators.pattern(regex.usPhoneNumber), Validators.maxLength(14)]],   
        cellPhoneNumber: ['',[Validators.required,Validators.pattern(regex.usPhoneNumber), Validators.maxLength(14)]],
        workExtensionNumber: ['',[Validators.required,Validators.pattern(regex.usPhoneNumber), Validators.maxLength(14)]],
        maritalStatus: ['', [Validators.required]],
        gender: ['', [Validators.required]]               
      });
      
    this.secondFormGroup = this.fb.group({      
      address1: ['', [Validators.required]],
      address2: ['', [Validators.required]],
      city: ['', [Validators.required]],    
      state: ['', [Validators.required]],
      zipcode: ['', [Validators.pattern(/^[0-9]+$/i), Validators.required,Validators.minLength(1), Validators.maxLength(6)]],
    });

    this.thirdFormGroup = this.fb.group({    
      documents_type: ['', []],
      documents_temp: ['', []],
    } , {
        validator: this.dependentFieldValidator
    }); 

  }

  checkSpace(colName: any, event: any) {
 
    colName.setValue(this.commonService.capitalize(event.target.value.trim()))
  }
  
  onPhoneInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.convertPhoneNumber = this.commonService.formatPhoneNumber(inputElement.value);
  }

  onCellPhoneInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.convertCellPhoneNumber = this.commonService.formatPhoneNumber(inputElement.value);
  }

  onWorkExtensionInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.convertWorkExtensionNumber = this.commonService.formatPhoneNumber(inputElement.value);
  }

  dependentFieldValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const field1:any = control.get('documents_type');
    const field2:any = control.get('documents_temp');
    if (field1.value && (!field2.value || field2.value === undefined)) {  
      return { documents_temp_empty: true };
    } else if ((!field1.value || field1.value === undefined) && field2.value) {
      return { documents_type_empty: true };
    }else{
      return null;
    }

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
      var extension = this.filename.substring(this.filename.lastIndexOf('.') + 1);
      var fileExts = ["jpg", "jpeg", "png","pdf"];//, "docx", "doc"
      let resp = this.isExtension(extension, fileExts);
      if (!resp) {
        var FileMsg = "This file '" + this.filename + "' is not supported";
        this.uploader.removeFromQueue(fileoOb);
        this.fileErrors = FileMsg;
        setTimeout(() => {
          this.fileErrors = '';
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
            this.thirdFormGroup.controls['documents_temp'].setValue('');
           
            if(this.thirdFormGroup.controls['documents_type'].value){
              this.thirdFormGroup.controls['documents_temp'].setValidators(Validators.required);  
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

  onStateChange(selected_state_code:any) {
    this.selectedCity = '';
    this.getCitiesByState(selected_state_code);
  }

  getCitiesByState(state_code: string): City[] {
    return this.cities = cities_data.filter(city => city.state_code === state_code);
  }


  gotostep2() {
    this.selectedTab = 1  
  }
  backtoTab1(){
    this.selectedTab = 0  
  }
  gotostep3() {
    this.selectedTab = 2  
  }
  backtoTab2(){
    this.selectedTab = 1  
  }
  

}
