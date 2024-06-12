import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../../shared.module';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { validationMessages } from '../../../utils/validation-messages';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
@Component({
  selector: 'app-reschedule-appointment-modal',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatDialogModule, CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
  templateUrl: './reschedule-appointment-modal.component.html',
  styleUrl: './reschedule-appointment-modal.component.scss'
})
export class RescheduleAppointmentModalComponent {
  model: NgbDateStruct;
  validationMessages = validationMessages;
  rescheduleForm: FormGroup; inviteButton: boolean = false;
  appointmentId: string = '';
  userRole: string = '';
  userId: string = '';

  constructor(
    private commonService: CommonService,
    private authService: AuthService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RescheduleAppointmentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.appointmentId = data.appointmentId != undefined ? data.appointmentId : '';
    this.userRole = data.userRole != undefined ? data.userRole : '';
    this.userId = data.userId != undefined ? data.userId : '';
  }

  ngOnInit() {
    this.initializeForm()
  }

  initializeForm() {
    this.rescheduleForm = this.fb.group({
      rejectComment: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
    });
  }

  trimInput() {
    const isWhitespace = (this.rescheduleForm.controls['rejectComment'].value || '').trim().length === 0;
    const isValid = !isWhitespace;
    if (!isValid) {
      this.rescheduleForm.controls['rejectComment'].setValue('');
    }
  }

  async submitForm(data: any) {
    if (this.appointmentId) {
      let reqVars = {
        query: { _id: this.appointmentId },
        userId: this.userId,
        fromRole: this.userRole,
        commentText: data.rejectComment
      }
      this.commonService.showLoader();
      await this.authService.apiRequest('post', 'appointment/rescheduleAppointment', reqVars).subscribe(async response => {
        this.commonService.hideLoader();
        this.dialogRef.close(response);
      })
    }
  }
}
