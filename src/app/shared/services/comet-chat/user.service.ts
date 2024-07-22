import { Injectable } from '@angular/core';
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { cometChatCredentials } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(
  ) { 
    this.initialiseApp(cometChatCredentials.appId, cometChatCredentials.region);
  }

  // Initialise comet chat app
  initialiseApp(appId: string, region: string) {
    let appSetting: CometChat.AppSettings = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(region)
      .autoEstablishSocketConnection(true)
      .build();

    CometChat.init(appId, appSetting).then(
      (initialized: boolean) => {
        console.log("Initialization completed successfully", initialized);
      }, (error: CometChat.CometChatException) => { 
        console.log("Initialization failed with error:", error);
      }
    );
  }

  // Create user on comet chat
  createUser(uid: string, name: string) {
    let authKey: string = cometChatCredentials.authKey;
    var user: CometChat.User = new CometChat.User(uid);
    user.setName(name);

    CometChat.createUser(user, authKey).then(
      (user: CometChat.User) => {
          console.log("User created successfully", user);
      }, (error: CometChat.CometChatException) => {
          console.log("createUser error:", error);
      }
    );
  }

  // Update user on comet chat
  updateUser(uid: string, name: string) {
    let authKey: string = cometChatCredentials.authKey;
    var user: CometChat.User = new CometChat.User(uid);
    user.setName(name);

    CometChat.updateUser(user, authKey).then(
      (user: CometChat.User) => {
          console.log("user updated successfully", user);
      }, (error: CometChat.CometChatException) => {
          console.log("updateUser error", error);
      }
    ) 
  }

  // Login user on comet chat
  loginUser(uid: string){
    let authKey: string = cometChatCredentials.authKey;
    CometChat.getLoggedinUser().then(
      (user) => {
        console.log("user>>>>",user)
        let userData:any = user
        if (!user) {
          CometChat.login(uid, authKey).then(
            (user: CometChat.User) => {
              userData = user
              console.log("userData>>>>",userData)
              localStorage.setItem('cometChatToken', userData.authToken);
              console.log("CometChat Login Successful:", { user });
            },
            (error: CometChat.CometChatException) => {
              console.log("CometChat Login failed with exception:", { error });
            }
          );
        }else{
          localStorage.setItem('cometChatToken', userData.authToken);
        }
      },(error: CometChat.CometChatException) => {
        console.log("Some Error Occured", { error });
      }
    );
  }

  // Logout user from comet chat
  logoutUser(){
    return new Promise((resolve, reject) => {
      CometChat.logout().then(
        (loggedOut: Object) => {
          localStorage.removeItem('cometChatToken')
          console.log("CometChat Logout completed successfully");
          resolve(true)
        },(error: CometChat.CometChatException) => {
          console.log("CometChatLogout failed with exception:", { error });
          reject()
        }
      );
    })
  }

}
