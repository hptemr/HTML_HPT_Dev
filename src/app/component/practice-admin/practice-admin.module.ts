import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { SharedModule } from 'src/app/shared/shared.module';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { PracticeAdminRoutingModule } from './practice-admin-routing.module';
 

@NgModule({
  declarations: [ 
  ],
  imports: [
    CommonModule,
    PracticeAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    SharedModule,  
  ]
})
export class PracticeAdminModule { }
