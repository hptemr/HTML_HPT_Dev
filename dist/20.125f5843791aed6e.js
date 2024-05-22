"use strict";(self.webpackChunkcion_angular_16=self.webpackChunkcion_angular_16||[]).push([[20],{7020:(X,C,r)=>{r.d(C,{$:()=>V});var g=r(4523),f=r(6695),u=r(2042),p=r(9159),m=r(446),t=r(4438),E=r(8617),F=r(4006),v=r(4710),A=r(6992),R=r(3390),b=r(758),h=r(177),_=r(9417),D=r(6911),x=r(8834),y=r(9213);const O=()=>["/patient/book-appointment/step-1"],M=()=>[5,10,20],j=n=>["/support-team/appointment-details/",n];function P(n,s){if(1&n){const e=t.RV6();t.j41(0,"div",4)(1,"div",5)(2,"div",6)(3,"h3",7),t.EFF(4,"Appointments"),t.k0s(),t.j41(5,"button",8)(6,"mat-icon",9),t.EFF(7," add_circle "),t.k0s(),t.EFF(8," Book Appointment "),t.k0s()(),t.j41(9,"div",10)(10,"div",11)(11,"div",12)(12,"div",13)(13,"select",14)(14,"option",15),t.EFF(15,"Practice Location"),t.k0s(),t.j41(16,"option",16),t.EFF(17,"Hamilton PT at The Canyons"),t.k0s(),t.j41(18,"option",17),t.EFF(19,"Darby PT"),t.k0s(),t.j41(20,"option",18),t.EFF(21,"Corvallis PT"),t.k0s(),t.j41(22,"option",19),t.EFF(23,"Stevi PT"),t.k0s(),t.j41(24,"option",20),t.EFF(25,"PT Specialists of Florence"),t.k0s(),t.j41(26,"option",21),t.EFF(27,"Frenchtown PT"),t.k0s(),t.j41(28,"option",22),t.EFF(29,"HNB"),t.k0s()()()(),t.j41(30,"div",12)(31,"div",13)(32,"select",14)(33,"option",15),t.EFF(34,"Appointment Status"),t.k0s(),t.j41(35,"option",16),t.EFF(36,"Accepted"),t.k0s(),t.j41(37,"option",17),t.EFF(38,"Reschedules"),t.k0s(),t.j41(39,"option",18),t.EFF(40,"Pending"),t.k0s(),t.j41(41,"option",19),t.EFF(42,"Declined"),t.k0s()()()(),t.j41(43,"div",12)(44,"div",13)(45,"div",23)(46,"input",24,0),t.mxI("ngModelChange",function(o){t.eBV(e);const a=t.XpG();return t.DH7(a.model,o)||(a.model=o),t.Njj(o)}),t.k0s(),t.j41(48,"button",25),t.bIt("click",function(){t.eBV(e);const o=t.sdS(47);return t.Njj(o.toggle())}),t.nrm(49,"i",26),t.k0s()()()(),t.j41(50,"div",12)(51,"div",13)(52,"button",27),t.EFF(53,"Reset Filter"),t.k0s()()()()()(),t.j41(54,"div",28)(55,"div",29),t.bIt("click",function(){t.eBV(e);const o=t.XpG();return t.Njj(o.showDayTwo())}),t.nrm(56,"img",30),t.j41(57,"p",31),t.EFF(58,"Currently there are no appointments to show!"),t.k0s(),t.j41(59,"p",32),t.EFF(60,"Kindly click on \u201cBook Appointment\u201d to schedule a new appointment."),t.k0s()()()()}if(2&n){const e=t.XpG();t.R7$(5),t.Y8G("routerLink",t.lJ4(2,O)),t.R7$(41),t.R50("ngModel",e.model)}}function w(n,s){if(1&n&&(t.j41(0,"option",50),t.EFF(1),t.k0s()),2&n){const e=s.$implicit;t.FS9("value",e),t.R7$(),t.JRh(e)}}function k(n,s){if(1&n&&(t.j41(0,"option",50),t.EFF(1),t.k0s()),2&n){const e=s.$implicit;t.FS9("value",e),t.R7$(),t.JRh(e)}}function T(n,s){1&n&&(t.j41(0,"th",51),t.EFF(1," Appointment # "),t.k0s())}function S(n,s){if(1&n&&(t.j41(0,"td",52)(1,"div",53)(2,"div",54),t.nrm(3,"img",55),t.k0s(),t.j41(4,"div")(5,"p",56),t.EFF(6,"John Walter"),t.k0s(),t.j41(7,"p",57)(8,"span",58),t.EFF(9,"Patient"),t.k0s(),t.EFF(10),t.k0s(),t.j41(11,"p",57)(12,"span",58),t.EFF(13,"Appointment#"),t.k0s(),t.EFF(14),t.k0s()()()()),2&n){const e=s.$implicit;t.R7$(10),t.SpI(" ",e.patientName,""),t.R7$(4),t.SpI(" ",e.appointmentId,"")}}function L(n,s){1&n&&(t.j41(0,"th",59),t.EFF(1," Appointment Date & Time "),t.k0s())}function I(n,s){if(1&n&&(t.j41(0,"td",52),t.EFF(1),t.nI1(2,"date"),t.k0s()),2&n){const e=s.$implicit;t.R7$(),t.SpI(" ",t.i5U(2,1,e.appointmentDate,"EEE, MMM d, y h:mm a")," ")}}function B(n,s){1&n&&(t.j41(0,"th",60),t.EFF(1," Status "),t.k0s())}function $(n,s){if(1&n&&(t.j41(0,"td",52)(1,"p"),t.EFF(2),t.k0s()()),2&n){const e=s.$implicit;t.R7$(),t.ZvI("status ",e.statusFlag,""),t.R7$(),t.JRh(e.status)}}function N(n,s){1&n&&(t.j41(0,"th",60),t.EFF(1," Actions "),t.k0s())}function U(n,s){if(1&n&&(t.j41(0,"td",52)(1,"div",61)(2,"button",62)(3,"mat-icon",63),t.EFF(4,"visibility "),t.k0s()()()()),2&n){const e=s.$implicit;t.R7$(2),t.Y8G("routerLink",t.eq3(1,j,e.id))}}function G(n,s){1&n&&t.nrm(0,"tr",64)}function K(n,s){1&n&&t.nrm(0,"tr",65)}function W(n,s){if(1&n){const e=t.RV6();t.j41(0,"div",33)(1,"div",4)(2,"div",5)(3,"div",10)(4,"div",11)(5,"div",12)(6,"div",13)(7,"select",34),t.bIt("change",function(o){t.eBV(e);const a=t.XpG();return t.Njj(a.searchRecords("practiceLocations",o))}),t.j41(8,"option",15),t.EFF(9,"Practice Location"),t.k0s(),t.DNE(10,w,2,2,"option",35),t.k0s()()(),t.j41(11,"div",12)(12,"div",13)(13,"select",34),t.bIt("change",function(o){t.eBV(e);const a=t.XpG();return t.Njj(a.searchRecords("status",o))}),t.j41(14,"option",15),t.EFF(15,"Appointment Status"),t.k0s(),t.DNE(16,k,2,2,"option",35),t.k0s()()(),t.j41(17,"div",12)(18,"div",13)(19,"div",23)(20,"input",24,0),t.mxI("ngModelChange",function(o){t.eBV(e);const a=t.XpG();return t.DH7(a.model,o)||(a.model=o),t.Njj(o)}),t.k0s(),t.j41(22,"button",25),t.bIt("click",function(){t.eBV(e);const o=t.sdS(21);return t.Njj(o.toggle())}),t.nrm(23,"i",26),t.k0s()()()(),t.j41(24,"div",12)(25,"div",13)(26,"button",27),t.EFF(27,"Reset Filter"),t.k0s()()()()()(),t.j41(28,"div",36)(29,"div",37)(30,"table",38),t.bIt("matSortChange",function(o){t.eBV(e);const a=t.XpG();return t.Njj(a.announceSortChange(o))}),t.qex(31,39),t.DNE(32,T,2,0,"th",40)(33,S,15,2,"td",41),t.bVm(),t.qex(34,42),t.DNE(35,L,2,0,"th",43)(36,I,3,4,"td",41),t.bVm(),t.qex(37,44),t.DNE(38,B,2,0,"th",45)(39,$,3,4,"td",41),t.bVm(),t.qex(40,46),t.DNE(41,N,2,0,"th",45)(42,U,5,3,"td",41),t.bVm(),t.DNE(43,G,1,0,"tr",47)(44,K,1,0,"tr",48),t.k0s(),t.nrm(45,"mat-paginator",49),t.k0s()()()()}if(2&n){const e=t.XpG();t.R7$(10),t.Y8G("ngForOf",e.practiceLocations),t.R7$(6),t.Y8G("ngForOf",e.appointmentStatus),t.R7$(4),t.R50("ngModel",e.model),t.R7$(10),t.Y8G("dataSource",e.appointmentsList),t.R7$(13),t.Y8G("matHeaderRowDef",e.displayedColumns),t.R7$(),t.Y8G("matRowDefColumns",e.displayedColumns),t.R7$(),t.Y8G("pageSizeOptions",t.lJ4(7,M))}}const q=[];let V=(()=>{class n{constructor(e,i,o,a,l,d){this._liveAnnouncer=e,this.dialog=i,this.router=o,this.authService=a,this.commonService=l,this.adminService=d,this.displayedColumns=["name","appointmentDate","status","action"],this.dataSource=new p.I6(q),this.orderBy={createdAt:-1},this.whereCond={},this.dayTwo=!1,this.dayOne=!0,this.isAppointmentsList=!0,this.totalCount=0,this.pageIndex=0,this.pageSize=m.T0,this.pageSizeOptions=m.Xe,this.searchQuery="",this.practiceLocations=m.WM,this.appointmentStatus=m.K0}ngOnInit(){this.getAppointmentList("")}ngAfterViewInit(){this.dataSource.sort=this.sort,this.dataSource.paginator=this.paginator}searchRecords(e,i){"practiceLocations"==e&&Object.assign(this.whereCond,"All"!=i.target.value?{practiceLocations:{$in:i.target.value}}:{practiceLocation:{$ne:i.target.value}}),"status"==e&&Object.assign(this.whereCond,"All"!=i.target.value?{status:{$in:i.target.value}}:{status:{$ne:i.target.value}}),this.getAppointmentList()}getAppointmentList(e=""){var i=this;return(0,g.A)(function*(){""==e&&i.commonService.showLoader(),console.log(">>>whereCond>>>>",i.whereCond);let o={query:i.whereCond,fields:{firstName:1,lastName:1,email:1,status:1,practiceLocation:1},order:i.orderBy,limit:i.pageSize,offset:i.pageIndex*i.pageSize};yield i.authService.apiRequest("post","appointment/getAppointmentList",o).subscribe(function(){var a=(0,g.A)(function*(l){i.commonService.hideLoader(),i.totalCount=l.data.totalCount;let d=[];yield l.data.appointmentList.map(c=>{let z={id:c._id,appointmentId:c.appointmentId,createdAt:c.createdAt,appointmentDate:c.updatedAt,status:c.status,statusFlag:c.status.charAt(0).toLowerCase()+c.status.slice(1),patientName:c.patientId?.firstName+" "+c.patientId?.lastName};d.push(z)}),l.data&&l.data.appointmentList&&l.data.appointmentList.length>0&&(i.dayTwo=!0,i.dayOne=!1,i.appointmentsList=new p.I6(d)),i.isAppointmentsList=i.totalCount>0});return function(l){return a.apply(this,arguments)}}())})()}resetFilter(){this.totalCount=0,this.pageIndex=0,this.pageSize=m.T0,this.pageSizeOptions=m.Xe,this.searchQuery="",this.getAppointmentList("reset")}handlePageEvent(e){this.pageSize=e.pageSize,this.pageIndex=e.pageIndex,this.getAppointmentList()}announceSortChange(e){this._liveAnnouncer.announce(e.direction?`Sorted ${e.direction}ending`:"Sorting cleared")}showDayTwo(){this.dayTwo=!0,this.dayOne=!1}static#t=this.\u0275fac=function(i){return new(i||n)(t.rXU(E.Ai),t.rXU(F.bZ),t.rXU(v.Ix),t.rXU(A.u),t.rXU(R.h),t.rXU(b.z))};static#e=this.\u0275cmp=t.VBU({type:n,selectors:[["app-appointment-requests"]],viewQuery:function(i,o){if(1&i&&(t.GBs(u.B4,5),t.GBs(f.iy,5)),2&i){let a;t.mGM(a=t.lsd())&&(o.sort=a.first),t.mGM(a=t.lsd())&&(o.paginator=a.first)}},decls:3,vars:2,consts:[["d","ngbDatepicker"],[1,"col-12","appointment--wrapper"],["class","card",4,"ngIf"],["class","col-12",4,"ngIf"],[1,"card"],[1,"card-header","pb-0"],[1,"col-12","d-flex","align-items-center","justify-content-between","mb-3"],[1,"mb-0","clr--1F2F3E"],["mat-raised-button","","color","primary",3,"routerLink"],[1,"material-symbols-outlined","flex-shrink-0"],[1,"col-12","mt-2"],[1,"row"],[1,"col-12","col-sm-6","col-lg-3"],[1,"form-group"],["aria-label","Default select example",1,"form-select","form-control"],["selected",""],["value","1"],["value","2"],["value","3"],["value","4"],["value","5"],["value","6"],["value","7"],[1,"input-group"],["placeholder","Appointment Date","name","dp","ngbDatepicker","",1,"form-control",3,"ngModelChange","ngModel"],["type","button",1,"btn","btn-outline-primary","py-0","px-3","calender--btn",3,"click"],["aria-hidden","true",1,"fa","fa-calendar-o","clr--fff"],["mat-stroked-button","","color","primary"],[1,"card-body","day--one--wrapper","d-flex","align-items-center","justify-content-center"],[1,"d-flex","flex-column","align-items-center","justify-content-center","w-100",3,"click"],["src","assets/images/ark/calendar-lg.png","alt","",1,"img-fluid","mb-4"],[1,"fw-700","clr--1F2F3E","text-center","mb-2"],[1,"clr--1F2F3E","text-center"],[1,"col-12"],["aria-label","Default select example",1,"form-select","form-control",3,"change"],[3,"value",4,"ngFor","ngForOf"],[1,"card-body"],[1,"col-12","cust--mat--table--wrapper"],["mat-table","","matSort","",1,"cust--mat--table","box--row--table",3,"matSortChange","dataSource"],["matColumnDef","name"],["mat-header-cell","","mat-sort-header","","sortActionDescription","Sort by number",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","appointmentDate"],["mat-header-cell","","mat-sort-header","","sortActionDescription","Sort by weight",4,"matHeaderCellDef"],["matColumnDef","status"],["mat-header-cell","","mat-sort-header","","sortActionDescription","Sort by symbol",4,"matHeaderCellDef"],["matColumnDef","action"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["showFirstLastButtons","","aria-label","Select page of periodic elements",3,"pageSizeOptions"],[3,"value"],["mat-header-cell","","mat-sort-header","","sortActionDescription","Sort by number"],["mat-cell",""],[1,"d-flex","align-items-center"],[1,"img--box","flex-shrink-0"],["src","assets/images/ark/user.png","alt","",1,"img-fluid"],[1,"mb-0","font-16","text-primary","clr--1F2F3E","fw-500"],[1,"mb-0","font-14","clr--1F2F3E"],[1,"fw-700"],["mat-header-cell","","mat-sort-header","","sortActionDescription","Sort by weight"],["mat-header-cell","","mat-sort-header","","sortActionDescription","Sort by symbol"],[1,"w-100","d-flex","align-items-center","justify-content-end"],["mat-button","",1,"flex-shrink-0","min-width-unset","search--fields",3,"routerLink"],[1,"material-symbols-outlined","flex-shrink-0","m-0","text-primary"],["mat-header-row",""],["mat-row",""]],template:function(i,o){1&i&&(t.j41(0,"div",1),t.DNE(1,P,61,3,"div",2)(2,W,46,8,"div",3),t.k0s()),2&i&&(t.R7$(),t.Y8G("ngIf",o.dayOne),t.R7$(),t.Y8G("ngIf",o.dayTwo))},dependencies:[h.Sq,h.bT,v.Wk,_.xH,_.y7,_.me,_.BC,_.vS,D.cw,x.$z,y.An,f.iy,u.B4,u.aE,p.Zl,p.tL,p.ji,p.cC,p.YV,p.iL,p.KS,p.$R,p.YZ,p.NB,h.vh],styles:[".day--one--wrapper[_ngcontent-%COMP%]{height:calc(100vh - 287px)}.day--one--wrapper[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:18px}  .cust--mat--table tbody tr td:last-child .mat-icon{height:24px;width:24px;font-size:24px}  .cust--mat--table tbody tr td .img--box{width:48px;height:48px;border-radius:100%;overflow:hidden;margin-right:15px}@media only screen and (max-width: 599px){.day--one--wrapper[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:80px}.day--one--wrapper[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:16px}.cust--mat--table--wrapper[_ngcontent-%COMP%]   .cust--mat--table.box--row--table.mat-mdc-table[_ngcontent-%COMP%]{width:800px}}@media only screen and (min-width: 600px) and (max-width: 979px){.day--one--wrapper[_ngcontent-%COMP%]{height:auto}.day--one--wrapper[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:80px;margin-top:70px}.day--one--wrapper[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:16px}}@media screen and (orientation: landscape) and (max-width: 850px){.day--one--wrapper[_ngcontent-%COMP%]{height:auto}.day--one--wrapper[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:80px;margin-top:70px}.day--one--wrapper[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:16px}.cust--mat--table--wrapper[_ngcontent-%COMP%]   .cust--mat--table.box--row--table.mat-mdc-table[_ngcontent-%COMP%]{width:900px}}"]})}return n})()}}]);