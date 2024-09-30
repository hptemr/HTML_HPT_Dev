import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/api/auth.service';
import { CommonService } from '../../../shared/services/helper/common.service';
import { Router } from '@angular/router'; 
import { validationMessages } from '../../../utils/validation-messages'

@Component({
  selector: 'app-forgot-password', 
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  validationMessages = validationMessages; 
  public forgotPasswordForm: FormGroup;
  userType: string = 'patient';
  signInLink: string ='/'

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private commonService:CommonService,
    public router: Router
    ) {}

  ngOnInit() {
    const locationArray = location.href.split('/')
    let lastParam = locationArray[locationArray.length - 2];
    
    if(lastParam=='admin'){
      this.userType = 'admin';
      this.signInLink='/admin/login'
    }

    this.forgotPasswordForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      userType:[this.userType]
    });
  }

  forgotPassword(){
    if(this.forgotPasswordForm.valid){
      this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe({
        next: (res) => {
          if(res && !res.error){
            this.commonService.openSnackBar(res.message,"SUCCESS")
            if(this.userType=='patient'){
              this.router.navigate(["/"]);
            }else{
              this.router.navigate(["/admin/login"]);
            }            
          }
        },error: (err) => {
          console.log("err login>>>>",err);
          err.error?.error?this.commonService.openSnackBar(err.error?.message,"ERROR"):''
        }
      });
    }
  }

}
