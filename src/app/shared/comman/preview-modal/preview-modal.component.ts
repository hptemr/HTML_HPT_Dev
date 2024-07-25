import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-preview-modal',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatDialogModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './preview-modal.component.html',
  styleUrl: './preview-modal.component.scss'
})
export class PreviewModalComponent {

}
