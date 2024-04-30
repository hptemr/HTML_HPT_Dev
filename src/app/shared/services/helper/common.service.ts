import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GeneralService } from '../../../shared/services/api/general.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    public snackBar: MatSnackBar,
    public generalService :GeneralService,
    private route: ActivatedRoute
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

  // ***** This function use for dynamic user listing bases on role. Taking userRole same as manage in user database. *****
  getUserRoleBaseOnUrlSegment(currentUrlSegments:any): any {
    let roleObj = { userRole:'', profileUrlSegment:'', pageTitle:'' }
    const userUrlSegments = ['practice-admin', 'therapists','support-team','billing-team'];
    const urlSeg = currentUrlSegments.map((segment:any) => segment.path);
    let matchingSegment = urlSeg.find((segment:any) => userUrlSegments.includes(segment));
    if (matchingSegment) {
      switch (matchingSegment) {
        case 'practice-admin':
          return { userRole:'practice_admin', profileUrlSegment:'practice-admin-profile', pageTitle:'Practice Admin' }
        case 'therapists':
          return { userRole:'therapist', profileUrlSegment:'therapist-admin-profile', pageTitle:'Therapist' }
        case 'support-team':
          return { userRole:'support_team', profileUrlSegment:'', pageTitle:'Support Team' }
        case 'billing-team': 
          return { userRole:'billing_admin', profileUrlSegment:'', pageTitle:'Billing Team' }
        default:
          return roleObj;
      }
    }
    return roleObj;
  }

}
