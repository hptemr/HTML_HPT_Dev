import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { SuccessModalComponent } from 'src/app/shared/comman/success-modal/success-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { practiceLocations, s3Details } from 'src/app/config';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { validationMessages } from '../../../../../utils/validation-messages';
import { Router} from '@angular/router';
@Component({
  selector: 'app-reschedule-appointment-modal',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatDialogModule, CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
  templateUrl: './appointment-req-modal.component.html',
  styleUrl: './appointment-req-modal.component.scss'
})
export class AppointmentReqModalComponent {
  model: NgbDateStruct;
  fromDate: any
  toDate: any;
  whereCond: any = {}
  minToDate: any = this.commonService.displayFormatDate(new Date(),true)
  maxFromDate:any = this.commonService.displayFormatDate(this.commonService.getMaxAppoinmentFutureMonths(),true)
  requestAppointmentForm: FormGroup;
  validationMessages = validationMessages
  practiceLocationData: string[] = practiceLocations
  public userId: string = this.authService.getLoggedInInfo('_id');
  public userRole: string = this.authService.getLoggedInInfo('role');
  clickOnRequestAppointment:boolean=false;
  constructor(public dialog: MatDialog,
    public authService: AuthService,
    public commonService: CommonService,
    private fb: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<AppointmentReqModalComponent>,
  ) {
  }
 
  ngOnInit() {
    this.requestAppointmentForm = this.fb.group({
      appointmentDate: ['', [Validators.required]],
      practiceLocation: ['',[Validators.required]],
    });
    //this.getAppointmentList()
  }
 
  async requestAppointment(formData:any){    
    console.log('formData >>> ',formData)
    if (this.requestAppointmentForm.valid) {
        this.clickOnRequestAppointment = true
        this.commonService.showLoader();
        Object.assign(formData, {patientId: this.userId})
        let reqVars = {
          userId: this.userId,
          data: formData
        }
        await this.authService.apiRequest('post', 'appointment/createAppointmentRequest',reqVars).subscribe(async response => { 
          this.commonService.hideLoader();
          this.dialogRef.close();
          if (response.error) {
            if(response.message){
              this.commonService.openSnackBar(response.message, "ERROR")   
            }
          } else {          
            if(response.message){
              this.commonService.openSnackBar(response.message, "SUCCESS")   
            }          
          //this.router.navigate(['/support-team/referrals']);
          this.successModal();
          }
        })
    }else{
        this.requestAppointmentForm.markAllAsTouched();
        return;  
    }
  }

  
  successModal() {
    const dialogRef = this.dialog.open(SuccessModalComponent,{
      panelClass: 'custom-alert-container',
      data : {
        successHeader:'Appointment Requested',
        successNote: ' Thank you for requesting an appointment. Your recovery is our only priority. We are working diligently on your request and  will respond in 1 business day or less. '
      }
    });
  }

   // getAppointmentList() {
  //   throw new Error('Method not implemented.');
  // }
  // onDateChange(event: any, colName: any) {
  //   if (colName == 'fromDate') {
  //     this.minToDate = new Date(event.target.value)
  //   }
  //   let dateCond
  //   if (this.fromDate && this.toDate) {
  //     dateCond = {
  //       appointmentDate: {
  //         $gte: this.fromDate,
  //         $lte: this.toDate
  //       }
  //     }
  //   } else {
  //     if (this.fromDate) {
  //       dateCond = {
  //         appointmentDate: { $gte: this.fromDate }
  //       }
  //     } else {
  //       dateCond = {
  //         appointmentDate: { $lte: this.toDate }
  //       }
  //     }
  //   }
  //   Object.assign(this.whereCond, dateCond)
  //   //this.getAppointmentList()
  // }

  
}
