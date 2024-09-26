 

 
import { Component, OnInit,ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout'; 
import { DatePipe } from '@angular/common';
import { Validators, FormGroup, FormBuilder, AbstractControl,FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { NgbDateStruct,NgbDateParserFormatter  } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
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
import { ChangePasswordModalComponent } from 'src/app/shared/comman/change-password-modal/change-password-modal.component';
import { UploadImgComponent } from 'src/app/shared/component/upload-img/upload-img.component';
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
  styleUrl: './update-patient-profile.component.scss',
  providers: [DatePipe]
})
export class UpdatePatientProfileComponent implements OnInit {
  editOptions: boolean=false;
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
  profileImage: any
  isDefaultImage:boolean = true


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
  selected_date: any = '';
  fileType: string = '';
  document_size: string = '';
  uploadAll: boolean = false;
  fileErrors: string='';
  thirdFormDisabled = false
  currentProgessinPercent: number = 0;
  selectedDocumentsType: string;
  documents_type_list:any=[];
  // user_data:any=[];
  userType:any;
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public thirdFormGroup: FormGroup;
  constructor(private router: Router,private fb: FormBuilder,public dialog: MatDialog, breakpointObserver: BreakpointObserver, private authService: AuthService, private commonService:CommonService,private ngbDateParserFormatter: NgbDateParserFormatter,private datePipe: DatePipe) {}
  //constructor(private _formBuilder: FormBuilder ) {} 

