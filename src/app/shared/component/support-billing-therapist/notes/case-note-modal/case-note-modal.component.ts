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
  action: string = '';
  appointment_data: any = null
  readOnly:boolean=false;
  id: string='';
  addendumId: string='';
  caseNoteDataList:any
  constructor(private router: Router,private fb: FormBuilder, private route: ActivatedRoute,public dialog: MatDialog, public commonService: CommonService, public authService: AuthService,public dialogRef: MatDialogRef<CaseNoteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.appointmentId = data.appointmentId;
    this.id = data.id;    
    this.addendumId = data.addendumId;    
    this.action = data.action
  } 

  ngOnInit() {
    this.caseNoteForm = this.fb.group({
       appointmentId:[this.appointmentId],
       soap_note_type:['case_note'],
       note_date:['', [Validators.minLength(1), Validators.maxLength(500)]],  
       case_comment:['', [Validators.required, Validators.minLength(1), Validators.maxLength(1000)]],       
    });
    this.getCaseNoteRecord();

    if(this.action=='View'){
      this.readOnly = true;
      this.caseNoteForm.disable()
      
    }      
  }

  getCaseNoteRecord(){
    let reqVars = {}
    if(this.id){
       reqVars = { 
        query: { appointmentId:this.appointmentId,soap_note_type:'case_note',_id:this.id},
        addendumId:this.addendumId
      }         
    }else{
      reqVars = {
        query: {appointmentId:this.appointmentId,soap_note_type:'case_note'}, 
        addendumId:this.addendumId    
      }
    }

    this.authService.apiRequest('post', 'soapNote/getCaseNoteData', reqVars).subscribe(async response => {
      if(response.data && response.data.caseNoteData){
        this.caseNoteDataList = response.data.caseNoteData;       
        if(this.id){
          this.fillupData(response.data.caseNoteData);
        }
      }

      if(response.data && response.data.appointmentDatesList){  
        if(this.id){
          let appointmentDatesList = response.data.appointmentDatesList.filter((p:any) => p.appointmentDate === response.data.caseNoteData.note_date);
          this.appointment_dates = this.commonService.checkappointmentDatesList(appointmentDatesList,'case_note')     
        }else{
          this.appointment_dates = this.commonService.checkappointmentDatesList(response.data.appointmentDatesList,'case_note')     
        }
      }

      if(response.data && response.data.appointmentData){
        this.appointment_data = response.data.appointmentData
      }       
     
    })
  }
  
  async caseNoteSubmit(formData:any,from:string){
    if (this.caseNoteForm.invalid){
      console.log(from,'>>>>formData>>>>',formData)
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
          Object.assign(formData, {updateInfo:updateInfo,status:from,appointmentId:this.appointmentId,})
        }else{
          Object.assign(formData, {updateInfo:updateInfo,appointmentId:this.appointmentId,status:from,createdBy:this.userId})
        }        
        let reqVars = {
          userId: this.userId,
          data: formData,
          caseNoteId:this.caseNoteId,
          addendumId:this.addendumId,
          appointmentId:this.appointmentId
        }        
        this.authService.apiRequest('post', 'soapNote/submitCaseNote', reqVars).subscribe(async (response) => {    
          if (response.error) {
            if (response.message) {
              this.commonService.openSnackBar(response.message, "ERROR");
            }           
          } else {         
            if (response.message) {
              this.commonService.openSnackBar(response.message, "SUCCESS");
              this.dialogRef.close('SUCCESS');//this.successModal();      
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

  onAppointmentDateChange(event: any) {
    if(event.target.value){
      let caseNoteData = this.caseNoteDataList.filter((p: { note_date: any; }) => p.note_date === event.target.value);
      if(caseNoteData){
        this.fillupData(caseNoteData);
      }  
    }
 
    
  }

  fillupData(caseNoteData:any){
    if(caseNoteData){
      this.caseNoteId = caseNoteData._id;
      this.caseNoteForm.controls['note_date'].setValue(caseNoteData.note_date);
      this.caseNoteForm.controls['case_comment'].setValue(caseNoteData.case_comment);      
      if(caseNoteData.status=='Finalized'){
        this.readOnly = true
        this.caseNoteForm.disable()
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
