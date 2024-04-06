import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';  
import { AppointmentsComponent } from './appointments/appointments/appointments.component';
import { AppointmentDetailsComponent } from './appointments/appointment-details/appointment-details.component';

const routes: Routes = [ 
  {
    path: 'appointments',
    component: AppointmentsComponent, 
  }, 
  {
    path: 'appointment-details',
    component: AppointmentDetailsComponent, 
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
