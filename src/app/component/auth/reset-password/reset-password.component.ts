import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../shared/services/api/auth.service';
import { CommonService } from '../../../shared/services/helper/common.service';
import { Router } from '@angular/router'; 
import { FormBuilder, FormGroup, AbstractControl, Validators} from '@angular/forms';
import { regex } from '../../../utils/regex-patterns';
import { validationMessages } from '../../../utils/validation-messages';

@Component({
  selector: 'app-reset-password', 
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  validationMessages = validationMessages
  public showPass: boolean = false;
  public showConfirmPass: boolean = false;
  public userId: string;
  public token: any;
  passwordForm: FormGroup;
  userType: string = 'patient';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private commonService:CommonService,
    public router: Router,
    private fb: FormBuilder
  ) {
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  ngOnInit() {
    const locationArray = location.href.split('/')
    let lastParam = locationArray[locationArray.length - 2];
    
    if(lastParam=='admin'){
      this.userType = 'admin';
    }

    this.checkResetPassLink()
    this.initializePasswordForm()
  }

  initializePasswordForm(){
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.pattern(regex.password)]],
      confirmPassword: ['', Validators.required],
      userType:[this.userType]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password:any = control.get('password');
    const confirmPassword:any = control.get('confirmPassword');
    if (confirmPassword.value && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }


  // getRoutesParams(){
  //   this.route.paramMap.subscribe(params => {
  //     this.userId = params.get('userId') as string;
  //     this.token = params.get('token') as string;
  //   });
  // }

  checkResetPassLink(){
      this.authService.checkForgotPasswordToken(this.token,this.userType).subscribe({
        next: (res) => {
          if(res && !res.error){
            this.commonService.openSnackBar(res.message,"SUCCESS")
          }
        },error: (err) => {
          err.error?.error?this.commonService.openSnackBar(err.error?.message,"ERROR"):''
          if(this.userType=='admin'){
            this.router.navigate(["/admin/login"]);
          }else{
            this.router.navigate(["/"]);
          }

        }
      });
  }

  resetPassword(){
    if(this.passwordForm.valid){
      const resetBody = {
        // userId: this.userId,
        token: this.token,
        password: this.passwordForm.value['confirmPassword'],
        userType:this.userType
      }
      this.authService.resetPassword(resetBody).subscribe({
        next: (res) => {
          if(res && !res.error){
            this.commonService.openSnackBar(res.message,"SUCCESS")
            if(this.userType=='admin'){
              this.router.navigate(["/admin/login"]);
            }else{
              this.router.navigate(["/"]);
            }
          }
        },error: (err) => {
          err.error?.error?this.commonService.openSnackBar(err.error?.message,"ERROR"):''
        }
      });
    }
  }

  showPassword() {
    this.showPass = !this.showPass;
  }

  showConfirmPassword() {
    this.showConfirmPass = !this.showConfirmPass;
  }
}
