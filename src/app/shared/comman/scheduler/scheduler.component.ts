import { Component,AfterViewInit  } from '@angular/core';
import { MatDialog, MatDialogRef  } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateAppointmentModalComponent } from './create-appointment-modal/create-appointment-modal.component';
import { EditAppointmentModalComponent } from './edit-appointment-modal/edit-appointment-modal.component';
import { AppointmentDetailsModalComponent } from './appointment-details-modal/appointment-details-modal.component';
import { ChangeDetectionStrategy, ViewChild, TemplateRef,} from '@angular/core';
import { startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay,isSameMonth,addHours,} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent,CalendarView,} from 'angular-calendar';
import { MatCalendar } from '@angular/material/datepicker';
import { EventColor } from 'calendar-utils';
import { UpcomingAppModalComponent } from './upcoming-app-modal/upcoming-app-modal.component';
import { CollectPaymentModalComponent } from './collect-payment-modal/collect-payment-modal.component';
import { AlertComponent } from '../alert/alert.component';
import { tr } from 'date-fns/locale';
import { MatRadioChange } from '@angular/material/radio';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { validationMessages } from 'src/app/utils/validation-messages';
import { ChangeDetectorRef } from '@angular/core';
import { s3Details, pageSize, pageSizeOptions, appointmentStatus, practiceLocations } from 'src/app/config';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { debounceTime } from 'rxjs/operators';
import * as moment from 'moment';
@Component({
  selector: 'app-scheduler', 
  templateUrl: './scheduler.component.html',
  styleUrl: './scheduler.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`h3 { margin: 0 0 10px; } pre { background-color: #f5f5f5; padding: 15px; }`],
})
export class SchedulerComponent {
  @ViewChild(MatCalendar) calendar!: MatCalendar<Date>;
  editOptionFlag:boolean = true;   
  deleteOptionFlag:boolean = true;  
  calenderView = true;
  searchView = false;
  noRecordFound = false
  practiceLocations: any = practiceLocations
  appointmentStatus: any = appointmentStatus
  validationMessages: any = validationMessages
  whereCond: any = {}
  patientQuery: any = {}  
  userQuery: any = {}
  practiceLocationsVal: any = ''
  orderBy: any = { updatedAt: -1 }
  orderTherapistBy: any = { firstName: 1 }
  pageIndex = 0
  pageSize = pageSize
  pageSizeOptions = pageSizeOptions
  totalCount = 0
  totalSearchPageCount = 0
  appointmentsList: any
  selected: Date | null;
  therapistList:any=[];
  whereTherapistCond: any = { role: 'therapist', status: 'Active' }
  selectedItems: string[] = [];
  activeDayIsOpen: boolean = false; 
  dialog1Ref: MatDialogRef<any> | null = null;
  selectedDateEventCount:any=1

  whereSearchCond = {};
  userSearchQuery = {};
  patientSearchQuery = {}
  searchAppointmentsList: any = []
  public userId: string = this.authService.getLoggedInInfo('_id');
  userRole = this.authService.getLoggedInInfo('role')
  constructor(private router: Router,private cdr: ChangeDetectorRef, public dialog: MatDialog, private modal: NgbModal,public authService: AuthService,public commonService: CommonService) { }

    ngOnInit() {
      this.getAppointmentList('');
      this.getTherapistList();
    }

    ngAfterViewInit() {
      this.calendar.stateChanges.pipe(debounceTime(300)).subscribe(() => {
        this.onMonthChanges('1');
      });
    }

