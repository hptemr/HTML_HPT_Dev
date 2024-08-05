"use strict";(self.webpackChunkcion_angular_16=self.webpackChunkcion_angular_16||[]).push([[876],{1876:(Ot,C,p)=>{p.r(C),p.d(C,{SupportTeamModule:()=>Vt});var g=p(177),l=p(9417),x=p(5063),f=p(2168),w=p(263),$=p(4205),G=p(2843),T=p(3716),M=p(4288),L=p(7706),B=p(9500),V=p(3850),Y=p(4152),O=p(423),X=p(7785),P=p(1641),u=p(4523),d=p(9159),h=p(446),E=p(5802),z=p(4494),t=p(4438),k=p(4006),R=p(6992),A=p(3390),y=p(8834),F=p(5084),b=p(2102),j=p(9213),N=p(9631),U=p(6695),_=p(2042);const q=()=>["/support-team/referrals/appointment"],D=a=>["/support-team/referrals/appointment",a];function J(a,s){if(1&a&&(t.j41(0,"option",40),t.EFF(1),t.k0s()),2&a){const e=s.$implicit;t.FS9("value",e),t.R7$(),t.SpI("",e," ")}}function H(a,s){1&a&&(t.j41(0,"th",41),t.EFF(1," Appointment # "),t.k0s())}function Z(a,s){if(1&a&&(t.j41(0,"td",42)(1,"div",43)(2,"div",44),t.nrm(3,"img",45),t.k0s(),t.j41(4,"div")(5,"h2",46),t.EFF(6),t.k0s(),t.j41(7,"p",47)(8,"mat-icon",48),t.EFF(9,"mail"),t.k0s(),t.EFF(10),t.k0s(),t.j41(11,"p",49),t.EFF(12,"Appointment Date "),t.k0s(),t.j41(13,"p",50),t.EFF(14),t.nI1(15,"date"),t.k0s()()()()),2&a){const e=s.$implicit;t.R7$(3),t.FS9("src",e.profileImage,t.B4B),t.R7$(3),t.JRh(e.fullName),t.R7$(4),t.SpI(" ",e.email," "),t.R7$(4),t.SpI(" ",t.i5U(15,4,e.appointmentDate,"EEE, MMMM d, y"),"")}}function W(a,s){1&a&&(t.j41(0,"th",51),t.EFF(1," Appointment Date "),t.k0s())}function K(a,s){if(1&a&&(t.j41(0,"td",42)(1,"p",49),t.EFF(2," Practice Location: "),t.j41(3,"span",52),t.EFF(4),t.k0s()(),t.j41(5,"p",49),t.EFF(6," Therapist: "),t.j41(7,"span",52),t.EFF(8),t.k0s()(),t.j41(9,"p",49),t.EFF(10," Referred By: "),t.j41(11,"span",52),t.EFF(12),t.k0s()()()),2&a){const e=s.$implicit;t.R7$(4),t.JRh(e.practiceLocation),t.R7$(4),t.JRh(e.therapistName),t.R7$(4),t.JRh(e.referredBy)}}function Q(a,s){1&a&&(t.j41(0,"th",53),t.EFF(1," Actions "),t.k0s())}function tt(a,s){1&a&&(t.j41(0,"a",59),t.EFF(1,"Pending Intake Form"),t.k0s())}function et(a,s){if(1&a&&(t.j41(0,"button",60)(1,"mat-icon",61),t.EFF(2,"visibility "),t.k0s()()),2&a){const e=t.XpG().$implicit;t.Y8G("routerLink",t.eq3(1,D,e.id))}}function nt(a,s){if(1&a&&(t.j41(0,"button",60)(1,"mat-icon",61),t.EFF(2,"edit "),t.k0s()()),2&a){const e=t.XpG().$implicit;t.Y8G("routerLink",t.eq3(1,D,e.id))}}function at(a,s){if(1&a){const e=t.RV6();t.j41(0,"button",62),t.bIt("click",function(){t.eBV(e);const n=t.XpG().$implicit,r=t.XpG();return t.Njj(r.deleteAppointment(n.appointmentId))}),t.j41(1,"mat-icon",61),t.EFF(2,"delete "),t.k0s()()}}function rt(a,s){if(1&a&&(t.j41(0,"td",42)(1,"div",54),t.DNE(2,tt,2,0,"a",55),t.j41(3,"div",56),t.DNE(4,et,3,3,"button",57)(5,nt,3,3,"button",57)(6,at,3,0,"button",58),t.k0s(),t.j41(7,"p",49),t.EFF(8," Sent on "),t.j41(9,"span",52),t.EFF(10),t.nI1(11,"date"),t.k0s()()()()),2&a){const e=s.$implicit;t.R7$(2),t.Y8G("ngIf",!e.intakeFormSubmit),t.R7$(2),t.Y8G("ngIf","Pending"!=e.status),t.R7$(),t.Y8G("ngIf","Pending"==e.status),t.R7$(),t.Y8G("ngIf","Pending"==e.status),t.R7$(4),t.SpI(" ",t.i5U(11,5,e.sentOn,"EEE, MMMM d, y")," ")}}function ot(a,s){1&a&&t.nrm(0,"tr",63)}function it(a,s){1&a&&t.nrm(0,"tr",64)}function st(a,s){if(1&a&&(t.j41(0,"div",65)(1,"div",66),t.nrm(2,"img",67),t.j41(3,"p",68),t.EFF(4),t.k0s()()()),2&a){const e=t.XpG();t.R7$(4),t.JRh(e.validationMessages.noRecords)}}const pt=[];let lt=(()=>{class a{constructor(e,o,n,r){this.dialog=e,this.authService=o,this.commonService=n,this.router=r,this.displayedColumns=["info","referred","action"],this.referralList=new d.I6(pt),this.appointmentStatus=h.K0,this.practiceLocations=h.WM,this.validationMessages=E.q,this.orderBy={createdAt:-1},this.whereCond={},this.totalCount=0,this.pageIndex=0,this.pageSize=h.T0,this.pageSizeOptions=h.Xe,this.referredBy="",this.therapistName="",this.practiceLocVal="",this.sentOn="",this.appointmentDate="",this.maxToDate=this.commonService.getMaxAppoinmentFutureMonths(),this.maxSentDate=new Date,this.refferalId=""}ngOnInit(){this.getReferralList()}getReferralList(e=""){var o=this;return(0,u.A)(function*(){""==e&&o.commonService.showLoader();let n={queryMatch:o.whereCond,order:o.orderBy,limit:o.pageSize,offset:o.pageIndex*o.pageSize};yield o.authService.apiRequest("post","referral/getReferralList",n).subscribe(function(){var r=(0,u.A)(function*(m){o.commonService.hideLoader(),console.log(m.data),o.totalCount=m.data.totalCount;let i=[];yield m.data.referralList.map(c=>{i.push({id:c._id,referredBy:c.referredBy,sentOn:c.createdAt,fullName:c.patient.firstName+" "+c.patient.lastName,email:c.patient.email,profileImage:h.ns.awsS3Url+h.ns.userProfileFolderPath+c.patient.profileImage,status:c.appointment.status,appointmentId:c.appointment._id,appointmentDate:c.appointment.appointmentDate,practiceLocation:c.appointment.practiceLocation,intakeFormSubmit:c.appointment.intakeFormSubmit,therapistName:c.therapist?c.therapist.firstName+" "+c.therapist.lastName:"NA"})}),o.referralList=new d.I6(i)});return function(m){return r.apply(this,arguments)}}())})()}onDateChange(e,o){let n,r=new Date(e.value);n="appointmentDate"==o?{appointmentDate:r}:{createdAt:r},Object.assign(this.whereCond,n),this.getReferralList("search")}searchRecords(e,o){let n=e.target.value.trim();if(""!=n){let r;n=n.replace("+","\\+");let m={$regex:n,$options:"i"};r="referredBy"==o?{referredBy:m}:{$or:[{"therapist.firstName":m},{"therapist.lastName":m}]},Object.assign(this.whereCond,r)}else delete this.whereCond[o];this.getReferralList("search")}handlePageEvent(e){this.pageSize=e.pageSize,this.pageIndex=e.pageIndex,this.getReferralList()}reset(){this.whereCond={},this.totalCount=0,this.pageIndex=0,this.pageSize=h.T0,this.pageSizeOptions=h.Xe,this.sentOn="",this.referredBy="",this.therapistName="",this.practiceLocVal="",this.appointmentDate="",this.getReferralList("reset")}filterDropDown(e){""!=e.target.value?Object.assign(this.whereCond,{"appointment.practiceLocation":e.target.value}):delete this.whereCond["appointment.practiceLocation"],this.getReferralList("search")}deleteAppointment(e){var o=this;this.dialog.open(z.C,{panelClass:"custom-alert-container",data:{warningNote:"Do you really want to delete this appointment?"}}).afterClosed().subscribe(r=>{r&&this.authService.apiRequest("post","referral/deleteAppointment",{appointmentId:e}).subscribe(function(){var i=(0,u.A)(function*(c){c.error?o.commonService.openSnackBar(c.message,"ERROR"):(o.getReferralList(""),o.commonService.openSnackBar(c.message,"SUCCESS"))});return function(c){return i.apply(this,arguments)}}(),i=>{console.error(i)})})}static#t=this.\u0275fac=function(o){return new(o||a)(t.rXU(k.bZ),t.rXU(R.u),t.rXU(A.h),t.rXU(f.Ix))};static#e=this.\u0275cmp=t.VBU({type:a,selectors:[["app-referrals"]],decls:67,vars:23,consts:[["picker1",""],["picker2",""],["paginator",""],[1,"col-12","referrals--wrapper"],[1,"card"],[1,"card-header","pb-0"],[1,"col-12","d-flex","align-items-center","justify-content-between","mb-3"],[1,"mb-0","clr--1F2F3E"],["mat-raised-button","","color","primary",3,"routerLink"],[1,"material-symbols-outlined","flex-shrink-0"],[1,"col-12","mt-2"],[1,"row"],[1,"col-12","col-sm-6","col-lg-3"],[1,"form-group"],["aria-label","Default select example",1,"form-select","form-control",3,"ngModelChange","change","ngModel"],["value",""],[3,"value",4,"ngFor","ngForOf"],["type","text","placeholder","Referred By",1,"form-control","search--outer",3,"ngModelChange","keyup","ngModel"],["mat-button","",1,"p-0","flex-shrink-0","min-width-unset","search--fields"],["type","text","placeholder","Therapist Name",1,"form-control","search--outer",3,"ngModelChange","keyup","ngModel"],[1,"input-group"],[1,"w-100","am--datepicker"],["readonly","true","placeholder","Send On","matInput","",3,"ngModelChange","dateChange","ngModel","max","matDatepicker"],["matIconSuffix","",3,"for"],["readonly","true","placeholder","Appointment Date","matInput","",3,"ngModelChange","dateChange","ngModel","max","matDatepicker"],["mat-stroked-button","","color","primary",3,"click"],[1,"card-body"],[1,"col-12","cust--mat--table--wrapper"],["mat-table","","matSort","",1,"cust--mat--table","box--row--table",3,"dataSource"],["matColumnDef","info"],["mat-header-cell","","mat-sort-header","","sortActionDescription","Sort by number",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","referred"],["mat-header-cell","","mat-sort-header","","sortActionDescription","Sort by weight",4,"matHeaderCellDef"],["matColumnDef","action"],["mat-header-cell","","mat-sort-header","","sortActionDescription","Sort by symbol",4,"matHeaderCellDef"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["class","no--record--found align-items-center justify-content-center w-100",4,"ngIf"],[3,"page","length","pageSize","showFirstLastButtons","pageSizeOptions","pageIndex"],[3,"value"],["mat-header-cell","","mat-sort-header","","sortActionDescription","Sort by number"],["mat-cell",""],[1,"d-flex","align-items-start"],[1,"img--box","flex-shrink-0"],["alt","",1,"img-fluid",3,"src"],[1,"mb-1","font-16","text-primary","clr--1F2F3E","fw-500"],[1,"mb-1","font-14","text-primary","clr--1F2F3E","d-flex","align-items-center","wb-ba"],[1,"mail-con","text-primary","me-2","flex-shrink-0"],[1,"mb-0","font-14","text-primary","clr--1F2F3E","fw-700"],[1,"mb-0","font-14","text-primary","clr--1F2F3E"],["mat-header-cell","","mat-sort-header","","sortActionDescription","Sort by weight"],[1,"fw-400"],["mat-header-cell","","mat-sort-header","","sortActionDescription","Sort by symbol"],[1,"w-100","d-flex","align-items-end","justify-content-end","flex-column"],["class","font-14 pending--link",4,"ngIf"],[1,"d-flex","w-100","my-2","justify-content-end"],["mat-button","","class","flex-shrink-0 min-width-unset",3,"routerLink",4,"ngIf"],["mat-button","","class","flex-shrink-0 min-width-unset",3,"click",4,"ngIf"],[1,"font-14","pending--link"],["mat-button","",1,"flex-shrink-0","min-width-unset",3,"routerLink"],[1,"material-symbols-outlined","flex-shrink-0","m-0","text-primary"],["mat-button","",1,"flex-shrink-0","min-width-unset",3,"click"],["mat-header-row",""],["mat-row",""],[1,"no--record--found","align-items-center","justify-content-center","w-100"],[1,"d-flex","flex-column","align-items-center","w-100"],["src","assets/images/ark/sad.png","alt","",1,"mb-3","sad--img"],[1,""]],template:function(o,n){if(1&o){const r=t.RV6();t.j41(0,"div",3)(1,"div",4)(2,"div",5)(3,"div",6)(4,"h3",7),t.EFF(5,"Referrals"),t.k0s(),t.j41(6,"button",8)(7,"mat-icon",9),t.EFF(8," add_circle "),t.k0s(),t.EFF(9," Create Appointment "),t.k0s()(),t.j41(10,"div",10)(11,"div",11)(12,"div",12)(13,"div",13)(14,"select",14),t.mxI("ngModelChange",function(i){return t.eBV(r),t.DH7(n.practiceLocVal,i)||(n.practiceLocVal=i),t.Njj(i)}),t.bIt("change",function(i){return t.eBV(r),t.Njj(n.filterDropDown(i))}),t.j41(15,"option",15),t.EFF(16,"Practice Location"),t.k0s(),t.DNE(17,J,2,2,"option",16),t.k0s()()(),t.j41(18,"div",12)(19,"div",13)(20,"input",17),t.mxI("ngModelChange",function(i){return t.eBV(r),t.DH7(n.referredBy,i)||(n.referredBy=i),t.Njj(i)}),t.bIt("keyup",function(i){return t.eBV(r),t.Njj(n.searchRecords(i,"referredBy"))}),t.k0s(),t.j41(21,"button",18)(22,"mat-icon",9),t.EFF(23,"search "),t.k0s()()()(),t.j41(24,"div",12)(25,"div",13)(26,"input",19),t.mxI("ngModelChange",function(i){return t.eBV(r),t.DH7(n.therapistName,i)||(n.therapistName=i),t.Njj(i)}),t.bIt("keyup",function(i){return t.eBV(r),t.Njj(n.searchRecords(i,"therapistName"))}),t.k0s(),t.j41(27,"button",18)(28,"mat-icon",9),t.EFF(29,"search "),t.k0s()()()(),t.j41(30,"div",12)(31,"div",13)(32,"div",20)(33,"mat-form-field",21)(34,"input",22),t.mxI("ngModelChange",function(i){return t.eBV(r),t.DH7(n.sentOn,i)||(n.sentOn=i),t.Njj(i)}),t.bIt("dateChange",function(i){return t.eBV(r),t.Njj(n.onDateChange(i,"createdAt"))}),t.k0s(),t.nrm(35,"mat-datepicker-toggle",23)(36,"mat-datepicker",null,0),t.k0s()()()(),t.j41(38,"div",12)(39,"div",13)(40,"div",20)(41,"mat-form-field",21)(42,"input",24),t.mxI("ngModelChange",function(i){return t.eBV(r),t.DH7(n.appointmentDate,i)||(n.appointmentDate=i),t.Njj(i)}),t.bIt("dateChange",function(i){return t.eBV(r),t.Njj(n.onDateChange(i,"appointmentDate"))}),t.k0s(),t.nrm(43,"mat-datepicker-toggle",23)(44,"mat-datepicker",null,1),t.k0s()()()(),t.j41(46,"div",12)(47,"div",13)(48,"button",25),t.bIt("click",function(){return t.eBV(r),t.Njj(n.reset())}),t.EFF(49,"Reset Filter"),t.k0s()()()()()(),t.j41(50,"div",26)(51,"div",27)(52,"table",28),t.qex(53,29),t.DNE(54,H,2,0,"th",30)(55,Z,16,7,"td",31),t.bVm(),t.qex(56,32),t.DNE(57,W,2,0,"th",33)(58,K,13,3,"td",31),t.bVm(),t.qex(59,34),t.DNE(60,Q,2,0,"th",35)(61,rt,12,8,"td",31),t.bVm(),t.DNE(62,ot,1,0,"tr",36)(63,it,1,0,"tr",37),t.k0s(),t.DNE(64,st,5,1,"div",38),t.j41(65,"mat-paginator",39,2),t.bIt("page",function(i){return t.eBV(r),t.Njj(n.handlePageEvent(i))}),t.k0s()()()()()}if(2&o){const r=t.sdS(37),m=t.sdS(45);t.R7$(6),t.Y8G("routerLink",t.lJ4(22,q)),t.R7$(8),t.R50("ngModel",n.practiceLocVal),t.R7$(3),t.Y8G("ngForOf",n.practiceLocations),t.R7$(3),t.R50("ngModel",n.referredBy),t.R7$(6),t.R50("ngModel",n.therapistName),t.R7$(8),t.R50("ngModel",n.sentOn),t.Y8G("max",n.maxSentDate)("matDatepicker",r),t.R7$(),t.Y8G("for",r),t.R7$(7),t.R50("ngModel",n.appointmentDate),t.Y8G("max",n.maxToDate)("matDatepicker",m),t.R7$(),t.Y8G("for",m),t.R7$(9),t.Y8G("dataSource",n.referralList),t.R7$(10),t.Y8G("matHeaderRowDef",n.displayedColumns),t.R7$(),t.Y8G("matRowDefColumns",n.displayedColumns),t.R7$(),t.Y8G("ngIf",n.referralList&&0==n.referralList.filteredData.length),t.R7$(),t.Y8G("length",n.totalCount)("pageSize",n.pageSize)("showFirstLastButtons",!0)("pageSizeOptions",n.pageSizeOptions)("pageIndex",n.pageIndex)}},dependencies:[g.Sq,g.bT,f.Wk,l.xH,l.y7,l.me,l.wz,l.BC,l.vS,y.$z,F.Vh,F.bZ,F.bU,b.rl,b.yw,j.An,N.fg,U.iy,_.B4,_.aE,d.Zl,d.tL,d.ji,d.cC,d.YV,d.iL,d.KS,d.$R,d.YZ,d.NB,g.vh],styles:[".referrals--wrapper .cust--mat--table{margin-top:20px}  .referrals--wrapper .cust--mat--table thead{display:none}  .referrals--wrapper .cust--mat--table tbody tr td .mail-con{height:16px;width:16px;font-size:16px}  .referrals--wrapper .cust--mat--table tbody tr td .wb-ba{word-break:break-all}  .referrals--wrapper .cust--mat--table tbody tr td .pending--link{color:#1e87f0}  .referrals--wrapper .cust--mat--table tbody tr td:last-child .mat-icon{height:24px;width:24px;font-size:24px}  .referrals--wrapper .cust--mat--table tbody tr td .img--box{width:48px;height:48px;border-radius:100%;overflow:hidden;margin-right:15px}  .referrals--wrapper .cust--mat--table.box--row--table.mat-mdc-table thead tr th:nth-child(1){width:40%}  .referrals--wrapper .cust--mat--table.box--row--table.mat-mdc-table thead tr th:nth-child(2){width:35%}  .referrals--wrapper .cust--mat--table.box--row--table.mat-mdc-table thead tr th:nth-child(3){width:200px}  .referrals--wrapper .cust--mat--table.box--row--table.mat-mdc-table tbody tr td:nth-child(1){width:40%}  .referrals--wrapper .cust--mat--table.box--row--table.mat-mdc-table tbody tr td:nth-child(2){width:35%}  .referrals--wrapper .cust--mat--table.box--row--table.mat-mdc-table tbody tr td:nth-child(3){width:200px}@media only screen and (max-width: 599px){.referrals--wrapper[_ngcontent-%COMP%]     .cust--mat--table.box--row--table.mat-mdc-table{width:860px}}@media screen and (orientation: landscape) and (max-width: 850px){.referrals--wrapper[_ngcontent-%COMP%]     .cust--mat--table.box--row--table.mat-mdc-table tbody tr td:nth-child(1), .referrals--wrapper[_ngcontent-%COMP%]     .cust--mat--table.box--row--table.mat-mdc-table thead tr th:nth-child(1){width:40%}.referrals--wrapper[_ngcontent-%COMP%]     .cust--mat--table.box--row--table.mat-mdc-table tbody tr td:nth-child(2), .referrals--wrapper[_ngcontent-%COMP%]     .cust--mat--table.box--row--table.mat-mdc-table thead tr th:nth-child(2){width:40%}.referrals--wrapper[_ngcontent-%COMP%]     .cust--mat--table.box--row--table.mat-mdc-table tbody tr td:last-child, .referrals--wrapper[_ngcontent-%COMP%]     .cust--mat--table.box--row--table.mat-mdc-table thead tr th:last-child{width:20%}}"]})}return a})();var mt=p(7278),v=p(9039),ct=p(4511),dt=p(6555),ht=p(152);const S=()=>["/support-team/referrals"];function ft(a,s){if(1&a&&(t.j41(0,"div",40),t.EFF(1),t.k0s()),2&a){const e=t.XpG();t.R7$(),t.SpI(" ",e.validationMessages.required("an email address")," ")}}function ut(a,s){if(1&a&&(t.j41(0,"div",40),t.EFF(1),t.k0s()),2&a){const e=t.XpG();t.R7$(),t.SpI(" ",e.validationMessages.validEmail," ")}}function gt(a,s){if(1&a&&(t.j41(0,"div",40),t.EFF(1),t.k0s()),2&a){const e=t.XpG();t.R7$(),t.SpI(" ",e.validationMessages.required("your First Name")," ")}}function Ft(a,s){if(1&a&&(t.j41(0,"div",40),t.EFF(1),t.k0s()),2&a){const e=t.XpG();t.R7$(),t.SpI(" ",e.validationMessages.alphabeticChar("First Name")," ")}}function vt(a,s){if(1&a&&(t.j41(0,"div",40),t.EFF(1),t.k0s()),2&a){const e=t.XpG();t.R7$(),t.SpI(" ",e.validationMessages.required("your Last Name")," ")}}function bt(a,s){if(1&a&&(t.j41(0,"div",40),t.EFF(1),t.k0s()),2&a){const e=t.XpG();t.R7$(),t.SpI(" ",e.validationMessages.alphabeticChar("Last Name")," ")}}function Ct(a,s){if(1&a&&(t.j41(0,"div",40),t.EFF(1),t.k0s()),2&a){const e=t.XpG();t.R7$(),t.SpI(" ",e.validationMessages.requiredDropdown("Appointment Date")," ")}}function Et(a,s){if(1&a&&(t.j41(0,"option",41),t.EFF(1),t.k0s()),2&a){const e=s.$implicit;t.Y8G("value",e),t.R7$(),t.JRh(e)}}function kt(a,s){if(1&a&&(t.j41(0,"div",40),t.EFF(1),t.k0s()),2&a){const e=t.XpG();t.R7$(),t.SpI(" ",e.validationMessages.requiredDropdown("Practice Location")," ")}}function Rt(a,s){if(1&a&&(t.j41(0,"option",41),t.EFF(1),t.k0s()),2&a){const e=s.$implicit;t.Y8G("value",e.id),t.R7$(),t.JRh(e.name)}}function At(a,s){if(1&a&&(t.j41(0,"div",40),t.EFF(1),t.k0s()),2&a){const e=t.XpG();t.R7$(),t.SpI(" ",e.validationMessages.requiredDropdown("Therapist")," ")}}function yt(a,s){if(1&a&&(t.j41(0,"div",40),t.EFF(1),t.k0s()),2&a){const e=t.XpG();t.R7$(),t.SpI(" ",e.validationMessages.required("Doctor Name")," ")}}function jt(a,s){if(1&a&&(t.j41(0,"div",40),t.EFF(1),t.k0s()),2&a){const e=t.XpG();t.R7$(),t.SpI(" ",e.validationMessages.required("a valid phone number")," ")}}function Nt(a,s){if(1&a&&(t.j41(0,"div",40),t.EFF(1),t.k0s()),2&a){const e=t.XpG();t.R7$(),t.SpI(" ",e.validationMessages.invalidPhoneNumber," ")}}function _t(a,s){if(1&a&&(t.j41(0,"div",40),t.EFF(1),t.k0s()),2&a){const e=t.XpG();t.R7$(),t.SpI(" ",e.validationMessages.required("Street Name")," ")}}function Dt(a,s){if(1&a&&(t.j41(0,"option",42),t.EFF(1),t.k0s()),2&a){const e=s.$implicit;t.FS9("value",e.state_code),t.R7$(),t.JRh(e.state)}}function St(a,s){if(1&a&&(t.j41(0,"div",40),t.EFF(1),t.k0s()),2&a){const e=t.XpG();t.R7$(),t.SpI(" ",e.validationMessages.requiredDropdown("State")," ")}}function It(a,s){if(1&a&&(t.j41(0,"option",41),t.EFF(1),t.k0s()),2&a){const e=s.$implicit;t.FS9("value",e.city),t.R7$(),t.JRh(e.city)}}function xt(a,s){if(1&a&&(t.j41(0,"div",40),t.EFF(1),t.k0s()),2&a){const e=t.XpG();t.R7$(),t.SpI(" ",e.validationMessages.requiredDropdown("City")," ")}}function wt(a,s){if(1&a&&(t.j41(0,"div",40),t.EFF(1),t.k0s()),2&a){const e=t.XpG();t.R7$(),t.SpI(" ",e.validationMessages.required("a valid postal code")," ")}}function $t(a,s){if(1&a){const e=t.RV6();t.j41(0,"button",43),t.bIt("click",function(){t.eBV(e);const n=t.XpG();return t.Njj(n.createAppointment())}),t.EFF(1," Invite "),t.k0s()}if(2&a){const e=t.XpG();t.Y8G("disabled",!e.createAppointmentForm.valid||e.clickOnCreateAppointment)}}function Gt(a,s){if(1&a){const e=t.RV6();t.j41(0,"button",43),t.bIt("click",function(){t.eBV(e);const n=t.XpG();return t.Njj(n.updateAppointment())}),t.EFF(1," Update "),t.k0s()}if(2&a){const e=t.XpG();t.Y8G("disabled",!e.createAppointmentForm.valid||e.clickOnUpdateAppointment)}}let I=(()=>{class a{constructor(e,o,n,r,m,i){this.dialog=e,this.authService=o,this.commonService=n,this.fb=r,this.router=m,this.activatedRoute=i,this.regexPattern=v.y,this.validationMessages=E.q,this.practiceLocationData=h.WM,this.orderBy={updatedAt:-1},this.options=[],this.therapistList=[],this.convertPhoneNumber="",this.todayDate=new Date,this.states=ct.G,this.cities=[],this.existingEmail=new l.MJ(""),this.patientData={_id:"",firstName:"",lastName:""},this.isEmailExist=!1,this.clickOnCreateAppointment=!1,this.clickOnUpdateAppointment=!1,this.refferalId="",this.isViewAppointment=!1,this.activatedRoute.params.subscribe(c=>{this.refferalId=c.refferalId})}ngOnInit(){this.initializeAdminProfile(),this.getTherapistList(),this.getEmail(),this.refferalId&&this.getAppointmentDataById(this.refferalId)}initializeAdminProfile(){this.createAppointmentForm=this.fb.group({firstName:["",[l.k0.required,l.k0.pattern(v.y.alphabetic)]],lastName:["",[l.k0.required,l.k0.pattern(v.y.alphabetic)]],email:["",[l.k0.required,l.k0.email]],appointmentDate:["",[l.k0.required]],phoneNumber:["",[l.k0.required,l.k0.pattern(v.y.usPhoneNumber)]],practiceLocation:["",[l.k0.required]],therapist:["",[l.k0.required]],referredBy:["",[l.k0.required]],streetName:["",[l.k0.required]],appartment:[""],state:["",[l.k0.required]],city:["",[l.k0.required]],zipcode:["",[l.k0.pattern(v.y.onlyNumeric)]]})}getTherapistList(){var e=this;return(0,u.A)(function*(){let o={query:{role:"therapist",status:"Active"},fields:{_id:1,firstName:1,lastName:1},order:e.orderBy};yield e.authService.apiRequest("post","admin/getTherapistList",o).subscribe(function(){var n=(0,u.A)(function*(r){r.data&&r.data.therapistData&&(e.therapistList=r.data.therapistData)});return function(r){return n.apply(this,arguments)}}())})()}onPhoneInputChange(e){this.convertPhoneNumber=this.commonService.formatPhoneNumber(e.target.value)}onStateChange(e){this.createAppointmentForm.controls.city.setValue(""),this.getCitiesByState(e)}getCitiesByState(e){return this.cities=dt.z.filter(o=>o.state_code===e)}createAppointment(){var e=this;if(this.createAppointmentForm.valid){this.clickOnCreateAppointment=!0,this.commonService.showLoader();let o=this.createAppointmentForm.value;o.isEmailExist=this.isEmailExist,o.patientId=this.isEmailExist?this.patientData._id:"",console.log("bodyData>>",o),this.authService.apiRequest("post","referral/createAppointment",o).subscribe(function(){var n=(0,u.A)(function*(r){e.commonService.openSnackBar(r.message,"SUCCESS"),e.commonService.hideLoader(),e.router.navigate(["/support-team/referrals"])});return function(r){return n.apply(this,arguments)}}(),n=>{this.commonService.hideLoader(),console.log("createAppointment Err>>>",n),n.error?.error&&this.commonService.openSnackBar(n.error?.message,"ERROR"),this.router.navigate(["/support-team/referrals"])})}}getEmail(){this.createAppointmentForm.controls.email.valueChanges.pipe((0,ht.B)(300)).subscribe(e=>{this.checkExistingEmail(e)})}checkExistingEmail(e){this.isEmailExist=!1,this.createAppointmentForm.controls.firstName.setValue(""),this.createAppointmentForm.controls.lastName.setValue(""),this.patientData={_id:"",firstName:"",lastName:""},e&&this.regexPattern.email.test(e)&&this.authService.apiRequest("post","patients/getPatientData",{query:{email:e},fields:{firstName:1,lastName:1}}).subscribe(n=>{n.data.patientData&&null!=n.data.patientData&&(this.patientData=n.data.patientData,this.createAppointmentForm.controls.firstName.setValue(this.patientData.firstName),this.createAppointmentForm.controls.lastName.setValue(this.patientData.lastName),this.isEmailExist=!0)},n=>{})}successModal(){this.dialog.open(mt.c,{panelClass:"custom-alert-container",data:{successNote:"Your invite has been sent successfully!"}})}onChange(e){console.log(this.selectedValue=e.value)}getAppointmentDataById(e){this.authService.apiRequest("post","referral/getAppointmentDataById",{referralId:e}).subscribe(n=>{if(!n.error&&n.data.length){let r=n.data[0];this.createAppointmentForm.controls.firstName.setValue(r.patient.firstName),this.createAppointmentForm.controls.lastName.setValue(r.patient.lastName),this.createAppointmentForm.controls.email.setValue(r.patient.email),this.createAppointmentForm.controls.firstName.disable(),this.createAppointmentForm.controls.lastName.disable(),this.createAppointmentForm.controls.email.disable(),this.createAppointmentForm.controls.appointmentDate.setValue(r.appointment.appointmentDate),this.createAppointmentForm.controls.practiceLocation.setValue(r.appointment.practiceLocation),this.createAppointmentForm.controls.therapist.setValue(r.therapist._id),this.createAppointmentForm.controls.referredBy.setValue(r.referredBy),this.createAppointmentForm.controls.phoneNumber.setValue(r.phone),this.createAppointmentForm.controls.streetName.setValue(r.streetName),this.createAppointmentForm.controls.appartment.setValue(r.appartment),this.createAppointmentForm.controls.state.setValue(r.state),this.createAppointmentForm.controls.city.setValue(r.city),this.createAppointmentForm.controls.zipcode.setValue(r.zipcode),"Pending"!=r.appointment.status&&(this.isViewAppointment=!0,this.createAppointmentForm.disable())}},n=>{})}updateAppointment(){var e=this;if(this.createAppointmentForm.valid){this.clickOnUpdateAppointment=!0,this.commonService.showLoader();let o=this.createAppointmentForm.value;o.refferalId=this.refferalId,this.authService.apiRequest("post","referral/updateAppointment",o).subscribe(function(){var n=(0,u.A)(function*(r){e.commonService.openSnackBar(r.message,"SUCCESS"),e.commonService.hideLoader(),e.router.navigate(["/support-team/referrals"])});return function(r){return n.apply(this,arguments)}}(),n=>{this.commonService.hideLoader(),n.error?.error&&this.commonService.openSnackBar(n.error?.message,"ERROR"),this.router.navigate(["/support-team/referrals"])})}}static#t=this.\u0275fac=function(o){return new(o||a)(t.rXU(k.bZ),t.rXU(R.u),t.rXU(A.h),t.rXU(l.ok),t.rXU(f.Ix),t.rXU(f.nX))};static#e=this.\u0275cmp=t.VBU({type:a,selectors:[["app-create-appointment"]],decls:140,vars:32,consts:[["picker",""],[1,"container-fluid","book--appointment--wrapper"],[1,"row"],[1,"col-12","d-flex","align-items-center","mb-2"],["mat-stroked-button","","color","primary",1,"me-3","back--btn",3,"routerLink"],[1,"material-symbols-outlined","flex-shrink-0","m-0"],[1,"mb-0","clr--1F2F3E","fw-600","d-flex","flex-wrap"],[1,"me-3"],[1,"card","m-0"],[3,"formGroup"],[1,"col-12","col-lg-6","col-md-6"],[1,"form-group"],[1,"col-form-label","fw-600"],[1,"clr--DF0404","ms-1"],["type","email","placeholder","Enter Email","formControlName","email",1,"form-control"],["class","text text-danger mt-1",4,"ngIf"],["type","text","placeholder","Enter First Name","formControlName","firstName","maxlength","35",1,"form-control"],["type","text","placeholder","Enter Last Name","formControlName","lastName","maxlength","35",1,"form-control"],[1,"input-group"],[1,"w-100","am--datepicker"],["formControlName","appointmentDate","placeholder","Select Date","matInput","",3,"min","matDatepicker"],["matIconSuffix","",3,"for"],["aria-label","Default select example","formControlName","practiceLocation",1,"form-select","form-control"],["value","","selected",""],[3,"value",4,"ngFor","ngForOf"],["aria-label","Default select example","formControlName","therapist",1,"form-select","form-control"],["type","text","placeholder","Enter Doctor Name","formControlName","referredBy","maxlength","200",1,"form-control"],["type","text","placeholder","Enter Phone Number","formControlName","phoneNumber","maxlength","15",1,"form-control",3,"input","value"],[1,"col-12"],[1,"text-uppercase","font-16","fw-700","mb-2","mt-4"],["type","text","placeholder","Enter Address","formControlName","streetName","maxlength","1000",1,"form-control"],["type","text","placeholder","Enter Apartment #","formControlName","appartment","maxlength","200",1,"form-control"],["aria-label","Default select example","formControlName","state",1,"form-select","form-control",3,"ngModelChange"],["selected","","value",""],[3,"value","selected",4,"ngFor","ngForOf"],["aria-label","Default select example","formControlName","city",1,"form-select","form-control"],["type","text","placeholder","Enter Postal Code","formControlName","zipcode","maxlength","6",1,"form-control"],[1,"d-flex","align-items-center","justify-content-end","w-100","footer--btns"],["mat-stroked-button","","color","primary",1,"m-1",3,"routerLink"],["mat-raised-button","","color","primary","class","m-1",3,"disabled","click",4,"ngIf"],[1,"text","text-danger","mt-1"],[3,"value"],[3,"value","selected"],["mat-raised-button","","color","primary",1,"m-1",3,"click","disabled"]],template:function(o,n){if(1&o){const r=t.RV6();t.j41(0,"div",1)(1,"div",2)(2,"div",3)(3,"button",4)(4,"mat-icon",5),t.EFF(5," keyboard_backspace "),t.k0s()(),t.j41(6,"h3",6)(7,"span",7),t.EFF(8),t.k0s()()()(),t.j41(9,"div",8)(10,"form",9)(11,"div",2)(12,"div",10)(13,"div",11)(14,"label",12),t.EFF(15,"Email "),t.j41(16,"span",13),t.EFF(17," * "),t.k0s()(),t.nrm(18,"input",14),t.DNE(19,ft,2,1,"div",15)(20,ut,2,1,"div",15),t.k0s()(),t.j41(21,"div",10)(22,"div",11)(23,"label",12),t.EFF(24,"First Name "),t.j41(25,"span",13),t.EFF(26," * "),t.k0s()(),t.nrm(27,"input",16),t.DNE(28,gt,2,1,"div",15)(29,Ft,2,1,"div",15),t.k0s()(),t.j41(30,"div",10)(31,"div",11)(32,"label",12),t.EFF(33,"Last Name "),t.j41(34,"span",13),t.EFF(35," * "),t.k0s()(),t.nrm(36,"input",17),t.DNE(37,vt,2,1,"div",15)(38,bt,2,1,"div",15),t.k0s()(),t.j41(39,"div",10)(40,"div",11)(41,"label",12),t.EFF(42,"Appointment Date"),t.j41(43,"span",13),t.EFF(44," * "),t.k0s()(),t.j41(45,"div",18)(46,"mat-form-field",19),t.nrm(47,"input",20)(48,"mat-datepicker-toggle",21)(49,"mat-datepicker",null,0),t.k0s()(),t.DNE(51,Ct,2,1,"div",15),t.k0s()(),t.j41(52,"div",10)(53,"div",11)(54,"label",12),t.EFF(55,"Practice Location"),t.j41(56,"span",13),t.EFF(57," * "),t.k0s()(),t.j41(58,"select",22)(59,"option",23),t.EFF(60,"Select"),t.k0s(),t.DNE(61,Et,2,2,"option",24),t.k0s(),t.DNE(62,kt,2,1,"div",15),t.k0s()(),t.j41(63,"div",10)(64,"div",11)(65,"label",12),t.EFF(66,"Therapist"),t.j41(67,"span",13),t.EFF(68," * "),t.k0s()(),t.j41(69,"select",25)(70,"option",23),t.EFF(71,"Select"),t.k0s(),t.DNE(72,Rt,2,2,"option",24),t.k0s(),t.DNE(73,At,2,1,"div",15),t.k0s()(),t.j41(74,"div",10)(75,"div",11)(76,"label",12),t.EFF(77,"Referred By "),t.j41(78,"span",13),t.EFF(79," * "),t.k0s()(),t.nrm(80,"input",26),t.DNE(81,yt,2,1,"div",15),t.k0s()(),t.j41(82,"div",10)(83,"div",11)(84,"label",12),t.EFF(85,"Phone Number"),t.j41(86,"span",13),t.EFF(87," * "),t.k0s()(),t.j41(88,"input",27),t.bIt("input",function(i){return t.eBV(r),t.Njj(n.onPhoneInputChange(i))}),t.k0s(),t.DNE(89,jt,2,1,"div",15)(90,Nt,2,1,"div",15),t.k0s()(),t.j41(91,"div",28)(92,"h2",29),t.EFF(93,"Doctor's Office Address"),t.k0s()(),t.j41(94,"div",28)(95,"div",11)(96,"label",12),t.EFF(97,"Street Name "),t.j41(98,"span",13),t.EFF(99," * "),t.k0s()(),t.nrm(100,"input",30),t.DNE(101,_t,2,1,"div",15),t.k0s()(),t.j41(102,"div",10)(103,"div",11)(104,"label",12),t.EFF(105,"Apartment # "),t.k0s(),t.nrm(106,"input",31),t.k0s()(),t.j41(107,"div",10)(108,"div",11)(109,"label",12),t.EFF(110,"State "),t.j41(111,"span",13),t.EFF(112," * "),t.k0s()(),t.j41(113,"select",32),t.bIt("ngModelChange",function(i){return t.eBV(r),t.Njj(n.onStateChange(i))}),t.j41(114,"option",33),t.EFF(115,"Select State"),t.k0s(),t.DNE(116,Dt,2,2,"option",34),t.k0s(),t.DNE(117,St,2,1,"div",15),t.k0s()(),t.j41(118,"div",10)(119,"div",11)(120,"label",12),t.EFF(121,"City "),t.j41(122,"span",13),t.EFF(123," * "),t.k0s()(),t.j41(124,"select",35)(125,"option",33),t.EFF(126,"Select City"),t.k0s(),t.DNE(127,It,2,2,"option",24),t.k0s(),t.DNE(128,xt,2,1,"div",15),t.k0s()(),t.j41(129,"div",10)(130,"div",11)(131,"label",12),t.EFF(132,"Postal Code"),t.k0s(),t.nrm(133,"input",36),t.DNE(134,wt,2,1,"div",15),t.k0s()()()()(),t.j41(135,"div",37)(136,"button",38),t.EFF(137," Cancel "),t.k0s(),t.DNE(138,$t,2,1,"button",39)(139,Gt,2,1,"button",39),t.k0s()()}if(2&o){const r=t.sdS(50);t.R7$(3),t.Y8G("routerLink",t.lJ4(30,S)),t.R7$(5),t.SpI("",n.refferalId?"Edit":"Create"," Appointment "),t.R7$(2),t.Y8G("formGroup",n.createAppointmentForm),t.R7$(9),t.Y8G("ngIf",n.createAppointmentForm.controls.email.touched&&n.createAppointmentForm.controls.email.hasError("required")),t.R7$(),t.Y8G("ngIf",n.createAppointmentForm.controls.email.touched&&n.createAppointmentForm.controls.email.hasError("email")),t.R7$(8),t.Y8G("ngIf",n.createAppointmentForm.controls.firstName.touched&&n.createAppointmentForm.controls.firstName.hasError("required")),t.R7$(),t.Y8G("ngIf",n.createAppointmentForm.controls.firstName.touched&&n.createAppointmentForm.controls.firstName.hasError("pattern")),t.R7$(8),t.Y8G("ngIf",n.createAppointmentForm.controls.lastName.touched&&n.createAppointmentForm.controls.lastName.hasError("required")),t.R7$(),t.Y8G("ngIf",n.createAppointmentForm.controls.lastName.touched&&n.createAppointmentForm.controls.lastName.hasError("pattern")),t.R7$(9),t.Y8G("min",n.todayDate)("matDatepicker",r),t.R7$(),t.Y8G("for",r),t.R7$(3),t.Y8G("ngIf",n.createAppointmentForm.controls.appointmentDate.touched&&n.createAppointmentForm.controls.appointmentDate.hasError("required")),t.R7$(10),t.Y8G("ngForOf",n.practiceLocationData),t.R7$(),t.Y8G("ngIf",n.createAppointmentForm.controls.practiceLocation.touched&&n.createAppointmentForm.controls.practiceLocation.hasError("required")),t.R7$(10),t.Y8G("ngForOf",n.therapistList),t.R7$(),t.Y8G("ngIf",n.createAppointmentForm.controls.therapist.touched&&n.createAppointmentForm.controls.therapist.hasError("required")),t.R7$(8),t.Y8G("ngIf",n.createAppointmentForm.controls.referredBy.touched&&n.createAppointmentForm.controls.referredBy.hasError("required")),t.R7$(7),t.Y8G("value",n.convertPhoneNumber),t.R7$(),t.Y8G("ngIf",n.createAppointmentForm.controls.phoneNumber.touched&&n.createAppointmentForm.controls.phoneNumber.hasError("required")),t.R7$(),t.Y8G("ngIf",n.createAppointmentForm.controls.phoneNumber.touched&&n.createAppointmentForm.controls.phoneNumber.hasError("pattern")),t.R7$(11),t.Y8G("ngIf",n.createAppointmentForm.controls.streetName.touched&&n.createAppointmentForm.controls.streetName.hasError("required")),t.R7$(15),t.Y8G("ngForOf",n.states),t.R7$(),t.Y8G("ngIf",n.createAppointmentForm.controls.state.touched&&n.createAppointmentForm.controls.state.hasError("required")),t.R7$(10),t.Y8G("ngForOf",n.cities),t.R7$(),t.Y8G("ngIf",n.createAppointmentForm.controls.city.touched&&n.createAppointmentForm.controls.city.hasError("required")),t.R7$(6),t.Y8G("ngIf",n.createAppointmentForm.controls.zipcode.touched&&n.createAppointmentForm.controls.zipcode.hasError("pattern")),t.R7$(2),t.Y8G("routerLink",t.lJ4(31,S)),t.R7$(2),t.Y8G("ngIf",!n.refferalId),t.R7$(),t.Y8G("ngIf",n.refferalId&&!n.isViewAppointment)}},dependencies:[g.Sq,g.bT,f.Wk,l.qT,l.xH,l.y7,l.me,l.wz,l.BC,l.cb,l.tU,l.j4,l.JD,y.$z,F.Vh,F.bZ,F.bU,b.rl,b.yw,j.An,N.fg]})}return a})();var Tt=p(3078),Mt=p(8778);const Lt=[{path:"dashboard",component:G.$},{path:"appointments",component:w._},{path:"manage-profile",component:T.O},{path:"appointment-details/:appointmentId",component:$.R},{path:"intake-form",children:[{path:"step-1/:appId",component:M.n},{path:"step-2/:appId",component:L.S},{path:"step-3/:appId",component:B.H},{path:"step-4/:appId",component:V.E},{path:"step-5/:appId",component:Y.J}]},{path:"patients",children:[{path:"",component:O.G},{path:"patient-details/:userId",component:X.H},{path:"patient-profile/:userId",component:P.m}]},{path:"referrals",children:[{path:"",component:lt},{path:"appointment",component:I},{path:"appointment/:refferalId",component:I}]},{path:"conversations",component:Tt.u},{path:"conversations-chat",component:Mt.S}];let Bt=(()=>{class a{static#t=this.\u0275fac=function(o){return new(o||a)};static#e=this.\u0275mod=t.$C({type:a});static#n=this.\u0275inj=t.G2t({imports:[f.iI.forChild(Lt),f.iI]})}return a})(),Vt=(()=>{class a{static#t=this.\u0275fac=function(o){return new(o||a)};static#e=this.\u0275mod=t.$C({type:a});static#n=this.\u0275inj=t.G2t({imports:[g.MD,Bt,l.YN,l.X1,x.G]})}return a})()}}]);