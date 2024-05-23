import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-reschedule-appointment-modal',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatDialogModule, CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
  templateUrl: './reschedule-appointment-modal.component.html',
  styleUrl: './reschedule-appointment-modal.component.scss'
})
export class RescheduleAppointmentModalComponent {
  model: NgbDateStruct;
}
