import { Component } from '@angular/core';
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
@Component({
  selector: 'app-scheduler', 
  templateUrl: './scheduler.component.html',
  styleUrl: './scheduler.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`h3 { margin: 0 0 10px; } pre { background-color: #f5f5f5; padding: 15px; }`],
})
export class SchedulerComponent {
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
  appointmentsList: any
  selected: Date | null;
  therapistList:any=[];
  whereTherapistCond: any = { role: 'therapist', status: 'Active' }
  selectedItems: string[] = [];
  activeDayIsOpen: boolean = false; 
  dialog1Ref: MatDialogRef<any> | null = null;
  constructor(private router: Router,private cdr: ChangeDetectorRef, public dialog: MatDialog, private modal: NgbModal,public authService: AuthService,public commonService: CommonService) { }

  ngOnInit() {
    this.getAppointmentList('');
    this.getTherapistList();
  }

  onChange(event: MatRadioChange) {
    const dialogRef = this.dialog.open(AlertComponent,{
      panelClass: 'custom-alert-container',
      data : {
        warningNote: 'Are you sure you want to mark this Patient as checked in?'
      }
    });
  }

  search() {
    this.calenderView = false;
    this.searchView = true;
  }
  backToCalender(){
    this.calenderView = true;
    this.searchView = false;
  }

  createAppointmentModal(){
    const dialogRef = this.dialog.open(CreateAppointmentModalComponent,{
      disableClose: true,
      width:'1260px',
      panelClass: [ 'modal--wrapper'],
    });
  }

  editAppointment(from:string,app_data:any){
    console.log('*************',from)
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
      console.log('********ResP*****',resp)
      if(resp=='SUCCESS'){
        setTimeout( () => {    
          console.log('******** HERE *****',)
          this.dialog1Ref?.close();
          this.dialog1Ref = null;
          
          this.getAppointmentList('')
          
          // this.refresh.next();
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

  upcomingAppointmentModal(){
    const dialogRef = this.dialog.open(UpcomingAppModalComponent,{
      width:'310px',
      panelClass: [ 'modal--wrapper'],
    });
  }

  collectPaymentModal(){
    const dialogRef = this.dialog.open(CollectPaymentModalComponent,{
      width:'400px',
      panelClass: [ 'modal--wrapper'],
    });
  }

  deleteAppointment() {
    const dialogRef = this.dialog.open(AlertComponent,{
      panelClass: 'custom-alert-container',
      data : {
        warningNote: 'Do you really want to delete this appointment?'
      }
    });
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
  
  handleEvent(action: string, event: CalendarEvent, app_data:any=[]): void {
      this.app_data = app_data;
      this.modalData = { event, action };
      this.modal.open(this.modalContent, { 
        size: 'lg',
      });
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
  } 

  onDateChange(event: any) {
      console.log('Event >>>>>>',event)
      this.viewDate = event;
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
      fields: { _id: 1, patientId: 1, therapistId: 1, appointmentId: 1,doctorId:1, status: 1, caseName: 1,caseType:1, createdAt: 1, updatedAt: 1, practiceLocation: 1, appointmentDate: 1,appointmentType:1,appointmentEndTime:1, checkIn: 1,checkInBy:1,checkInDateTime:1,notes:1,repeatsNotes:1, },
      patientFields: { firstName: 1, lastName: 1, email: 1, status: 1, profileImage: 1, practiceLocation: 1,dob:1,gender:1,phoneNumber:1 },
      order: this.orderBy,
       limit: 1000,
      // offset: (this.pageIndex * this.pageSize)
    }
    await this.authService.apiRequest('post', 'appointment/getCaseList', reqVars).subscribe(async response => {
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
            appointmentDate: element.appointmentDate,
            appointmentEndTime: element.appointmentEndTime ? element.appointmentEndTime : '',
            status: element.status,
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
          }
          finalData.push(newColumns)
        })
      }     
      this.appointmentsList = finalData;
      //console.log('>>>>> Appointments List Length >>>>',this.appointmentsList.length)
      this.appointmentsEventsList();
    })
  }

