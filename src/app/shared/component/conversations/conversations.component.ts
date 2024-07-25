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
  chatUserList:any= []
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
    avatar:"",
    lastMessage:null
  }

  messages: any = [];
  isTyping: boolean = false
  typingIndicator: string | null = null;
  typingIndicatorSenderId: string = '';
  typingIndicatorTimer: any;
  messageListenerID: string = "chatlist_message_"+ new Date().getTime();
  userListenerID: string = "chatlist_user_"+ new Date().getTime();

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
    this.realTimeListener()
  }

  /* ====================================================================================
    Comet chat USER related functions 
  */
  async getCometChatUsers(){
    let cometChatUsers:any = await this.userService.getCometChatUsers().catch((_res) => [])
    console.log("cometChatUsers>>>",cometChatUsers)
    if(cometChatUsers.length){
      this.chatUserList = await this.getUserWithLastConversation(cometChatUsers)
      console.log("userDataWithConversation>>>",this.chatUserList)
      this.firstUserChat(this.chatUserList[0])
    }
  }

  async firstUserChat(userData:any){
    this.userData = userData
    const previousMessage = await this.messageService.getPreviousMessages(userData.uid)
    console.log("previousMessage>>>",previousMessage)
    this.messages = (previousMessage as any[])
    console.log("firstUserChat this.messages>>>",this.messages);
  }

  async getUserWithLastConversation(userData:any){
    let conversations:any = await this.messageService.getUserConversations()
    console.log("conversations>>>",conversations)
    let mergedArray:any = userData.map((item:any) => {
      let match = conversations.find((element:any) => element.conversationId == item.conversationId);
      return {
        ...item,
        lastMessage: match ? match.lastMessage : null
      };
    });
    return mergedArray
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
    let searchedUserList:any = await this.userService.getCometChatUsers(searchQuery).catch((_res) => [])
    if(searchedUserList){
      this.chatUserList = await this.getUserWithLastConversation(searchedUserList)
    }
  }

  async onUserSelected(userData: any) {
    this.userData = userData
    const previousMessage = await this.messageService.getPreviousMessages(userData.uid)
    console.log("previousMessage>>>",previousMessage)
    this.messages = (previousMessage as any[])
  }  

  /* ====================================================================================
    Comet chat MESSAGE related functions 
  */
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

  /* ====================================================================================
    Real Time Listener Function
  */
  realTimeListener(){
    // Message Listener
    let listenerID = this.messageListenerID;
    CometChat.addMessageListener(
      listenerID,
      new CometChat.MessageListener({
          onTextMessageReceived: (textMessage: CometChat.TextMessage) => {
              console.log("Text message received successfully", textMessage);
              if (textMessage) {
                this.messages = [...this.messages, textMessage as any];
              }
          },
          onTypingStarted: (typingIndicator: CometChat.TypingIndicator) => {
            console.log("RealTime Typing started :", typingIndicator);
            let typingIndicatorData: any = typingIndicator
            this.typingIndicatorSenderId = typingIndicatorData.sender.uid
            this.isTyping = true;
            this.typingIndicator = typingIndicatorData.sender
          },
          onTypingEnded: (typingIndicator: CometChat.TypingIndicator) => {
              console.log("RealTime Typing ended :", typingIndicator);
              let typingIndicatorData: any = typingIndicator
              this.typingIndicatorSenderId = typingIndicatorData.sender.uid
              this.isTyping = false;
              this.typingIndicator = null
          }
      })
    );

    // User Listener
    CometChat.addUserListener(
      this.userListenerID,
      new CometChat.UserListener({
        onUserOnline: (onlineUser: CometChat.User) => {
          console.log("On User Online:", { onlineUser });
          this.updateUserPresence(onlineUser, true)
        },
        onUserOffline: (offlineUser: CometChat.User) => {
          console.log("On User Offline:", { offlineUser });
          this.updateUserPresence(offlineUser, false)
        },
      })
    );
  }

  updateUserPresence(user:any, isOnline:boolean) {
    const userIndex = this.chatUserList.findIndex((u:any) => u.uid == user.uid);
    if (userIndex !== -1) {
      this.chatUserList[userIndex].status = isOnline ? 'online' : 'offline';
    }
  }

  startUserTyping(receiverId: string) {
    clearTimeout(this.typingIndicatorTimer);
    // receiverId ---> uid of reciever user
    let receiverType: string = CometChat.RECEIVER_TYPE.USER;
    let typingNotification: CometChat.TypingIndicator = new CometChat.TypingIndicator(receiverId, receiverType);
    CometChat.startTyping(typingNotification);
  }

  stopUserTyping(receiverId: string) {
    this.typingIndicatorTimer = setTimeout(() => {
      // receiverId ---> uid of reciever user
      let receiverType: string = CometChat.RECEIVER_TYPE.USER;
      let typingNotification: CometChat.TypingIndicator = new CometChat.TypingIndicator(receiverId, receiverType);
      CometChat.endTyping(typingNotification);
    }, 1000);
  }

  /* ====================================================================================
    OTHER functions 
  */
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
    let listenerID = this.messageListenerID;;
    CometChat.removeMessageListener(listenerID);
    CometChat.removeUserListener(this.userListenerID);
  }
}
