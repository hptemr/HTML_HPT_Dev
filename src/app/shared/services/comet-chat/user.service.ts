import { Injectable } from '@angular/core';
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { cometChatCredentials } from 'src/app/config';
import { CommonService } from '../helper/common.service';
import { AuthService } from '../api/auth.service';

import { CometChatUIKit } from "@cometchat/chat-uikit-angular";
import { UIKitSettingsBuilder } from "@cometchat/uikit-shared";
@Injectable({
  providedIn: 'root'
})

export class UserService {
  loginUserData: any = { "userType": "", "userId": "" }
  
  constructor(
    public commonService: CommonService,
    public authService: AuthService,
  ) { 
    this.initialiseApp(cometChatCredentials.appId, cometChatCredentials.region);
    let userType = this.authService.getLoggedInInfo('role')
    let userId = this.authService.getLoggedInInfo('_id')
    if(userType && userId){
      this.loginUserData = { "userType" : userType, "userId": userId }
    }
  }

  // Initialise comet chat app
  // initialiseApp(appId: string, region: string) {
  //   let appSetting: CometChat.AppSettings = new CometChat.AppSettingsBuilder()
  //     .subscribePresenceForAllUsers()
  //     .setRegion(region)
  //     .autoEstablishSocketConnection(true)
  //     .build();

  //   CometChat.init(appId, appSetting).then(
  //     (initialized: boolean) => {
  //       console.log("Initialization completed successfully", initialized);
  //     }, (error: CometChat.CometChatException) => { 
  //       let parameter: any = {'appId':appId, 'region': region }
  //       this.commonService.cometChatLog(this.loginUserData,'initialiseApp','error', parameter, error)
  //       console.log("Initialization failed with error:", error);
  //     }
  //   );
  // }

  initialiseApp(appId: string, region: string) {
    const COMETCHAT_CONSTANTS = {
      APP_ID: appId,
      REGION: region
    };
    
    //create the builder
    const UIKitSettings = new UIKitSettingsBuilder()
      .setAppId(COMETCHAT_CONSTANTS.APP_ID)
      .setRegion(COMETCHAT_CONSTANTS.REGION)
      .subscribePresenceForAllUsers()
      .build();
    
    //Initialize CometChat UI Kit
    // CometChatUIKit.init(UIKitSettings).then(() => {
    //     console.log("Initialization completed successfully");
    //     // You can now call login function.
    // }).catch(console.log);

    CometChatUIKit.init(UIKitSettings)
  }

  // Create user on comet chat
  createUser(uid: string, name: string, role:string) {
    return new Promise((resolve, reject) => {
      let authKey: string = cometChatCredentials.authKey;
      var user: CometChat.User = new CometChat.User(uid);
      user.setName(name);
      user.setRole(role);

      CometChat.createUser(user, authKey).then(
        (user: CometChat.User) => {
            console.log("User created successfully", user);
            /* ======
              After create we login the user in comet chat.
              Because after sign up in HPT user direct login to HPT portal.
            */
            let userData : any = user
            this.loginUser(userData.uid)
            resolve(true)
        }, (error: CometChat.CometChatException) => {
            let parameter: any = {'uid':uid, 'name': name, 'role':role, 'authKey':authKey}
            this.commonService.cometChatLog(this.loginUserData,'createUser','error', parameter, error)
            console.log("createUser error:", error);
            reject()
        }
      );
    });
  }

