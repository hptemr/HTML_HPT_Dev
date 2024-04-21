import { Component, Inject,  } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SuccessModalComponent } from '../success-modal/success-modal.component';
import { FormBuilder, FormGroup, AbstractControl, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SystemAdminService } from '../../../shared/services/api/system-admin.service';
import { CommonService } from '../../../shared/services/helper/common.service';
import { AuthService } from '../../../shared/services/api/auth.service';
import { regex } from '../../../utils/regex-patterns';
import { validationMessages } from '../../../utils/validation-messages';
import { AdminCommonService } from '../../../shared/services/api/admin-common.service';

@Component({
  selector: 'app-change-password-modal', 
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatDialogModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './change-password-modal.component.html',
  styleUrl: './change-password-modal.component.scss'
})
export class ChangePasswordModalComponent {
  validationMessages = validationMessages
  changePasswordForm: FormGroup;
  public showNewPass: boolean = false;
  public showCurrPass: boolean = false;
  public showConfPass: boolean = false;

  constructor( 
    public dialog: MatDialog,
    private fb: FormBuilder,
    private systemAdminService:SystemAdminService,
    private commonService:CommonService,
    private changePassDialogRef: MatDialogRef<ChangePasswordModalComponent>,
    private authService:AuthService,
    private adminCommonService: AdminCommonService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.initializeChangePasswordForm()
    console.log("data>>>>",this.data)
  }


  initializeChangePasswordForm(){
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.pattern(regex.password)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const newPassword:any = control.get('newPassword');
    const confirmPassword:any = control.get('confirmPassword');
    if (newPassword.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  changePassword(){
    if(this.changePasswordForm.valid){
      const resetBody = {
        currentPassword: this.changePasswordForm.value['currentPassword'],
        confirmPassword: this.changePasswordForm.value['confirmPassword'],
        userId : this.data.userId
      }
      this.adminCommonService.changePassword(resetBody).subscribe({
        next: (res) => {
          if(res && !res.error){
            // this.changePassDialogRef.close();
            this.successModal(res)
          }
        },error: (err) => {
          err.error?.error?this.commonService.openSnackBar(err.error?.message,"ERROR"):''
        }
      });
    }
  }

  successModal(res:any) {
    const dialogRef = this.dialog.open(SuccessModalComponent,{
      disableClose :true,
      panelClass: 'custom-alert-container',
      data : {
        successNote: res.message
      }
    });
   
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        // this.authService.logout()
        this.changePassDialogRef.close(true);
      }
    });
  }

  
  showNewPassword() {
    this.showNewPass = !this.showNewPass;
  }

  showCurrentPassword() {
    this.showCurrPass = !this.showCurrPass;
  }

  showConfirmPassword() {
    this.showConfPass = !this.showConfPass;
  }
}
