import { Component ,OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { AuthService } from '../../../shared/services/api/auth.service';
import { CommonService } from '../../../shared/services/helper/common.service';
import { validationMessages } from '../../../utils/validation-messages'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validationMessages = validationMessages; 
  public show: boolean = false;
  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    public router: Router,
    private authService: AuthService,
    private commonService:CommonService
    ) {}

  ngOnInit() {
    this.initializeLoginForm()
  }

  initializeLoginForm(){
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  showPassword() {
    this.show = !this.show;
  }

  login() {
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log("res login>>>>",res);
          localStorage.setItem('user', JSON.stringify(res.data));
          this.router.navigate(["/system-admin/user-managment/practice-admin"]);
        },error: (err) => {
          console.log("err login>>>>",err);
          err.error?.error?this.commonService.openSnackBar(err.error?.message,"ERROR"):''
        }
      });
    }
    // this.router.navigate(["/system-admin/user-managment/practice-admin"]);
  }

}