  ngOnInit() {
    this.userId = this.authService.getLoggedInInfo('_id')
    // this.user_data = localStorage.getItem("user");
    this.userType = this.authService.getLoggedInInfo('role')
    this.documents_type_list = documents_list;    
    this.uploader = new FileUploader({url:`${URL}?userId=${this.userId}&type=Patient`});
    this.firstFormGroup = this.fb.group({
        firstName: ['', [Validators.pattern("^[ A-Za-z0-9.'-]*$"),CustomValidators.noWhitespaceValidator, Validators.required,Validators.minLength(1), Validators.maxLength(35)]],
        middleName: ['', [Validators.pattern("^[ A-Za-z0-9.'-]*$"),Validators.maxLength(35)]],
        lastName: ['', [Validators.pattern("^[ A-Za-z0-9.'-]*$"), CustomValidators.noWhitespaceValidator, Validators.required,Validators.minLength(1), Validators.maxLength(35)]],
        email: [{ value: '', disabled: true }],
        dob: ['',[Validators.required]],
        phoneNumber: ['',[Validators.required,Validators.pattern(regex.usPhoneNumber), Validators.maxLength(14)]],   
        cellPhoneNumber: ['',[Validators.pattern(regex.usPhoneNumber), Validators.maxLength(14)]],
        workExtensionNumber: ['',[Validators.pattern(regex.usPhoneNumber), Validators.maxLength(14)]],
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

    this.getUserData();
    this.filterStartDate();
    this.checkSelectedTabInStorage()
    // Profile Image
    this.profileImage = s3Details.awsS3Url + s3Details.userProfileFolderPath + this.authService.getLoggedInInfo('profileImage')
    this.isDefaultImage =  this.authService.getLoggedInInfo('profileImage')== 'default.png'?false:true
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
    return this.selected_date;
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
          type:'Patient'
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

  goToNext(steps:any,userData:any) {
    console.log("goToNext>>>>")
      if (steps==0 && !this.firstFormGroup.invalid){
        let first_form_data = {
          "firstName":userData.firstName,
          "middleName": userData.middleName,
          "lastName": userData.lastName,         
          "dob":this.selected_date,
          "maritalStatus":userData.maritalStatus,
          "cellPhoneNumber":userData.cellPhoneNumber,
          "workExtensionNumber":userData.workExtensionNumber,
          "phoneNumber": userData.phoneNumber,
          "gender": userData.gender,
        }

        this.profileSubmit(steps,first_form_data,'Personal Information')
      }

      if (steps==1 && !this.secondFormGroup.invalid){
        let second_form_data = {
          "address1":userData.address1,
          "address2": userData.address2,
          "city": userData.city,
          "state": userData.state,
          "zipcode": userData.zipcode
        }

        this.profileSubmit(steps,second_form_data,'Additional Information')
      }

      if (steps==2 && !this.secondFormGroup.invalid){
        let thiredFormData = {
          "documents_type":userData.documents_type
        }

        this.profileSubmit(steps,thiredFormData,'Verification Information')
      }


      if (steps==0 && this.firstFormGroup.invalid) {
        this.firstFormGroup.markAllAsTouched();
        return;
      }else if (steps==1 && this.secondFormGroup.invalid) {
          this.secondFormGroup.markAllAsTouched();
          return;      
      }else if (steps==2 && this.thirdFormGroup.invalid) {
        this.thirdFormGroup.markAllAsTouched();
        return;  
      }
   // this.selectedTab = 1  
  }
  
  async profileSubmit(steps:any, data:any,title:string) {
    var query = {};
    const req_vars = {
      query: Object.assign({ _id: this.userId }, query),
      data: data,
      formTitle:title
    }
    // this.commonService.showLoader();       
    await this.authService.apiRequest('post', 'patients/updateProfile', req_vars).subscribe(async response => {         
      // this.commonService.hideLoader();
      if (response.error) {
        if(response.message){
          this.commonService.openSnackBar(response.message, "ERROR")   
        }
      } else {        
        this.selectedTab = steps+1;
        if(this.selectedTab==3){
          this.commonService.openSnackBar('Profile details are updated successfully.', "SUCCESS")   
          // this.selectedTab = 0;
          this.router.navigate(["/patient/appointments"])
        } 
        if(steps==0){
          this.updatePatientInLocalStorage(data)
        }       
      }      
    })
  }

  async getUserData() {
     var query = {};
    const req_vars = {
      query: Object.assign({ _id: this.userId }, query),
    }
    await this.authService.apiRequest('post', 'patients/getPatientData', req_vars).subscribe(async response => {         
      if (response.error) {
        if(response.message){
          this.commonService.openSnackBar(response.message, "ERROR")   
        }
      } else {
        let user_data = response.data.patientData;
        if(user_data){          
          this.firstFormGroup.controls['firstName'].setValue(user_data.firstName ? user_data.firstName : '');
          this.firstFormGroup.controls['middleName'].setValue(user_data.middleName ? user_data.middleName : '');
          this.firstFormGroup.controls['lastName'].setValue(user_data.lastName ? user_data.lastName : '');
          this.firstFormGroup.controls['email'].setValue(user_data.email ? user_data.email : '');
          this.firstFormGroup.controls['phoneNumber'].setValue(user_data.phoneNumber ? user_data.phoneNumber : '');
          this.firstFormGroup.controls['cellPhoneNumber'].setValue(user_data.cellPhoneNumber ? user_data.cellPhoneNumber : '');
          this.firstFormGroup.controls['workExtensionNumber'].setValue(user_data.workExtensionNumber ? user_data.workExtensionNumber : '');
          this.firstFormGroup.controls['maritalStatus'].setValue(user_data.maritalStatus ? user_data.maritalStatus : '');
          this.firstFormGroup.controls['gender'].setValue(user_data.gender ? user_data.gender : '');
          this.secondFormGroup.controls['address1'].setValue(user_data.address1 ? user_data.address1 : '');
          this.secondFormGroup.controls['address2'].setValue(user_data.address2 ? user_data.address2 : '');
          this.secondFormGroup.controls['city'].setValue(user_data.city ? user_data.city : '');
          this.secondFormGroup.controls['state'].setValue(user_data.state ? user_data.state : '');
          this.secondFormGroup.controls['zipcode'].setValue(user_data.zipcode ? user_data.zipcode : '');
          if(user_data.dob){          
            this.selected_date = this.datePipe.transform(user_data.dob, 'MM-dd-yyyy')
            let dateObj = this.selected_date.split('-');
            let dateArray = dateObj.map(Number);
            let obj = {'month':dateArray[0],'day':dateArray[1],'year':dateArray[2]};
            this.selectedDate = obj;
            this.selected_date = this.commonService.formattedDate(obj)
          }
   
          if(user_data.document_temp_name){
            this.getUploadedDocs(user_data.document_temp_name,user_data.document_name);
          }
          this.thirdFormGroup.controls['documents_type'].setValue(user_data.documents_type);
          this.thirdFormGroup.controls['documents_temp'].setValue(user_data.document_temp_name);
        }
      }      
    })
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

  editProfilePic() { 
    this.editOptions=!this.editOptions;
  }

  changePassword() {
    const dialogRef = this.dialog.open(ChangePasswordModalComponent,{
      disableClose: true,
      panelClass: 'change--password--modal',
      data: {
        userId: this.userId,
        userRole: this.userType
      }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        this.authService.logout(this.userType)
      }
    });
  }
 
  updatePatientInLocalStorage(updateProfileData: any) {
    let localSorageUserData: any = this.authService.getLoggedInInfo('all')
    localSorageUserData.firstName = updateProfileData.firstName;
    localSorageUserData.lastName = updateProfileData.lastName;
    localStorage.setItem('user', JSON.stringify(localSorageUserData));
    localStorage.setItem('selectedTabPatientProfile', JSON.stringify(this.selectedTab));
    window.location.reload()
  }

  checkSelectedTabInStorage(){
    let selectedTabInStorage= localStorage.getItem('selectedTabPatientProfile')
    if(selectedTabInStorage){
      let selectedTab=JSON.parse(selectedTabInStorage)
      this.selectedTab = selectedTab
      localStorage.removeItem('selectedTabPatientProfile')
    }
  }

  async changePhoto() {
    this.editOptions = false
    const dialogRef = this.dialog.open(UploadImgComponent, {
      width: '600px',
      disableClose: true,
      data: { cropperFor: 'Profile Picture' }
    });

    dialogRef.afterClosed().subscribe(async result => {
      this.commonService.showLoader()
      if (result !== false && result.image !== null && result.image !== undefined) {
        let reqVars = {
          userId: this.authService.getLoggedInInfo('_id'),
          profileImage: result.image.base64
        }
        await this.authService.apiRequest('post', 'patients/changeProfileImage', reqVars).subscribe(async response => {
          this.commonService.hideLoader()
          let userDetails: any
          userDetails = this.authService.getLoggedInInfo()
          userDetails.profileImage = this.authService.getLoggedInInfo('_id').toString() + '.png'
          localStorage.setItem('user', JSON.stringify(userDetails))
          this.commonService.openSnackBar(response.message, "SUCCESS")
          setTimeout(function () {
            location.reload();
          }, 3000)
        })
      } else {
        this.commonService.hideLoader()
      }
    })
  }

  removePhoto() {
    this.editOptions = false
    const dialogRef = this.dialog.open(AlertComponent, {
      panelClass: 'custom-alert-container',
      data: {
        warningNote: 'Do you really want to remove this image?'
      }
    })

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        this.commonService.showLoader()
        let reqVars = {
          userId: this.authService.getLoggedInInfo('_id')
        }
        await this.authService.apiRequest('post', 'patients/deleteProfileImage', reqVars).subscribe(async response => {
          this.commonService.hideLoader()
          let userDetails: any
          userDetails = this.authService.getLoggedInInfo()
          userDetails.profileImage = response.data
          localStorage.setItem('user', JSON.stringify(userDetails))
          this.commonService.openSnackBar(response.message, "SUCCESS")
          setTimeout(function () {
            location.reload();
          }, 3000);
        })
      }
    })
  }


}
