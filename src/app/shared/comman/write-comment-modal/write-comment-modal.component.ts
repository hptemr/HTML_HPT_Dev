import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
//import { SharedModule } from '../../shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { validationMessages } from '../../../utils/validation-messages';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';

@Component({
  selector: 'app-write-comment-modal',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatDialogModule, CommonModule, FormsModule, ReactiveFormsModule],//SharedModule
  templateUrl: './write-comment-modal.component.html',
  styleUrl: './write-comment-modal.component.scss'
})
export class WriteCommentModalComponent {
  validationMessages = validationMessages;
  rejectCommentForm: FormGroup; inviteButton: boolean = false;
  appointmentId: string = '';
  userRole: string = '';
  userId: string = '';

  constructor(
    private commonService: CommonService,
    private authService: AuthService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<WriteCommentModalComponent>,
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
    this.rejectCommentForm = this.fb.group({
      rejectComment: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
    });
  }

  trimInput() {
    const isWhitespace = (this.rejectCommentForm.controls['rejectComment'].value || '').trim().length === 0;
    const isValid = !isWhitespace;
    if (!isValid) {
      this.rejectCommentForm.controls['rejectComment'].setValue('');
    }
  }

  async submitForm(data: any) {
    if (this.appointmentId) {
      let reqVars = {
        query: { _id: this.appointmentId },
        updateInfo: {
          status: 'Cancelled',
          rejectInfo: {
            fromPatientId: this.userId,
            fromAdminId: this.userId,
            userRole: this.userRole,
            comment: data.rejectComment,
            rejectedDate: new Date()
          }
        }
      }
      await this.authService.apiRequest('post', 'appointment/cancelAppointment', reqVars).subscribe(async response => {
        this.dialogRef.close(response);
      })
    }
  }

}
