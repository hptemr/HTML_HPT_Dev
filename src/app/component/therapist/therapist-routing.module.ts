import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';  
import { AppointmentsComponent } from './appointments/appointments.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { AppointmentRequestsComponent } from './appointment-requests/appointment-requests.component';
import { AdditionalFormComponent } from './additional-form/additional-form.component';
import { SubjectiveComponent } from './initial-examination/subjective/subjective.component';
import { ObjectiveComponent } from './initial-examination/objective/objective.component';
import { AssessmentComponent } from './initial-examination/assessment/assessment.component';
import { PlanComponent } from './initial-examination/plan/plan.component';
import { BillingComponent } from './initial-examination/billing/billing.component';
 
const routes: Routes = [ 
  {
    path: 'appointments',
    component:AppointmentsComponent   
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
    path: 'patient-profile',
    component:PatientProfileComponent   
  },
  {
    path: 'appointment-requests',
    component:AppointmentRequestsComponent   
  }, 
  {
    path: 'additional-form',
    component:AdditionalFormComponent   
  }, 
  {
    path: 'initial-examination',
    children: [  
      {
        path: 'subjective',
        component: SubjectiveComponent, 
      }, 
      {
        path: 'objective',
        component: ObjectiveComponent, 
      },
      {
        path: 'assessment',
        component: AssessmentComponent, 
      },
      {
        path: 'plan',
        component: PlanComponent, 
      },
      {
        path: 'billing',
        component: BillingComponent, 
      },
    ]
  },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TherapistRoutingModule { }
