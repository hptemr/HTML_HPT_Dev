"use strict";(self.webpackChunkcion_angular_16=self.webpackChunkcion_angular_16||[]).push([[284],{2806:(O,D,n)=>{n.d(D,{s:()=>f});var v=n(8834),t=n(4006),s=n(9213),c=n(7278),p=n(9417),o=n(177),M=n(9039),r=n(5802),e=n(4438),a=n(3390),g=n(758),w=n(6992);function E(l,P){if(1&l){const d=e.RV6();e.j41(0,"div",16),e.bIt("click",function(){e.eBV(d);const u=e.XpG();return e.Njj(u.showNewPassword())}),e.nrm(1,"span",17),e.k0s()}}function R(l,P){if(1&l){const d=e.RV6();e.j41(0,"div",16),e.bIt("click",function(){e.eBV(d);const u=e.XpG();return e.Njj(u.showNewPassword())}),e.nrm(1,"span",18),e.k0s()}}function C(l,P){if(1&l&&(e.j41(0,"div",19),e.EFF(1),e.k0s()),2&l){const d=e.XpG();e.R7$(),e.SpI(" ",d.validationMessages.required("New password")," ")}}function h(l,P){if(1&l&&(e.j41(0,"div",19),e.EFF(1),e.k0s()),2&l){const d=e.XpG();e.R7$(),e.SpI(" ",d.validationMessages.password," ")}}function _(l,P){if(1&l){const d=e.RV6();e.j41(0,"div",16),e.bIt("click",function(){e.eBV(d);const u=e.XpG();return e.Njj(u.showConfirmPassword())}),e.nrm(1,"span",17),e.k0s()}}function I(l,P){if(1&l){const d=e.RV6();e.j41(0,"div",16),e.bIt("click",function(){e.eBV(d);const u=e.XpG();return e.Njj(u.showConfirmPassword())}),e.nrm(1,"span",18),e.k0s()}}function i(l,P){if(1&l&&(e.j41(0,"div",19),e.EFF(1),e.k0s()),2&l){const d=e.XpG();e.R7$(),e.SpI(" ",d.validationMessages.confirmPassword," ")}}function F(l,P){if(1&l&&(e.j41(0,"div",19),e.EFF(1),e.k0s()),2&l){const d=e.XpG();e.R7$(),e.SpI(" ",d.validationMessages.passwordMismatch," ")}}let f=(()=>{class l{constructor(d,m,u,b,j,T,U){this.dialog=d,this.fb=m,this.commonService=u,this.changePassDialogRef=b,this.adminService=j,this.data=T,this.authService=U,this.validationMessages=r.q,this.showNewPass=!1,this.showCurrPass=!1,this.showConfPass=!1}ngOnInit(){this.initializeChangePasswordForm()}initializeChangePasswordForm(){this.changePasswordForm=this.fb.group({newPassword:["",[p.k0.required,p.k0.pattern(M.y.password)]],confirmPassword:["",p.k0.required]},{validator:this.passwordMatchValidator})}passwordMatchValidator(d){const m=d.get("newPassword"),u=d.get("confirmPassword");return u.value&&m.value!==u.value?{passwordMismatch:!0}:null}changePassword(){if(this.changePasswordForm.valid){const d={confirmPassword:this.changePasswordForm.value.confirmPassword,userId:this.data.userId};"patient"==this.data.userRole?this.patientChangePassword(d):this.adminChangePassword(d)}}successModal(d){this.dialog.open(c.c,{disableClose:!0,panelClass:"custom-alert-container",data:{successNote:d.message}}).afterClosed().subscribe(u=>{u&&this.changePassDialogRef.close(!0)})}showNewPassword(){this.showNewPass=!this.showNewPass}showCurrentPassword(){this.showCurrPass=!this.showCurrPass}showConfirmPassword(){this.showConfPass=!this.showConfPass}adminChangePassword(d){this.adminService.changePassword(d).subscribe({next:m=>{m&&!m.error&&this.successModal(m)},error:m=>{m.error?.error&&this.commonService.openSnackBar(m.error?.message,"ERROR")}})}patientChangePassword(d){this.authService.apiRequest("post","patients/changePassword",d).subscribe(m=>{m&&!m.error&&this.successModal(m)},m=>{m.error?.error&&this.commonService.openSnackBar(m.error?.message,"ERROR")})}static#e=this.\u0275fac=function(m){return new(m||l)(e.rXU(t.bZ),e.rXU(p.ok),e.rXU(a.h),e.rXU(t.CP),e.rXU(g.z),e.rXU(t.Vh),e.rXU(w.u))};static#t=this.\u0275cmp=e.VBU({type:l,selectors:[["app-change-password-modal"]],standalone:!0,features:[e.aNF],decls:34,vars:10,consts:[[1,"changepassword--wrapper"],[1,"cp--header"],[1,"cp--body"],[1,"row",3,"formGroup"],[1,"col-12"],[1,"form-group"],[1,"col-form-label","fw-600"],[1,"clr--DF0404","ms-1"],[1,"form-input","position-relative"],["placeholder","Enter new password","formControlName","newPassword",1,"form-control",3,"type"],[1,"show-hide"],["class","text text-danger mt-1",4,"ngIf"],["placeholder","Enter Confirm Password","formControlName","confirmPassword",1,"form-control",3,"type"],[1,"cp--footer","w-100","d-flex","align-items-center","justify-content-end"],["mat-stroked-button","","color","primary","mat-dialog-close","",1,"me-2"],["mat-raised-button","","color","primary",3,"click","disabled"],[1,"show-hide",3,"click"],[1,"show"],[1,"Hide"],[1,"text","text-danger","mt-1"]],template:function(m,u){1&m&&(e.j41(0,"div",0)(1,"div",1)(2,"h1"),e.EFF(3,"Change Password"),e.k0s()(),e.j41(4,"div",2)(5,"form",3)(6,"div",4)(7,"div",5)(8,"label",6),e.EFF(9,"New Password "),e.j41(10,"span",7),e.EFF(11," * "),e.k0s()(),e.j41(12,"div",8),e.nrm(13,"input",9),e.DNE(14,E,2,0,"div",10)(15,R,2,0),e.k0s(),e.DNE(16,C,2,1,"div",11)(17,h,2,1,"div",11),e.k0s(),e.j41(18,"div",5)(19,"label",6),e.EFF(20,"Confirm Password "),e.j41(21,"span",7),e.EFF(22," * "),e.k0s()(),e.j41(23,"div",8),e.nrm(24,"input",12),e.DNE(25,_,2,0,"div",10)(26,I,2,0),e.k0s(),e.DNE(27,i,2,1,"div",11)(28,F,2,1,"div",11),e.k0s()()()(),e.j41(29,"div",13)(30,"button",14),e.EFF(31,"Cancel"),e.k0s(),e.j41(32,"button",15),e.bIt("click",function(){return u.changePassword()}),e.EFF(33,"Submit"),e.k0s()()()),2&m&&(e.R7$(5),e.Y8G("formGroup",u.changePasswordForm),e.R7$(8),e.Y8G("type",u.showNewPass?"text":"password"),e.R7$(),e.vxM(14,u.showNewPass?15:14),e.R7$(2),e.Y8G("ngIf",u.changePasswordForm.controls.newPassword.touched&&u.changePasswordForm.controls.newPassword.hasError("required")),e.R7$(),e.Y8G("ngIf",u.changePasswordForm.controls.newPassword.touched&&u.changePasswordForm.controls.newPassword.hasError("pattern")),e.R7$(7),e.Y8G("type",u.showConfPass?"text":"password"),e.R7$(),e.vxM(25,u.showConfPass?26:25),e.R7$(2),e.Y8G("ngIf",u.changePasswordForm.controls.confirmPassword.touched&&u.changePasswordForm.controls.confirmPassword.hasError("required")),e.R7$(),e.Y8G("ngIf",u.changePasswordForm.hasError("passwordMismatch")&&u.changePasswordForm.controls.confirmPassword.touched),e.R7$(4),e.Y8G("disabled",!u.changePasswordForm.valid))},dependencies:[s.m_,v.Hl,v.$z,t.hM,t.tx,o.MD,o.bT,p.YN,p.qT,p.me,p.BC,p.cb,p.X1,p.j4,p.JD],styles:[".change--password--modal .mat-mdc-dialog-container{width:423px}  .change--password--modal .mat-mdc-dialog-container .changepassword--wrapper{padding:30px 24px}  .change--password--modal .mat-mdc-dialog-container .changepassword--wrapper .cp--header h1{color:#1f2f3e;font-size:18px;margin-bottom:25px;font-weight:600}  .change--password--modal .mat-mdc-dialog-container .changepassword--wrapper .cp--footer{margin-top:17px}"]})}return l})()},8920:(O,D,n)=>{n.d(D,{e:()=>I});var v=n(4523),t=n(177),s=n(9417),c=n(8834),p=n(4006),o=n(9213),M=n(2359),r=n(6911),e=n(5802),a=n(4438),g=n(3390),w=n(6992),E=n(5084),R=n(2102),C=n(9631);function h(i,F){if(1&i&&(a.j41(0,"div",19),a.EFF(1),a.k0s()),2&i){const f=a.XpG();a.R7$(),a.SpI(" ",f.validationMessages.requiredDropdown("Appointment Date")," ")}}function _(i,F){if(1&i&&(a.j41(0,"div",19),a.EFF(1),a.k0s()),2&i){const f=a.XpG();a.R7$(),a.SpI(" ",f.validationMessages.required("your comment")," ")}}let I=(()=>{class i{constructor(f,l,P,d,m){this.commonService=f,this.authService=l,this.fb=P,this.dialogRef=d,this.data=m,this.validationMessages=e.q,this.inviteButton=!1,this.appointmentId="",this.userRole="",this.userId="",this.todayDate=new Date,this.maxAppntDate=this.commonService.getMaxAppoinmentFutureMonths(),this.appointmentId=null!=m.appointmentId?m.appointmentId:"",this.userRole=null!=m.userRole?m.userRole:"",this.userId=null!=m.userId?m.userId:""}ngOnInit(){this.initializeForm()}initializeForm(){this.rescheduleForm=this.fb.group({appointmentDate:["",[s.k0.required]],comment:["",[s.k0.required,s.k0.minLength(1),s.k0.maxLength(100)]]})}trimInput(){0!==(this.rescheduleForm.controls.comment.value||"").trim().length||this.rescheduleForm.controls.comment.setValue("")}submitForm(f){var l=this;return(0,v.A)(function*(){if(l.appointmentId){let P={query:{_id:l.appointmentId},updateInfo:{status:"Rescheduled",appointmentDate:f.appointmentDate,rescheduleInfo:{fromPatientId:l.userId,fromAdminId:l.userId,userRole:l.userRole,comment:f.comment}},email:l.authService.getLoggedInInfo("email"),firstName:l.authService.getLoggedInInfo("firstName")};yield l.authService.apiRequest("post","appointment/rescheduleAppointment",P).subscribe(function(){var d=(0,v.A)(function*(m){l.dialogRef.close(m)});return function(m){return d.apply(this,arguments)}}())}})()}static#e=this.\u0275fac=function(l){return new(l||i)(a.rXU(g.h),a.rXU(w.u),a.rXU(s.ok),a.rXU(p.CP),a.rXU(p.Vh))};static#t=this.\u0275cmp=a.VBU({type:i,selectors:[["app-reschedule-appointment-modal"]],standalone:!0,features:[a.aNF],decls:29,vars:8,consts:[["picker",""],[1,"reschedule--app--modal","d-flex","flex-column","w-100"],[1,"w-100"],[1,"fw-600"],[1,"row",3,"ngSubmit","formGroup"],[1,"ra--body","w-100"],[1,"row"],[1,"col-12"],[1,"form-group"],[1,"col-form-label","fw-600"],[1,"input-group"],[1,"w-100","am--datepicker"],["formControlName","appointmentDate","readonly","","placeholder","MM-DD-YYYY","matInput","",3,"focus","min","max","matDatepicker"],["matIconSuffix","",3,"for"],["class","text text-danger mt-1",4,"ngIf"],["type","text","placeholder","Write your comment here","formControlName","comment","rows","4",1,"form-control",3,"blur"],[1,"ra--footer","w-100","d-flex","align-items-center","justify-content-end","mt-2"],["mat-stroked-button","","color","primary","mat-dialog-close","",1,"me-2"],["mat-raised-button","","color","primary","type","submit",3,"disabled"],[1,"text","text-danger","mt-1"]],template:function(l,P){if(1&l){const d=a.RV6();a.j41(0,"div",1)(1,"header",2)(2,"h1",3),a.EFF(3,"Reschedule an Appointment"),a.k0s()(),a.j41(4,"form",4),a.bIt("ngSubmit",function(){return a.eBV(d),a.Njj(P.submitForm(P.rescheduleForm.value))}),a.j41(5,"div",5)(6,"div",6)(7,"div",7)(8,"div",8)(9,"label",9),a.EFF(10,"Select Date"),a.k0s(),a.j41(11,"div",10)(12,"mat-form-field",11)(13,"input",12),a.bIt("focus",function(){a.eBV(d);const u=a.sdS(16);return a.Njj(u.open())}),a.k0s(),a.nrm(14,"mat-datepicker-toggle",13)(15,"mat-datepicker",null,0),a.k0s()(),a.DNE(17,h,2,1,"div",14),a.k0s()(),a.j41(18,"div",7)(19,"div",8)(20,"label",9),a.EFF(21,"Mention the cause "),a.k0s(),a.j41(22,"textarea",15),a.bIt("blur",function(){return a.eBV(d),a.Njj(P.trimInput())}),a.k0s(),a.DNE(23,_,2,1,"div",14),a.k0s()()()(),a.j41(24,"div",16)(25,"button",17),a.EFF(26,"Cancel"),a.k0s(),a.j41(27,"button",18),a.EFF(28,"Submit"),a.k0s()()()()}if(2&l){const d=a.sdS(16);a.R7$(4),a.Y8G("formGroup",P.rescheduleForm),a.R7$(9),a.Y8G("min",P.todayDate)("max",P.maxAppntDate)("matDatepicker",d),a.R7$(),a.Y8G("for",d),a.R7$(3),a.Y8G("ngIf",P.rescheduleForm.controls.appointmentDate.touched&&P.rescheduleForm.controls.appointmentDate.hasError("required")),a.R7$(6),a.Y8G("ngIf",P.rescheduleForm.controls.comment.touched&&P.rescheduleForm.controls.comment.hasError("required")),a.R7$(4),a.Y8G("disabled",P.rescheduleForm.invalid)}},dependencies:[o.m_,c.Hl,c.$z,p.hM,p.tx,t.MD,t.bT,s.YN,s.qT,s.me,s.BC,s.cb,s.X1,s.j4,s.JD,r.UN,M.G,E.Vh,E.bZ,E.bU,R.rl,R.yw,C.fg],styles:[".reschedule--app--modal[_ngcontent-%COMP%]{padding:20px}.reschedule--app--modal[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{color:#1f2f3e;font-size:18px;margin-bottom:20px}"]})}return i})()},7278:(O,D,n)=>{n.d(D,{c:()=>o});var v=n(8834),t=n(4006),s=n(9213),c=n(4438),p=n(9417);let o=(()=>{class M{constructor(e,a,g){this.fb=e,this.dialogRef=a,this.data=g,this.successNote="",this.successHeader="",this.successNote=null!=g.successNote?g.successNote:this.successNote,this.successHeader=null!=g.successHeader?g.successHeader:this.successHeader}static#e=this.\u0275fac=function(a){return new(a||M)(c.rXU(p.ok),c.rXU(t.CP),c.rXU(t.Vh))};static#t=this.\u0275cmp=c.VBU({type:M,selectors:[["app-success-modal"]],standalone:!0,features:[c.aNF],decls:10,vars:3,consts:[[1,"alert--wrapper"],[1,"col-12","d-flex","flex-column","align-items-center","justify-content-center","w-100","text-center"],["src","assets/images/ark/successful.gif","alt","","width","60px"],[1,"font-16","fw-600","text-center","mt-2"],[1,"alert--note"],[1,"d-flex","align-items-center","justify-content-center"],["mat-raised-button","","color","primary","cdkFocusInitial","",3,"mat-dialog-close"]],template:function(a,g){1&a&&(c.j41(0,"div",0)(1,"div",1),c.nrm(2,"img",2),c.j41(3,"h2",3),c.EFF(4),c.k0s(),c.j41(5,"p",4),c.EFF(6),c.k0s(),c.j41(7,"div",5)(8,"button",6),c.EFF(9,"Okay "),c.k0s()()()()),2&a&&(c.R7$(4),c.JRh(g.successHeader),c.R7$(2),c.JRh(g.successNote),c.R7$(2),c.Y8G("mat-dialog-close",!0))},dependencies:[s.m_,v.Hl,v.$z,t.hM,t.tx]})}return M})()},1904:(O,D,n)=>{n.d(D,{b:()=>w});var v=n(4523),t=n(177),s=n(9417),c=n(8834),p=n(4006),o=n(9213),M=n(5802),r=n(4438),e=n(3390),a=n(6992);function g(E,R){if(1&E&&(r.j41(0,"div",14),r.EFF(1),r.k0s()),2&E){const C=r.XpG();r.R7$(),r.SpI(" ",C.validationMessages.required("your comment")," ")}}let w=(()=>{class E{constructor(C,h,_,I,i){this.commonService=C,this.authService=h,this.fb=_,this.dialogRef=I,this.data=i,this.validationMessages=M.q,this.inviteButton=!1,this.appointmentId="",this.userRole="",this.userId="",this.appointmentId=null!=i.appointmentId?i.appointmentId:"",this.userRole=null!=i.userRole?i.userRole:"",this.userId=null!=i.userId?i.userId:""}ngOnInit(){this.initializeForm()}initializeForm(){this.rejectCommentForm=this.fb.group({rejectComment:["",[s.k0.required,s.k0.minLength(1),s.k0.maxLength(100)]]})}trimInput(){0!==(this.rejectCommentForm.controls.rejectComment.value||"").trim().length||this.rejectCommentForm.controls.rejectComment.setValue("")}submitForm(C){var h=this;return(0,v.A)(function*(){if(h.appointmentId){let _={query:{_id:h.appointmentId},updateInfo:{status:"Cancelled",rejectInfo:{fromPatientId:h.userId,fromAdminId:h.userId,userRole:h.userRole,comment:C.rejectComment,rejectedDate:new Date}}};yield h.authService.apiRequest("post","appointment/cancelAppointment",_).subscribe(function(){var I=(0,v.A)(function*(i){h.dialogRef.close(i)});return function(i){return I.apply(this,arguments)}}())}})()}static#e=this.\u0275fac=function(h){return new(h||E)(r.rXU(e.h),r.rXU(a.u),r.rXU(s.ok),r.rXU(p.CP),r.rXU(p.Vh))};static#t=this.\u0275cmp=r.VBU({type:E,selectors:[["app-write-comment-modal"]],standalone:!0,features:[r.aNF],decls:20,vars:3,consts:[[1,"alert--wrapper","d-flex","flex-column","w-100"],[1,"w-100"],[1,"fw-600","font-18","mb-4"],[1,"row",3,"ngSubmit","formGroup"],[1,"row"],[1,"col-12"],[1,"form-group"],[1,"col-form-label","fw-600"],[1,"clr--DF0404","ms-1"],["type","text","placeholder","Write your comment here","formControlName","rejectComment","rows","4",1,"form-control",3,"blur"],["class","text text-danger mt-1",4,"ngIf"],[1,"ra--footer","w-100","d-flex","align-items-center","justify-content-end","mt-3"],["mat-stroked-button","","color","primary","mat-dialog-close","",1,"me-2"],["mat-raised-button","","color","primary","type","submit",3,"disabled"],[1,"text","text-danger","mt-1"]],template:function(h,_){1&h&&(r.j41(0,"div",0)(1,"header",1)(2,"h1",2),r.EFF(3,"Write a Comment"),r.k0s()(),r.j41(4,"form",3),r.bIt("ngSubmit",function(){return _.submitForm(_.rejectCommentForm.value)}),r.j41(5,"div",1)(6,"div",4)(7,"div",5)(8,"div",6)(9,"label",7),r.EFF(10," Mention the cause "),r.j41(11,"span",8),r.EFF(12," *"),r.k0s()(),r.j41(13,"textarea",9),r.bIt("blur",function(){return _.trimInput()}),r.k0s(),r.DNE(14,g,2,1,"div",10),r.k0s()()()(),r.j41(15,"div",11)(16,"button",12),r.EFF(17,"Cancel"),r.k0s(),r.j41(18,"button",13),r.EFF(19,"Submit"),r.k0s()()()()),2&h&&(r.R7$(4),r.Y8G("formGroup",_.rejectCommentForm),r.R7$(10),r.Y8G("ngIf",_.rejectCommentForm.controls.rejectComment.touched&&_.rejectCommentForm.controls.rejectComment.hasError("required")),r.R7$(4),r.Y8G("disabled",_.rejectCommentForm.invalid))},dependencies:[o.m_,c.Hl,c.$z,p.hM,p.tx,t.MD,t.bT,s.YN,s.qT,s.me,s.BC,s.cb,s.X1,s.j4,s.JD]})}return E})()},1631:(O,D,n)=>{n.d(D,{b:()=>h});var v=n(4523),t=n(5802),s=n(9417),c=n(7278),p=n(4006),o=n(4438),M=n(2168),r=n(3390),e=n(6992),a=n(177),g=n(8834);function w(_,I){if(1&_&&(o.j41(0,"option",19),o.EFF(1),o.k0s()),2&_){const i=I.$implicit;o.Y8G("value",i),o.R7$(),o.JRh(i)}}function E(_,I){if(1&_&&(o.j41(0,"div",20),o.EFF(1),o.k0s()),2&_){const i=o.XpG(2);o.R7$(),o.SpI(" ",i.validationMessages.requiredDropdown("Creation date"),"")}}function R(_,I){if(1&_&&(o.j41(0,"div",20),o.EFF(1),o.k0s()),2&_){const i=o.XpG(2);o.R7$(),o.SpI(" ",i.validationMessages.required("Comment"),"")}}function C(_,I){if(1&_){const i=o.RV6();o.j41(0,"form",1)(1,"div",2)(2,"div",3)(3,"h1",4),o.EFF(4,"Create Case Note"),o.k0s()(),o.j41(5,"div",5)(6,"div",6)(7,"div",7)(8,"label",8),o.EFF(9,"Creation Date "),o.j41(10,"span",9),o.EFF(11," * "),o.k0s()(),o.j41(12,"select",10)(13,"option",11),o.EFF(14,"Select date"),o.k0s(),o.DNE(15,w,2,2,"option",12),o.k0s(),o.DNE(16,E,2,1,"div",13),o.k0s()(),o.j41(17,"div",6)(18,"div",7),o.nrm(19,"textarea",14),o.DNE(20,R,2,1,"div",13),o.k0s()()(),o.j41(21,"div",15)(22,"button",16),o.EFF(23,"Cancel"),o.k0s(),o.j41(24,"button",17),o.bIt("click",function(){o.eBV(i);const f=o.XpG();return o.Njj(f.caseNoteSubmit(f.caseNoteForm.value,"save"))}),o.EFF(25,"Save"),o.k0s(),o.j41(26,"button",18),o.bIt("click",function(){o.eBV(i);const f=o.XpG();return o.Njj(f.caseNoteSubmit(f.caseNoteForm.value,"finalize"))}),o.EFF(27,"Finalize"),o.k0s()()()()}if(2&_){const i=o.XpG();o.Y8G("formGroup",i.caseNoteForm),o.R7$(15),o.Y8G("ngForOf",i.appointment_dates),o.R7$(),o.Y8G("ngIf",i.caseNoteForm.controls.case_note_date.touched&&i.caseNoteForm.controls.case_note_date.hasError("required")),o.R7$(4),o.Y8G("ngIf",i.caseNoteForm.controls.case_comment.hasError("required")&&i.caseNoteForm.controls.case_comment.touched)}}let h=(()=>{class _{constructor(i,F,f,l,P,d,m,u){this.router=i,this.fb=F,this.route=f,this.dialog=l,this.commonService=P,this.authService=d,this.dialogRef=m,this.data=u,this.userId=this.authService.getLoggedInInfo("_id"),this.userRole=this.authService.getLoggedInInfo("role"),this.validationMessages=t.q,this.appointment_dates=["07/12/2024","05/14/2024","04/10/2024"],this.appointmentId=u.appointmentId}ngOnInit(){this.caseNoteForm=this.fb.group({appointmentId:[this.appointmentId],case_note_date:["",[s.k0.required,s.k0.minLength(1),s.k0.maxLength(500)]],case_comment:["",[s.k0.required,s.k0.minLength(1),s.k0.maxLength(1e3)]]})}caseNoteSubmit(i,F){var f=this;return(0,v.A)(function*(){f.caseNoteForm.invalid?f.caseNoteForm.markAllAsTouched():f.appointmentId&&(f.dialogRef.close(),f.successModal()),console.log(F,">>>>formData>>>>",i)})()}successModal(){this.dialog.open(c.c,{panelClass:"custom-alert-container",data:{successNote:"Case note has been created successfully!"}})}static#e=this.\u0275fac=function(F){return new(F||_)(o.rXU(M.Ix),o.rXU(s.ok),o.rXU(M.nX),o.rXU(p.bZ),o.rXU(r.h),o.rXU(e.u),o.rXU(p.CP),o.rXU(p.Vh))};static#t=this.\u0275cmp=o.VBU({type:_,selectors:[["app-case-note-modal"]],decls:1,vars:1,consts:[[3,"formGroup",4,"ngIf"],[3,"formGroup"],[1,"modal--wrapper","d-flex","flex-column","w-100"],[1,"modal--header","w-100"],[1,"fw-700","border-0"],[1,"modal--body","w-100","pt-1"],[1,"col-12"],[1,"form-group"],[1,"col-form-label","fw-700","font-16"],[1,"clr--DF0404","ms-1"],["aria-label","Default select example","formControlName","case_note_date",1,"form-select","form-control","form-control-md"],["value","","disabled",""],[3,"value",4,"ngFor","ngForOf"],["class","text text-danger mt-1",4,"ngIf"],["type","text","placeholder","Write your comment here","formControlName","case_comment","rows","5",1,"form-control"],[1,"modal--footer","w-100","d-flex","align-items-center","justify-content-end","pt-0"],["mat-stroked-button","","color","primary","mat-dialog-close","",1,"me-3"],["mat-stroked-button","","color","primary",1,"me-3",3,"click"],["mat-raised-button","","color","primary",3,"click"],[3,"value"],[1,"text","text-danger","mt-1"]],template:function(F,f){1&F&&o.DNE(0,C,28,4,"form",0),2&F&&o.Y8G("ngIf",f.caseNoteForm)},dependencies:[a.Sq,a.bT,s.qT,s.xH,s.y7,s.me,s.wz,s.BC,s.cb,g.$z,p.tx,s.j4,s.JD]})}return _})()},1792:(O,D,n)=>{n.d(D,{m:()=>a});var v=n(4006),t=n(4438),s=n(177),c=n(8834),p=n(9213),o=n(9362);const M=g=>({image:g});function r(g,w){1&g&&(t.j41(0,"div")(1,"small",15),t.EFF(2,"Uploaded file is not a valid image"),t.k0s()())}function e(g,w){if(1&g&&(t.j41(0,"button",16),t.EFF(1,"Submit"),t.k0s()),2&g){const E=t.XpG();t.Y8G("mat-dialog-close",t.eq3(1,M,E.croppedImage))}}let a=(()=>{class g{constructor(E,R){this.dialogRef=E,this.data=R,this.imageChangedEvent="",this.croppedImage="",this.imageBase64="",this.saveButtonShow=!1,this.roundCropper=!0,this.isInvalidType=!1}fileChangeEvent(E){this.imageChangedEvent=E}imageCropped(E){this.croppedImageEvent=E,this.croppedImage=E}imageLoaded(){this.isInvalidType=!1}cropperReady(){this.saveButtonShow=!0}loadImageFailed(){this.isInvalidType=!0}static#e=this.\u0275fac=function(R){return new(R||g)(t.rXU(v.CP),t.rXU(v.Vh))};static#t=this.\u0275cmp=t.VBU({type:g,selectors:[["app-upload-img"]],decls:18,vars:7,consts:[["fileInput",""],[1,"comman-popup"],[1,"d-flex","justify-content-between","mat-header"],[1,"p-2"],[1,"fw-600","font-21","text--000"],[1,"ml-auto","p-2"],[1,"ml-auto","cursor-pointer",3,"click","mat-dialog-close"],["mat-dialog-content",""],[1,"d-flex","justify-content-center"],["mat-button","",1,"browse-btn","mb-3","text-center",3,"click"],["type","file","accept",".jpg, .jpeg, .png",2,"display","none",3,"change"],["format","png","output","base64",3,"imageCropped","imageLoaded","cropperReady","loadImageFailed","roundCropper","imageChangedEvent","maintainAspectRatio","aspectRatio"],[4,"ngIf"],["mat-dialog-actions","","d-flex",""],["mat-button","","class","submit-btn mb-3",3,"mat-dialog-close",4,"ngIf"],[1,"err"],["mat-button","",1,"submit-btn","mb-3",3,"mat-dialog-close"]],template:function(R,C){if(1&R){const h=t.RV6();t.j41(0,"div",1)(1,"div",2)(2,"div",3)(3,"h2",4),t.EFF(4,"Upload Photo"),t.k0s()(),t.j41(5,"div",5)(6,"mat-icon",6),t.bIt("click",function(){return t.eBV(h),t.Njj(C.dialogRef.close(!1))}),t.EFF(7,"close"),t.k0s()()(),t.j41(8,"div",7)(9,"div",8)(10,"button",9),t.bIt("click",function(){t.eBV(h);const I=t.sdS(13);return t.Njj(I.click())}),t.EFF(11,"Browse"),t.k0s()(),t.j41(12,"input",10,0),t.bIt("change",function(I){return t.eBV(h),t.Njj(C.fileChangeEvent(I))}),t.k0s(),t.j41(14,"image-cropper",11),t.bIt("imageCropped",function(I){return t.eBV(h),t.Njj(C.imageCropped(I))})("imageLoaded",function(){return t.eBV(h),t.Njj(C.imageLoaded())})("cropperReady",function(){return t.eBV(h),t.Njj(C.cropperReady())})("loadImageFailed",function(){return t.eBV(h),t.Njj(C.loadImageFailed())}),t.k0s()(),t.DNE(15,r,3,0,"div",12),t.j41(16,"div",13),t.DNE(17,e,2,3,"button",14),t.k0s()()}2&R&&(t.R7$(6),t.Y8G("mat-dialog-close",!0),t.R7$(8),t.Y8G("roundCropper",C.roundCropper)("imageChangedEvent",C.imageChangedEvent)("maintainAspectRatio",!0)("aspectRatio",1),t.R7$(),t.Y8G("ngIf",C.isInvalidType),t.R7$(2),t.Y8G("ngIf",C.saveButtonShow))},dependencies:[s.bT,c.$z,v.tx,v.Yi,v.E7,p.An,o._D],styles:[".submit-btn[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;padding:0 20px;width:100%;height:40px!important;border-radius:5px;background:#9155a3;font-family:Inter;font-size:16px!important;font-weight:600!important;color:#fff!important;line-height:1.2;letter-spacing:1px;box-shadow:none!important;cursor:pointer!important}.browse-btn[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;padding:0 20px;width:auto;height:40px!important;border-radius:5px;background:#9155a3;font-family:Inter;font-size:16px!important;font-weight:600!important;color:#fff!important;line-height:1.2;letter-spacing:1px;box-shadow:none!important;cursor:pointer!important}  .mat-mdc-dialog-actions{justify-content:end!important}.mat-header[_ngcontent-%COMP%]{padding:8px 0 0 11px!important}.err[_ngcontent-%COMP%]{float:left;color:red;margin:13px;font-size:14px}"]})}return g})()},7664:(O,D,n)=>{n.d(D,{o:()=>s});var v=n(2168),t=n(4438);let s=(()=>{class c{constructor(o){this.router=o,this.history=[],this.router.events.subscribe(M=>{M instanceof v.Z&&this.history.push(M.url)})}getPreviousUrl(){return this.history.length>1?this.history[this.history.length-2]:null}static#e=this.\u0275fac=function(M){return new(M||c)(t.KVO(v.Ix))};static#t=this.\u0275prov=t.jDH({token:c,factory:c.\u0275fac,providedIn:"root"})}return c})()},9039:(O,D,n)=>{n.d(D,{y:()=>v});const v={email:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,password:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-@$!%*?&#^()+=_<>,./;:'"|\`~])[A-Za-z\d-@$!%*?&#^()+=_<>,./;:'"|\`~]{8,16}$/,usPhoneNumber:/^\(\d{3}\) \d{3}-\d{4}$/,alphabetic:/^[a-zA-Z]*$/,onlyNumeric:/^[0-9]+$/,numericAndSpecialCharacter:/^[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/}},5802:(O,D,n)=>{n.d(D,{q:()=>v});const v={required:t=>`Please enter ${t}`,validEmail:"The email address seems to be incorrect",email:t=>`Please enter a valid ${t}`,password:"Minimum 8 and maximum 16 character, atleast one special character, one numeric & 1 uppercase and lowercase letter",passwordMismatch:"The passwords do not match. Please try again",confirmPassword:"Please confirm your password",invalidPhoneNumber:"Invalid phone number format",alphabeticChar:t=>`Please enter a valid ${t}`,newPasswordRequired:"Please set a password for your account",minlength:(t,s)=>`${t} should be at least ${s} characters.`,maxlength:(t,s)=>`${t} should not exceed ${s} characters.`,noRecords:"No records found!",requiredDropdown:t=>`Please select ${t}`,radioButton:"Gender is required",requiredCheckbox:t=>`Please check ${t}`,requiredProofDocument:"Document uploaded, Please select ID Proof document type",requiredDocument:"ID Proof document type is slected, Please upload document",isUnique:t=>`${t} should be unique`}}}]);