    onChange(event: MatRadioChange,id:string) {
      let updateInfo = {};let text = '';
      if(event.value=='checkIn'){
        text = 'checked in?'
        updateInfo = { checkIn: true, checkInBy: this.userId,appointmentStatus:'checkIn'}
      }else if(event.value=='No-Show'){
        text = 'No Show?'; this.app_data.checkIn = false
        updateInfo = { checkIn: false, checkInBy: this.userId,appointmentStatus:'No-Show'}
      }else if(event.value=='Cancelled'){
        text = 'cancelled appointment?'; this.app_data.checkIn = false
        updateInfo = { checkIn: false, checkInBy: this.userId,appointmentStatus:'Cancelled'}
      }
      const dialogRef = this.dialog.open(AlertComponent,{
        panelClass: 'custom-alert-container',
        data : {
          warningNote: 'Are you sure you want to mark this Patient as '+text
        }
      });
      dialogRef.afterClosed().subscribe(res => {
        if (!res) {
          this.app_data.appointmentStatus = '';
          return;
        } else {
          var params = { 
            query: { _id: id },
            updateInfo:updateInfo
          }
          this.authService.apiRequest('post', 'appointment/updatePatientCheckIn', params).subscribe(async response => {
            this.modal.dismissAll()
            if(!response.error){               
              this.commonService.openSnackBar(response.message, "SUCCESS");
              this.getAppointmentList('')
              this.cdr.detectChanges(); 
            }                          
          })

        }
      })
    }

    createAppointmentModal(){
      const dialogRef = this.dialog.open(CreateAppointmentModalComponent,{
        disableClose: true,
        width:'1260px',
        panelClass: [ 'modal--wrapper'],
      });
      dialogRef.afterClosed().subscribe(async resp => {
        if(resp=='SUCCESS'){
          setTimeout( () => {    
            this.dialog1Ref?.close();
            this.dialog1Ref = null;
            
            this.getAppointmentList('')
            this.refresh.next();
          }, 100)
        }    
      });
    }

    editAppointment(from:string,app_data:any){
      let title = 'Edit Appointment Details';
      if(from=='Duplicate'){
        title = 'Create Duplicate Appointment';
      }
      const dialogRef = this.dialog.open(EditAppointmentModalComponent,{
        width:'1260px',
        panelClass: [ 'modal--wrapper'],
        data: {
          from:from,
          title:title,
          app_data: app_data,        
        }
      });
      dialogRef.afterClosed().subscribe(async resp => {
        //console.log('********ResP*****',resp)
        if(resp=='SUCCESS'){
          setTimeout( () => {    
            this.dialog1Ref?.close();
            this.dialog1Ref = null;
            
            this.getAppointmentList('')
            this.refresh.next();
          }, 100)
        }    
      });
    }

    appointmentDetailsModal(){//Need Appointment Details Modal
      this.dialog1Ref = this.dialog.open(AppointmentDetailsModalComponent,{
        width:'633px',
        panelClass: [ 'modal--wrapper'],
      });
    }

    upcomingAppointmentModal(app_data:any){
      const dialogRef = this.dialog.open(UpcomingAppModalComponent,{
        width:'310px',
        panelClass: [ 'modal--wrapper'],
        data: {
          app_data:app_data,      
        }
      });
    }

    collectPaymentModal(){
      const dialogRef = this.dialog.open(CollectPaymentModalComponent,{
        width:'400px',
        panelClass: [ 'modal--wrapper'],
      });
    }

    deleteAppointment(id:string,app_name:string,count:any) {
      if(id){        
        const dialogRef = this.dialog.open(AlertComponent,{
          panelClass: 'custom-alert-container',
          data : {
            warningNote: 'Do you really want to delete this "'+app_name+'" appointment?'
          }
        });
        dialogRef.afterClosed().subscribe(res => {
          if (!res) {
            return;
          } else {
            var params = { 
              query: { _id: id },
              updateInfo: {
                status: 'Deleted',
                rejectInfo: {
                  fromPatientId: this.userId,
                  fromAdminId: this.userId,
                  userRole: this.userRole,
                  comment: 'Deleted the appoitment from schedular',
                  rejectedDate: new Date()
                }
              }
            }
            this.authService.apiRequest('post', 'appointment/cancelAppointment', params).subscribe(async response => {
              this.modal.dismissAll()
              if(!response.error){
                if(count==1){
                  this.activeDayIsOpen = false;
                }                
                this.commonService.openSnackBar(response.message, "SUCCESS");
                this.getAppointmentList('')
                this.cdr.detectChanges(); 
              }                          
            })
          }
        })
      }
    }

