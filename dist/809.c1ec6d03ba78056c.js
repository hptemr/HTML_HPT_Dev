"use strict";(self.webpackChunkcion_angular_16=self.webpackChunkcion_angular_16||[]).push([[809],{5809:(P,p,o)=>{o.d(p,{s:()=>T});var m=o(8834),l=o(4006),w=o(9213),c=o(7278),d=o(9417),g=o(177),r=o(9039),v=o(5802),s=o(4438),i=o(7428),h=o(3390),f=o(6992),C=o(5312),_=o(1626);let F=(()=>{class e{constructor(t){this.http=t}changePassword(t){return this.http.post(`${C.c.apiUrl}/adminCommon/changePassword`,t).pipe()}static#s=this.\u0275fac=function(n){return new(n||e)(s.KVO(_.Qq))};static#o=this.\u0275prov=s.jDH({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function E(e,u){if(1&e){const t=s.RV6();s.j41(0,"div",17),s.bIt("click",function(){s.eBV(t);const a=s.XpG();return s.Njj(a.showCurrentPassword())}),s.nrm(1,"span",18),s.k0s()}}function j(e,u){if(1&e){const t=s.RV6();s.j41(0,"div",17),s.bIt("click",function(){s.eBV(t);const a=s.XpG();return s.Njj(a.showCurrentPassword())}),s.nrm(1,"span",19),s.k0s()}}function k(e,u){if(1&e&&(s.j41(0,"div",20),s.EFF(1),s.k0s()),2&e){const t=s.XpG();s.R7$(),s.SpI(" ",t.validationMessages.required("Current password")," ")}}function R(e,u){if(1&e){const t=s.RV6();s.j41(0,"div",17),s.bIt("click",function(){s.eBV(t);const a=s.XpG();return s.Njj(a.showNewPassword())}),s.nrm(1,"span",18),s.k0s()}}function N(e,u){if(1&e){const t=s.RV6();s.j41(0,"div",17),s.bIt("click",function(){s.eBV(t);const a=s.XpG();return s.Njj(a.showNewPassword())}),s.nrm(1,"span",19),s.k0s()}}function y(e,u){if(1&e&&(s.j41(0,"div",20),s.EFF(1),s.k0s()),2&e){const t=s.XpG();s.R7$(),s.SpI(" ",t.validationMessages.required("New password")," ")}}function $(e,u){if(1&e&&(s.j41(0,"div",20),s.EFF(1),s.k0s()),2&e){const t=s.XpG();s.R7$(),s.SpI(" ",t.validationMessages.password," ")}}function x(e,u){if(1&e){const t=s.RV6();s.j41(0,"div",17),s.bIt("click",function(){s.eBV(t);const a=s.XpG();return s.Njj(a.showConfirmPassword())}),s.nrm(1,"span",18),s.k0s()}}function D(e,u){if(1&e){const t=s.RV6();s.j41(0,"div",17),s.bIt("click",function(){s.eBV(t);const a=s.XpG();return s.Njj(a.showConfirmPassword())}),s.nrm(1,"span",19),s.k0s()}}function I(e,u){if(1&e&&(s.j41(0,"div",20),s.EFF(1),s.k0s()),2&e){const t=s.XpG();s.R7$(),s.SpI(" ",t.validationMessages.passwordMismatch," ")}}let T=(()=>{class e{constructor(t,n,a,M,b,U,O,G){this.dialog=t,this.fb=n,this.systemAdminService=a,this.commonService=M,this.changePassDialogRef=b,this.authService=U,this.adminCommonService=O,this.data=G,this.validationMessages=v.q,this.showNewPass=!1,this.showCurrPass=!1,this.showConfPass=!1}ngOnInit(){this.initializeChangePasswordForm(),console.log("data>>>>",this.data)}initializeChangePasswordForm(){this.changePasswordForm=this.fb.group({currentPassword:["",[d.k0.required]],newPassword:["",[d.k0.required,d.k0.pattern(r.y.password)]],confirmPassword:["",d.k0.required]},{validator:this.passwordMatchValidator})}passwordMatchValidator(t){const n=t.get("newPassword"),a=t.get("confirmPassword");return n.value!==a.value?{passwordMismatch:!0}:null}changePassword(){this.changePasswordForm.valid&&this.adminCommonService.changePassword({currentPassword:this.changePasswordForm.value.currentPassword,confirmPassword:this.changePasswordForm.value.confirmPassword,userId:this.data.userId}).subscribe({next:n=>{n&&!n.error&&this.successModal(n)},error:n=>{n.error?.error&&this.commonService.openSnackBar(n.error?.message,"ERROR")}})}successModal(t){this.dialog.open(c.c,{disableClose:!0,panelClass:"custom-alert-container",data:{successNote:t.message}}).afterClosed().subscribe(a=>{a&&this.changePassDialogRef.close(!0)})}showNewPassword(){this.showNewPass=!this.showNewPass}showCurrentPassword(){this.showCurrPass=!this.showCurrPass}showConfirmPassword(){this.showConfPass=!this.showConfPass}static#s=this.\u0275fac=function(n){return new(n||e)(s.rXU(l.bZ),s.rXU(d.ok),s.rXU(i.s),s.rXU(h.h),s.rXU(l.CP),s.rXU(f.u),s.rXU(F),s.rXU(l.Vh))};static#o=this.\u0275cmp=s.VBU({type:e,selectors:[["app-change-password-modal"]],standalone:!0,features:[s.aNF],decls:43,vars:12,consts:[[1,"changepassword--wrapper"],[1,"cp--header"],[1,"cp--body"],[1,"row",3,"formGroup"],[1,"col-12"],[1,"form-group"],[1,"col-form-label","fw-600"],[1,"clr--DF0404","ms-1"],[1,"form-input","position-relative"],["placeholder","*********","formControlName","currentPassword",1,"form-control",3,"type"],[1,"show-hide"],["class","text text-danger mt-1",4,"ngIf"],["placeholder","*********","formControlName","newPassword",1,"form-control",3,"type"],["placeholder","*********","formControlName","confirmPassword",1,"form-control",3,"type"],[1,"cp--footer","w-100","d-flex","align-items-center","justify-content-end"],["mat-stroked-button","","color","primary","mat-dialog-close","",1,"me-2"],["mat-raised-button","","color","primary",3,"click","disabled"],[1,"show-hide",3,"click"],[1,"show"],[1,"Hide"],[1,"text","text-danger","mt-1"]],template:function(n,a){1&n&&(s.j41(0,"div",0)(1,"div",1)(2,"h1"),s.EFF(3,"Change Password"),s.k0s()(),s.j41(4,"div",2)(5,"form",3)(6,"div",4)(7,"div",5)(8,"label",6),s.EFF(9,"Current Password "),s.j41(10,"span",7),s.EFF(11," * "),s.k0s()(),s.j41(12,"div",8),s.nrm(13,"input",9),s.DNE(14,E,2,0,"div",10)(15,j,2,0),s.k0s(),s.DNE(16,k,2,1,"div",11),s.k0s(),s.j41(17,"div",5)(18,"label",6),s.EFF(19,"New Password "),s.j41(20,"span",7),s.EFF(21," * "),s.k0s()(),s.j41(22,"div",8),s.nrm(23,"input",12),s.DNE(24,R,2,0,"div",10)(25,N,2,0),s.k0s(),s.DNE(26,y,2,1,"div",11)(27,$,2,1,"div",11),s.k0s(),s.j41(28,"div",5)(29,"label",6),s.EFF(30,"Confirm Password "),s.j41(31,"span",7),s.EFF(32," * "),s.k0s()(),s.j41(33,"div",8),s.nrm(34,"input",13),s.DNE(35,x,2,0,"div",10)(36,D,2,0),s.k0s(),s.DNE(37,I,2,1,"div",11),s.k0s()()()(),s.j41(38,"div",14)(39,"button",15),s.EFF(40,"Cancel"),s.k0s(),s.j41(41,"button",16),s.bIt("click",function(){return a.changePassword()}),s.EFF(42,"Submit"),s.k0s()()()),2&n&&(s.R7$(5),s.Y8G("formGroup",a.changePasswordForm),s.R7$(8),s.Y8G("type",a.showCurrPass?"text":"password"),s.R7$(),s.vxM(14,a.showCurrPass?15:14),s.R7$(2),s.Y8G("ngIf",a.changePasswordForm.controls.currentPassword.touched&&a.changePasswordForm.controls.currentPassword.hasError("required")),s.R7$(7),s.Y8G("type",a.showNewPass?"text":"password"),s.R7$(),s.vxM(24,a.showNewPass?25:24),s.R7$(2),s.Y8G("ngIf",a.changePasswordForm.controls.newPassword.touched&&a.changePasswordForm.controls.newPassword.hasError("required")),s.R7$(),s.Y8G("ngIf",a.changePasswordForm.controls.newPassword.touched&&a.changePasswordForm.controls.newPassword.hasError("pattern")),s.R7$(7),s.Y8G("type",a.showConfPass?"text":"password"),s.R7$(),s.vxM(35,a.showConfPass?36:35),s.R7$(2),s.Y8G("ngIf",a.changePasswordForm.hasError("passwordMismatch")&&a.changePasswordForm.controls.confirmPassword.touched),s.R7$(4),s.Y8G("disabled",!a.changePasswordForm.valid))},dependencies:[w.m_,m.Hl,m.$z,l.hM,l.tx,g.MD,g.bT,d.YN,d.qT,d.me,d.BC,d.cb,d.X1,d.j4,d.JD],styles:[".change--password--modal .mat-mdc-dialog-container{width:423px}  .change--password--modal .mat-mdc-dialog-container .changepassword--wrapper{padding:30px 24px}  .change--password--modal .mat-mdc-dialog-container .changepassword--wrapper .cp--header h1{color:#1f2f3e;font-size:18px;margin-bottom:25px;font-weight:600}  .change--password--modal .mat-mdc-dialog-container .changepassword--wrapper .cp--footer{margin-top:17px}"]})}return e})()},7278:(P,p,o)=>{o.d(p,{c:()=>g});var m=o(8834),l=o(4006),w=o(9213),c=o(4438),d=o(9417);let g=(()=>{class r{constructor(s,i,h){this.fb=s,this.dialogRef=i,this.data=h,this.successNote="",this.successNote=null!=h.successNote?h.successNote:this.successNote}static#s=this.\u0275fac=function(i){return new(i||r)(c.rXU(d.ok),c.rXU(l.CP),c.rXU(l.Vh))};static#o=this.\u0275cmp=c.VBU({type:r,selectors:[["app-success-modal"]],standalone:!0,features:[c.aNF],decls:8,vars:2,consts:[[1,"alert--wrapper"],[1,"col-12","d-flex","flex-column","align-items-center","justify-content-center","w-100","text-center"],["src","assets/images/ark/successful.gif","alt","","width","60px"],[1,"alert--note"],[1,"d-flex","align-items-center","justify-content-center"],["mat-raised-button","","color","primary","cdkFocusInitial","",3,"mat-dialog-close"]],template:function(i,h){1&i&&(c.j41(0,"div",0)(1,"div",1),c.nrm(2,"img",2),c.j41(3,"p",3),c.EFF(4),c.k0s(),c.j41(5,"div",4)(6,"button",5),c.EFF(7,"Okay "),c.k0s()()()()),2&i&&(c.R7$(4),c.JRh(h.successNote),c.R7$(2),c.Y8G("mat-dialog-close",!0))},dependencies:[w.m_,m.Hl,m.$z,l.hM,l.tx]})}return r})()},7428:(P,p,o)=>{o.d(p,{s:()=>c});var m=o(5312),l=o(4438),w=o(1626);let c=(()=>{class d{constructor(r){this.http=r}profile(){return this.http.get(`${m.c.apiUrl}/systemAdmin/profile`).pipe()}updateProfile(r){return this.http.post(`${m.c.apiUrl}/systemAdmin/updateProfile`,r).pipe()}static#s=this.\u0275fac=function(v){return new(v||d)(l.KVO(w.Qq))};static#o=this.\u0275prov=l.jDH({token:d,factory:d.\u0275fac,providedIn:"root"})}return d})()},3390:(P,p,o)=>{o.d(p,{h:()=>g});var m=o(4438),l=o(5416),w=o(5312),c=o(1626);let d=(()=>{class r{constructor(s){this.http=s}getPracticeLocation(){return this.http.get(`${w.c.apiUrl}/comman/getPracticeLocation`).pipe()}static#s=this.\u0275fac=function(i){return new(i||r)(m.KVO(c.Qq))};static#o=this.\u0275prov=m.jDH({token:r,factory:r.\u0275fac,providedIn:"root"})}return r})(),g=(()=>{class r{constructor(s,i){this.snackBar=s,this.generalService=i}openSnackBar(s,i){this.snackBar.open(s,i,{duration:4e3})}getPracticeLocation(){let s=this;return new Promise(function(i,h){s.generalService.getPracticeLocation().subscribe({next:f=>{let C=[];f&&!f.error&&(C=f.data.length?f.data.map(_=>({locationCode:_.locationCode,location:_.location})):[]),i(C)},error:f=>{h()}})})}formatPhoneNumber(s){const i=s.replace(/\D/g,"");let h="";return i.length>=3&&(h+=`(${i.slice(0,3)})`,i.length>3&&(h+=` ${i.slice(3,6)}`,i.length>6&&(h+=`-${i.slice(6,10)}`))),h}static#s=this.\u0275fac=function(i){return new(i||r)(m.KVO(l.UG),m.KVO(d))};static#o=this.\u0275prov=m.jDH({token:r,factory:r.\u0275fac,providedIn:"root"})}return r})()},9039:(P,p,o)=>{o.d(p,{y:()=>m});const m={email:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,password:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-@$!%*?&#^()+=_<>,./;:'"|\`~])[A-Za-z\d-@$!%*?&#^()+=_<>,./;:'"|\`~]{8,16}$/,usPhoneNumber:/^\(\d{3}\) \d{3}-\d{4}$/}},5802:(P,p,o)=>{o.d(p,{q:()=>m});const m={required:l=>`${l} is required`,email:l=>`Please enter a valid ${l}`,password:"Minimum 8 and maximum 16 character, atleast one special character, one numeric & 1 uppercase and lowercase letter",passwordMismatch:"New and confirm password do not match",invalidPhoneNumber:"Invalid phone number format"}}}]);