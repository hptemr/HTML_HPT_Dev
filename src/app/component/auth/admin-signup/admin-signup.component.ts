import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/api/admin.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { validationMessages } from 'src/app/utils/validation-messages';

@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrl: './admin-signup.component.scss'
})
export class AdminSignupComponent {
  public signupForm: FormGroup;
  public show: boolean = false;
  validationMessages = validationMessages;
  userId: any
  pwdMatch = false
  termsConditionChecked = false
  constructor(
    private fb: FormBuilder,
    public router: Router,
    private adminService: AdminService,
    private commonService: CommonService,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'] //"66226a6db72289a66453d317"// 
    })
    this.initializeForm()
    this.getUserDetails()
  }

  initializeForm() {
    this.signupForm = this.fb.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", Validators.required],
      password: ["", [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
      confirmPassword: ["", Validators.required],
      termsConditions: ["", Validators.required],
    });
  }
  getUserDetails() {
    let params = {
      query: { _id: this.userId },
      params: { firstName: 1, lastName: 1, email: 1 },
      decryptUserId: true
    }
    this.adminService.getUserDetails(params).subscribe({
      next: (res) => {
        this.signupForm.controls['firstName'].setValue(res.data.firstName)
        this.signupForm.controls['lastName'].setValue(res.data.lastName)
        this.signupForm.controls['email'].setValue(res.data.email)
      }
    })
  }

  updateUser() {
    let params = {
      query: { _id: this.userId },
      updateInfo: {
        status: 'Active',
        firstName: this.signupForm.value.firstName,
        lastName: this.signupForm.value.lastName,
        password: this.signupForm.value.confirmPassword
      },
      passwordReset: true
    }
    this.adminService.updateUser(params).subscribe({
      next: (res) => {
        if (res && !res.error) {
          this.commonService.openSnackBar(res.message, "SUCCESS")
          localStorage.setItem('user', JSON.stringify(res.data));
          this.router.navigate(["/admin/login"])
        }
      }
    })
  }

  showPassword() {
    this.show = !this.show;
  }

  termsChecked(event: any) {
    this.termsConditionChecked = event.checked
  }

  passwordCheck() {
    if (this.signupForm.value.password != this.signupForm.value.confirmPassword) {
      this.pwdMatch = false
    } else {
      this.pwdMatch = true
    }
  }

  checkSpace(colName: any, event: any) {
    this.signupForm.controls[colName].setValue(this.commonService.capitalize(event.target.value.trim()))
  }
}
