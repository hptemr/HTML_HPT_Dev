import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap'; 
import { SuccessModalComponent } from 'src/app/shared/comman/success-modal/success-modal.component'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { regex } from '../../../../utils/regex-patterns';
import { validationMessages } from '../../../../utils/validation-messages';
import { relationWithPatient } from 'src/app/config';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-add-edit-contact', 
  templateUrl: './add-edit-contact.component.html',
  styleUrl: './add-edit-contact.component.scss',
  providers: [DatePipe]
})
export class AddEditContactComponent implements OnInit {
  model: NgbDateStruct;
  selected_date: string = '';  
  public emergencyId: string;
  public userId: string;
  public userRole: string;
  public pageName: string;
  public emergencyContactForm: FormGroup;
  maxEndDate:any
  todayDate= new Date();
  emergencyContactData: any = [];
  relationWithPatientList: any = relationWithPatient;
  validationMessages = validationMessages;
  convertPhoneNumber: string = '';
  isReadOnly:boolean=false
  relationOtherFlag:boolean=false
  pageTitle:string='Add Contact'
  successMsg:string='Contact Added Successfully'
  constructor(public dialog: MatDialog,private router: Router,private fb: FormBuilder, private route: ActivatedRoute,public authService:AuthService,public commonService:CommonService) {
    this.route.params.subscribe((params: Params) => {
      const locationArray = location.href.split('/')
      if(params['emergencyId']){
        this.emergencyId = params['emergencyId'];
        this.pageName = locationArray[locationArray.length - 2];
      }else{
        this.pageName = locationArray[locationArray.length - 1];
      }
      if(this.pageName=='view-emergency-contact'){
        this.isReadOnly = true
        this.pageTitle = 'View Contact';
      }else  if(this.pageName=='edit-emergency-contact'){
        this.pageTitle = 'Update Contact';
        this.successMsg = 'Contact Details Updated Successfully';
      }
    })   
  }

  ngOnInit() {
    this.userId = this.authService.getLoggedInInfo('_id') 
    this.userRole = this.authService.getLoggedInInfo('role')  
    this.loadForm();
    this.getEmergencyContact()    
  }

  loadForm(){
      this.emergencyContactForm = this.fb.group({      
        firstName: ['', Validators.compose([ Validators.required, Validators.minLength(1), Validators.maxLength(35)])],
        lastName: ['', Validators.compose([ Validators.required, Validators.minLength(1), Validators.maxLength(35)])],
        dob: ['',[Validators.required]],
        relationWithPatient: ['',[]],
        otherRelation: ['',[]],
        phoneNumber:['',[Validators.required,Validators.pattern(regex.usPhoneNumber), Validators.maxLength(14)]],
        myTreatmentCheckbox: [false, []],
        myAccountCheckbox:  [false, []]
      });

      if(this.isReadOnly){
        this.emergencyContactForm.controls['firstName'].disable();
        this.emergencyContactForm.controls['lastName'].disable();
        this.emergencyContactForm.controls['dob'].disable();
        this.emergencyContactForm.controls['relationWithPatient'].disable();
        this.emergencyContactForm.controls['otherRelation'].disable();
        this.emergencyContactForm.controls['phoneNumber'].disable();
        this.emergencyContactForm.controls['myTreatmentCheckbox'].disable();
        this.emergencyContactForm.controls['myAccountCheckbox'].disable();
      }      
      this.filterStartDate();
  }

  async getEmergencyContact(){
    if(this.emergencyId){
      var query = {};
      const req_vars = {
        query: Object.assign({ _id: this.emergencyId }, query)
      }
      this.commonService.showLoader();       
      await this.authService.apiRequest('post', 'emergencyContact/getContactData', req_vars).subscribe(async response => {         
        this.commonService.hideLoader();
        if (response.error) {
          if(response.message){
            this.commonService.openSnackBar(response.message, "ERROR")   
          }
        } else {        
            if(response && response.data && response.data.emergencyContactData){
              this.emergencyContactData = response.data.emergencyContactData;
              this.fillUpForm()
            }
        }      
      })
    }
  }

