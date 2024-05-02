import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';
import { ChangePasswordModalComponent } from 'src/app/shared/comman/change-password-modal/change-password-modal.component';
import { FormBuilder, FormGroup, AbstractControl, Validators} from '@angular/forms';
import { regex } from '../../../../../utils/regex-patterns';
import { validationMessages } from '../../../../../utils/validation-messages';
import { CommonService } from '../../../../../shared/services/helper/common.service';
import { AdminService } from '../../../../../shared/services/api/admin.service';
import { practiceLocations } from 'src/app/config';
@Component({
  selector: 'app-therapists-admin-profile', 
  templateUrl: './therapists-admin-profile.component.html',
  styleUrl: './therapists-admin-profile.component.scss'
})
export class TherapistsAdminProfileComponent {
  validationMessages = validationMessages
  therapistId:string;
  userRole:string ='therapist'
  therapistProfileForm: FormGroup;
  convertPhoneNumber: string = '';
  practiceLocationData:string[] = practiceLocations
  selectedLocations: string[] = [];

  constructor(
    private router: Router, 
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private commonService: CommonService,
    private adminService: AdminService
  ) { 
    this.route.params.subscribe((params: Params) => {
      this.therapistId = params['therapistId'];
    });
  }

  @ViewChild('locationSelect') locationSelect: ElementRef;

  ngOnInit() {
    this.initializeTherapistProfile()
    this.getProfile()
  }

  initializeTherapistProfile(){
    this.therapistProfileForm = this.fb.group({
      firstName: ['', [Validators.required,Validators.pattern(regex.alphabetic)]],
      lastName: ['',[Validators.required,Validators.pattern(regex.alphabetic)]],
      email: ['',[Validators.required, Validators.email]],
      phoneNumber :["", [Validators.required,Validators.pattern(regex.usPhoneNumber)]],
      NPI : ['',[Validators.required,Validators.pattern(regex.onlyNumeric)]],
      SSN : ['',[Validators.required,Validators.pattern(regex.numericAndSpecialCharacter)]],
      siteLeaderForPracLocation : [''],
      status:[''],
      practiceLocation:['']
    });
  }

  getProfile(){
    if(this.therapistId){
      let bodyData ={
        query: { _id : this.therapistId},
        params: { firstName:1,lastName:1,email:1,phoneNumber:1,status:1,practiceLocation:1,NPI:1,SSN:1,siteLeaderForPracLocation:1 }
      }
      this.adminService.profile(bodyData).subscribe({
        next: (res) => {
          if(res && !res.error){
            this.therapistProfileForm.controls['firstName'].setValue(res.data?res.data.firstName:'');
            this.therapistProfileForm.controls['lastName'].setValue(res.data?res.data.lastName:'');
            this.therapistProfileForm.controls['email'].setValue(res.data?res.data.email:'');
            this.therapistProfileForm.controls['phoneNumber'].setValue(res.data?res.data.phoneNumber:'');
            this.therapistProfileForm.controls['status'].setValue(res.data?res.data.status:'');
            this.therapistProfileForm.controls['siteLeaderForPracLocation'].setValue(res.data?res.data.siteLeaderForPracLocation:'');
            this.therapistProfileForm.controls['NPI'].setValue(res.data?res.data.NPI:'');
            this.therapistProfileForm.controls['SSN'].setValue(res.data?res.data.SSN:'');
            this.selectedLocations=res.data.practiceLocation
          }
        },error: (err) => {
          err.error?.error?this.commonService.openSnackBar(err.error?.message,"ERROR"):''
        }
      });
    }
  }

  onPhoneInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.convertPhoneNumber = this.commonService.formatPhoneNumber(inputElement.value);
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

  updateTherapistProfile(){
    if(this.therapistProfileForm.valid){
      this.therapistProfileForm.value['practiceLocation'] = this.selectedLocations
      this.therapistProfileForm.value['userId'] = this.therapistId
      this.therapistProfileForm.value['clickAction'] = 'update'
      this.updateProfile(this.therapistProfileForm.value)
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
          userId : this.therapistId,
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
        userId : this.therapistId,
        userRole: this.userRole
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("result>>>",result)
    });
  }

}
