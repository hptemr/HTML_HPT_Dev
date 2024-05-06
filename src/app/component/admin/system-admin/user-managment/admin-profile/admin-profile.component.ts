import { Component,ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';
import { ChangePasswordModalComponent } from 'src/app/shared/comman/change-password-modal/change-password-modal.component';
import { FormBuilder, FormGroup, AbstractControl, Validators} from '@angular/forms';
import { validationMessages } from '../../../../../utils/validation-messages';
import { CommonService } from '../../../../../shared/services/helper/common.service';
import { regex } from '../../../../../utils/regex-patterns';
import { AdminService } from '../../../../../shared/services/api/admin.service';
import { practiceLocations } from 'src/app/config';
@Component({
  selector: 'app-admin-profile', 
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.scss'
})
export class AdminProfileComponent {
  validationMessages = validationMessages
  practiceAdminProfileForm: FormGroup;
  adminId:string;
  convertPhoneNumber: string = '';
  practiceLocationData:string[] = practiceLocations
  selectedLocations: string[] = [];
  userRole:string =''
  isTherapist:boolean=false

  constructor(
    private router: Router, 
    public dialog: MatDialog,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private commonService:CommonService,
    private adminService:AdminService
  ) { 
    this.route.params.subscribe((params: Params) => {
        this.adminId = params['adminId'];
      }
    );
  }

  @ViewChild('locationSelect') locationSelect: ElementRef;

  ngOnInit() {
    this.initializePracticeAdminProfile()
    this.getProfile()
  }

  initializePracticeAdminProfile(){
    this.practiceAdminProfileForm = this.fb.group({
      firstName: ['', [Validators.required,Validators.pattern(regex.alphabetic)]],
      lastName: ['',[Validators.required,Validators.pattern(regex.alphabetic)]],
      email: ['',[Validators.required, Validators.email]],
      phoneNumber :["", [Validators.required,Validators.pattern(regex.usPhoneNumber)]],
      status:[''],
      practiceLocation:['']
    });
  }

  // Therapist Fields
  initializeTherapistFields(){
    this.practiceAdminProfileForm.addControl('NPI', this.fb.control('', [Validators.required, Validators.pattern(regex.onlyNumeric)]));
    this.practiceAdminProfileForm.addControl('SSN', this.fb.control('', [Validators.required, Validators.pattern(regex.numericAndSpecialCharacter)]));
    this.practiceAdminProfileForm.addControl('siteLeaderForPracLocation', this.fb.control('', []));
    this.practiceAdminProfileForm.addControl('licenceNumber', this.fb.control('', []));
  }

  getProfile(){
    if(this.adminId){
      let bodyData ={
        query: { _id : this.adminId},
        params: { firstName:1,lastName:1,email:1,phoneNumber:1,status:1,practiceLocation:1,role:1,NPI:1,SSN:1,siteLeaderForPracLocation:1,licenceNumber:1 }
      }
      this.adminService.profile(bodyData).subscribe({
        next: (res) => {
          if(res && !res.error){
            this.practiceAdminProfileForm.controls['firstName'].setValue(res.data?res.data.firstName:'');
            this.practiceAdminProfileForm.controls['lastName'].setValue(res.data?res.data.lastName:'');
            this.practiceAdminProfileForm.controls['email'].setValue(res.data?res.data.email:'');
            this.practiceAdminProfileForm.controls['phoneNumber'].setValue(res.data?res.data.phoneNumber:'');
            this.practiceAdminProfileForm.controls['status'].setValue(res.data?res.data.status:'');
            this.selectedLocations=res.data.practiceLocation
            this.userRole = res.data.role

            // Therapist Fields
            if(this.userRole=='therapist'){
              this.initializeTherapistFields()
              this.practiceAdminProfileForm.controls['siteLeaderForPracLocation'].setValue(res.data?res.data.siteLeaderForPracLocation:'');
              this.practiceAdminProfileForm.controls['NPI'].setValue(res.data?res.data.NPI:'');
              this.practiceAdminProfileForm.controls['SSN'].setValue(res.data?res.data.SSN:'');
              this.practiceAdminProfileForm.controls['licenceNumber'].setValue(res.data?res.data.licenceNumber:'');
              this.isTherapist = true
            }
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
      this.practiceAdminProfileForm.value['userId'] = this.adminId
      this.practiceAdminProfileForm.value['clickAction'] = 'update'
      this.updateProfile(this.practiceAdminProfileForm.value)
    }
  }

  updateProfile(profileData:any){
    this.adminService.updateProfile(profileData).subscribe({
        next: (res) => {
          if(res && !res.error){
            this.commonService.openSnackBar(res.message,"SUCCESS")
            // this.getProfile()
            this.navigateToAdminUserList()
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
          userId : this.adminId,
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
        userId : this.adminId,
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
  }

  onLocationChange(event:any){
    if(event.target.value && !this.selectedLocations.includes(event.target.value)){
        this.selectedLocations.push(event.target.value);
    }
    this.locationSelect.nativeElement.selectedIndex = 0;
  }

  navigateToAdminUserList(){
    const adminUserListingUrlSegment=this.commonService.getUrlSegmentBaseOnRole(this.userRole)
    this.router.navigate([`/system-admin/user-managment/${adminUserListingUrlSegment}`]);
  }

  checkSpace(colName: any, event: any) {
    this.practiceAdminProfileForm.controls[colName].setValue(this.commonService.capitalize(event.target.value.trim()))
  }

}
