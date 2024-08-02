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
  appointment_dates:any=["07/12/2024","05/14/2024","04/10/2024"];
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
  }
  
  async caseNoteSubmit(formData:any,from:string){
    if (this.caseNoteForm.invalid){
      this.caseNoteForm.markAllAsTouched();
    }else{

      if (this.appointmentId) {
        this.dialogRef.close();
        this.successModal();

        // let reqVars = {
        //   query: { _id: this.appointmentId },
        //   userId: this.userId,
        //   userRole: this.userRole,
        //   data: formData
        // }
        // await this.authService.apiRequest('post', 'appointment/acceptAppointment', reqVars).subscribe(async response => {
        //   this.commonService.hideLoader();
        //   if (response.error) {
        //     this.commonService.openSnackBar(response.message, "ERROR")
        //   } else {
        //     this.commonService.openSnackBar(response.message, "SUCCESS")
        //     this.successModal();
        //   }
        // })
      }

    }
    console.log(from,'>>>>formData>>>>',formData)
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
