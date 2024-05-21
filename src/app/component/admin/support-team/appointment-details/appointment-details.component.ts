import { Component } from '@angular/core';
import { SystemFollowupModalComponent } from '../system-followup-modal/system-followup-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-appointment-details', 
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.scss'
})
export class AppointmentDetailsComponent {
  constructor(public dialog: MatDialog,private navigationService: NavigationService,private router: Router, private route: ActivatedRoute) {}

  getPreviousPageLink(): string | null {
    if(this.navigationService.getPreviousUrl()){
      return this.navigationService.getPreviousUrl();
    }else{
      return "/support-team/dashboard";
      
    }
    
  }

  systemFollowup() {
    const dialogRef = this.dialog.open(SystemFollowupModalComponent,{
      panelClass: 'custom-alert-container', 
    });
  }
}
