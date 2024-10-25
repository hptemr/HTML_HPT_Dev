import { Component,Inject,OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { validationMessages } from '../../../../../utils/validation-messages';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog'; 
import { SuccessModalComponent } from 'src/app/shared/comman/success-modal/success-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-case-note-modal', 
  templateUrl: './case-note-modal.component.html',
  styleUrl: './case-note-modal.component.scss'
})
export class CaseNoteModalComponent implements OnInit {
  appointmentId: string;
  caseNoteForm: FormGroup;
  public userId: string = this.authService.getLoggedInInfo('_id');
  public userRole: string = this.authService.getLoggedInInfo('role');
  validationMessages = validationMessages; 
  appointment_dates:any=[];
  appointment: any = null
  submitted:boolean=false;
  caseNoteId: string = '';
  appointment_data: any = null
  readOnly:boolean=false;

  constructor(private router: Router,private fb: FormBuilder, private route: ActivatedRoute,public dialog: MatDialog, public commonService: CommonService, public authService: AuthService,public dialogRef: MatDialogRef<CaseNoteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.appointmentId = data.appointmentId;
  } 

  ngOnInit() {
    this.caseNoteForm = this.fb.group({
       appointmentId:[this.appointmentId],
       case_note_date:['', [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],  
       case_comment:['', [Validators.required, Validators.minLength(1), Validators.maxLength(1000)]],       
    });
    this.getCaseNoteRecord();
  }


  getCaseNoteRecord(){
    let reqVars = {
      query: {appointmentId:this.appointmentId},     
    }
    this.authService.apiRequest('post', 'soapNote/getCaseNoteData', reqVars).subscribe(async response => {
      if(response.data && response.data.caseNoteData){
        let caseNoteData = response.data.caseNoteData; 
        this.caseNoteId = caseNoteData._id;
        this.caseNoteForm.controls['case_note_date'].setValue(caseNoteData.case_note_date);
        this.caseNoteForm.controls['case_comment'].setValue(caseNoteData.case_comment);      
      }

      if(response.data && response.data.appointmentDatesList){
        this.appointment_dates = response.data.appointmentDatesList       
      }

      if(response.data && response.data.appointmentData){
        this.appointment_data = response.data.appointmentData
      }       

      if(response.data.caseNoteData && response.data.caseNoteData.status=='Finalized'){
        this.readOnly = true
        this.caseNoteForm.disable()
      }
    })
  }
  
  async caseNoteSubmit(formData:any,from:string){
    console.log(from,'>>>>formData>>>>',formData)
    if (this.caseNoteForm.invalid){
      this.caseNoteForm.markAllAsTouched();
    }else{
      if (this.appointmentId) {
        this.submitted = true
        this.commonService.showLoader();       
        let updateInfo = [];
        updateInfo.push({
          fromAdminId:this.userId,
          userRole:this.userRole,
          updatedAt:new Date()
        });

        if(this.caseNoteId){
          Object.assign(formData, {updateInfo:updateInfo,status:from})
        }else{
          Object.assign(formData, {updateInfo:updateInfo,appointmentId:this.appointmentId,status:from,createdBy:this.userId})
        }        
        let reqVars = {
          userId: this.userId,
          data: formData,
          caseNoteId:this.caseNoteId
        }        
        this.authService.apiRequest('post', 'soapNote/submitCaseNote', reqVars).subscribe(async (response) => {    
          if (response.error) {
            if (response.message) {
              this.commonService.openSnackBar(response.message, "ERROR");
            }           
          } else {         
            if (response.message) {
              this.dialogRef.close();
              this.successModal();
              //this.commonService.openSnackBar(response.message, "SUCCESS");
            }
          }
          this.commonService.hideLoader();
          setTimeout(() => {
            this.submitted = false
          }, 3000)          
        })
      }
    }

  }



  successModal() {
    const dialogRef = this.dialog.open(SuccessModalComponent,{
      panelClass: 'custom-alert-container',
      data : {
        successNote: 'Case note has been created successfully!'
      }
    });
  }
}
