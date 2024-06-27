import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { appointmentStatus, pageSize, pageSizeOptions, practiceLocations, s3Details } from 'src/app/config';
import { validationMessages } from 'src/app/utils/validation-messages';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';

export interface PeriodicElement {
  info: string;
  referred: string;
  action: string;
}
const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrl: './referrals.component.scss'
})
export class ReferralsComponent {
  displayedColumns: string[] = ['info', 'referred', 'action'];
  referralList = new MatTableDataSource(ELEMENT_DATA);

  appointmentStatus: any = appointmentStatus
  practiceLocations: any = practiceLocations
  validationMessages: any = validationMessages

  orderBy: any = { createdAt: -1 }
  whereCond: any = {}

  totalCount = 0
  pageIndex = 0
  pageSize = pageSize
  pageSizeOptions = pageSizeOptions
  appointmentList: any
  seachByName: any = ''
  appStatusVal: any = ''
  practiceLocVal: any = ''

  maxToDate: any
  maxSentDate: any

  constructor(public dialog: MatDialog, private authService: AuthService,
    public commonService: CommonService, private router: Router) {
  }

  ngOnInit() {
    let todayDate = this.commonService.getMaxAppoinmentFutureMonths()
    this.maxToDate = todayDate
    this.maxSentDate = todayDate
    this.getReferralList()
  }

  async getReferralList(action = '') {
    if (action == '') {
      this.commonService.showLoader()
    }

    let reqVars = {
      queryMatch: this.whereCond,
      order: this.orderBy,
      limit: this.pageSize,
      offset: (this.pageIndex * this.pageSize)
    }

    await this.authService.apiRequest('post', 'referral/getReferralList', reqVars).subscribe(async response => {
      this.commonService.hideLoader()
      console.log(response.data)
      this.totalCount = response.data.totalCount
      let finalData: any = []
      await response.data.referralList.map((element: any) => {
        let newColumns = {
          id: element._id,
          referredBy: element.referredBy,
          sentOn: element.createdAt,
          fullName: element.patientInfo.firstName + " " + element.patientInfo.lastName,
          email: element.patientInfo.email,
          profileImage: s3Details.awsS3Url + s3Details.userProfileFolderPath + element.patientInfo.profileImage,
          status: element.appointment.status,
          appointmentDate: element.appointment.appointmentDate,
          practiceLocation: element.appointment.practiceLocation,
          intakeFormSubmit: element.appointment.intakeFormSubmit,
          therapistName: element.therapist ? element.therapist.firstName + " " + element.therapist.lastName : "NA",
        }
        finalData.push(newColumns)
      })

      this.referralList = new MatTableDataSource(finalData)
    })
  }

  onDateChange(event: any, colName: any) {
    // if (colName == 'fromDate') {
    //   this.minToDate = new Date(event.target.value)
    // }
    // let dateCond
    // if (this.fromDate && this.toDate) {
    //   dateCond = {
    //     appointmentDate: {
    //       $gte: this.fromDate,
    //       $lte: this.toDate
    //     }
    //   }
    // } else {
    //   if (this.fromDate) {
    //     dateCond = {
    //       appointmentDate: { $gte: this.fromDate }
    //     }
    //   } else {
    //     dateCond = {
    //       appointmentDate: { $lte: this.toDate }
    //     }
    //   }
    // }
    //Object.assign(this.whereCond, dateCond)
    this.getReferralList('search')
  }

  searchRecords(event: any) {
    let searchStr = event.target.value.trim()
    if (searchStr != '') {
      searchStr = searchStr.replace("+", "\\+");
      let finalStr = { $regex: searchStr, $options: 'i' }
      let userQuery = {
        status: "Active",
        role: "therapist",
        $or: [{ firstName: finalStr }, { lastName: finalStr }, { email: finalStr }]
      }
    } else {
      //this.userQuery = {}
    }
    this.getReferralList('search')
  }

  handlePageEvent(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getReferralList()
  }

  reset() {
    this.whereCond = { patientId: this.authService.getLoggedInInfo('_id') }
    this.totalCount = 0
    this.pageIndex = 0
    this.pageSize = pageSize
    this.pageSizeOptions = pageSizeOptions
    this.practiceLocVal = ''
    this.appStatusVal = ''
    this.seachByName = ''
    this.getReferralList('reset')
  }

  filterDropDown(event: any, colName: any) {
    if (event.target.value != "") {
      Object.assign(this.whereCond, { [colName]: event.target.value })
    } else {
      delete this.whereCond[colName];
    }
    this.getReferralList('search')
  }

  deleteAppointment(appointmentId: any) {
    const dialogRef = this.dialog.open(AlertComponent, {
      panelClass: 'custom-alert-container',
      data: {
        warningNote: 'Do you really want to delete this appointment?'
      }
    })
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      } else {
        let query = {}
        const req_vars = {
          appointmentId: appointmentId
        }
        // this.authService.apiRequest('post', 'referral/delete', req_vars).subscribe(async response => {
        //   if (response.error) {
        //     this.commonService.openSnackBar(response.message, "ERROR")           
        //   } else {          
        //     this.getReferralList('')
        //     this.commonService.openSnackBar(response.message, "SUCCESS")
        //   }
        // }, (err) => {
        //   console.error(err)
        // })   
      }
    })
  }


}
