"use strict";(self.webpackChunkcion_angular_16=self.webpackChunkcion_angular_16||[]).push([[716],{1648:(y,E,i)=>{i.d(E,{s:()=>O});var p=i(8834),o=i(4006),I=i(9213),t=i(4438),f=i(9417);let b=(()=>{class c{constructor(d,m,s){this.fb=d,this.dialogRef=m,this.data=s,this.successNote="",this.successNote=null!=s.successNote?s.successNote:this.successNote}static#e=this.\u0275fac=function(m){return new(m||c)(t.rXU(f.ok),t.rXU(o.CP),t.rXU(o.Vh))};static#t=this.\u0275cmp=t.VBU({type:c,selectors:[["app-success-modal"]],standalone:!0,features:[t.aNF],decls:8,vars:2,consts:[[1,"alert--wrapper"],[1,"col-12","d-flex","flex-column","align-items-center","justify-content-center","w-100","text-center"],["src","assets/images/ark/successful.gif","alt","","width","60px"],[1,"alert--note"],[1,"d-flex","align-items-center","justify-content-center"],["mat-raised-button","","color","primary","cdkFocusInitial","",3,"mat-dialog-close"]],template:function(m,s){1&m&&(t.j41(0,"div",0)(1,"div",1),t.nrm(2,"img",2),t.j41(3,"p",3),t.EFF(4),t.k0s(),t.j41(5,"div",4)(6,"button",5),t.EFF(7,"Okay "),t.k0s()()()()),2&m&&(t.R7$(4),t.JRh(s.successNote),t.R7$(2),t.Y8G("mat-dialog-close",!0))},dependencies:[I.m_,p.Hl,p.$z,o.hM,o.tx]})}return c})();var k=i(177),S=i(9039),e=i(5802),x=i(3390),h=i(758);function T(c,N){if(1&c){const d=t.RV6();t.j41(0,"div",16),t.bIt("click",function(){t.eBV(d);const s=t.XpG();return t.Njj(s.showNewPassword())}),t.nrm(1,"span",17),t.k0s()}}function _(c,N){if(1&c){const d=t.RV6();t.j41(0,"div",16),t.bIt("click",function(){t.eBV(d);const s=t.XpG();return t.Njj(s.showNewPassword())}),t.nrm(1,"span",18),t.k0s()}}function F(c,N){if(1&c&&(t.j41(0,"div",19),t.EFF(1),t.k0s()),2&c){const d=t.XpG();t.R7$(),t.SpI(" ",d.validationMessages.required("New password")," ")}}function g(c,N){if(1&c&&(t.j41(0,"div",19),t.EFF(1),t.k0s()),2&c){const d=t.XpG();t.R7$(),t.SpI(" ",d.validationMessages.password," ")}}function P(c,N){if(1&c){const d=t.RV6();t.j41(0,"div",16),t.bIt("click",function(){t.eBV(d);const s=t.XpG();return t.Njj(s.showConfirmPassword())}),t.nrm(1,"span",17),t.k0s()}}function C(c,N){if(1&c){const d=t.RV6();t.j41(0,"div",16),t.bIt("click",function(){t.eBV(d);const s=t.XpG();return t.Njj(s.showConfirmPassword())}),t.nrm(1,"span",18),t.k0s()}}function w(c,N){if(1&c&&(t.j41(0,"div",19),t.EFF(1),t.k0s()),2&c){const d=t.XpG();t.R7$(),t.SpI(" ",d.validationMessages.confirmPassword," ")}}function $(c,N){if(1&c&&(t.j41(0,"div",19),t.EFF(1),t.k0s()),2&c){const d=t.XpG();t.R7$(),t.SpI(" ",d.validationMessages.passwordMismatch," ")}}let O=(()=>{class c{constructor(d,m,s,D,G,U){this.dialog=d,this.fb=m,this.commonService=s,this.changePassDialogRef=D,this.adminService=G,this.data=U,this.validationMessages=e.q,this.showNewPass=!1,this.showCurrPass=!1,this.showConfPass=!1}ngOnInit(){this.initializeChangePasswordForm()}initializeChangePasswordForm(){this.changePasswordForm=this.fb.group({newPassword:["",[f.k0.required,f.k0.pattern(S.y.password)]],confirmPassword:["",f.k0.required]},{validator:this.passwordMatchValidator})}passwordMatchValidator(d){const m=d.get("newPassword"),s=d.get("confirmPassword");return s.value&&m.value!==s.value?{passwordMismatch:!0}:null}changePassword(){this.changePasswordForm.valid&&this.adminService.changePassword({confirmPassword:this.changePasswordForm.value.confirmPassword,userId:this.data.userId}).subscribe({next:m=>{m&&!m.error&&this.successModal(m)},error:m=>{m.error?.error&&this.commonService.openSnackBar(m.error?.message,"ERROR")}})}successModal(d){this.dialog.open(b,{disableClose:!0,panelClass:"custom-alert-container",data:{successNote:d.message}}).afterClosed().subscribe(s=>{s&&this.changePassDialogRef.close(!0)})}showNewPassword(){this.showNewPass=!this.showNewPass}showCurrentPassword(){this.showCurrPass=!this.showCurrPass}showConfirmPassword(){this.showConfPass=!this.showConfPass}static#e=this.\u0275fac=function(m){return new(m||c)(t.rXU(o.bZ),t.rXU(f.ok),t.rXU(x.h),t.rXU(o.CP),t.rXU(h.z),t.rXU(o.Vh))};static#t=this.\u0275cmp=t.VBU({type:c,selectors:[["app-change-password-modal"]],standalone:!0,features:[t.aNF],decls:34,vars:10,consts:[[1,"changepassword--wrapper"],[1,"cp--header"],[1,"cp--body"],[1,"row",3,"formGroup"],[1,"col-12"],[1,"form-group"],[1,"col-form-label","fw-600"],[1,"clr--DF0404","ms-1"],[1,"form-input","position-relative"],["placeholder","Enter new password","formControlName","newPassword",1,"form-control",3,"type"],[1,"show-hide"],["class","text text-danger mt-1",4,"ngIf"],["placeholder","Enter Confirm Password","formControlName","confirmPassword",1,"form-control",3,"type"],[1,"cp--footer","w-100","d-flex","align-items-center","justify-content-end"],["mat-stroked-button","","color","primary","mat-dialog-close","",1,"me-2"],["mat-raised-button","","color","primary",3,"click","disabled"],[1,"show-hide",3,"click"],[1,"show"],[1,"Hide"],[1,"text","text-danger","mt-1"]],template:function(m,s){1&m&&(t.j41(0,"div",0)(1,"div",1)(2,"h1"),t.EFF(3,"Change Password"),t.k0s()(),t.j41(4,"div",2)(5,"form",3)(6,"div",4)(7,"div",5)(8,"label",6),t.EFF(9,"New Password "),t.j41(10,"span",7),t.EFF(11," * "),t.k0s()(),t.j41(12,"div",8),t.nrm(13,"input",9),t.DNE(14,T,2,0,"div",10)(15,_,2,0),t.k0s(),t.DNE(16,F,2,1,"div",11)(17,g,2,1,"div",11),t.k0s(),t.j41(18,"div",5)(19,"label",6),t.EFF(20,"Confirm Password "),t.j41(21,"span",7),t.EFF(22," * "),t.k0s()(),t.j41(23,"div",8),t.nrm(24,"input",12),t.DNE(25,P,2,0,"div",10)(26,C,2,0),t.k0s(),t.DNE(27,w,2,1,"div",11)(28,$,2,1,"div",11),t.k0s()()()(),t.j41(29,"div",13)(30,"button",14),t.EFF(31,"Cancel"),t.k0s(),t.j41(32,"button",15),t.bIt("click",function(){return s.changePassword()}),t.EFF(33,"Submit"),t.k0s()()()),2&m&&(t.R7$(5),t.Y8G("formGroup",s.changePasswordForm),t.R7$(8),t.Y8G("type",s.showNewPass?"text":"password"),t.R7$(),t.vxM(14,s.showNewPass?15:14),t.R7$(2),t.Y8G("ngIf",s.changePasswordForm.controls.newPassword.touched&&s.changePasswordForm.controls.newPassword.hasError("required")),t.R7$(),t.Y8G("ngIf",s.changePasswordForm.controls.newPassword.touched&&s.changePasswordForm.controls.newPassword.hasError("pattern")),t.R7$(7),t.Y8G("type",s.showConfPass?"text":"password"),t.R7$(),t.vxM(25,s.showConfPass?26:25),t.R7$(2),t.Y8G("ngIf",s.changePasswordForm.controls.confirmPassword.touched&&s.changePasswordForm.controls.confirmPassword.hasError("required")),t.R7$(),t.Y8G("ngIf",s.changePasswordForm.hasError("passwordMismatch")&&s.changePasswordForm.controls.confirmPassword.touched),t.R7$(4),t.Y8G("disabled",!s.changePasswordForm.valid))},dependencies:[I.m_,p.Hl,p.$z,o.hM,o.tx,k.MD,k.bT,f.YN,f.qT,f.me,f.BC,f.cb,f.X1,f.j4,f.JD],styles:[".change--password--modal .mat-mdc-dialog-container{width:423px}  .change--password--modal .mat-mdc-dialog-container .changepassword--wrapper{padding:30px 24px}  .change--password--modal .mat-mdc-dialog-container .changepassword--wrapper .cp--header h1{color:#1f2f3e;font-size:18px;margin-bottom:25px;font-weight:600}  .change--password--modal .mat-mdc-dialog-container .changepassword--wrapper .cp--footer{margin-top:17px}"]})}return c})()},3716:(y,E,i)=>{i.d(E,{O:()=>Y});var p=i(4523),o=i(4494),I=i(1648),t=i(9417),f=i(5802),b=i(9039),k=i(1792),S=i(446),e=i(4438),x=i(4006),h=i(3390),T=i(6992),_=i(758),F=i(177),g=i(8834),P=i(9213),C=i(3902);function w(r,v){if(1&r){const a=e.RV6();e.j41(0,"mat-list-item",32),e.bIt("click",function(){e.eBV(a);const l=e.XpG(2);return e.Njj(l.removePhoto())}),e.EFF(1,"Remove Photo "),e.k0s()}}function $(r,v){if(1&r){const a=e.RV6();e.j41(0,"mat-list")(1,"mat-list-item",32),e.bIt("click",function(){e.eBV(a);const l=e.XpG();return e.Njj(l.changePhoto())}),e.EFF(2,"Change Photo "),e.k0s(),e.DNE(3,w,2,0,"mat-list-item",33),e.k0s()}if(2&r){const a=e.XpG();e.R7$(3),e.Y8G("ngIf",a.isDefaultImage)}}function O(r,v){if(1&r&&(e.j41(0,"div",34),e.EFF(1),e.k0s()),2&r){const a=e.XpG();e.R7$(),e.SpI(" ",a.validationMessages.required("your First Name")," ")}}function c(r,v){if(1&r&&(e.j41(0,"div",34),e.EFF(1),e.k0s()),2&r){const a=e.XpG();e.R7$(),e.SpI(" ",a.validationMessages.alphabeticChar("First Name")," ")}}function N(r,v){if(1&r&&(e.j41(0,"div",34),e.EFF(1),e.k0s()),2&r){const a=e.XpG();e.R7$(),e.SpI(" ",a.validationMessages.required("your Last Name")," ")}}function d(r,v){if(1&r&&(e.j41(0,"div",34),e.EFF(1),e.k0s()),2&r){const a=e.XpG();e.R7$(),e.SpI(" ",a.validationMessages.alphabeticChar("Last Name")," ")}}function m(r,v){if(1&r&&(e.j41(0,"div",34),e.EFF(1),e.k0s()),2&r){const a=e.XpG(2);e.R7$(),e.SpI(" ",a.validationMessages.required("a valid phone number")," ")}}function s(r,v){if(1&r&&(e.j41(0,"div",34),e.EFF(1),e.k0s()),2&r){const a=e.XpG(2);e.R7$(),e.SpI(" ",a.validationMessages.invalidPhoneNumber," ")}}function D(r,v){if(1&r){const a=e.RV6();e.j41(0,"div",21)(1,"div",22)(2,"label",23),e.EFF(3,"Phone "),e.j41(4,"span",24),e.EFF(5," * "),e.k0s()(),e.j41(6,"input",35),e.bIt("input",function(l){e.eBV(a);const u=e.XpG();return e.Njj(u.onPhoneInputChange(l))}),e.k0s(),e.DNE(7,m,2,1,"div",26)(8,s,2,1,"div",26),e.k0s()()}if(2&r){const a=e.XpG();e.R7$(6),e.Y8G("value",a.convertPhoneNumber),e.R7$(),e.Y8G("ngIf",a.updateProfileForm.controls.phoneNumber.touched&&a.updateProfileForm.controls.phoneNumber.hasError("required")),e.R7$(),e.Y8G("ngIf",a.updateProfileForm.controls.phoneNumber.touched&&a.updateProfileForm.controls.phoneNumber.hasError("pattern"))}}function G(r,v){if(1&r&&(e.j41(0,"div",34),e.EFF(1),e.k0s()),2&r){const a=e.XpG(2);e.R7$(),e.SpI(" ",a.validationMessages.required("a valid NPI number")," ")}}function U(r,v){if(1&r&&(e.j41(0,"div",21)(1,"div",22)(2,"label",23),e.EFF(3,"NPI "),e.j41(4,"span",24),e.EFF(5," *"),e.k0s()(),e.nrm(6,"input",36),e.DNE(7,G,2,1,"div",26),e.k0s()()),2&r){const a=e.XpG();e.R7$(7),e.Y8G("ngIf",a.updateProfileForm.controls.NPI.touched&&(a.updateProfileForm.controls.NPI.hasError("required")||a.updateProfileForm.controls.NPI.hasError("pattern")))}}function L(r,v){if(1&r&&(e.j41(0,"div",34),e.EFF(1),e.k0s()),2&r){const a=e.XpG(2);e.R7$(),e.SpI(" ",a.validationMessages.required("a valid SSN")," ")}}function A(r,v){if(1&r&&(e.j41(0,"div",21)(1,"div",22)(2,"label",23),e.EFF(3,"SSN "),e.j41(4,"span",24),e.EFF(5," *"),e.k0s()(),e.nrm(6,"input",37),e.DNE(7,L,2,1,"div",26),e.k0s()()),2&r){const a=e.XpG();e.R7$(7),e.Y8G("ngIf",a.updateProfileForm.controls.SSN.touched&&(a.updateProfileForm.controls.SSN.hasError("required")||a.updateProfileForm.controls.SSN.hasError("pattern")))}}function X(r,v){if(1&r&&(e.j41(0,"div",34),e.EFF(1),e.k0s()),2&r){const a=e.XpG(2);e.R7$(),e.SpI(" ",a.validationMessages.required("a valid Licence number")," ")}}function V(r,v){if(1&r&&(e.j41(0,"div",21)(1,"div",22)(2,"label",23),e.EFF(3,"Licence Number"),e.k0s(),e.nrm(4,"input",38),e.DNE(5,X,2,1,"div",26),e.k0s()()),2&r){const a=e.XpG();e.R7$(5),e.Y8G("ngIf",a.updateProfileForm.controls.licenceNumber.touched&&a.updateProfileForm.controls.licenceNumber.hasError("required"))}}let Y=(()=>{class r{constructor(a,n,l,u,M){this.dialog=a,this.fb=n,this.commonService=l,this.authService=u,this.adminService=M,this.validationMessages=f.q,this.editOptions=!1,this.isTherapist=!1,this.convertPhoneNumber="",this.isDefaultImage=!0}ngOnInit(){this.userId=this.authService.getLoggedInInfo("_id"),this.userType=this.authService.getLoggedInInfo("role"),this.profileImage=S.ns.awsS3Url+S.ns.userProfileFolderPath+this.authService.getLoggedInInfo("profileImage"),this.isDefaultImage="default.png"!=this.authService.getLoggedInInfo("profileImage"),this.initializeUpdateProfileForm(),this.getProfile(),"therapist"==this.userType&&(this.initializeTherapistFields(),this.isTherapist=!0)}initializeUpdateProfileForm(){this.updateProfileForm=this.fb.group({firstName:["",[t.k0.required,t.k0.pattern(b.y.alphabetic)]],lastName:["",[t.k0.required,t.k0.pattern(b.y.alphabetic)]],email:[{value:"",disabled:!0}]})}initializeTherapistFields(){this.updateProfileForm.addControl("phoneNumber",this.fb.control("",[t.k0.required,t.k0.pattern(b.y.usPhoneNumber)])),this.updateProfileForm.addControl("NPI",this.fb.control("",[t.k0.required,t.k0.pattern(b.y.onlyNumeric)])),this.updateProfileForm.addControl("SSN",this.fb.control("",[t.k0.required,t.k0.pattern(b.y.numericAndSpecialCharacter)])),this.updateProfileForm.addControl("licenceNumber",this.fb.control("",[]))}getProfile(){this.adminService.profile({query:{_id:this.userId},params:{firstName:1,lastName:1,email:1,phoneNumber:1,status:1,practiceLocation:1,NPI:1,SSN:1,licenceNumber:1}}).subscribe({next:n=>{n&&!n.error&&(this.updateProfileForm.controls.firstName.setValue(n.data?n.data.firstName:""),this.updateProfileForm.controls.lastName.setValue(n.data?n.data.lastName:""),this.updateProfileForm.controls.email.setValue(n.data?n.data.email:""),"therapist"==this.userType&&(this.updateProfileForm.controls.phoneNumber.setValue(n.data&&n.data.phoneNumber?n.data.phoneNumber:""),this.updateProfileForm.controls.NPI.setValue(n.data&&n.data.NPI?n.data.NPI:""),this.updateProfileForm.controls.SSN.setValue(n.data&&n.data.SSN?n.data.SSN:""),this.updateProfileForm.controls.licenceNumber.setValue(n.data&&n.data.licenceNumber?n.data.licenceNumber:"")))},error:n=>{n.error?.error&&this.commonService.openSnackBar(n.error?.message,"ERROR")}})}updateProfile(){this.updateProfileForm.valid&&(this.updateProfileForm.value.userId=this.userId,this.updateProfileForm.value.clickAction="update",this.adminService.updateProfile(this.updateProfileForm.value).subscribe({next:a=>{a&&!a.error&&(this.updateProfileSetInLocalStorage(a.data),this.commonService.openSnackBar(a.message,"SUCCESS"))},error:a=>{a.error?.error&&this.commonService.openSnackBar(a.error?.message,"ERROR")}}))}updateProfileSetInLocalStorage(a){let n=this.authService.getLoggedInInfo("all");n.firstName=a.firstName,n.lastName=a.lastName,localStorage.setItem("user",JSON.stringify(n)),window.location.reload()}changePhoto(){var a=this;return(0,p.A)(function*(){a.editOptions=!1,a.dialog.open(k.m,{width:"600px",disableClose:!0,data:{cropperFor:"Profile Picture"}}).afterClosed().subscribe(function(){var l=(0,p.A)(function*(u){if(a.commonService.showLoader(),!1!==u&&null!=u.image){let M={userId:a.authService.getLoggedInInfo("_id"),profileImage:u.image.base64};yield a.authService.apiRequest("post","admin/changeProfileImage",M).subscribe(function(){var B=(0,p.A)(function*(j){let R;a.commonService.hideLoader(),R=a.authService.getLoggedInInfo(),R.profileImage=a.authService.getLoggedInInfo("_id").toString()+".png",localStorage.setItem("user",JSON.stringify(R)),a.commonService.openSnackBar(j.message,"SUCCESS"),setTimeout(function(){location.reload()},3e3)});return function(j){return B.apply(this,arguments)}}())}else a.commonService.hideLoader()});return function(u){return l.apply(this,arguments)}}())})()}editProfile(){this.editOptions=!this.editOptions}removePhoto(){var a=this;this.editOptions=!1,this.dialog.open(o.C,{panelClass:"custom-alert-container",data:{warningNote:"Do you really want to remove this image?"}}).afterClosed().subscribe(function(){var l=(0,p.A)(function*(u){if(u){let M={userId:a.authService.getLoggedInInfo("_id")};yield a.authService.apiRequest("post","admin/deleteProfileImage",M).subscribe(function(){var B=(0,p.A)(function*(j){let R;R=a.authService.getLoggedInInfo(),R.profileImage=j.data,localStorage.setItem("user",JSON.stringify(R)),a.commonService.openSnackBar(j.message,"SUCCESS"),setTimeout(function(){location.reload()},3e3)});return function(j){return B.apply(this,arguments)}}())}});return function(u){return l.apply(this,arguments)}}())}changePassword(){var a=this;this.dialog.open(I.s,{disableClose:!0,panelClass:"change--password--modal",data:{userId:this.userId,userRole:this.userType}}).afterClosed().subscribe(function(){var l=(0,p.A)(function*(u){u&&a.authService.logout(a.userType)});return function(u){return l.apply(this,arguments)}}())}checkSpace(a,n){this.updateProfileForm.controls[a].setValue(this.commonService.capitalize(n.target.value.trim()))}onPhoneInputChange(a){this.convertPhoneNumber=this.commonService.formatPhoneNumber(a.target.value)}static#e=this.\u0275fac=function(n){return new(n||r)(e.rXU(x.bZ),e.rXU(t.ok),e.rXU(h.h),e.rXU(T.u),e.rXU(_.z))};static#t=this.\u0275cmp=e.VBU({type:r,selectors:[["app-manage-profile"]],decls:62,vars:15,consts:[[1,"col-12","profile--right--wrapper"],[1,"card"],[1,"card-header","pb-0"],[1,"col-12","d-flex","align-items-center"],["mat-stroked-button","","color","primary",1,"me-3","back--btn"],[1,"material-symbols-outlined","flex-shrink-0","m-0"],[1,"mb-0","clr--1F2F3E","fw-600"],[1,"card-body","d-flex","flex-column","flex-sm-row","mb-5"],[1,"profile--left","d-flex","flex-column","position-relative","flex-shrink-0"],[1,"head--sec","w-100"],[4,"ngIf"],[1,"profile--round","position-relative"],["alt","",1,"img-fluid","user--img",3,"src"],["mat-raised-button","","color","primary",1,"edit--btn",3,"click"],[1,"d-flex","flex-column","w-100","body--sec"],["mat-stroked-button","","color","primary",1,"w-100","mb-3",3,"click"],[1,"profile--right","d-flex","flex-column","w-100"],[1,"card","w-100","mb-0"],[1,"card-body","mt-4"],[1,"col-12"],[1,"row",3,"formGroup"],[1,"col-12","col-lg-6"],[1,"form-group"],[1,"col-form-label","fw-600"],[1,"clr--DF0404","ms-1"],["type","text","placeholder","First name","formControlName","firstName","maxlength","35",1,"form-control","form-control-md",3,"blur"],["class","text text-danger mt-1",4,"ngIf"],["type","text","placeholder","Last name","formControlName","lastName","maxlength","35",1,"form-control","form-control-md",3,"blur"],["type","text","placeholder","Email ","formControlName","email",1,"form-control","form-control-md"],["class","col-12 col-lg-6",4,"ngIf"],[1,"col-12","my-2","d-flex","justify-content-end"],["mat-raised-button","","color","primary",3,"click","disabled"],[3,"click"],[3,"click",4,"ngIf"],[1,"text","text-danger","mt-1"],["type","text","placeholder","Phone ","formControlName","phoneNumber","maxlength","15",1,"form-control","form-control-md",3,"input","value"],["type","text","placeholder","NPI ","formControlName","NPI","maxlength","10",1,"form-control","form-control-md"],["type","text","placeholder","SSN ","formControlName","SSN","maxlength","9",1,"form-control","form-control-md"],["type","text","placeholder","Licence Number ","formControlName","licenceNumber","maxlength","15",1,"form-control","form-control-md"]],template:function(n,l){1&n&&(e.j41(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"button",4)(5,"mat-icon",5),e.EFF(6," keyboard_backspace "),e.k0s()(),e.j41(7,"h3",6),e.EFF(8,"Manage Profile"),e.k0s()()(),e.j41(9,"div",7)(10,"div",8)(11,"div",9),e.DNE(12,$,4,1,"mat-list",10),e.k0s(),e.j41(13,"div",11),e.nrm(14,"img",12),e.j41(15,"button",13),e.bIt("click",function(){return l.editProfile()}),e.j41(16,"mat-icon",5),e.EFF(17," edit "),e.k0s()()(),e.j41(18,"div",14)(19,"button",15),e.bIt("click",function(){return l.changePassword()}),e.EFF(20,"Change Password"),e.k0s()()(),e.j41(21,"div",16)(22,"div",17)(23,"div",2)(24,"div",3)(25,"h3",6),e.EFF(26,"Basic Information"),e.k0s()()(),e.j41(27,"div",18)(28,"div",19)(29,"form",20)(30,"div",21)(31,"div",22)(32,"label",23),e.EFF(33,"First Name "),e.j41(34,"span",24),e.EFF(35," * "),e.k0s()(),e.j41(36,"input",25),e.bIt("blur",function(M){return l.checkSpace("firstName",M)}),e.k0s(),e.DNE(37,O,2,1,"div",26)(38,c,2,1,"div",26),e.k0s()(),e.j41(39,"div",21)(40,"div",22)(41,"label",23),e.EFF(42,"Last Name"),e.j41(43,"span",24),e.EFF(44," * "),e.k0s()(),e.j41(45,"input",27),e.bIt("blur",function(M){return l.checkSpace("lastName",M)}),e.k0s(),e.DNE(46,N,2,1,"div",26)(47,d,2,1,"div",26),e.k0s()(),e.j41(48,"div")(49,"div",22)(50,"label",23),e.EFF(51,"Email "),e.j41(52,"span",24),e.EFF(53," * "),e.k0s()(),e.nrm(54,"input",28),e.k0s()(),e.DNE(55,D,9,3,"div",29)(56,U,8,1,"div",29)(57,A,8,1,"div",29)(58,V,6,1,"div",29),e.j41(59,"div",30)(60,"button",31),e.bIt("click",function(){return l.updateProfile()}),e.EFF(61,"Save"),e.k0s()()()()()()()()()()),2&n&&(e.R7$(12),e.Y8G("ngIf",l.editOptions),e.R7$(2),e.FS9("src",l.profileImage,e.B4B),e.R7$(15),e.Y8G("formGroup",l.updateProfileForm),e.R7$(8),e.Y8G("ngIf",l.updateProfileForm.controls.firstName.touched&&l.updateProfileForm.controls.firstName.hasError("required")),e.R7$(),e.Y8G("ngIf",l.updateProfileForm.controls.firstName.touched&&l.updateProfileForm.controls.firstName.hasError("pattern")),e.R7$(8),e.Y8G("ngIf",l.updateProfileForm.controls.lastName.touched&&l.updateProfileForm.controls.lastName.hasError("required")),e.R7$(),e.Y8G("ngIf",l.updateProfileForm.controls.lastName.touched&&l.updateProfileForm.controls.lastName.hasError("pattern")),e.R7$(),e.ZvI("col-12 ",l.isTherapist?"col-lg-6":"",""),e.R7$(7),e.Y8G("ngIf",l.isTherapist),e.R7$(),e.Y8G("ngIf",l.isTherapist),e.R7$(),e.Y8G("ngIf",l.isTherapist),e.R7$(),e.Y8G("ngIf",l.isTherapist),e.R7$(2),e.Y8G("disabled",!l.updateProfileForm.valid))},dependencies:[F.bT,t.qT,t.me,t.BC,t.cb,t.tU,g.$z,P.An,C.jt,C.YE,t.j4,t.JD]})}return r})()},1792:(y,E,i)=>{i.d(E,{m:()=>x});var p=i(4006),o=i(4438),I=i(177),t=i(8834),f=i(9213),b=i(9362);const k=h=>({image:h});function S(h,T){1&h&&(o.j41(0,"div")(1,"small",15),o.EFF(2,"Uploaded file is not a valid image"),o.k0s()())}function e(h,T){if(1&h&&(o.j41(0,"button",16),o.EFF(1,"Submit"),o.k0s()),2&h){const _=o.XpG();o.Y8G("mat-dialog-close",o.eq3(1,k,_.croppedImage))}}let x=(()=>{class h{constructor(_,F){this.dialogRef=_,this.data=F,this.imageChangedEvent="",this.croppedImage="",this.imageBase64="",this.saveButtonShow=!1,this.roundCropper=!0,this.isInvalidType=!1}fileChangeEvent(_){this.imageChangedEvent=_}imageCropped(_){this.croppedImageEvent=_,this.croppedImage=_}imageLoaded(){this.isInvalidType=!1}cropperReady(){this.saveButtonShow=!0}loadImageFailed(){this.isInvalidType=!0}static#e=this.\u0275fac=function(F){return new(F||h)(o.rXU(p.CP),o.rXU(p.Vh))};static#t=this.\u0275cmp=o.VBU({type:h,selectors:[["app-upload-img"]],decls:18,vars:7,consts:[["fileInput",""],[1,"comman-popup"],[1,"d-flex","justify-content-between","mat-header"],[1,"p-2"],[1,"fw-600","font-21","text--000"],[1,"ml-auto","p-2"],[1,"ml-auto","cursor-pointer",3,"click","mat-dialog-close"],["mat-dialog-content",""],[1,"d-flex","justify-content-center"],["mat-button","",1,"browse-btn","mb-3","text-center",3,"click"],["type","file","accept",".jpg, .jpeg, .png",2,"display","none",3,"change"],["format","png","output","base64",3,"imageCropped","imageLoaded","cropperReady","loadImageFailed","roundCropper","imageChangedEvent","maintainAspectRatio","aspectRatio"],[4,"ngIf"],["mat-dialog-actions","","d-flex",""],["mat-button","","class","submit-btn mb-3",3,"mat-dialog-close",4,"ngIf"],[1,"err"],["mat-button","",1,"submit-btn","mb-3",3,"mat-dialog-close"]],template:function(F,g){if(1&F){const P=o.RV6();o.j41(0,"div",1)(1,"div",2)(2,"div",3)(3,"h2",4),o.EFF(4,"Upload Photo"),o.k0s()(),o.j41(5,"div",5)(6,"mat-icon",6),o.bIt("click",function(){return o.eBV(P),o.Njj(g.dialogRef.close(!1))}),o.EFF(7,"close"),o.k0s()()(),o.j41(8,"div",7)(9,"div",8)(10,"button",9),o.bIt("click",function(){o.eBV(P);const w=o.sdS(13);return o.Njj(w.click())}),o.EFF(11,"Browse"),o.k0s()(),o.j41(12,"input",10,0),o.bIt("change",function(w){return o.eBV(P),o.Njj(g.fileChangeEvent(w))}),o.k0s(),o.j41(14,"image-cropper",11),o.bIt("imageCropped",function(w){return o.eBV(P),o.Njj(g.imageCropped(w))})("imageLoaded",function(){return o.eBV(P),o.Njj(g.imageLoaded())})("cropperReady",function(){return o.eBV(P),o.Njj(g.cropperReady())})("loadImageFailed",function(){return o.eBV(P),o.Njj(g.loadImageFailed())}),o.k0s()(),o.DNE(15,S,3,0,"div",12),o.j41(16,"div",13),o.DNE(17,e,2,3,"button",14),o.k0s()()}2&F&&(o.R7$(6),o.Y8G("mat-dialog-close",!0),o.R7$(8),o.Y8G("roundCropper",g.roundCropper)("imageChangedEvent",g.imageChangedEvent)("maintainAspectRatio",!0)("aspectRatio",1),o.R7$(),o.Y8G("ngIf",g.isInvalidType),o.R7$(2),o.Y8G("ngIf",g.saveButtonShow))},dependencies:[I.bT,t.$z,p.tx,p.Yi,p.E7,f.An,b._D],styles:[".submit-btn[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;padding:0 20px;width:100%;height:40px!important;border-radius:5px;background:#9155a3;font-family:Inter;font-size:16px!important;font-weight:600!important;color:#fff!important;line-height:1.2;letter-spacing:1px;box-shadow:none!important;cursor:pointer!important}.browse-btn[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;padding:0 20px;width:auto;height:40px!important;border-radius:5px;background:#9155a3;font-family:Inter;font-size:16px!important;font-weight:600!important;color:#fff!important;line-height:1.2;letter-spacing:1px;box-shadow:none!important;cursor:pointer!important}  .mat-mdc-dialog-actions{justify-content:end!important}.mat-header[_ngcontent-%COMP%]{padding:8px 0 0 11px!important}.err[_ngcontent-%COMP%]{float:left;color:red;margin:13px;font-size:14px}"]})}return h})()},9039:(y,E,i)=>{i.d(E,{y:()=>p});const p={email:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,password:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-@$!%*?&#^()+=_<>,./;:'"|\`~])[A-Za-z\d-@$!%*?&#^()+=_<>,./;:'"|\`~]{8,16}$/,usPhoneNumber:/^\(\d{3}\) \d{3}-\d{4}$/,alphabetic:/^[a-zA-Z]*$/,onlyNumeric:/^[0-9]+$/,numericAndSpecialCharacter:/^[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/}},5802:(y,E,i)=>{i.d(E,{q:()=>p});const p={required:o=>`Please enter ${o}`,validEmail:"The email address seems to be incorrect",email:o=>`Please enter a valid ${o}`,password:"Minimum 8 and maximum 16 character, atleast one special character, one numeric & 1 uppercase and lowercase letter",passwordMismatch:"The passwords do not match. Please try again",confirmPassword:"Please confirm your password",invalidPhoneNumber:"Invalid phone number format",alphabeticChar:o=>`Please enter a valid ${o}`,newPasswordRequired:"Please set a password for your account",minlength:(o,I)=>`${o} should be at least ${I} characters.`,maxlength:(o,I)=>`${o} should not exceed ${I} characters.`,noRecords:"No records found!",requiredDropdown:o=>`Please select ${o}`,radioButton:"Gender is required",requiredCheckbox:o=>`Please check ${o}`,requiredProofDocument:"Document uploaded, Please select ID Proof document type",requiredDocument:"ID Proof document type is slected, Please upload document"}}}]);