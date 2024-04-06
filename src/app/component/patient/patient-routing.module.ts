import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';  
import { AppointmentsComponent } from './appointments/appointments/appointments.component';

const routes: Routes = [ 
  {
    path: 'appointments',
    component: AppointmentsComponent, 
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
