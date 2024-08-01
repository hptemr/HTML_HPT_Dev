import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';   
import { AppointmentsComponent } from './appointments/appointments.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { ReportsComponent } from './report/reports/reports.component';
import { MissedNoteComponent } from './report/missed-note/missed-note.component';
import { ViewInsuranceComponent } from './view-insurance/view-insurance.component';

const routes: Routes = [ 
  {
    path: 'appointments',
    component: AppointmentsComponent, 
  },  
  {
    path: 'manage-profile',
    component:ManageProfileComponent   
  },
  {
    path: 'appointment-details',
    component:AppointmentDetailsComponent   
  },
  {
    path: 'view-insurance',
    component:ViewInsuranceComponent   
  },
  {
    path: 'patient-profile',
    component:PatientProfileComponent   
  }, 
  {
    path: 'reports', 
    children: [  
      {
        path: 'all-reports',
        component: ReportsComponent, 
      },
      {
        path: 'missed-notes',
        component: MissedNoteComponent, 
      }, 
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingTeamRoutingModule { }
