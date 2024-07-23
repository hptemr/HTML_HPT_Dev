import { Component } from '@angular/core';
import { CreateGroupComponent } from './create-group/create-group.component';
import { MatDialog } from '@angular/material/dialog';
import { AddParticipantsComponent } from './add-participants/add-participants.component';
import { UserService } from '../../../shared/services/comet-chat/user.service';
import { s3Details } from 'src/app/config';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { MessageService } from '../../../shared/services/comet-chat/message.service';
import { CometChat } from "@cometchat/chat-sdk-javascript";
@Component({
  selector: 'app-conversations', 
  templateUrl: './conversations.component.html',
  styleUrl: './conversations.component.scss',
})
export class ConversationsComponent { 
  chatUserList:any=[]
  defaultAvatar = s3Details.awsS3Url+s3Details.userProfileFolderPath+'default.png';
  searchUsers = new FormControl('');
  chatMessageText: string = '';
  userData: any = {
    blockedByMe: false,
    conversationId: "",
    deactivatedAt: 0,
    hasBlockedMe: false,
    name: "",
    role:"",
    status:"",
    uid:"",
    avatar:""
  }

  messages: CometChat.TextMessage[];

  constructor(
    public dialog: MatDialog,
    public userService: UserService,
    public messageService: MessageService
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
      this.byDefaultOpenFirstUserChat(this.chatUserList[0])
    }
  }

  byDefaultOpenFirstUserChat(userData:any){
    this.userData = userData
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

  async onUserSelected(userData: any) {
    this.userData = userData
  }  

  async sendMessage(userData: any, message: any) {
    console.log("message>>>",message);
    console.log("userData>>>",userData);
    const sentMessage = this.messageService.SendMessage(userData.uid, message)
    if (sentMessage) {
      this.messages = [...this.messages, sentMessage as any];
    }
    this.chatMessageText = ""
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
