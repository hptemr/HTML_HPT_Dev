import { Component } from '@angular/core';
import { CreateGroupComponent } from './create-group/create-group.component';
import { MatDialog } from '@angular/material/dialog';
import { AddParticipantsComponent } from './add-participants/add-participants.component';
import { UserService } from '../../../shared/services/comet-chat/user.service';

@Component({
  selector: 'app-conversations', 
  templateUrl: './conversations.component.html',
  styleUrl: './conversations.component.scss',
})
export class ConversationsComponent { 

  constructor(
    public dialog: MatDialog,
    public userService: UserService
  ) {}

  ngOnInit() {
  }

  createGroup() {
    const dialogRef = this.dialog.open(CreateGroupComponent,{
      panelClass: 'create--group--wrapper', 
    });
  }

  addParticipants() {
    const dialogRef = this.dialog.open(AddParticipantsComponent,{
      panelClass: 'create--group--wrapper', 
    });
  }
}
