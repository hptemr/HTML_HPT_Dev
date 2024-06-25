import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SupportTeamRoutingModule } from './support-team-routing.module';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SupportTeamRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DatePipe
  ]
})
export class SupportTeamModule { }
