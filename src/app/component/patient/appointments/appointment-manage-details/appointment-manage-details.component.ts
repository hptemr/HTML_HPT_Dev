 

 
import { Component, ViewChild } from '@angular/core'; 
import { FormBuilder } from '@angular/forms'; 
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

 
@Component({
  selector: 'app-appointment-manage-details', 
  templateUrl: './appointment-manage-details.component.html',
  styleUrl: './appointment-manage-details.component.scss'
})
export class AppointmentManageDetailsComponent { 
  selectedTab = 0;
  model: NgbDateStruct;

  constructor(private _formBuilder: FormBuilder ) {} 

  gotostep2() {
    this.selectedTab = 1  
  }
  backtoTab1(){
    this.selectedTab = 0  
  }
  gotostep3() {
    this.selectedTab = 2  
  }
  backtoTab2(){
    this.selectedTab = 1  
  }
  

}