    @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
    view: CalendarView = CalendarView.Month;
    CalendarView = CalendarView;
    viewDate: Date = new Date();
    modalData: {
        action: string;
        event: CalendarEvent;
    };
    app_data:any=[]
    actions: CalendarEventAction[] = [
        {
          label: '<i class="fas fa-fw fa-pencil-alt"></i>',
          a11yLabel: 'Edit',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            this.handleEvent('Edited', event, ['2']);
          },
        },
        {
          label: '<i class="fas fa-fw fa-trash-alt"></i>',
          a11yLabel: 'Delete',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            this.events = this.events.filter((iEvent) => iEvent !== event);
            this.handleEvent('Deleted', event, ['3']);
          },
        },
    ];
  
    refresh = new Subject<void>();
    events: CalendarEvent[] = [];
    eventsOld: CalendarEvent[] = [
        {
          start: subDays(startOfDay(new Date()), 1),
          end: addDays(new Date(), 1),
          title: 'A 3 day event',
          color: { ...colors['red'] },
          actions: this.actions,
          allDay: true,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
          draggable: false,
        },
        {
          start: startOfDay(new Date()),
          title: 'An event with no end date',
          color: { ...colors['yellow'] },
          actions: this.actions,
        },
        {
          start: subDays(endOfMonth(new Date()), 3),
          end: addDays(endOfMonth(new Date()), 3),
          title: 'A long event that spans 2 months',
          color: { ...colors['blue'] },
          allDay: true,
        },
        {
          start: addHours(startOfDay(new Date()), 2),
          end: addHours(new Date(), 2),
          title: 'A draggable and resizable event',
          color: { ...colors['yellow'] },
          actions: this.actions,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
          draggable: false,
        },
      ];
        
    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
        //console.log('active Day Is Open>>>>',this.activeDayIsOpen,' ######>>>>',this.viewDate)
        if (isSameMonth(date, this.viewDate)) {
          if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
            this.activeDayIsOpen = false;
          } else {
            this.activeDayIsOpen = true;
          }
          this.viewDate = date;
        } 
        //console.log(this.activeDayIsOpen,'viewDate>>>>',this.viewDate)
    }
    
    eventTimesChanged({
        event,
        newStart,
        newEnd,
      }: CalendarEventTimesChangedEvent): void {
        this.events = this.events.map((iEvent) => {
          if (iEvent === event) {
            return {
              ...event,
              start: newStart,
              end: newEnd,
            };
          }
          return iEvent;
        });
        this.handleEvent('Dropped or resized', event, ['1']);
    }

    isDatePassed(inputDate: string | Date): boolean {
      const givenDate = new Date(inputDate);
      if (isNaN(givenDate.getTime())) {
        throw new Error('Invalid date format');
      }
      const currentDate = new Date();
      return givenDate.getTime() < currentDate.getTime();
    }
    
    handleEvent(action: string, event: CalendarEvent, app_data:any=[]): void {
      const eventsCount = this.events.filter((item) => {
        const eventDate = new Date(item.start).toISOString().split("T")[0]; 
        return eventDate === new Date(event.start).toISOString().split("T")[0];
      });
      const eventCount = eventsCount.length;
        this.selectedDateEventCount = eventCount;
        this.app_data = app_data;
        this.modalData = { event, action };
        if (this.isDatePassed(app_data.appointmentDate)) {
          this.deleteOptionFlag = true
          this.editOptionFlag = true
          if(action=='Deleted'){
            this.commonService.openSnackBar('You can not delete the past date appoitment', "SUCCESS");
          }
        } else {
          this.deleteOptionFlag = false
          this.editOptionFlag = false
          if(action=='Deleted'){
            this.deleteAppointment(app_data.id,app_data.caseName+' ('+app_data.patientName+')',this.selectedDateEventCount)
          }       
        }
        if(action=='View details'){
          this.modal.open(this.modalContent, { 
            size: 'lg',
          });
        }
    }
    
    addEvent(): void {
        this.events = [
          ...this.events,
          {
            title: 'New event',
            start: startOfDay(new Date()),
            end: endOfDay(new Date()),
            color: colors['red'],
            draggable: false,
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
          },
        ];
    }
    
    deleteEvent(eventToDelete: CalendarEvent) {
        this.events = this.events.filter((event) => event !== eventToDelete);
    }
    
    setView(view: CalendarView) {
        this.view = view;
    }
    
    closeOpenMonthViewDay() {
        this.activeDayIsOpen = false;
        //console.log('closeOpenMonthViewDay  >>>>>>',this.viewDate)
    } 

    onDateChange(event: any) {
        console.log('on Date Change Event >>>>>>',event)
        // this.viewDate = event;
        // if(this.calenderView){
        //   this.getAppointmentList('search')
        // }
        // if(this.searchView){
        //   this.searchPageRecords('')
        // }
    }

    onMonthChanges(id:any): void {
      this.viewDate = this.calendar.activeDate;
     // console.log(id,'*****Month navigation detected. Current active month:', this.viewDate,'....calender View>>>',this.calenderView,'....search View>>>',this.searchView);
      if(this.calenderView){
        this.getAppointmentList('search')
      }
      if(this.searchView){
        this.searchPageRecords('')
      }
    }

    searchRecords(colName: string, event: any) {
        if (event && event != '') {      
          Object.assign(this.whereCond, { [colName]: { $in: [event] } })
        } else {
          delete this.whereCond[colName];
        }
        this.getAppointmentList('search')
    }

    async getAppointmentList(action = "") {
      if (action == "") {
        this.commonService.showLoader()
      }
    
      let reqVars = {
        query: this.whereCond,
        userQuery: this.userQuery,
        patientQuery: this.patientQuery, 
        therapistIds:this.selectedItems,
        fields: { _id: 1, patientId: 1, therapistId: 1, appointmentId: 1,doctorId:1, status: 1, caseName: 1,caseType:1, createdAt: 1, updatedAt: 1, practiceLocation: 1, appointmentDate: 1,appointmentType:1,appointmentEndTime:1, checkIn: 1,checkInBy:1,checkInDateTime:1,notes:1,repeatsNotes:1,appointmentStatus:1 },
        patientFields: { firstName: 1, lastName: 1, email: 1, status: 1, profileImage: 1, practiceLocation: 1,dob:1,gender:1,phoneNumber:1 },
        order: this.orderBy,
        limit: 10000,
        offset: (this.pageIndex * this.pageSize)
      }
      await this.authService.apiRequest('post', 'appointment/getSchedularCaseList', reqVars).subscribe(async response => {
        if (action == "") {
          this.commonService.hideLoader()
        }
        this.totalCount = response.data.totalCount
        //console.log('length>>>',response.data.appointmentList.length,'>>>>>totalCount>>>>>>>>>>>>>',this.totalCount,'>>>>>>> WhereCond >>>>',this.whereCond)
        let finalData: any = []
        if (response.data.appointmentList.length > 0) {
          await response.data.appointmentList.map((element: any) => {
            let newColumns = {
              id: element._id,
              practiceLocation: element.practiceLocation,
              appointmentId: element.appointmentId,
              appointmentType: element.appointmentType ? element.appointmentType : 'N/A',
              checkIn: element.checkIn,
              createdAt: element.updatedAt,
              appointmentStartDate: element.appointmentStartDate,
              appointmentEndDate: element.appointmentEndDate,
              appointmentDate: element.appointmentDate,
              appointmentEndTime: element.appointmentEndTime ? element.appointmentEndTime : '',
              status: element.status,
              appointmentStatus: element.appointmentStatus,
              caseName: element.caseName,
              caseType: element.caseType,
              notes: element.notes ? element.notes : '',
              repeatsNotes: element.repeatsNotes ? element.repeatsNotes : '',
              checkInBy: element.checkInBy,
              checkInUser: element.checkInDateTime ? 'on '+this.commonService.formatDateInUTC(element.checkInDateTime,'MMM d, y hh:mm a') : 'N/A',
              statusFlag: element.status.charAt(0).toLowerCase() + element.status.slice(1),
              patientName: element.patientObj[0]?.firstName + " " + element.patientObj[0]?.lastName,
              patientfirstName: element.patientObj[0]?.firstName,
              patientlastName: element.patientObj[0]?.lastName,
              dob:element.patientObj[0]?.dob,
              doctorId:element.doctorId,
              patientId:element.patientObj[0]?._id,
              patientemail:element.patientObj[0]?.email,
              phoneNumber:element.patientObj[0]?.phoneNumber ? element.patientObj[0]?.phoneNumber : 'N/A',
              profileImage: s3Details.awsS3Url + s3Details.userProfileFolderPath + element.patientObj[0]?.profileImage,
              therapistName:element.therapistObj[0]?.firstName+' '+element.therapistObj[0]?.lastName,            
              therapistProfileImage:element.therapistObj[0]?.profileImage,
              therapistId:element.therapistObj[0]?._id,
              eventsObj:element.eventsObj
            }
            finalData.push(newColumns)
          })
        }     
        this.appointmentsList = finalData;     
        this.appointmentsEventsList();
      })
    }

    async appointmentsEventsList(){
      let eventArray: any = []
      this.appointmentsList.forEach((element:any,index:any) => {
        if (Array.isArray(element.eventsObj) && element.eventsObj.length > 0) {
              element.eventsObj.forEach((item:any) => {
                delete element.eventsObj
                eventArray.push(this.eventArray(element,moment.utc(item.repeateAppointmentDate).format('ddd MMM DD YYYY HH:mm:ss').replace(',','').replace(',',''),moment.utc(item.repeateAppointmentEndDate).format('ddd MMM DD YYYY HH:mm:ss').replace(',','').replace(',',''),true))   
              });
          } else {
              eventArray.push(this.eventArray(element,element.appointmentStartDate,element.appointmentEndDate,true))   
          }
      });
      this.events = eventArray;
      
      setTimeout(() => {
        this.refresh.next();
        this.cdr.detectChanges();
      }, 100)
    }

    eventArray(element:any,appointmentStartDate:any,appointmentEndDate:any,flag:boolean){
      let newColumns = {
        start:new Date(appointmentStartDate),
        end: new Date(appointmentEndDate),
        title: element.caseName+' ('+element.patientName+')',//'<img src="'+element.profileImage+'" alt="Profile" class="img-fluid" />'+
        color: { ...colors['red'] },
        // color: {
        //   primary: '#ad2121',
        //   secondary: '#FAE3E3'
        // },
        //profileImage: element.profileImage,//'https://s3.amazonaws.com/hpt.dev/profile-images/66cc4059255216407ab72e29.png',
        actions:  [
          {
            label: '<i class="fas fa-fw fa-eye"></i>',
            a11yLabel: 'Edit',
            onClick: ({ event }: { event: CalendarEvent }): void => {
              this.handleEvent('View details', event, element);
            },
          },
          {
            label: this.isDatePassed(element.appointmentDate) ? '' : '<i class="fas fa-fw fa-trash-alt"></i>',
            a11yLabel: 'Delete',
            onClick: ({ event }: { event: CalendarEvent }): void => { //this.events = this.events.filter((iEvent) => iEvent !== event);
              this.handleEvent('Deleted', event, element);
            },
          },
        ]
      }
      return newColumns;
    }

    searchTherapist(searchStr: string,colName:string) {
    // let searchStr = event.target.value.trim()
      if (searchStr != '') {
        searchStr = searchStr.replace("+", "\\+");
        let finalStr = { $regex: searchStr, $options: 'i' }      
        if (colName == 'byTname') {
          let firstName = finalStr;
          let lastName = finalStr;
          let final_str = searchStr.trim().split(' ');
          if(final_str[0] && final_str[1]){
            firstName =  { $regex: final_str[0], $options: 'i' }
            lastName =  { $regex: final_str[1], $options: 'i' }
          }
          this.whereTherapistCond = {
            status: "Active",
            $or: [{ firstName: firstName }, { lastName: lastName }, { email: finalStr }]
          }
        }      
      } else {
        this.whereTherapistCond = { role: 'therapist', status: 'Active' };
        //this.selectedItems = [];
      }
      this.getTherapistList()   
    }
    
    onCheckboxChange(event: any, id: string): void {      
      if (event.checked) {
        this.selectedItems.push(id); // Add ID to the selected list
      } else {
        this.selectedItems = this.selectedItems.filter(itemId => itemId !== id); // Remove ID from the selected list
      }
      //console.log('Selected Items:', this.selectedItems,' >>>  checked >>>>',event.checked);
      if(this.calenderView){
        this.getAppointmentList('search')
      }
      if(this.searchView){
        this.searchPageRecords('')
      }
    }
      
    async getTherapistList() {
      const reqVars = {     
        query: this.whereTherapistCond,
        fields: { _id: 1, firstName: 1, lastName: 1 },
        limit: 20,
        order: this.orderTherapistBy,
      }
      await this.authService.apiRequest('post', 'admin/getTherapistList', reqVars).subscribe(async response => {
        if (response.data && response.data.therapistData) {
          this.therapistList = response.data.therapistData;
          this.cdr.detectChanges();
        }
      })
    }

    searchPage() {
      this.calenderView = false;
      this.searchView = true;
      // console.log('view date >>>>',this.viewDate)
      // const firstDay = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1); // First day of the month
      // const lastDay = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 1.5); // Last day of the month
      // console.log('firstDay >>>>',firstDay,'>>>>>>>>>>>>','lastDay >>>>',lastDay)
      // let obj = { $gte: firstDay, $lte: lastDay }
      // console.log('obj >>>>',obj);
      // Object.assign(this.whereSearchCond, { appointmentDate: obj })
      this.searchPageRecords('')
    }

    searchPageFilters(event: any, colName: string) {
      console.log('search Page Filters Event >>>>>>',event)
      let searchStr = event.target.value.trim()
      if (searchStr != '') {
        searchStr = searchStr.replace("+", "\\+");
        let finalStr = { $regex: searchStr, $options: 'i' }
        if (colName == 'byPatientNameOrEmail') {
          let firstName = finalStr;
          let lastName = finalStr;
          let final_str = searchStr.trim().split(' ');
          if(final_str[0] && final_str[1]){
            firstName =  { $regex: final_str[0], $options: 'i' }
            lastName =  { $regex: final_str[1], $options: 'i' }
          }
          this.patientSearchQuery = {
            status: "Active",
            $or: [{ firstName: firstName }, { lastName: lastName }, { email: finalStr }]
          }
        }
      } else {
        //this.whereSearchCond = {};
        this.patientSearchQuery = {}
      }
      this.searchPageRecords('search')
    }

    onSearchDateChange(event: any) {
     let startdDate = startOfDay(new Date(event.value));this.commonService.formatUTCDate(event.value)
     let endDate = addDays(new Date(event.value), 1)
     let obj = { $gt: startdDate, $lte: endDate }
      Object.assign(this.patientSearchQuery, { dob: obj })//this.commonService.formatUTCDate(event.value)

      if(this.searchView){
        this.searchPageRecords('')
      }
    }

    async searchPageRecords(action:string) {
      // this.commonService.showLoader()
      let reqVars = {
        query: this.whereSearchCond,
        userQuery: this.userSearchQuery,
        patientQuery: this.patientSearchQuery, 
        therapistIds:this.selectedItems,
        fields: { _id: 1, patientId: 1, therapistId: 1, appointmentId: 1,doctorId:1, status: 1, caseName: 1, practiceLocation: 1, appointmentDate: 1, appointmentEndTime:1, checkIn: 1, checkInDateTime:1 },
        patientFields: { firstName: 1, lastName: 1, email: 1, status: 1, profileImage: 1, practiceLocation: 1,dob:1, },
        selectedDate:this.viewDate,
        order: { appointmentDate: 1 },
        limit: this.pageSize,
        offset: (this.pageIndex * this.pageSize)
      }
      await this.authService.apiRequest('post', 'appointment/getSchedularCaseList', reqVars).subscribe(async response => {
        //this.commonService.hideLoader()
        this.totalSearchPageCount = response.data.totalCount
        let finalData: any = []
        if (response.data.appointmentList.length > 0) {
          this.noRecordFound = false;
          await response.data.appointmentList.map((element: any) => {
            let newColumns = {
              id: element._id,             
              appointmentId: element.appointmentId,             
              appointmentStartDate: element.appointmentStartDate,
              appointmentEndDate: element.appointmentEndDate,
              appointmentDate: element.appointmentDate,
              appointmentEndTime: element.appointmentEndTime ? element.appointmentEndTime : '',
              practiceLocation: element.practiceLocation,
              checkIn: element.checkIn,
              status: element.status,
              caseName: element.caseName,
              caseType: element.caseType,
              statusFlag: element.status.charAt(0).toLowerCase() + element.status.slice(1),
              patientName: element.patientObj[0]?.firstName + " " + element.patientObj[0]?.lastName,
              patientfirstName: element.patientObj[0]?.firstName,
              patientlastName: element.patientObj[0]?.lastName,
              dob:element.patientObj[0]?.dob,
              patientId:element.patientObj[0]?._id,
              patientemail:element.patientObj[0]?.email,
              phoneNumber:element.patientObj[0]?.phoneNumber ? element.patientObj[0]?.phoneNumber : 'N/A',
              profileImage: s3Details.awsS3Url + s3Details.userProfileFolderPath + element.patientObj[0]?.profileImage,          
            }
            finalData.push(newColumns)
          })

          finalData = this.groupAppointmentsByDate(finalData); 
          if(finalData.__zone_symbol__state){
            this.searchAppointmentsList = finalData.__zone_symbol__value;   
          }     
        } else {
          this.noRecordFound = true;
        }    
        this.cdr.detectChanges();
      })
    }


    async groupAppointmentsByDate(appointmentsList:any) {
      const groupedAppointments:any = {};
      appointmentsList.forEach((appointment:any) => {
          // Extract date in YYYY-MM-DD format
          const date = new Date(appointment.appointmentDate).toISOString().split("T")[0];
          // Initialize array for the date if not already done
          if (!groupedAppointments[date]) {
              groupedAppointments[date] = [];
          }
          // Add appointment to the corresponding date
          groupedAppointments[date].push(appointment);
      });
      // Convert groupedAppointments object to an array
      const res_data = Object.keys(groupedAppointments).map(date => ({
          date,
          appointments: groupedAppointments[date]
      }));

      return res_data;
    }
    
    backToCalender(){
      this.whereSearchCond = {};
      this.userSearchQuery = {};
      this.patientSearchQuery = {};
      this.getAppointmentList('search')
      this.calenderView = true;
      this.searchView = false;
    }

    handlePageEvent(event: any) {
      this.pageSize = event.pageSize;
      this.pageIndex = event.pageIndex;
      console.log('handle Page Event')
      this.searchPageRecords('')
    }

    resetSearchPage(){
      this.whereSearchCond = {};
      this.userSearchQuery = {};
      this.patientSearchQuery = {}
      this.searchAppointmentsList = []
      this.searchPageRecords('')
    }

    navigateToappointmentDetails(appointmentId: string) {
      console.log('appointmentId >>>',appointmentId)
      this.modal.dismissAll()
      this.router.navigate([this.commonService.getLoggedInRoute(), 'case-details', appointmentId]);
    }



}

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};