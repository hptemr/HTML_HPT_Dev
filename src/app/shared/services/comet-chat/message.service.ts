import { Injectable } from '@angular/core';
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { cometChatCredentials } from 'src/app/config';
import { CommonService } from '../helper/common.service';
@Injectable({
  providedIn: 'root'
})

export class MessageService {
  constructor(
    public commonService: CommonService,
  ) { 
  }

  sendMessage(receiverUID: string, message: string) {
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
            (message: CometChat.BaseMessage) => {
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

  // Fetch Message History of a particular one-on-one conversation
  getPreviousMessages(userId: string) {
    return new Promise((resolve, reject) => {
      let UID: string = userId,
      limit: number = 30,
      messagesRequest: CometChat.MessagesRequest = new CometChat.MessagesRequestBuilder()
          .setUID(UID)
          .setLimit(limit)
          .build();
    
      messagesRequest.fetchPrevious().then(
        (messages: CometChat.BaseMessage[]) => {
            // console.log("Message list fetched:", messages);
            resolve(messages)
        }, (error: CometChat.CometChatException) => {
            console.log("Message fetching failed with error:", error);
            reject()
        }
      );
    });
  }

  // Fetch Missed Messages of a particular one-on-one conversation
  getNextMessages(userId: string) {
    return new Promise(async (resolve, reject) => {
      let UID: string = userId,
      limit: number = 30,
      latestId: number = await CometChat.getLastDeliveredMessageId(),
      messagesRequest: CometChat.MessagesRequest = new CometChat.MessagesRequestBuilder()
          .setUID(UID)
          .setMessageId(latestId)
          .setLimit(limit)
          .build();

      messagesRequest.fetchNext().then(
        (messages: CometChat.BaseMessage[]) => {
            // console.log("Message list fetched:", messages);
            console.log("latestId>>>",latestId)
            resolve(messages)
        }, (error: CometChat.CometChatException) => {
            console.log("Message fetching failed with error:", error);
            reject()
        }
      );
    });
  }

  // Retrieve Conversations (Last conversations of login user)
  getUserConversations() {
    return new Promise(async (resolve, reject) => {
      let limit: number = 30,
      conversationType = "user",
      conversationsRequest: CometChat.ConversationsRequest = new CometChat.ConversationsRequestBuilder()
        .setLimit(limit)
        .setConversationType(conversationType)
        .build();
    
      conversationsRequest.fetchNext().then(
        (conversationList: CometChat.Conversation[]) => {
          resolve(conversationList)
        },
        (error: CometChat.CometChatException) => {
          console.log("Conversations list fetching failed with error:", error);
          reject()
        }
      );
    });
  }

  // Retrieve Conversations (Last conversations uid user)
  getSpecificUserConversations(userId:string) {
    return new Promise(async (resolve, reject) => {
      let conversationWith: string = userId,
      conversationType: string = "user";
    
      CometChat.getConversation(conversationWith, conversationType).then(
        (conversation: CometChat.Conversation) => {
          resolve(conversation)
        },
        (error: CometChat.CometChatException) => {
          console.log("error while fetching a conversation", error);
          reject()
        }
      );
    });
  }

  // Thread Message
  getThreadMessage() {
    return new Promise(async (resolve, reject) => {
      let limit: number = 30,
        parentMessageId: number = 1,
        messagesRequest: CometChat.MessagesRequest = new CometChat.MessagesRequestBuilder()
            .setLimit(limit)
            .setParentMessageId(parentMessageId)
            .build();

      messagesRequest.fetchPrevious().then(
        (messages: CometChat.BaseMessage[]) => {
            resolve(messages)
        }, (error: CometChat.CometChatException) => {
            console.log("Message fetching failed with error:", error);
        }
      );
    });
  }

}
