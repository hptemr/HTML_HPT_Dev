import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-view-insu-details-modal',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatDialogModule, MatTableModule, MatCheckboxModule],
  templateUrl: './view-insu-details-modal.component.html',
  styleUrl: './view-insu-details-modal.component.scss'
})
export class ViewInsuDetailsModalComponent {
  
}
