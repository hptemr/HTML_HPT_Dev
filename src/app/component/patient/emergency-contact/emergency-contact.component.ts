import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { SuccessModalComponent } from 'src/app/shared/comman/success-modal/success-modal.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Validators, FormGroup, FormBuilder,FormArray, AbstractControl,FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { validationMessages } from '../../../utils/validation-messages';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { relationWithPatient } from 'src/app/config';
import { regex } from '../../../utils/regex-patterns';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-emergency-contact', 
  templateUrl: './emergency-contact.component.html',
  styleUrl: './emergency-contact.component.scss'
})
export class EmergencyContactComponent implements OnInit {
  // selectedDate_0: NgbDateStruct;
  // selectedDate_1: NgbDateStruct;
  selected_date: any = [];  
  public userId: string;
  public userRole: string;
  public emergencyContactFormGroup: FormGroup;
  maxEndDate: any
  relationWithPatientList: any = relationWithPatient;
  validationMessages = validationMessages;
  convertPhoneNumber: any = [];
  //convertPhoneNumber: Observable<string[]>;

  constructor(public dialog: MatDialog,private router: Router,private fb: FormBuilder, private route: ActivatedRoute,public authService:AuthService,public commonService:CommonService) {}

  ngOnInit() {
    this.userId = this.authService.getLoggedInInfo('_id') 
    this.userRole = this.authService.getLoggedInInfo('role')  

    this.emergencyContactFormGroup = this.fb.group({
      contacts: this.fb.array(
        [this.fb.group({
          firstName: ['', Validators.compose([ Validators.required, Validators.minLength(1), Validators.maxLength(35)])],
          lastName: ['', Validators.compose([ Validators.required, Validators.minLength(1), Validators.maxLength(35)])],
          dob: ['',[Validators.required]],
          relationWithPatient: ['',[Validators.required]],
          otherRelation: ['', Validators.compose([ Validators.required, Validators.minLength(1), Validators.maxLength(35)])],
          phoneNumber:['',[Validators.required,Validators.pattern(regex.usPhoneNumber), Validators.maxLength(14)]],
          myTreatmentCheckbox: [false, []],
          myAccountCheckbox:  [false, []]
        })
      ]),
    });

  }

  ngAfterViewInit() {
    this.filterStartDate();
    this.addContactsInfo();
    this.getEmergencyContactDetail()

  }

  getEmergencyContactDetail(){

    
  }
  get contactsInfo() {
    return this.emergencyContactFormGroup.get('contacts') as FormArray;
  }

  addContactsInfo() {
    this.contactsInfo.push(this.fb.group({
      firstName: ['', Validators.compose([ Validators.required, Validators.minLength(1), Validators.maxLength(35)])],
      lastName: ['', Validators.compose([ Validators.required, Validators.minLength(1), Validators.maxLength(35)])],
      dob: ['',[Validators.required]],
      relationWithPatient: ['',[Validators.required]],
      otherRelation: ['', Validators.compose([ Validators.required, Validators.minLength(1), Validators.maxLength(35)])],
      phoneNumber:['',[Validators.required,Validators.pattern(regex.usPhoneNumber), Validators.maxLength(14)]],
      myTreatmentCheckbox: [false, []],
      myAccountCheckbox:  [false, []]
    }));
  }

  async formSubmit(formData:any=null){
    console.log(' formData >>>> ',formData);

    console.log(' invalid >>>> ',this.emergencyContactFormGroup);
    if (this.emergencyContactFormGroup.invalid) {
        this.emergencyContactFormGroup.markAllAsTouched();
        return;
    }else{
        var query = {};
        const req_vars = {
          query: Object.assign({ _id: this.userId }, query),
          data: formData
        }
        this.commonService.showLoader();       
        await this.authService.apiRequest('post', 'emergencyContact/addUpdateContactData', req_vars).subscribe(async response => {         
          this.commonService.hideLoader();
          if (response.error) {
            if(response.message){
              this.commonService.openSnackBar(response.message, "ERROR")   
            }
          } else {        
            this.successModal();        
          }      
        })
    }
  }

  
  checkSpace(colName: any, event: any) {
    colName.setValue(this.commonService.capitalize(event.target.value.trim()))
  }


  onPhoneInputChange(event: Event, index:number): void {    
    const inputElement = event.target as HTMLInputElement;
    const val = inputElement.value    
    this.convertPhoneNumber[index] = this.commonService.formatPhoneNumber(val)    
  }

  onDateChange(dateObj: NgbDateStruct,index:number) {
    if(index)
      // if(index==0){
      //   this.selectedDate_0 = dateObj;
      // }else if(index==1){
      //   this.selectedDate_1 = dateObj;
      // }
    if(typeof dateObj=='object'){
      if(dateObj.day && dateObj.month && dateObj.year){
          this.selected_date[index] = this.commonService.formattedDate(dateObj);
          //let ppctrls = <any>'';
          // ppctrls = <FormArray>this.emergencyContactFormGroup.controls['dob'];
          //let ppctrls = <any>'';
          //ppctrls = <FormArray>this.contactsInfo.at(index);        
          // console.log('ppctrls>>>',ppctrls.controls['dob'].value)
          //return ppctrls.controls['dob'].setValue(ppctrls.controls['dob'].value); 
          //const dateControl = this.contactsInfo.at(index).get('dob');
          // if (dateControl) {
            //dateControl.setValue(`${dateObj.year}-${dateObj.month}-${dateObj.day}`);
            //dateControl.setValue(`${dateObj.month}-${dateObj.day}-${dateObj.year}`);
          //}
      }
    }
 }
 
 

 getMinDate(index:number): NgbDateStruct {
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 80, today.getMonth(), today.getDate());
    return { month: minDate.getMonth() + 1, day: minDate.getDate(),year: minDate.getFullYear() };
  }

  filterStartDate() {
    const today = new Date();
    this.maxEndDate = { month: today.getMonth() + 1, day: today.getDate(), year: today.getFullYear()}
  }

  successModal() {
    const dialogRef = this.dialog.open(SuccessModalComponent,{
      panelClass: 'custom-alert-container',
      data : {
        successNote: 'Contact Details have been saved successfully!'
      }
    });
  }
}
