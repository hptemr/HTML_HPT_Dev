"use strict";(self.webpackChunkcion_angular_16=self.webpackChunkcion_angular_16||[]).push([[716],{2806:(C,g,t)=>{t.d(g,{s:()=>u});var f=t(8834),l=t(4006),m=t(9213),c=t(7278),_=t(9417),a=t(177),v=t(9039),M=t(5802),e=t(4438),P=t(3390),w=t(758);function R(o,h){if(1&o){const r=e.RV6();e.j41(0,"div",17),e.bIt("click",function(){e.eBV(r);const s=e.XpG();return e.Njj(s.showCurrentPassword())}),e.nrm(1,"span",18),e.k0s()}}function k(o,h){if(1&o){const r=e.RV6();e.j41(0,"div",17),e.bIt("click",function(){e.eBV(r);const s=e.XpG();return e.Njj(s.showCurrentPassword())}),e.nrm(1,"span",19),e.k0s()}}function F(o,h){if(1&o&&(e.j41(0,"div",20),e.EFF(1),e.k0s()),2&o){const r=e.XpG();e.R7$(),e.SpI(" ",r.validationMessages.required("Current password")," ")}}function D(o,h){if(1&o&&(e.j41(0,"div",20),e.EFF(1),e.k0s()),2&o){const r=e.XpG();e.R7$(),e.SpI(" ",r.validationMessages.password," ")}}function b(o,h){if(1&o){const r=e.RV6();e.j41(0,"div",17),e.bIt("click",function(){e.eBV(r);const s=e.XpG();return e.Njj(s.showNewPassword())}),e.nrm(1,"span",18),e.k0s()}}function N(o,h){if(1&o){const r=e.RV6();e.j41(0,"div",17),e.bIt("click",function(){e.eBV(r);const s=e.XpG();return e.Njj(s.showNewPassword())}),e.nrm(1,"span",19),e.k0s()}}function I(o,h){if(1&o&&(e.j41(0,"div",20),e.EFF(1),e.k0s()),2&o){const r=e.XpG();e.R7$(),e.SpI(" ",r.validationMessages.required("New password")," ")}}function O(o,h){if(1&o&&(e.j41(0,"div",20),e.EFF(1),e.k0s()),2&o){const r=e.XpG();e.R7$(),e.SpI(" ",r.validationMessages.password," ")}}function p(o,h){if(1&o){const r=e.RV6();e.j41(0,"div",17),e.bIt("click",function(){e.eBV(r);const s=e.XpG();return e.Njj(s.showConfirmPassword())}),e.nrm(1,"span",18),e.k0s()}}function E(o,h){if(1&o){const r=e.RV6();e.j41(0,"div",17),e.bIt("click",function(){e.eBV(r);const s=e.XpG();return e.Njj(s.showConfirmPassword())}),e.nrm(1,"span",19),e.k0s()}}function n(o,h){if(1&o&&(e.j41(0,"div",20),e.EFF(1),e.k0s()),2&o){const r=e.XpG();e.R7$(),e.SpI(" ",r.validationMessages.confirmPassword," ")}}function i(o,h){if(1&o&&(e.j41(0,"div",20),e.EFF(1),e.k0s()),2&o){const r=e.XpG();e.R7$(),e.SpI(" ",r.validationMessages.passwordMismatch," ")}}let u=(()=>{class o{constructor(r,d,s,j,T,y){this.dialog=r,this.fb=d,this.commonService=s,this.changePassDialogRef=j,this.adminService=T,this.data=y,this.validationMessages=M.q,this.showNewPass=!1,this.showCurrPass=!1,this.showConfPass=!1}ngOnInit(){this.initializeChangePasswordForm()}initializeChangePasswordForm(){this.changePasswordForm=this.fb.group({currentPassword:["",[_.k0.required,_.k0.pattern(v.y.password)]],newPassword:["",[_.k0.required,_.k0.pattern(v.y.password)]],confirmPassword:["",_.k0.required]},{validator:this.passwordMatchValidator})}passwordMatchValidator(r){const d=r.get("newPassword"),s=r.get("confirmPassword");return s.value&&d.value!==s.value?{passwordMismatch:!0}:null}changePassword(){this.changePasswordForm.valid&&this.adminService.changePassword({currentPassword:this.changePasswordForm.value.currentPassword,confirmPassword:this.changePasswordForm.value.confirmPassword,userId:this.data.userId}).subscribe({next:d=>{d&&!d.error&&this.successModal(d)},error:d=>{d.error?.error&&this.commonService.openSnackBar(d.error?.message,"ERROR")}})}successModal(r){this.dialog.open(c.c,{disableClose:!0,panelClass:"custom-alert-container",data:{successNote:r.message}}).afterClosed().subscribe(s=>{s&&this.changePassDialogRef.close(!0)})}showNewPassword(){this.showNewPass=!this.showNewPass}showCurrentPassword(){this.showCurrPass=!this.showCurrPass}showConfirmPassword(){this.showConfPass=!this.showConfPass}static#e=this.\u0275fac=function(d){return new(d||o)(e.rXU(l.bZ),e.rXU(_.ok),e.rXU(P.h),e.rXU(l.CP),e.rXU(w.z),e.rXU(l.Vh))};static#a=this.\u0275cmp=e.VBU({type:o,selectors:[["app-change-password-modal"]],standalone:!0,features:[e.aNF],decls:45,vars:14,consts:[[1,"changepassword--wrapper"],[1,"cp--header"],[1,"cp--body"],[1,"row",3,"formGroup"],[1,"col-12"],[1,"form-group"],[1,"col-form-label","fw-600"],[1,"clr--DF0404","ms-1"],[1,"form-input","position-relative"],["placeholder","*********","formControlName","currentPassword",1,"form-control",3,"type"],[1,"show-hide"],["class","text text-danger mt-1",4,"ngIf"],["placeholder","*********","formControlName","newPassword",1,"form-control",3,"type"],["placeholder","*********","formControlName","confirmPassword",1,"form-control",3,"type"],[1,"cp--footer","w-100","d-flex","align-items-center","justify-content-end"],["mat-stroked-button","","color","primary","mat-dialog-close","",1,"me-2"],["mat-raised-button","","color","primary",3,"click","disabled"],[1,"show-hide",3,"click"],[1,"show"],[1,"Hide"],[1,"text","text-danger","mt-1"]],template:function(d,s){1&d&&(e.j41(0,"div",0)(1,"div",1)(2,"h1"),e.EFF(3,"Change Password"),e.k0s()(),e.j41(4,"div",2)(5,"form",3)(6,"div",4)(7,"div",5)(8,"label",6),e.EFF(9,"Current Password "),e.j41(10,"span",7),e.EFF(11," * "),e.k0s()(),e.j41(12,"div",8),e.nrm(13,"input",9),e.DNE(14,R,2,0,"div",10)(15,k,2,0),e.k0s(),e.DNE(16,F,2,1,"div",11)(17,D,2,1,"div",11),e.k0s(),e.j41(18,"div",5)(19,"label",6),e.EFF(20,"New Password "),e.j41(21,"span",7),e.EFF(22," * "),e.k0s()(),e.j41(23,"div",8),e.nrm(24,"input",12),e.DNE(25,b,2,0,"div",10)(26,N,2,0),e.k0s(),e.DNE(27,I,2,1,"div",11)(28,O,2,1,"div",11),e.k0s(),e.j41(29,"div",5)(30,"label",6),e.EFF(31,"Confirm Password "),e.j41(32,"span",7),e.EFF(33," * "),e.k0s()(),e.j41(34,"div",8),e.nrm(35,"input",13),e.DNE(36,p,2,0,"div",10)(37,E,2,0),e.k0s(),e.DNE(38,n,2,1,"div",11)(39,i,2,1,"div",11),e.k0s()()()(),e.j41(40,"div",14)(41,"button",15),e.EFF(42,"Cancel"),e.k0s(),e.j41(43,"button",16),e.bIt("click",function(){return s.changePassword()}),e.EFF(44,"Submit"),e.k0s()()()),2&d&&(e.R7$(5),e.Y8G("formGroup",s.changePasswordForm),e.R7$(8),e.Y8G("type",s.showCurrPass?"text":"password"),e.R7$(),e.vxM(14,s.showCurrPass?15:14),e.R7$(2),e.Y8G("ngIf",s.changePasswordForm.controls.currentPassword.touched&&s.changePasswordForm.controls.currentPassword.hasError("required")),e.R7$(),e.Y8G("ngIf",s.changePasswordForm.controls.currentPassword.touched&&s.changePasswordForm.controls.currentPassword.hasError("pattern")),e.R7$(7),e.Y8G("type",s.showNewPass?"text":"password"),e.R7$(),e.vxM(25,s.showNewPass?26:25),e.R7$(2),e.Y8G("ngIf",s.changePasswordForm.controls.newPassword.touched&&s.changePasswordForm.controls.newPassword.hasError("required")),e.R7$(),e.Y8G("ngIf",s.changePasswordForm.controls.newPassword.touched&&s.changePasswordForm.controls.newPassword.hasError("pattern")),e.R7$(7),e.Y8G("type",s.showConfPass?"text":"password"),e.R7$(),e.vxM(36,s.showConfPass?37:36),e.R7$(2),e.Y8G("ngIf",s.changePasswordForm.controls.confirmPassword.touched&&s.changePasswordForm.controls.confirmPassword.hasError("required")),e.R7$(),e.Y8G("ngIf",s.changePasswordForm.hasError("passwordMismatch")&&s.changePasswordForm.controls.confirmPassword.touched),e.R7$(4),e.Y8G("disabled",!s.changePasswordForm.valid))},dependencies:[m.m_,f.Hl,f.$z,l.hM,l.tx,a.MD,a.bT,_.YN,_.qT,_.me,_.BC,_.cb,_.X1,_.j4,_.JD],styles:[".change--password--modal .mat-mdc-dialog-container{width:423px}  .change--password--modal .mat-mdc-dialog-container .changepassword--wrapper{padding:30px 24px}  .change--password--modal .mat-mdc-dialog-container .changepassword--wrapper .cp--header h1{color:#1f2f3e;font-size:18px;margin-bottom:25px;font-weight:600}  .change--password--modal .mat-mdc-dialog-container .changepassword--wrapper .cp--footer{margin-top:17px}"]})}return o})()},7278:(C,g,t)=>{t.d(g,{c:()=>a});var f=t(8834),l=t(4006),m=t(9213),c=t(4438),_=t(9417);let a=(()=>{class v{constructor(e,P,w){this.fb=e,this.dialogRef=P,this.data=w,this.successNote="",this.successNote=null!=w.successNote?w.successNote:this.successNote}static#e=this.\u0275fac=function(P){return new(P||v)(c.rXU(_.ok),c.rXU(l.CP),c.rXU(l.Vh))};static#a=this.\u0275cmp=c.VBU({type:v,selectors:[["app-success-modal"]],standalone:!0,features:[c.aNF],decls:8,vars:2,consts:[[1,"alert--wrapper"],[1,"col-12","d-flex","flex-column","align-items-center","justify-content-center","w-100","text-center"],["src","assets/images/ark/successful.gif","alt","","width","60px"],[1,"alert--note"],[1,"d-flex","align-items-center","justify-content-center"],["mat-raised-button","","color","primary","cdkFocusInitial","",3,"mat-dialog-close"]],template:function(P,w){1&P&&(c.j41(0,"div",0)(1,"div",1),c.nrm(2,"img",2),c.j41(3,"p",3),c.EFF(4),c.k0s(),c.j41(5,"div",4)(6,"button",5),c.EFF(7,"Okay "),c.k0s()()()()),2&P&&(c.R7$(4),c.JRh(w.successNote),c.R7$(2),c.Y8G("mat-dialog-close",!0))},dependencies:[m.m_,f.Hl,f.$z,l.hM,l.tx]})}return v})()},3716:(C,g,t)=>{t.d(g,{O:()=>O});var f=t(4494),l=t(2806),m=t(9417),c=t(5802),_=t(9039),a=t(4438),v=t(4006),M=t(3390),e=t(6992),P=t(758),w=t(177),R=t(8834),k=t(9213),F=t(3902);function D(p,E){if(1&p&&(a.j41(0,"div",31),a.EFF(1),a.k0s()),2&p){const n=a.XpG();a.R7$(),a.SpI(" ",n.validationMessages.required("your First Name")," ")}}function b(p,E){if(1&p&&(a.j41(0,"div",31),a.EFF(1),a.k0s()),2&p){const n=a.XpG();a.R7$(),a.SpI(" ",n.validationMessages.alphabeticChar("First Name")," ")}}function N(p,E){if(1&p&&(a.j41(0,"div",31),a.EFF(1),a.k0s()),2&p){const n=a.XpG();a.R7$(),a.SpI(" ",n.validationMessages.required("your Last Name")," ")}}function I(p,E){if(1&p&&(a.j41(0,"div",31),a.EFF(1),a.k0s()),2&p){const n=a.XpG();a.R7$(),a.SpI(" ",n.validationMessages.alphabeticChar("Last Name")," ")}}let O=(()=>{class p{constructor(n,i,u,o,h){this.dialog=n,this.fb=i,this.commonService=u,this.authService=o,this.adminService=h,this.validationMessages=c.q,this.userRole="system_admin";let r=localStorage.getItem("user");this.userData=r&&null!=r?JSON.parse(r):null}ngOnInit(){this.initializeUpdateProfileForm(),this.getProfile()}initializeUpdateProfileForm(){this.updateProfileForm=this.fb.group({firstName:["",[m.k0.required,m.k0.pattern(_.y.alphabetic)]],lastName:["",[m.k0.required,m.k0.pattern(_.y.alphabetic)]],email:[{value:"",disabled:!0}]})}getProfile(){this.adminService.profile({query:{_id:this.userData._id},params:{firstName:1,lastName:1,email:1,phoneNumber:1,status:1,practiceLocation:1}}).subscribe({next:i=>{i&&!i.error&&(this.updateProfileForm.controls.firstName.setValue(i.data?i.data.firstName:""),this.updateProfileForm.controls.lastName.setValue(i.data?i.data.lastName:""),this.updateProfileForm.controls.email.setValue(i.data?i.data.email:""))},error:i=>{i.error?.error&&this.commonService.openSnackBar(i.error?.message,"ERROR")}})}updateProfile(){this.updateProfileForm.valid&&(this.updateProfileForm.value.userId=this.userData._id,this.updateProfileForm.value.clickAction="update",this.adminService.updateProfile(this.updateProfileForm.value).subscribe({next:n=>{n&&!n.error&&(this.commonService.fetchLoginUserProfile(this.modifyUpdatedProfileData(n.data)),this.commonService.openSnackBar(n.message,"SUCCESS"),this.getProfile())},error:n=>{n.error?.error&&this.commonService.openSnackBar(n.error?.message,"ERROR")}}))}modifyUpdatedProfileData(n){return{_id:n._id,firstName:n.firstName,lastName:n.lastName,role:n.role}}deleteAccount(){this.dialog.open(f.C,{panelClass:"custom-alert-container",data:{warningNote:"Do you really want to delete this account?"}})}changePassword(){this.dialog.open(l.s,{disableClose:!0,panelClass:"change--password--modal",data:{userId:this.userData._id,userRole:this.userRole}}).afterClosed().subscribe(i=>{console.log("changePassword>>>",i),i&&this.authService.logout()})}checkSpace(n,i){this.updateProfileForm.controls[n].setValue(this.commonService.capitalize(i.target.value.trim()))}static#e=this.\u0275fac=function(i){return new(i||p)(a.rXU(v.bZ),a.rXU(m.ok),a.rXU(M.h),a.rXU(e.u),a.rXU(P.z))};static#a=this.\u0275cmp=a.VBU({type:p,selectors:[["app-manage-profile"]],decls:62,vars:6,consts:[[1,"col-12","profile--right--wrapper"],[1,"card"],[1,"card-header","pb-0"],[1,"col-12","d-flex","align-items-center"],["mat-stroked-button","","color","primary",1,"me-3","back--btn"],[1,"material-symbols-outlined","flex-shrink-0","m-0"],[1,"mb-0","clr--1F2F3E","fw-600"],[1,"card-body","d-flex","flex-column","flex-sm-row","mb-5"],[1,"profile--left","d-flex","flex-column","position-relative","flex-shrink-0"],[1,"head--sec","w-100"],[3,"click"],[1,"profile--round","position-relative"],["src","assets/images/ark/user.png","alt","",1,"img-fluid","user--img"],["mat-raised-button","","color","primary",1,"edit--btn"],[1,"d-flex","flex-column","w-100","body--sec"],["mat-stroked-button","","color","primary",1,"w-100","mb-3",3,"click"],[1,"profile--right","d-flex","flex-column","w-100"],[1,"card","w-100","mb-0"],[1,"card-body","mt-4"],[1,"col-12"],[1,"row",3,"formGroup"],[1,"col-12","col-lg-6"],[1,"form-group"],[1,"col-form-label","fw-600"],[1,"clr--DF0404","ms-1"],["type","text","placeholder","First name","formControlName","firstName","maxlength","35",1,"form-control","form-control-md",3,"blur"],["class","text text-danger mt-1",4,"ngIf"],["type","text","placeholder","Last name","formControlName","lastName","maxlength","35",1,"form-control","form-control-md",3,"blur"],["type","text","placeholder","Email ","formControlName","email",1,"form-control","form-control-md"],[1,"col-12","my-2","d-flex","justify-content-end"],["mat-raised-button","","color","primary",3,"click","disabled"],[1,"text","text-danger","mt-1"]],template:function(i,u){1&i&&(a.j41(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"button",4)(5,"mat-icon",5),a.EFF(6," keyboard_backspace "),a.k0s()(),a.j41(7,"h3",6),a.EFF(8,"Manage Profile"),a.k0s()()(),a.j41(9,"div",7)(10,"div",8)(11,"div",9)(12,"mat-list")(13,"mat-list-item"),a.EFF(14,"Change Photo "),a.k0s(),a.j41(15,"mat-list-item",10),a.bIt("click",function(){return u.deleteAccount()}),a.EFF(16,"Remove Photo "),a.k0s()()(),a.j41(17,"div",11),a.nrm(18,"img",12),a.j41(19,"button",13)(20,"mat-icon",5),a.EFF(21," edit "),a.k0s()()(),a.j41(22,"div",14)(23,"button",15),a.bIt("click",function(){return u.changePassword()}),a.EFF(24,"Change Password"),a.k0s()()(),a.j41(25,"div",16)(26,"div",17)(27,"div",2)(28,"div",3)(29,"h3",6),a.EFF(30,"Basic Information"),a.k0s()()(),a.j41(31,"div",18)(32,"div",19)(33,"form",20)(34,"div",21)(35,"div",22)(36,"label",23),a.EFF(37,"First Name "),a.j41(38,"span",24),a.EFF(39," * "),a.k0s()(),a.j41(40,"input",25),a.bIt("blur",function(h){return u.checkSpace("firstName",h)}),a.k0s(),a.DNE(41,D,2,1,"div",26)(42,b,2,1,"div",26),a.k0s()(),a.j41(43,"div",21)(44,"div",22)(45,"label",23),a.EFF(46,"Last Name"),a.j41(47,"span",24),a.EFF(48," * "),a.k0s()(),a.j41(49,"input",27),a.bIt("blur",function(h){return u.checkSpace("lastName",h)}),a.k0s(),a.DNE(50,N,2,1,"div",26)(51,I,2,1,"div",26),a.k0s()(),a.j41(52,"div",19)(53,"div",22)(54,"label",23),a.EFF(55,"Email "),a.j41(56,"span",24),a.EFF(57," * "),a.k0s()(),a.nrm(58,"input",28),a.k0s()(),a.j41(59,"div",29)(60,"button",30),a.bIt("click",function(){return u.updateProfile()}),a.EFF(61,"Save"),a.k0s()()()()()()()()()()),2&i&&(a.R7$(33),a.Y8G("formGroup",u.updateProfileForm),a.R7$(8),a.Y8G("ngIf",u.updateProfileForm.controls.firstName.touched&&u.updateProfileForm.controls.firstName.hasError("required")),a.R7$(),a.Y8G("ngIf",u.updateProfileForm.controls.firstName.touched&&u.updateProfileForm.controls.firstName.hasError("pattern")),a.R7$(8),a.Y8G("ngIf",u.updateProfileForm.controls.lastName.touched&&u.updateProfileForm.controls.lastName.hasError("required")),a.R7$(),a.Y8G("ngIf",u.updateProfileForm.controls.lastName.touched&&u.updateProfileForm.controls.lastName.hasError("pattern")),a.R7$(9),a.Y8G("disabled",!u.updateProfileForm.valid))},dependencies:[w.bT,m.qT,m.me,m.BC,m.cb,m.tU,R.$z,k.An,F.jt,F.YE,m.j4,m.JD]})}return p})()},9039:(C,g,t)=>{t.d(g,{y:()=>f});const f={email:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,password:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-@$!%*?&#^()+=_<>,./;:'"|\`~])[A-Za-z\d-@$!%*?&#^()+=_<>,./;:'"|\`~]{8,16}$/,usPhoneNumber:/^\(\d{3}\) \d{3}-\d{4}$/,alphabetic:/^[a-zA-Z]*$/,onlyNumeric:/^[0-9]+$/,numericAndSpecialCharacter:/^[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/}},5802:(C,g,t)=>{t.d(g,{q:()=>f});const f={required:l=>`Please enter ${l}`,validEmail:"The email address seems to be incorrect",email:l=>`Please enter a valid ${l}`,password:"Minimum 8 and maximum 16 character, atleast one special character, one numeric & 1 uppercase and lowercase letter",passwordMismatch:"The passwords do not match. Please try again",confirmPassword:"Please confirm your password",invalidPhoneNumber:"Invalid phone number format",alphabeticChar:l=>`Please enter a valid ${l}`,newPasswordRequired:"Please set a password for your account",minlength:(l,m)=>`${l} should be at least ${m} characters.`,maxlength:(l,m)=>`${l} should not exceed ${m} characters.`,noRecords:"No records found!",requiredDropdown:l=>`Please select ${l}`,radioButton:"Gender is required"}}}]);