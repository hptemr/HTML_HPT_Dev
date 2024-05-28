import { Component } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ContactModalComponent } from '../contact-modal/contact-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { practiceLocations } from 'src/app/config';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss'
})
export class Step1Component {
  model: NgbDateStruct;
  selectedValue: number;

  step1Form: FormGroup;
  step1FormData: any

  constructor(public dialog: MatDialog, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.step1FormData = localStorage.getItem("step1FormData")
    this.loadForm()
  }

  onChange(event: MatRadioChange) {
    this.selectedValue = event.value
  }


  loadForm() {
    this.step1Form = this.fb.group({
      practiceLocation: [this.step1FormData ? this.step1FormData.practiceLocation : '', [Validators.required]],
      appointmentDate: [this.step1FormData ? this.step1FormData.appointmentDate : '', [Validators.required]],
      bookingFor: [this.step1FormData ? this.step1FormData.bookingFor : '', [Validators.required]],
      relationWithPatient: [this.step1FormData ? this.step1FormData.relationWithPatient : '', [Validators.required]],
      firstName: [this.step1FormData ? this.step1FormData.firstName : '', [Validators.required]],
      middleName: [this.step1FormData ? this.step1FormData.middleName : ''],
      lastName: [this.step1FormData ? this.step1FormData.lastName : '', [Validators.required]],
      dob: [this.step1FormData ? this.step1FormData.dob : '', [Validators.required]],
      martialStatus: [this.step1FormData ? this.step1FormData.martialStatus : '', [Validators.required]],
      gender: [this.step1FormData ? this.step1FormData.gender : '', [Validators.required]],
      email: [this.step1FormData ? this.step1FormData.email : '', [Validators.required]],
      phoneNumber: [this.step1FormData ? this.step1FormData.phoneNumber : '', [Validators.required]],
      cellPhoneNumber: [this.step1FormData ? this.step1FormData.cellPhoneNumber : ''],
      workExtension: [this.step1FormData ? this.step1FormData.workExtension : ''],
    });
  }


  contactModal() {
    const dialogRef = this.dialog.open(ContactModalComponent, {
      panelClass: 'custom-alert-container',
    });
  }
}
