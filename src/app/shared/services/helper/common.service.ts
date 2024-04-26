import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GeneralService } from '../../../shared/services/api/general.service';
import { Router } from '@angular/router';
import { AuthService } from '../api/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    public generalService: GeneralService,
    public authService: AuthService,

  ) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  // ************* Get practice location *********************
  getPracticeLocation() {
    let _that = this
    return new Promise(function (resolve, reject) {
      _that.generalService.getPracticeLocation().subscribe({
        next: (res) => {
          let practiceLocationData: any = []
          if (res && !res.error) {
            practiceLocationData = res.data.length ? res.data.map((item: any) => ({ locationCode: item.locationCode, location: item.location })) : [];
          }
          resolve(practiceLocationData)
        }, error: (_err) => {
          reject()
        }
      });
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
      redirect = 'system-signin'
    } else if (user_type == "practice_admin") {
      redirect = 'practice-admin'
    } else if (user_type == "support_team") {
      redirect = 'support-team'
    } else if (user_type == "therapist") {
      redirect = 'therapist'
    } else if (user_type == "billing_team") {
      redirect = 'billing-team'
    } else {
      redirect = 'signin'
    }
    this.router.navigate(['/' + redirect])
  }

}
