import { Component } from '@angular/core';
import { CreateGroupComponent } from './create-group/create-group.component';
import { MatDialog } from '@angular/material/dialog';
import { AddParticipantsComponent } from './add-participants/add-participants.component';
import { UserService } from '../../../shared/services/comet-chat/user.service';
import { s3Details } from 'src/app/config';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-conversations', 
  templateUrl: './conversations.component.html',
  styleUrl: './conversations.component.scss',
})
export class ConversationsComponent { 
  chatUserList:any=[]
  defaultImage = s3Details.awsS3Url+s3Details.userProfileFolderPath+'default.png';
  searchUsers = new FormControl('');
  topUserData: any = {
    blockedByMe: false,
    conversationId: "",
    deactivatedAt: 0,
    hasBlockedMe: false,
    name: "",
    role:"",
    status:"",
    uid:"",
    image:""
  }

  constructor(
    public dialog: MatDialog,
    public userService: UserService
  ) {
    this.searchControlUsers()
  }

  ngOnInit() {
    this.getCometChatUsers()
  }

  async getCometChatUsers(){
    this.chatUserList = await this.userService.getCometChatUsers().catch((_res) => [])
    console.log("this.chatUserList>>>",this.chatUserList)
    if(this.chatUserList.length){
      this.getTopUserDetails(this.chatUserList[0])
    }
  }

  getTopUserDetails(topUserData:any){
    console.log("topUserData>>>",topUserData)
    this.topUserData = topUserData
  }

  searchControlUsers(){
    this.searchUsers.valueChanges
    .pipe(debounceTime(300)) // Debounce for 300ms
    .subscribe(value => {
      // Perform search when value changes
      this.searchUsersByQuery(value);
    });
  }

  async searchUsersByQuery(searchQuery: any) {
    this.chatUserList = await this.userService.getCometChatUsers(searchQuery).catch((_res) => [])
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
