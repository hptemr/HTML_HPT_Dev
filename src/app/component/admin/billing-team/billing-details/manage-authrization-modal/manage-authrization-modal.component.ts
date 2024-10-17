import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { validationMessages } from '../../../../../utils/validation-messages'
import { CommonModule } from '@angular/common'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { regex } from '../../../../../utils/regex-patterns';

export interface Authorization {
  authorizationRequired: string;
  authorizationToDate: string;
  authorizationFromDate: string;
  authorizationVisit: string;
  authorizationNumber: string;
  _id: string;
  createdAt: string;
}
@Component({
  selector: 'app-manage-authrization-modal',
  standalone: true,
  imports: [MatInputModule ,MatIconModule, MatButtonModule, MatDialogModule, MatTableModule, MatCheckboxModule, MatRadioModule, MatDatepickerModule, CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './manage-authrization-modal.component.html',
  styleUrl: './manage-authrization-modal.component.scss'
})
export class ManageAuthrizationModalComponent {
  validationMessages = validationMessages
  patientId:any;
  caseName:any;
  authorizationManagement: FormGroup;
  authorizationFromDate:any=''
  authManagementHistory: Authorization[] =[]
  isAuthManagmentHistory: boolean = false

  constructor( 
    private commonService: CommonService,
    private authService: AuthService,
    private fb: FormBuilder, 
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<ManageAuthrizationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
  }

  ngOnInit() {
    this.patientId = this.data.patientId
    this.caseName = this.data.caseName
    this.initializeAuthorizationManagementForm()
    this.getAuthManagementHistory()
  }

  initializeAuthorizationManagementForm(){
    this.authorizationManagement = this.fb.group({
      authorizationRequired: ['Yes', [Validators.required]],
      authorizationToDate: ['', [Validators.required]],
      authorizationFromDate: ['', [Validators.required]],
      authorizationVisit: ['', [Validators.required,Validators.pattern(regex.onlyNumeric)]],
      authorizationNumber: ['', [Validators.required,Validators.pattern(regex.onlyNumeric)]]
    })
  }

  onAuthorizationFromDateChange(event: any) {
    let selectedDate = new Date(event.value);
    this.authorizationFromDate = selectedDate;
  }


  saveAuthorizationManagement(){
    if(this.authorizationManagement.valid){
      if(this.authorizationManagement.value['authorizationRequired']=='No'){
        this.authorizationManagement.value['authorizationToDate'] =''
        this.authorizationManagement.value['authorizationFromDate'] =''
        this.authorizationManagement.value['authorizationVisit'] =''
        this.authorizationManagement.value['authorizationNumber'] =''
      }
      this.commonService.showLoader();
      let authManagementObj:any = {
        authorizationManagementData : this.authorizationManagement.value,
        patientId : this.patientId,
        caseName : this.caseName
      }
      
      this.authService.apiRequest('post', 'appointment/addAuthorizationManagement', authManagementObj).subscribe(async response => {  
        this.commonService.openSnackBar(response.message, "SUCCESS")
        this.commonService.hideLoader(); 
        this.dialogRef.close(response);
      },(err) => {
        this.commonService.hideLoader();
        err.error?.error ? this.commonService.openSnackBar(err.error?.message, "ERROR") : ''
        this.dialogRef.close();
      })
    }
  }

  getAuthManagementHistory(){
      this.isAuthManagmentHistory = false
      this.commonService.showLoader();
      let queryObj:any = {
        patientId : this.patientId,
        caseName : this.caseName
      }

      this.authService.apiRequest('post', 'appointment/getAuthorizationManagementDetails', queryObj).subscribe(async response => { 
        if(response?.data && response?.data.authManagement.length){
          this.isAuthManagmentHistory = true
          this.authManagementHistory = response?.data.authManagement.sort((a:any, b:any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
        this.commonService.hideLoader(); 
      },(err) => {
        this.commonService.hideLoader();
        err.error?.error ? this.commonService.openSnackBar(err.error?.message, "ERROR") : ''
      })
  }
  
  onChangeAuthorization(event: any){
    if(event.value=="No"){
      this.authorizationManagement.controls['authorizationToDate'].setValue('')
      this.authorizationManagement?.get('authorizationToDate')?.clearValidators();
      this.authorizationManagement?.get('authorizationToDate')?.updateValueAndValidity();
      this.authorizationManagement?.get('authorizationToDate')?.disable();

      this.authorizationManagement.controls['authorizationFromDate'].setValue('')
      this.authorizationManagement?.get('authorizationFromDate')?.clearValidators();
      this.authorizationManagement?.get('authorizationFromDate')?.updateValueAndValidity();
      this.authorizationManagement?.get('authorizationFromDate')?.disable();

      this.authorizationManagement.controls['authorizationVisit'].setValue('')
      this.authorizationManagement?.get('authorizationVisit')?.clearValidators();
      this.authorizationManagement?.get('authorizationVisit')?.updateValueAndValidity();
      this.authorizationManagement?.get('authorizationVisit')?.disable();

      this.authorizationManagement.controls['authorizationNumber'].setValue('')
      this.authorizationManagement?.get('authorizationNumber')?.clearValidators();
      this.authorizationManagement?.get('authorizationNumber')?.updateValueAndValidity();
      this.authorizationManagement?.get('authorizationNumber')?.disable();
    }else{

      this.authorizationManagement?.get('authorizationToDate')?.enable();
      this.authorizationManagement?.get('authorizationToDate')?.setValidators([Validators.required]);
      this.authorizationManagement?.get('authorizationToDate')?.updateValueAndValidity();

      this.authorizationManagement?.get('authorizationFromDate')?.enable();
      this.authorizationManagement?.get('authorizationFromDate')?.setValidators([Validators.required]);
      this.authorizationManagement?.get('authorizationFromDate')?.updateValueAndValidity();

      this.authorizationManagement?.get('authorizationVisit')?.enable();
      this.authorizationManagement?.get('authorizationVisit')?.setValidators([Validators.required, Validators.pattern(regex.onlyNumeric)]);
      this.authorizationManagement?.get('authorizationVisit')?.updateValueAndValidity();

      this.authorizationManagement?.get('authorizationNumber')?.enable();
      this.authorizationManagement?.get('authorizationNumber')?.setValidators([Validators.required, Validators.pattern(regex.onlyNumeric)]);
      this.authorizationManagement?.get('authorizationNumber')?.updateValueAndValidity();
    }
  }

}
