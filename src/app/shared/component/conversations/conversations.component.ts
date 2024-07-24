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
import { DatePipe } from '@angular/common';
import { AuthService } from '../../services/api/auth.service';
@Component({
  selector: 'app-conversations', 
  templateUrl: './conversations.component.html',
  styleUrl: './conversations.component.scss',
})
export class ConversationsComponent { 
  loginUserId:string =""
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

  messages: any = [];
  // messages: CometChat.TextMessage[] = [];
  // messages: CometChat.TextMessage[] | null = null; 

  constructor(
    public dialog: MatDialog,
    public userService: UserService,
    public messageService: MessageService,
    public datePipe: DatePipe,
    private authService: AuthService,
  ) {
    this.searchControlUsers()
    this.loginUserId = this.authService.getLoggedInInfo('_id')
  }

  ngOnInit() {
    this.getCometChatUsers()
    this.realTimeMessageListener()
  }

  async getCometChatUsers(){
    this.chatUserList = await this.userService.getCometChatUsers().catch((_res) => [])
    console.log("this.chatUserList>>>",this.chatUserList)
    if(this.chatUserList.length){
      this.firstUserChat(this.chatUserList[0])
    }
  }

  async firstUserChat(userData:any){
    this.userData = userData
    const previousMessage = await this.messageService.getPreviousMessages(userData.uid)
    console.log("previousMessage>>>",previousMessage)
    this.messages = (previousMessage as any[])
    console.log("firstUserChat this.messages>>>",this.messages);
    const conversations = await this.messageService.getUserConversations()
    console.log("conversations>>>",conversations)
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
    const previousMessage = await this.messageService.getPreviousMessages(userData.uid)
    console.log("previousMessage>>>",previousMessage)
    this.messages = (previousMessage as any[])
  }  

  async sendMessage(userData: any, message: any) {
    console.log("message>>>",message);
    const sentMessage = await this.messageService.sendMessage(userData.uid, message)
    console.log("sentMessage>>>",sentMessage);
    if (sentMessage) {
      this.messages = [...this.messages, sentMessage as any];
    }
    console.log("sendMessage this.messages>>>",this.messages);
    this.chatMessageText = ""
  }

  // Real Time Message Listener
  realTimeMessageListener(){
    let listenerID = "UNIQUE_LISTENER_ID";
    CometChat.addMessageListener(
      listenerID,
      new CometChat.MessageListener({
          onTextMessageReceived: (textMessage: CometChat.TextMessage) => {
              console.log("Text message received successfully", textMessage);
              if (textMessage) {
                this.messages = [...this.messages, textMessage as any];
              }
          }
      })
    );
  }

  formatMessageDate(timestamp: number){
    const currentDate = new Date();
    const messageDate = new Date(timestamp * 1000);
    if (
      messageDate.getDate() === currentDate.getDate() &&
      messageDate.getMonth() === currentDate.getMonth() &&
      messageDate.getFullYear() === currentDate.getFullYear()
    ) {
      return 'Today, ' + this.datePipe.transform(messageDate, 'hh:mm a');
    }
    const currentWeekStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay());
    const currentWeekEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + (6 - currentDate.getDay()));
    if (messageDate >= currentWeekStart && messageDate <= currentWeekEnd) {
      return this.datePipe.transform(messageDate, 'EEE') + ', ' + this.datePipe.transform(messageDate, 'hh:mm a');
    }
    return this.datePipe.transform(messageDate, 'M/dd/yyyy, hh:mm a');
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

  ngOnDestroy() {
    console.log("<<<ngOnDestroy Calll>>>")
    let listenerID: string = "UNIQUE_LISTENER_ID";
    CometChat.removeMessageListener(listenerID);
  }
}
