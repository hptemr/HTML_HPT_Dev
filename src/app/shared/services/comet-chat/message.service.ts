import { Injectable } from '@angular/core';
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { cometChatCredentials } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  constructor(
  ) { 
  }

  SendMessage(receiverUID: string, message: string) {
    return new Promise((resolve, reject) => {
        let receiverID: string = receiverUID,
        messageText: string = message,
        receiverType: string = CometChat.RECEIVER_TYPE.USER,
        textMessage: CometChat.TextMessage = new CometChat.TextMessage(
        receiverID,
        messageText,
        receiverType
        );
    
        CometChat.sendMessage(textMessage).then(
            (message) => {
                console.log("Message sent successfully:", message);
                resolve(message)
            },
            (error: CometChat.CometChatException) => {
                console.log("Message sending failed with error:", error);
                reject()
            }
        );
    });
  }

}
