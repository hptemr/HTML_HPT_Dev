import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GeneralService } from '../../../shared/services/api/general.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    public snackBar: MatSnackBar,
    public generalService :GeneralService
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

}
