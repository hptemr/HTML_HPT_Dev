import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';
import { ChangePasswordModalComponent } from 'src/app/shared/comman/change-password-modal/change-password-modal.component';
import { PracticeAdminService } from '../../../../shared/services/api/practice-admin.service';
import { FormBuilder, FormGroup, AbstractControl, Validators} from '@angular/forms';
import { validationMessages } from '../../../../utils/validation-messages';
import { CommonService } from '../../../../shared/services/helper/common.service';
import { regex } from '../../../../utils/regex-patterns';

@Component({
  selector: 'app-practice-admin-profile', 
  templateUrl: './practice-admin-profile.component.html',
  styleUrl: './practice-admin-profile.component.scss'
})
export class PracticeAdminProfileComponent {
  validationMessages = validationMessages
  practiceAdminProfileForm: FormGroup;
  practiceAdminId:string;
  convertPhoneNumber: string = '';

  items: string[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  selectedItems: string[] = [];

  constructor(
    private router: Router, 
    public dialog: MatDialog,
    private practiceAdminService:PracticeAdminService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private commonService:CommonService
  ) { 
    this.route.params.subscribe((params: Params) => {
        this.practiceAdminId = params['practiceAdminId'];
      }
    );
  }

  ngOnInit() {
    this.initializePracticeAdminProfile()
    this.getProfile()
  }

  initializePracticeAdminProfile(){
    this.practiceAdminProfileForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', Validators.required],
      email: [{value:'',disabled: true}],
      phoneNumber :["", [Validators.required,Validators.pattern(regex.usPhoneNumber)]],
      status:[''],
      practiceLocation:['']
    });
  }

  getProfile(){
    if(this.practiceAdminId){
      this.practiceAdminService.profile(this.practiceAdminId).subscribe({
        next: (res) => {
          if(res && !res.error){
            console.log("practiceAdminId>>>",res)
            this.practiceAdminProfileForm.controls['firstName'].setValue(res.data?res.data.firstName:'');
            this.practiceAdminProfileForm.controls['lastName'].setValue(res.data?res.data.lastName:'');
            this.practiceAdminProfileForm.controls['email'].setValue(res.data?res.data.email:'');
            this.practiceAdminProfileForm.controls['status'].setValue(res.data?res.data.status:'');
          }
        },error: (err) => {
          err.error?.error?this.commonService.openSnackBar(err.error?.message,"ERROR"):''
        }
      });
    }
  }

  savePracticeAdminProfile(){
    console.log("savePracticeAdminProfile>>>",this.practiceAdminProfileForm.value)
    if(this.practiceAdminProfileForm.valid){
    }
  }

  onPhoneInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.convertPhoneNumber = this.commonService.formatPhoneNumber(inputElement.value);
  }

  deleteAccount() {
    const dialogRef = this.dialog.open(AlertComponent,{
      panelClass: 'custom-alert-container',
      data : {
        warningNote: 'Do you really want to delete this account?'
      }
    });
  }

  changePassword() {
    const dialogRef = this.dialog.open(ChangePasswordModalComponent,{
      panelClass: 'change--password--modal',
    });
  }

  removeItem(item: string): void {
    const index = this.selectedItems.indexOf(item);
    if (index !== -1) {
      this.selectedItems.splice(index, 1);
    }
  }
}
