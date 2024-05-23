import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-write-comment-modal',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatDialogModule, CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
  templateUrl: './write-comment-modal.component.html',
  styleUrl: './write-comment-modal.component.scss'
})
export class WriteCommentModalComponent {

}
