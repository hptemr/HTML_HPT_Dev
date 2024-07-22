import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/api/auth.service';
import { CommonService } from '../../../shared/services/helper/common.service';
import { validationMessages } from '../../../utils/validation-messages'
import { UserService } from '../../../shared/services/comet-chat/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validationMessages = validationMessages;
  public show: boolean = false;
  public loginForm: FormGroup;
  rememberMeObj: any = { email: '', password: '', rememberMe: false };
  userType: string = 'patient';
  forgetPasswordLink: string = '/forgot-password'

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private authService: AuthService,
    private commonService: CommonService,
    private userService:UserService
  ) {
    let rememberMeData: any = localStorage.getItem('rememberMe');
    if (rememberMeData != null) { this.rememberMeObj = JSON.parse(rememberMeData) }
  }

  ngOnInit() {
    const locationArray = location.href.split('/')
    let lastParam = locationArray[locationArray.length - 2];
    if (lastParam == 'admin') {
      this.userType = 'admin';
      this.forgetPasswordLink = '/admin/forgot-password'
    }
    this.initializeLoginForm()
  }

  initializeLoginForm() {
    this.loginForm = this.fb.group({
      email: [this.rememberMeObj.email, [Validators.required, Validators.email]],
      password: [this.rememberMeObj.password, Validators.required],
      rememberMe: [this.rememberMeObj.rememberMe],
      userType: [this.userType]
    });
  }

  showPassword() {
    this.show = !this.show;
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.loginUserInCometChat(res.data) // Admin user login in comet chat
          this.setLocalStorage(res, this.loginForm.value)
          
          //delete booking appointment cache data
          if (this.authService.getLoggedInInfo('role') == 'patient') {
            localStorage.removeItem('step1FormData')
            localStorage.removeItem('step2FormData')
            localStorage.removeItem('step3FormData')
            localStorage.removeItem('step4FormData')
            localStorage.removeItem('step5FormData')
            localStorage.removeItem('uploadedInsuranceFiles')
            localStorage.removeItem('uploadedPrescriptionFiles')
          }
          this.commonService.redirectToHome()
        }, error: (err) => {
          console.log("err:", err);
          err.error?.error ? this.commonService.openSnackBar(err.error?.message, "ERROR") : ''
        }
      });
    }
  }

  setLocalStorage(res: any, loginValues: any) {
    localStorage.setItem('user', JSON.stringify(res.data));
    if (this.loginForm.controls['rememberMe'].value) {
      localStorage.setItem('rememberMe', JSON.stringify(loginValues));
    } else {
      localStorage.removeItem('rememberMe');
    }
  }

  loginUserInCometChat(user:any){
    console.log("loginUserInCometChat>>>>",user)
    if(user.role!='patient'){
      this.userService.loginUser(user._id)
    }
  }

}
