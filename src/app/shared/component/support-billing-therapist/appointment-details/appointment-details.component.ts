import { Component,OnInit, ViewChild } from '@angular/core';
import { SystemFollowupModalComponent } from '../system-followup-modal/system-followup-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { RescheduleAppointmentModalComponent } from 'src/app/shared/comman/reschedule-appointment-modal/reschedule-appointment-modal.component';
import { WriteCommentModalComponent } from 'src/app/shared/comman/write-comment-modal/write-comment-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap'; 
import { OnePageNoteModalComponent } from './one-page-note-modal/one-page-note-modal.component';
import { CaseNoteModalComponent } from '../notes/case-note-modal/case-note-modal.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { s3Details } from 'src/app/config';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
//import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';
import { DatePipe } from '@angular/common';
import { EFaxHistoryModalComponent } from './e-fax-history-modal/e-fax-history-modal.component';

export interface PeriodicElement {
  soap_note_type: string;  
  note_date: string;   
  createdBy: string;
  status: string;
  action: string;
}
const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-appointment-details', 
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.scss',
  providers: [DatePipe]
})
export class AppointmentDetailsComponent implements OnInit {
  appointmentId: string;
  statusFlag: string;
  app_data: any = [];
  appointmentData: any = [];
  appointment_flag: boolean = false
  profileImage: string = '';
  assign_therapist: string = '';
  public userId: string;
  public userRole: string;
  model: NgbDateStruct;
  appointment: any = null
  activeUserRoute = this.commonService.getLoggedInRoute()
  displayedColumns: string[] = ['soap_note_type', ' note_date', 'createdBy', 'status' ,'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  caseName:string =''
  patientId:string =''
  isBillingDetailsData:boolean=false
  billingDetailsData:any
  isAuthManagmentHistory:boolean=false
  authManagementHistory :any
  authExpireDate: string = 'NA'
  stCaseDetails:any
  isStCaseDetails:boolean=false
  authVisits: string = 'NA'
  patientCheckInCount:number = 0
  hasInitialExamPlanData:boolean=false
  initialExamPlanData:any
  todayDate:any = new Date();
  isAuthDateExpire:boolean=false
  isPOCExpire:boolean=false

  initialExaminationFlag:boolean=false
  dailyNoteFlag:boolean=true
  progressNoteFlag:boolean=true
  dischargeNoteFlag:boolean=true
  caseNoteFlag:boolean=false

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchValue = ""
  status = ""
  caseType = ""
  noteList = []
  dataLoading = false
  fromDate: any = ''
  toDate: any = ''
  addendumLength = 0
  actionStarted = false
  constructor(private _liveAnnouncer: LiveAnnouncer,public dialog: MatDialog,  private router: Router, private route: ActivatedRoute, public authService: AuthService, public commonService: CommonService, private datePipe: DatePipe) {
    //,private appointmentService: AppointmentService
    this.route.params.subscribe((params: Params) => {
      this.appointmentId = params['appointmentId'];
    })

  }
  
  ngOnInit() {
    //localStorage.removeItem('appointments');
    this.userId = this.authService.getLoggedInInfo('_id')
    this.userRole = this.authService.getLoggedInInfo('role')
    //this.appointmentService.currentAppointment.subscribe(appointment => this.appointment = appointment)

    // if (this.userRole == 'support_team') {
    //   this.isFormEditable = true
    // } else {
    //   this.appoitmentForm.disable()
    // }

    // this.getTherapistList()        
     this.getAppointmentDetails()    
     this.getAppointmentNotes()
    this.todayDate = this.datePipe.transform(new Date(this.todayDate), 'MM/dd/yyyy')!;
  }

  ngAfterViewInit() {
    this.commonService.moveScrollToTop()
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
 
  getAppointmentNotesOLD(){
    let reqVars = {
      appointmentId:this.appointmentId,
      caseType:this.caseType,
      searchValue:this.searchValue,
      status:this.status,
      fromDate:this.fromDate,
      toDate:this.toDate
    }
    this.dataLoading = true
    this.authService.apiRequest('post', 'soapNote/getAppointmentNoteList', reqVars).subscribe(async response => {
      this.dataLoading = false
      this.dataSource.data = response.data
      this.noteList = response.data
      this.actionStarted = false
      let dischargeFlag = false
      if(this.noteList.length>0){
        //console.log('noteList >>>',this.noteList)
        this.noteList.forEach((item:any) => {
          if(item.soap_note_type=='initial_examination' && item.status=='Finalized'){
            this.dailyNoteFlag=false
            this.progressNoteFlag=false
            this.initialExaminationFlag=true
          }
          if(item.soap_note_type=='daily_note' && item.status=='Finalized'){
            dischargeFlag=true
          }
          if(item.soap_note_type=='progress_note' && item.status=='Finalized'){
            dischargeFlag=true
          }

          // if(item.soap_note_type=='discharge_note' && item.status=='Finalized'){
          //   this.dischargeNoteFlag=true
          // }
        })
        //console.log('dailyNoteFlag >>>>> ',this.dailyNoteFlag,'progressNoteFlag >>>>> ',this.progressNoteFlag,'dischargeFlag >>>>> ',dischargeFlag);
        if(!this.dailyNoteFlag && !this.progressNoteFlag && dischargeFlag){
          this.dischargeNoteFlag=false
        }
        // if(this.dischargeNoteFlag){
        //   this.dailyNoteFlag=true
        //   this.progressNoteFlag=true
        //   this.initialExaminationFlag=false
        // }
      }
    })
  }

  getAppointmentNotes(){
      let reqVars = {
        app_query: { _id: this.appointmentId },
        appointmentId:this.appointmentId,
        caseType:this.caseType,
        searchValue:this.searchValue,
        status:this.status,
        fromDate:this.fromDate,
        toDate:this.toDate
      } 
      this.dataLoading = true
      this.authService.apiRequest('post', 'appointment/getAppointmentsAllCaseLists', reqVars).subscribe(async response => {
        this.dataLoading = false
        this.dataSource.data = response.data
        this.noteList = response.data
        this.actionStarted = false
        let dischargeFlag = false
        if(this.noteList.length>0){
          this.noteList.forEach((item:any) => {
            if(item.soap_note_type=='initial_examination' && item.status=='Finalized'){
              this.dailyNoteFlag=false
              this.progressNoteFlag=false
              this.initialExaminationFlag=true
            }
            if(item.soap_note_type=='daily_note' && item.status=='Finalized'){
              dischargeFlag=true
            }
            if(item.soap_note_type=='progress_note' && item.status=='Finalized'){
              dischargeFlag=true
            }
          })
          if(!this.dailyNoteFlag && !this.progressNoteFlag && dischargeFlag){
            this.dischargeNoteFlag=false
          }
        }
      })
  }

  async getAppointmentDetails() {
    if (this.appointmentId) {
      this.commonService.showLoader();
      let reqVars = {
        query: { _id: this.appointmentId },
        fields: {},
        patientFields: { _id: 1, firstName: 1, lastName: 1,dob:1, profileImage: 1,email:1,phoneNumber:1 },
        therapistFields: { _id: 1, firstName: 1, lastName: 1, profileImage: 1 }
      }

      await this.authService.apiRequest('post', 'appointment/getAppointmentDetails', reqVars).subscribe(async response => {
        this.commonService.hideLoader();
        if (response.data && response.data.appointmentData) {
          this.appointmentData = response.data.appointmentData;
          if(this.appointmentData.status=='Scheduled'){
            //this.initialExaminationFlag=false
            // this.dailyNoteFlag=false
            // this.progressNoteFlag=false
            // this.dischargeNoteFlag=false
            //this.caseNoteFlag=false
          }
          this.statusFlag = this.appointmentData.status.charAt(0).toLowerCase() + this.appointmentData.status.slice(1)
          this.profileImage = s3Details.awsS3Url + s3Details.userProfileFolderPath + this.appointmentData.patientId.profileImage
          this.appointment_flag = true;

          //this.appointmentService.addAppointment(this.appointmentId,this.appointmentData)
          //console.log('>>>>',this.-)
          // this.appointmentService.currentAppointment.subscribe(appointment => this.appointment = appointment)
          // if(this.appointment){
          //   //this.appointment.push(this.appointmentData)
          //   //this.appointmentService.changeAppointment(this.appointment)
          // }
          this.app_data[this.appointmentId] = this.appointmentData;
          //this.appointmentService.addAppointmentData(this.appointmentId,this.appointmentData)          
          
          //this.appointmentService.currentAppointment.subscribe(appointment => this.appointment = appointment)
          
          this.patientId = response.data.appointmentData?.patientId._id
          this.caseName = response.data.appointmentData?.caseName 
          this.getBillingDetails(this.patientId, this.caseName)  
          this.getAuthManagementHistory(this.patientId, this.caseName)  
          this.getStCaseDetails(this.patientId, this.caseName)
          this.getPatientCheckInCount(this.patientId, this.caseName)
          this.getInitialExamination()
        }
      })
    }
  }


  systemFollowup() {
    const dialogRef = this.dialog.open(SystemFollowupModalComponent,{
      panelClass: 'custom-alert-container', 
    });
  }

  rescheduleModal(){
    const dialogRef = this.dialog.open(RescheduleAppointmentModalComponent,{
      panelClass: ['custom-alert-container', 'rechedule--wrapper'],
    });
  }
  writeComment(){
    const dialogRef = this.dialog.open(WriteCommentModalComponent,{
      panelClass: 'custom-alert-container',
    });
  }

  caseNoteModal(id:string,action:string) {
    const dialogRef = this.dialog.open(CaseNoteModalComponent,{
       panelClass: [ 'custom-alert-container','modal--wrapper'],
      data : {
        appointmentId:this.appointmentId,
        id:id,
        action:action
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result=='SUCCESS'){
        this.getAppointmentNotes()
      }
    })

  }

  noteModal(soap_note_type:any,DOSDate:any) {
    let patientName = this.appointmentData.patientId.firstName+" "+ this.appointmentData.patientId.lastName
    const dialogRef = this.dialog.open(OnePageNoteModalComponent,{
      width:"960px",
      data : {
        patientName:patientName,
        appointmentDate:DOSDate,
        soap_note_type:soap_note_type,
        appointmentId:this.appointmentId,
        appointmentData:this.appointmentData,
        visits:this.patientCheckInCount+' of '+ this.authVisits+' visits'
      }
    });
  } 

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) { 
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  async patientCheckIn(event: any, obj: any) {
    if (event.source._checked != undefined) {
      let reqVars = {
        query: { _id: obj._id },
        updateInfo: {
          checkIn: event.source._checked,
          checkInBy: this.userId,
          appointmentStatus:'checkIn'
        }
      }
      await this.authService.apiRequest('post', 'appointment/updatePatientCheckIn', reqVars).subscribe(async response => {
        //this.getAppointmentList()     
      })
    }
  }

  navigateToappointmentDetails(path: string,id:string) {
    let patientId = this.appointmentData?.patientId?._id
    let adminRole = ['system-admin','practice-admin']
    if(patientId && adminRole.includes(this.commonService.getLoggedInRoute())){
      this.router.navigate([this.commonService.getLoggedInRoute()+'/patients/patient-details/'+patientId]);
    }else{
      this.router.navigate([this.commonService.getLoggedInRoute()+''+path+id]);
    }
  }

  searchRecords(){
    this.getAppointmentNotes()
  }

  onDateChange() {
    this.getAppointmentNotes()
  }

  deleteNote(appointmentId:any,noteType:any,addendumId:any){
    let type = ""
    if(addendumId){
      type = "Addendum"
    }
    const dialogRef = this.dialog.open(AlertComponent, {
      panelClass: 'custom-alert-container',
      data: {
        warningNote: 'Are you sure you want to delete this '+type+' '+this.soapNoteType(noteType)+'?'
      }
    });

    let reqUrl = 'soapNote/deleteSoapNote';
    if(noteType=='case_note'){
        reqUrl = 'soapNote/deleteCaseSoapNote';
    }

    dialogRef.afterClosed().subscribe(result => {
      if(result && !result.error){
        this.actionStarted = true
        let reqVars = {
          appointmentId:appointmentId,
          noteType:noteType,
          addendumId:addendumId
        }
        this.commonService.showLoader();
        this.authService.apiRequest('post', reqUrl, reqVars).subscribe(async response => {
          this.commonService.hideLoader();
          this.commonService.openSnackBar(type+" Notes Deleted Successfully", "SUCCESS")
          this.actionStarted = false
          this.getAppointmentNotes()
        })
      }
    })
  }

  createAddendum(appointmentId:any,noteType:any){

    const dialogRef = this.dialog.open(AlertComponent, {
      panelClass: 'custom-alert-container',
      data: {
        warningNote: 'Are you sure you want create addendum notes for "'+this.soapNoteType(noteType)+'"?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('result>>>',result)
      if(result && !result.error){
     

        this.actionStarted = true
        this.commonService.showLoader();
        let reqVars = {
          appointmentId:appointmentId,
          noteType:noteType,
          createBy:this.userId
        }
        this.authService.apiRequest('post', 'soapNote/createAddendum', reqVars).subscribe(async response => {
          this.commonService.hideLoader();
          this.commonService.openSnackBar("Addendum created successfully", "SUCCESS")
          this.getAppointmentNotes()
        })


      }
    })
  }

  getBillingDetails(patientId:any, caseName:string){
    this.isBillingDetailsData = false
    let billingDetailsQuery:any = {
      patientId : patientId,
      caseName : caseName
    }
    this.authService.apiRequest('post', 'appointment/getBillingDetails', billingDetailsQuery).subscribe(async response => {  
      let { error, data } = response
      if(data && data!=null ){
        this.isBillingDetailsData = true
        this.billingDetailsData = data
      }
    },(err) => {
      err.error?.error ? this.commonService.openSnackBar(err.error?.message, "ERROR") : ''
    })
  }

  getAuthManagementHistory(patientId:any, caseName:string){
    this.isAuthManagmentHistory = false
    this.authExpireDate = 'NA'
    this.authVisits = 'NA'
    let queryObj:any = {
      patientId : patientId,
      caseName : caseName
    }

    this.authService.apiRequest('post', 'appointment/getAuthorizationManagementDetails', queryObj).subscribe(async response => { 
      if(response?.data && response?.data.authManagement.length){
        this.isAuthManagmentHistory = true
        let allAuthManagementHistory = response?.data.authManagement.sort((a:any, b:any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        this.authManagementHistory = allAuthManagementHistory[0];
        if(this.authManagementHistory?.authorizationToDate){
          this.authExpireDate =  this.datePipe.transform(new Date(this.authManagementHistory?.authorizationToDate), 'MM/dd/yyyy')!;
        }        
        this.authVisits = this.authManagementHistory?.authorizationVisit
        this.isAuthDateExpire = (this.authExpireDate!='NA' && this.todayDate > this.authExpireDate)?true:false
      }
    },(err) => {
      err.error?.error ? this.commonService.openSnackBar(err.error?.message, "ERROR") : ''
    })
  }

  getStCaseDetails(patientId:any, caseName:string){
    this.isStCaseDetails = false
    let queryObj:any = {
      patientId : patientId,
      caseName : caseName
    }

    this.authService.apiRequest('post', 'appointment/getStCaseDetails', queryObj).subscribe(async response => { 
      if(response?.data){
        this.isStCaseDetails = true
        this.stCaseDetails = response?.data
      }
    },(err) => {
      err.error?.error ? this.commonService.openSnackBar(err.error?.message, "ERROR") : ''
    })
  }

  getPatientCheckInCount(patientId:any,caseName:string){
    let queryObj:any = {
      patientId : patientId,
      caseName : caseName
    }
    this.authService.apiRequest('post', 'appointment/getPatientCheckInCount', queryObj).subscribe(async response => { 
      this.patientCheckInCount = response?.data
    },(err) => {
      err.error?.error ? this.commonService.openSnackBar(err.error?.message, "ERROR") : ''
    })
  }

  getInitialExamination(){
    this.hasInitialExamPlanData = false
    let reqVars = {
      query: { appointmentId: this.appointmentId },
      fields: { plan_start_date:1, plan_end_date:1 }
    }

    this.authService.apiRequest('post', 'soapNote/getInitialExamination', reqVars).subscribe(async response => { 
      this.hasInitialExamPlanData = (response.data!=null) ? true :false
      this.initialExamPlanData = response.data

      if(this.hasInitialExamPlanData && response.data?.plan_end_date){
        let planEndDate =  this.datePipe.transform(new Date(response.data?.plan_end_date), 'MM/dd/yyyy')!;
        this.isPOCExpire = (planEndDate && this.todayDate > planEndDate)?true:false
      }
    },(err) => {
      err.error?.error ? this.commonService.openSnackBar(err.error?.message, "ERROR") : ''
    })
  }

  loadValue(value:any){
    if(value=='daily_note'){
      return 'daily-notes'
    }else if(value=='progress_note'){
      return 'progress-notes'
    }else if(value=='discharge_note'){
      return 'discharge-notes'
    }else{
      return value.replace('_','-')
    }    
  }

  soapNoteType(soap_note_type: string): string {
    switch (soap_note_type) {
      case 'initial_examination':
        return 'Initial Examinations';
      case 'daily_note':
        return 'Daily Notes';
      case 'progress_note':
        return 'Progress Notes';
      case 'discharge_note':
        return 'Discharge Notes';
      case 'case_note':
          return 'Case Notes';
      default:
        return soap_note_type.replace('_','-');
    }
  }

  eFaxHistoryModal(){
    const dialogRef = this.dialog.open(EFaxHistoryModalComponent,{
      width:"960px", 
      data : {
        appointmentId:this.appointmentId,
      }
    });
  }

  loadDataLength(element:any){
    if(element && element.addendums &&element.addendums.length){
      return element.addendums.length
    }else{
      return 0
    }
    
  }


}