  // Update user on comet chat
  updateUser(uid: string, name: string) {
    return new Promise((resolve, reject) => {
      let authKey: string = cometChatCredentials.authKey;
      var user: CometChat.User = new CometChat.User(uid);
      user.setName(name);

      CometChat.updateUser(user, authKey).then(
        (user: CometChat.User) => {
            console.log("user updated successfully", user);
            resolve(true)
        }, (error: CometChat.CometChatException) => {
            console.log("updateUser error", error);
            let parameter: any = {'uid':uid, 'name': name}
            this.commonService.cometChatLog(this.loginUserData,'updateUser','error', parameter, error)
            reject()
        }
      ) 
    })
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
              let parameter: any = {'uid':uid, 'authKey': authKey}
              this.commonService.cometChatLog(this.loginUserData,'loginUser','error', parameter, error)
              console.log("CometChat Login failed with exception:", { error });
            }
          );
        }else{
          localStorage.setItem('cometChatToken', userData.authToken);
        }
      },(error: CometChat.CometChatException) => {
        let parameter: any = {'uid':uid, 'authKey': authKey}
        this.commonService.cometChatLog(this.loginUserData,'loginUser','error', parameter, error)
        console.log("Some Error Occured", { error });
      }
    );
  }

  // loginUser(uid: string){
  //   const UID = uid; // Replace with your UID
  //   CometChat.getLoggedinUser().then((user) => {
  //     console.log("user1>>>",user)
  //     if (!user) {
  //       console.log("user3>>>",user)
  //       console.log("UID>>>",UID)
  //       // Login user
  //       CometChatUIKit.login({ uid: UID })
  //         .then((user) => {
  //           console.log("Login Successful:", { user });
  //           // mount your app
  //         })
  //         .catch(console.log);
  //     } else {
  //       // mount your app
  //       console.log("user2>>>",user)
  //     }
  //   });
  // }

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
          let parameter: any = null
          this.commonService.cometChatLog(this.loginUserData,'logoutUser','error', parameter, error)
          reject()
        }
      );
    })
  }

  // Get comet chat user list
  getCometChatUsers(searchKeyword:string=""){
    return new Promise((resolve, reject) => {
      console.log("searchKeyword>>>",searchKeyword)
      let limit: number = 30;
      let searchIn: Array<String> = ["name"]; // Example : ["uid", "name"]
      let roles = ["system_admin","practice_admin","therapist","billing_team","support_team"];
      let usersRequest: CometChat.UsersRequest = new CometChat.UsersRequestBuilder()
        .setLimit(limit)
        .setRoles(roles)
        .setSearchKeyword(searchKeyword)
        .searchIn(searchIn)
        .build();

      usersRequest.fetchNext().then(
        (userList: CometChat.User[]) => {
            resolve(userList)
        }, (error: CometChat.CometChatException) => {
            console.log("User list fetching failed with error:", error);
            let parameter: any = {'searchKeyword': searchKeyword }
            this.commonService.cometChatLog(this.loginUserData,'getCometChatUsers','error', parameter, error)
            reject()
        }
      );
    });
  }

   // Update user profile pic on comet chat
   updateUserProfilePic(uid: string, avatarPic: string) {
    return new Promise((resolve, reject) => {
      let authKey: string = cometChatCredentials.authKey;
      var user: CometChat.User = new CometChat.User(uid);
      user.setAvatar(avatarPic);

      CometChat.updateUser(user, authKey).then(
        (user: CometChat.User) => {
            console.log("user profile pic updated successfully", user);
            resolve(true)
        }, (error: CometChat.CometChatException) => {
            console.log("updateUserProfilePic error", error);
            let parameter: any = {'uid':uid, 'avatarPic': avatarPic}
            this.commonService.cometChatLog(this.loginUserData,'updateUserProfilePic','error', parameter, error)
            reject()
        }
      ) 
    })
  }

  // create group
  createGroup(GUID: string, groupName: string) {
    return new Promise((resolve, reject) => {
      var groupType: string = CometChat.GROUP_TYPE.PUBLIC;
      var password: string = "";
      var group: CometChat.Group = new CometChat.Group(GUID, groupName, groupType, password);
      CometChat.createGroup(group).then(
        (group: CometChat.Group) => {
            resolve(group)
        }, (error: CometChat.CometChatException) => {
            console.log("Group creation failed with exception:", error);
            let parameter: any = {'GUID':GUID, 'groupName': groupName}
            this.commonService.cometChatLog(this.loginUserData,'createGroup','error', parameter, error)
            reject()
        }
      );
    })
  }

  // Add Member To Group
  addMemberToGroup(GUID: string, members: any) {
    return new Promise((resolve, reject) => {
      let membersList: any= members
      CometChat.addMembersToGroup(GUID, membersList, []).then(
        (response: Object) => {
          console.log("addMembersToGroup response", response);
          resolve(response)
        },
        (error: CometChat.CometChatException) => {
          console.log("addMembersToGroup Something went wrong", error);
          let parameter: any = {'GUID':GUID, 'members': members}
          this.commonService.cometChatLog(this.loginUserData,'addMemberToGroup','error', parameter, error)
          reject()
        }
      );
    })
  }

}
