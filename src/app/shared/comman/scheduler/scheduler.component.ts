import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
import { s3Details, practiceLocations,pageSize, appointmentStatus } from 'src/app/config';
@Component({
  selector: 'app-scheduler', 
  templateUrl: './scheduler.component.html',
  styleUrl: './scheduler.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      h3 {
        margin: 0 0 10px;
      }

      pre {
        background-color: #f5f5f5;
        padding: 15px;
      }
    `,
  ],
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
  pageIndex = 0
  pageSize = 1000
  totalCount = 0
  appointmentsList: any
  constructor(private router: Router, public dialog: MatDialog, private modal: NgbModal,public authService: AuthService,public commonService: CommonService) { }

  ngOnInit() {
    this.getAppointmentList('')
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

  selected: Date | null;

  createAppointmen(){
    const dialogRef = this.dialog.open(CreateAppointmentModalComponent,{
      disableClose: true,
      width:'1260px',
      panelClass: [ 'modal--wrapper'],
    });
  }
  editAppointment(){
    const dialogRef = this.dialog.open(EditAppointmentModalComponent,{
      width:'1260px',
      panelClass: [ 'modal--wrapper'],
    });
  }
  appointmentDetailsModal(){
    const dialogRef = this.dialog.open(AppointmentDetailsModalComponent,{
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

  actionsnew: CalendarEventAction[] = [];

  actions: CalendarEventAction[] = [
      {
        label: '<i class="fas fa-fw fa-pencil-alt"></i>',
        a11yLabel: 'Edit',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.handleEvent('Edited', event);
        },
      },
      {
        label: '<i class="fas fa-fw fa-trash-alt"></i>',
        a11yLabel: 'Delete',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.events = this.events.filter((iEvent) => iEvent !== event);
          this.handleEvent('Deleted', event);
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
  
  
  activeDayIsOpen: boolean = true; 
  
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {    
    console.log('active Day Is Open>>>>',this.activeDayIsOpen,' ######>>>>',this.viewDate)      
      if (isSameMonth(date, this.viewDate)) {
        if (
          (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
          events.length === 0
        ) {
          this.activeDayIsOpen = false;
        } else {
          this.activeDayIsOpen = true;
        }
        this.viewDate = date;
      }

    console.log(this.activeDayIsOpen,'viewDate>>>>',this.viewDate)      
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
      this.handleEvent('Dropped or resized', event);
  }
  
  handleEvent(action: string, event: CalendarEvent): void {
      this.modalData = { event, action };
      this.modal.open(this.modalContent, { size: 'lg' });
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

  searchRecords(colName: string, event: any) {
      if (event && event != '') {
        Object.assign(this.whereCond, { [colName]: { $in: event } })
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
      fields: { _id: 1, patientId: 1, therapistId: 1, appointmentId: 1, status: 1, caseName: 1, createdAt: 1, updatedAt: 1, practiceLocation: 1, appointmentDate: 1, checkIn: 1 },
      patientFields: { firstName: 1, lastName: 1, email: 1, status: 1, profileImage: 1, practiceLocation: 1 },
      order: this.orderBy,
      limit: this.pageSize,
      offset: (this.pageIndex * this.pageSize)
    }
    await this.authService.apiRequest('post', 'appointment/getCaseList', reqVars).subscribe(async response => {
      this.commonService.hideLoader()
      this.totalCount = response.data.totalCount
      let finalData: any = []
      if (response.data.appointmentList.length > 0) {
        await response.data.appointmentList.map((element: any) => {
          let newColumns = {
            id: element._id,
            practiceLocation: element.practiceLocation,
            appointmentId: element.appointmentId,
            checkIn: element.checkIn,
            createdAt: element.updatedAt,
            appointmentDate: element.appointmentDate,
            status: element.status,
            caseName: element.caseName,
            statusFlag: element.status.charAt(0).toLowerCase() + element.status.slice(1),
            patientName: element.patientObj[0]?.firstName + " " + element.patientObj[0]?.lastName,
            profileImage: s3Details.awsS3Url + s3Details.userProfileFolderPath + element.patientObj[0]?.profileImage,
          }
          finalData.push(newColumns)
        })
      }     
      this.appointmentsList = finalData;
      this.appointmentsEventsList();
     // console.log('>>>>> Appointments List >>>>',this.appointmentsList)

    })
  }


  async appointmentsEventsList(){
    
    // console.log('>>>>> 11111 >>>>',subDays(startOfDay(new Date()), 1));

    // console.log('>>>>> 22222 >>>>', addDays(new Date(), 1));



    let eventArray: any = []
    this.appointmentsList.forEach((element:any) => {
      let appointmentDate = subDays(startOfDay(new Date(element.appointmentDate)), 1)
      let appointmentEndDate = addDays(new Date(element.appointmentEndTime ? element.appointmentEndTime : element.appointmentDate), 1)
      let newColumns = {
        start:appointmentDate,
        end: appointmentEndDate,
        title: element.patientName,
        color: { ...colors['red'] },
        actions: this.actions,
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

    this.activeDayIsOpen = false;
  
    console.log(' >>>  actions>>>',this.actions)

    // this.events = [
    //   {
    //     start: subDays(startOfDay(new Date()), 1),
    //     end: addDays(new Date(), 1),
    //     title: 'A 3 day event',
    //     color: { ...colors['red'] },
    //     actions: this.actions,
    //     allDay: true,
    //     resizable: {
    //       beforeStart: true,
    //       afterEnd: true,
    //     },
    //     draggable: false,
    //   },
    //   {
    //     start: startOfDay(new Date()),
    //     title: 'An event with no end date',
    //     color: { ...colors['yellow'] },
    //     actions: this.actions,
    //   },
    //   {
    //     start: subDays(endOfMonth(new Date()), 3),
    //     end: addDays(endOfMonth(new Date()), 3),
    //     title: 'A long event that spans 2 months',
    //     color: { ...colors['blue'] },
    //     allDay: true,
    //   },
    //   {
    //     start: addHours(startOfDay(new Date()), 2),
    //     end: addHours(new Date(), 2),
    //     title: 'A draggable and resizable event',
    //     color: { ...colors['yellow'] },
    //     actions: this.actions,
    //     resizable: {
    //       beforeStart: true,
    //       afterEnd: true,
    //     },
    //     draggable: false,
    //   },
    // ];



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