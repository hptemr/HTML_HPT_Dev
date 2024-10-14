import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GeneralService } from '../../../shared/services/api/general.service';
import { Router } from '@angular/router';
import { AuthService } from '../api/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { maxAppoinmentFutureMonths, urlSegmentAndUserRole } from 'src/app/config';
import { MatDialog } from '@angular/material/dialog';
import { LoaderComponent } from '../../component/loader/loader.component';
import { AdminService } from '../api/admin.service';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private userProfileSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  LoaderComponentRef: any

  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    public generalService: GeneralService,
    public authService: AuthService,
    public dialog: MatDialog,
    public adminService: AdminService,
    public datePipe: DatePipe
  ) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  // ************* Formated US phone no *********************
  formatPhoneNumber(input: string): string {
    const cleaned = input.replace(/\D/g, ''); // Remove non-numeric characters
    let formattedNumber = '';
    if (cleaned.length >= 3) {
      formattedNumber += `(${cleaned.slice(0, 3)})`;
      if (cleaned.length > 3) {
        formattedNumber += ` ${cleaned.slice(3, 6)}`;
        if (cleaned.length > 6) {
          formattedNumber += `-${cleaned.slice(6, 10)}`;
        }
      }
    }
    return formattedNumber;
  }

  public formatDate(date: Date) {
    if (date && date != undefined) {
      const d = new Date(date)
      const month = "Jan,Feb,Mar,Apr,May,June,July,Aug,Sept,Oct,Nov,Dec".split(",")[d.getMonth()]
      return month + " " + d.getDate() + ", " + d.getFullYear()
    } else {
      return 'NA'
    }
  }

  public capitalize = function (str: any) {
    if (str && str != "") {
      var firstLetter = str.substr(0, 1);
      return firstLetter.toUpperCase() + str.substr(1);
    } else {
      return ""
    }
  }

  redirectToHome() {
    let redirect = ''
    let user_type = this.authService.getLoggedInInfo('role')
    if (user_type == "system_admin") {
      redirect = 'system-admin/dashboard'
    } else if (user_type == "practice_admin") {
      redirect = 'practice-admin/dashboard'
    } else if (user_type == "support_team") {
      redirect = 'support-team/dashboard'
    } else if (user_type == "therapist") {
      redirect = 'therapist/dashboard'
    } else if (user_type == "billing_team") {
      redirect = 'billing-team/dashboard'
    } else if (user_type == "patient") {
      redirect = 'patient/appointments'
    } else {
      redirect = 'admin/login'
    }
    this.router.navigate(['/' + redirect])
    // window.location.href = '/' + redirect //For Idle case execution, we used this. don't changed
  }

  //get first route based on logged in user
  getLoggedInRoute() {
    let redirect = ''
    let user_type = this.authService.getLoggedInInfo('role')
    if (user_type == "system_admin") {
      redirect = 'system-admin'
    } else if (user_type == "practice_admin") {
      redirect = 'practice-admin'
    } else if (user_type == "support_team") {
      redirect = 'support-team'
    } else if (user_type == "therapist") {
      redirect = 'therapist'
    } else if (user_type == "billing_team") {
      redirect = 'billing-team'
    } else if (user_type == "patient") {
      redirect = 'patient'
    }
    return redirect
  }

  // ***** This function use for dynamic user listing bases on role. Taking userRole same as manage in user database. *****
  getUserRoleBaseOnUrlSegment(currentUrlSegments: any): any {
    let roleObj = { userRole: '', profileUrlSegment: '', pageTitle: '' }
    const urlSeg = currentUrlSegments.map((segment: any) => segment.path);
    let matchingSegment: any = urlSegmentAndUserRole.find(mapping => mapping.urlSegment === urlSeg[0]);
    if (matchingSegment && matchingSegment != null) {
      switch (matchingSegment.urlSegment) {
        case 'practice-admin':
          return { userRole: matchingSegment.userRole, profileUrlSegment: 'admin-profile', pageTitle: 'Practice Admin' }
        case 'therapists':
          return { userRole: matchingSegment.userRole, profileUrlSegment: 'admin-profile', pageTitle: 'Therapist' }
        case 'support-team':
          return { userRole: matchingSegment.userRole, profileUrlSegment: 'admin-profile', pageTitle: 'Support Team' }
        case 'billing-team':
          return { userRole: matchingSegment.userRole, profileUrlSegment: 'admin-profile', pageTitle: 'Billing Team' }
        default:
          return roleObj;
      }
    }
    return roleObj;
  }

  getUrlSegmentBaseOnRole(userRole: any) {
    const mapping: any = urlSegmentAndUserRole.find(mapping => mapping.userRole === userRole);
    return mapping.urlSegment || '';
  }

  fetchLoginUserProfile(user: any): void {
    this.userProfileSubject.next(user);
  }

  getLoginUserProfile(): Observable<any> {
    return this.userProfileSubject.asObservable();
  }

  getUserBaseOnRole(role: any): any {
    let returnObj = { userTypeLable: '' }
    if (role) {
      switch (role) {
        case 'system_admin':
          return { userTypeLable: 'System Admin' }
        case 'practice_admin':
          return { userTypeLable: 'Practice Admin' }
        case 'therapist':
          return { userTypeLable: 'Therapist' }
        case 'support_team':
          return { userTypeLable: 'Support Team' }
        case 'billing_team':
          return { userTypeLable: 'Billing Team' }
        case 'patient':
          return { userTypeLable: 'Patient' }
        default:
          return returnObj;
      }
    }
    return returnObj;
  }

  showLoader() {
    this.LoaderComponentRef = this.dialog.open(LoaderComponent, {
      width: '600px',
      data: {}
    });
  }

  hideLoader(timer = 100) {
    setTimeout(() => {
      this.LoaderComponentRef.close()
    }, timer);
  }

  // Date MM-DD-YYYY
  formattedDate = (dateObj: any) => {
    return this.padNumber(dateObj.month) + '-' + this.padNumber(dateObj.day) + '-' + dateObj.year;
  };

  // Function to pad single-digit numbers with leading zeros
  padNumber = (num: number): string => {
    return num.toString().padStart(2, '0'); // Ensures two-digit format with leading zero
  };


  getMaxAppoinmentFutureMonths() {
    let maxAppntDate = new Date()
    maxAppntDate.setMonth(maxAppntDate.getMonth() + maxAppoinmentFutureMonths);
    return maxAppntDate
  }

   displayFormatDate(date:Date,validate:boolean=false) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    if(validate){
      return `${year}-${month}-${day}T00:00`;
    }else{
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    }    
  }

  formatDateInUTC(dateval:any,dateformat:any) {
    const currentDate = new Date(dateval);
    //'EEE, MMM d, y hh:mm a'          'MM/dd/yyyy hh:mm a' 
    const utcDateString = this.datePipe.transform(currentDate, dateformat, 'UTC');
    return utcDateString;
  }

  cometChatLog(userDetails:any, apiFunction:any, messageType:any, parameter:any, error:any) {
    let body = {
      userDetails : userDetails,
      apiFunction : apiFunction,
      messageType: messageType,
      parameter:parameter,
      error:error
    }
    this.adminService.cometChatLog(body).subscribe({
      next: (_res) => { }
    })
  }

  generateRandomId(length: number) {
    const characters = '0123456789';
    let randomId = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }
    return randomId;
  }

  getRandomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max)) + min;
  }
}