  async appointmentsEventsList(){
    let eventArray: any = []
    console.log('........appointmentsList........',this.appointmentsList.length);
    this.appointmentsList.forEach((element:any,index:any) => {
      let appointmentDate = subDays(startOfDay(new Date(element.appointmentDate)), 1)
      let appointmentEndDate = addDays(new Date(element.appointmentEndTime ? element.appointmentEndTime : element.appointmentDate), 1)
      let newColumns = {
        start:appointmentDate,
        end: appointmentEndDate,
        title: element.caseName+' ('+element.patientName+')',
        color: { ...colors['red'] },
        actions:  [
          {
            label: '<i class="fas fa-fw fa-eye"></i>',
            a11yLabel: 'Edit',
            onClick: ({ event }: { event: CalendarEvent }): void => {
              this.handleEvent('Edited', event, element);
            },
          },
          {
            label: '<i class="fas fa-fw fa-trash-alt"></i>',
            a11yLabel: 'Delete',
            onClick: ({ event }: { event: CalendarEvent }): void => {
              this.events = this.events.filter((iEvent) => iEvent !== event);
              this.handleEvent('Deleted', event, element);
            },
          },
      ],
        allDay: false,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        draggable: false,
      }
      eventArray.push(newColumns)     
    });
    this.events = eventArray;
    
    setTimeout( () => {    
      console.log('........Refresh........',eventArray.length);
      this.refresh.next();
    }, 100)
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
    }
    this.getTherapistList()   
  }
  
  onCheckboxChange(event: any, id: string): void {  
    if (event.checked) {
      this.selectedItems.push(id); // Add ID to the selected list
    } else {
      this.selectedItems = this.selectedItems.filter(itemId => itemId !== id); // Remove ID from the selected list
    }
    console.log('Selected Items:', this.selectedItems);
    if (this.selectedItems.length>0) {      
      Object.assign(this.whereCond, { ['therapistId']: { $in: [this.selectedItems] } })

      this.userQuery = {
        status: "Active",
        role: "therapist",
        $or: [{ ['therapistId']: { $in: [this.selectedItems] } }]
      }
      this.getAppointmentList('search')
    } 
  }

  //onCheckboxChange(event: any, id: number): void {
    // if (event.checked) {
    //   this.selectedItems.push(id); // Add ID to the selected list
    // } else {
    //   this.selectedItems = this.selectedItems.filter(itemId => itemId !== id); // Remove ID from the selected list
    // }
    // console.log('Selected Items:', this.selectedItems);
    // if (this.selectedItems.length>0) {      
    //   Object.assign(this.whereCond, { ['therapistId']: { $in: [this.selectedItems] } })
    // } 
  //   onCheckboxChange(TherapistName: string): void {
  //     let firstName = { $regex: TherapistName, $options: 'i' }
  //     let lastName = { $regex: TherapistName, $options: 'i' }
  //     let final_str = TherapistName.trim().split(' ');
  //     if(final_str[0] && final_str[1]){
  //       firstName =  { $regex: final_str[0], $options: 'i' }
  //       lastName =  { $regex: final_str[1], $options: 'i' }
  //     }
      
  //     this.userQuery = {
  //       status: "Active",
  //       role: "therapist",
  //       $or: [{ firstName: firstName }, { lastName: lastName }]
  //     }
  //     this.getAppointmentList('search')
  // }
     
  async getTherapistList() {
    const reqVars = {     
      query: this.whereTherapistCond,
      fields: { _id: 1, firstName: 1, lastName: 1 },
      limit: 100,
      order: this.orderTherapistBy,
    }
    await this.authService.apiRequest('post', 'admin/getTherapistList', reqVars).subscribe(async response => {
      if (response.data && response.data.therapistData) {
        this.therapistList = response.data.therapistData;
        this.cdr.detectChanges();
      }
    })
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