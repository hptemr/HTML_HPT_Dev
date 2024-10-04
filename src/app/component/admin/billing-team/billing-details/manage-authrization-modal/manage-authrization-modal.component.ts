import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-manage-authrization-modal',
  standalone: true,
  imports: [MatInputModule ,MatIconModule, MatButtonModule, MatDialogModule, MatTableModule, MatCheckboxModule, MatRadioModule, MatDatepickerModule],

  templateUrl: './manage-authrization-modal.component.html',
  styleUrl: './manage-authrization-modal.component.scss'
})
export class ManageAuthrizationModalComponent {

}