  fillUpForm(){
      let firstName = '';let lastName = '';let dob = '';let relationWithPatient = '';let otherRelation = '';let phoneNumber = '';let myTreatmentCheckbox = '';let myAccountCheckbox = '';
      let info = this.emergencyContactData;
      firstName = info.firstName;
      lastName = info.lastName;
      dob = info.dob;
      relationWithPatient = info.relationWithPatient;
      otherRelation = info.otherRelation;
      phoneNumber = info.phoneNumber;
      myTreatmentCheckbox = info.myTreatmentCheckbox;
      myAccountCheckbox = info.myAccountCheckbox;

      // const today = new Date(dob);
      // let dateObj = {date:today.getDate(),month:today.getMonth(),year:today.getFullYear()}
      // this.selected_date = today.getMonth()+'-'+today.getDate()+'-'+today.getFullYear();

      this.emergencyContactForm.controls['firstName'].setValue(firstName)
      this.emergencyContactForm.controls['lastName'].setValue(lastName)
      this.emergencyContactForm.controls['dob'].setValue(dob)
      this.emergencyContactForm.controls['relationWithPatient'].setValue(relationWithPatient)
      this.emergencyContactForm.controls['otherRelation'].setValue(otherRelation)
      this.emergencyContactForm.controls['phoneNumber'].setValue(phoneNumber)
      this.emergencyContactForm.controls['myTreatmentCheckbox'].setValue(myTreatmentCheckbox)
      this.emergencyContactForm.controls['myAccountCheckbox'].setValue(myAccountCheckbox)

      this.onRelationSelected(relationWithPatient)
  
      
  }

  async formSubmit(formData:any=null){
    if (this.emergencyContactForm.invalid) {
        this.emergencyContactForm.markAllAsTouched();
        // Object.keys(this.emergencyContactForm.controls).forEach(field => {
        //   const control = this.emergencyContactForm.get(field);
        //   if (control && control.errors) {
        //     console.log(`Errors in ${field}:`, control.errors);
        //   }
        // });
        return;
    }else{
        var query = {};
        let queryVar = {};let fname = 'addContact';
        if(this.emergencyId){
          queryVar = Object.assign({ _id: this.emergencyId }, query);
          fname = 'updateContact';
        }else{
          queryVar = Object.assign({ patientId: this.userId }, query);
        }
              
        const req_vars = {
          query: queryVar,
          data: formData
        }
       
        this.commonService.showLoader();
        await this.authService.apiRequest('post', 'emergencyContact/'+fname, req_vars).subscribe(async response => {
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
    this.emergencyContactForm.controls[colName].setValue(this.commonService.capitalize(event.target.value.trim()))
  }

  onPhoneInputChange(event: Event): void {    
    const inputElement = event.target as HTMLInputElement;
    this.convertPhoneNumber = this.commonService.formatPhoneNumber(inputElement.value);
  }

  onRelationSelected(value: any) {
    this.relationOtherFlag = false
    this.emergencyContactForm.controls['otherRelation'].setValidators([]);
    if(value=='Other'){
      this.relationOtherFlag = true
      this.emergencyContactForm.controls['otherRelation'].setValidators([Validators.required,Validators.maxLength(35)]); 
    }   
   }

  filterStartDate() {
    const today = new Date();
    this.maxEndDate = { month: today.getMonth() + 1, day: today.getDate(), year: today.getFullYear()}
  }

  successModal() {
    const dialogRef = this.dialog.open(SuccessModalComponent,{
      panelClass: 'custom-alert-container',
      data : {
        successNote: this.successMsg
      }
    })
    dialogRef.afterClosed().subscribe(async insuranceName => {
      this.router.navigate(['/patient/emergency-contact/'])
    });
  }

}
