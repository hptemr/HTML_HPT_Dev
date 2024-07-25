import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TherapistRoutingModule } from './therapist-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    TherapistRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgSelectModule
  ]
})
export class TherapistModule { }
