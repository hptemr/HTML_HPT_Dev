import { Component } from '@angular/core';
import { CreateGroupComponent } from './create-group/create-group.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-conversations', 
  templateUrl: './conversations.component.html',
  styleUrl: './conversations.component.scss'
})
export class ConversationsComponent { 

  constructor(public dialog: MatDialog) {}

  createGroup() {
    const dialogRef = this.dialog.open(CreateGroupComponent,{
      panelClass: 'create--group--wrapper', 
    });
  }
}
