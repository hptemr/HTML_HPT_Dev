import { Component,ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';
import { ChangePasswordModalComponent } from 'src/app/shared/comman/change-password-modal/change-password-modal.component';
// import { PracticeAdminService } from '../../../../shared/services/api/practice-admin.service';
import { FormBuilder, FormGroup, AbstractControl, Validators} from '@angular/forms';
import { validationMessages } from '../../../../utils/validation-messages';
import { CommonService } from '../../../../shared/services/helper/common.service';
import { regex } from '../../../../utils/regex-patterns';
import { AuthService } from '../../../../shared/services/api/auth.service';
import { AdminService } from '../../../../shared/services/api/admin.service';

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
  practiceLocationData:any =[]
  selectedLocations: string[] = [];
  userRole:string ='practice_admin'

  constructor(
    private router: Router, 
    public dialog: MatDialog,
    // private practiceAdminService:PracticeAdminService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private commonService:CommonService,
    private authService:AuthService,
    private adminService:AdminService
  ) { 
    this.route.params.subscribe((params: Params) => {
        this.practiceAdminId = params['practiceAdminId'];
      }
    );
  }

  @ViewChild('locationSelect') locationSelect: ElementRef;

  ngOnInit() {
    this.initializePracticeAdminProfile()
    this.getPracticeLocation()
    this.getProfile()
  }

  initializePracticeAdminProfile(){
    this.practiceAdminProfileForm = this.fb.group({
      firstName: ['', [Validators.required,Validators.pattern(regex.alphabetic)]],
      lastName: ['',[Validators.required,Validators.pattern(regex.alphabetic)]],
      // email: [{value:'',disabled: true}],
      email: ['',[Validators.required, Validators.email]],
      phoneNumber :["", [Validators.required,Validators.pattern(regex.usPhoneNumber)]],
      status:[''],
      practiceLocation:['']
    });
  }

  async getPracticeLocation() {
    this.practiceLocationData = await this.commonService.getPracticeLocation().catch(()=>[])
    console.log("this.practiceLocationData>>>",this.practiceLocationData)
  }

  getProfile(){
    if(this.practiceAdminId){
      this.adminService.profile(this.practiceAdminId).subscribe({
        next: (res) => {
          if(res && !res.error){
            console.log("practiceAdminId>>>",res)
            this.practiceAdminProfileForm.controls['firstName'].setValue(res.data?res.data.firstName:'');
            this.practiceAdminProfileForm.controls['lastName'].setValue(res.data?res.data.lastName:'');
            this.practiceAdminProfileForm.controls['email'].setValue(res.data?res.data.email:'');
            this.practiceAdminProfileForm.controls['phoneNumber'].setValue(res.data?res.data.phoneNumber:'');
            this.practiceAdminProfileForm.controls['status'].setValue(res.data?res.data.status:'');
            this.selectedLocations=res.data.practiceLocation
            console.log("this.selectedLocations>>>",this.selectedLocations)
          }
        },error: (err) => {
          err.error?.error?this.commonService.openSnackBar(err.error?.message,"ERROR"):''
        }
      });
    }
  }

  updatePracticeAdminProfile(){
    if(this.practiceAdminProfileForm.valid){
      this.practiceAdminProfileForm.value['practiceLocation'] = this.selectedLocations
      this.practiceAdminProfileForm.value['userId'] = this.practiceAdminId
      this.practiceAdminProfileForm.value['clickAction'] = 'update'
      this.updateProfile(this.practiceAdminProfileForm.value)
    }
  }

  updateProfile(profileData:any){
    this.adminService.updateProfile(profileData).subscribe({
        next: (res) => {
          if(res && !res.error){
            this.commonService.openSnackBar(res.message,"SUCCESS")
            this.getProfile()
          }
        },error: (err) => {
          err.error?.error?this.commonService.openSnackBar(err.error?.message,"ERROR"):''
        }
      });
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

    dialogRef.afterClosed().subscribe(result => {
      if(result && !result.error){
        let delBody ={
          userId : this.practiceAdminId,
          status : 'Deleted',
          clickAction : 'delete'
        }
        this.updateProfile(delBody)
      }
    });
  }

  changePassword() {
    const dialogRef = this.dialog.open(ChangePasswordModalComponent,{
      panelClass: 'change--password--modal',
      data : {
        userId : this.practiceAdminId,
        userRole: this.userRole
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("result>>>",result)
    });
  }

  removeLocation(location: any): void {
    const index = this.selectedLocations.indexOf(location);
    if (index !== -1) {
      this.selectedLocations.splice(index, 1);
    }
    console.log("removeLocation>>>>",this.selectedLocations)
  }

  onLocationChange(event:any){
    if(event.target.value && !this.selectedLocations.includes(event.target.value)){
      console.log("evt.target.value>>>>",event.target.value)
        this.selectedLocations.push(event.target.value);
    }
    this.locationSelect.nativeElement.selectedIndex = 0;
    console.log("onLocationChange>>>>",this.selectedLocations)
  }
}
