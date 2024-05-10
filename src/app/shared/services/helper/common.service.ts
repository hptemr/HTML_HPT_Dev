import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GeneralService } from '../../../shared/services/api/general.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../api/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { urlSegmentAndUserRole } from 'src/app/config';
import { MatDialog } from '@angular/material/dialog';
import { LoaderComponent } from '../../component/loader/loader.component';
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
    public dialog: MatDialog
  ) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
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
      redirect = 'system-admin/manage-profile'
    } else if (user_type == "practice_admin") {
      redirect = 'practice-admin/manage-profile'
    } else if (user_type == "support_team") {
      redirect = 'support-team/manage-profile'
    } else if (user_type == "therapist") {
      redirect = 'therapist/manage-profile'
    } else if (user_type == "billing_team") {
      redirect = 'billing-team/manage-profile'
    } else if (user_type == "patient") {
      redirect = 'patient/profile-details'
    } else {
      redirect = 'signin'
    }
    //this.router.navigate(['/' + redirect])
    window.location.href = '/' + redirect //For Idle case execution, we used this. don't changed
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
    let returnObj = { userType: '' }
    console.log('>>>>>>> Role >>>>>>>>>',role)
    if (role) {
      switch (role) {
        case 'system_admin':
          return { userType: 'System Admin' }
        case 'practice_admin':
          return { userType: 'Practice Admin' }
        case 'therapist':
          return { userType: 'Therapist' }
        case 'support_team':
          return { userType: 'Support Team' }
        case 'billing_team':
          return { userType: 'Billing Team' }
        case 'patient':
          return { userType: 'Patient' }
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

  hideLoader(timer = 500) {
    setTimeout(() => {
      this.LoaderComponentRef.close()
    }, timer);
  }

}
