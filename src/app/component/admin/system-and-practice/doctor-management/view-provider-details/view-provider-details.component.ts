import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-view-provider-details',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatDialogModule, MatTableModule, MatCheckboxModule],
  templateUrl: './view-provider-details.component.html',
  styleUrl: './view-provider-details.component.scss'
})
export class ViewProviderDetailsComponent {
  providerDetails: any 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.providerDetails = data.providerDetails
  }

}
