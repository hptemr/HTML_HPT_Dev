import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon';
import { validationMessages } from '../../../../utils/validation-messages';
import {FormsModule , ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { UserService } from '../../../../shared/services/comet-chat/user.service';
import { AuthService } from '../../../services/api/auth.service';
import { CommonService } from '../../../../shared/services/helper/common.service';


import { CometChatAddMembers } from '@cometchat/chat-uikit-angular';
import { CometChat } from '@cometchat/chat-sdk-javascript';
import "@cometchat/uikit-elements";

@Component({
  selector: 'app-create-chat-group',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatDialogModule, ReactiveFormsModule, CommonModule,CometChatAddMembers],
  templateUrl: './create-chat-group.component.html',
  styleUrl: './create-chat-group.component.scss'
})
export class CreateChatGroupComponent {
  validationMessages = validationMessages; 
  heading:string = '';
  createGroupForm: FormGroup;
  loginUserId:any =''
  isGroupCreate: boolean=false

  public groupObject!: CometChat.Group;

  constructor(
    private authService:AuthService,
    private userService:UserService,
    private commonService:CommonService,
    private fb: FormBuilder, 
    public dialogRef: MatDialogRef<CreateChatGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.heading = data.heading != undefined ? data.heading : this.heading;
    this.loginUserId = this.authService.getLoggedInInfo('_id')
  }

  ngOnInit() {
    this.createGroupForm = this.fb.group({
      groupName:['', [Validators.required, Validators.minLength(3)]]
    });
  }

  async createGroup(){
    if(this.createGroupForm.valid){
      let randomId:any = this.commonService.generateRandomId(13)
      let GUID : string = `group__${randomId}`
      let groupName : string = this.createGroupForm.value.groupName
      let createGroupResult = await this.userService.createGroup(GUID,groupName).catch(()=>false)
      if(createGroupResult){
        this.isGroupCreate = true
        let groupData : any = createGroupResult
        CometChat.getGroup(groupData.guid).then((group: CometChat.Group) => {
          this.groupObject = group;
        });
      }
    }
  }

  cancelPopup(){
    this.dialogRef.close();
  }

  public handleOnAddMembersButtonClick = async (guid: string, members: CometChat.User[]) => {
     let membersList: any= members
    let memberAddResult = await this.userService.addMemberToGroup(guid,membersList).catch(()=>false)
    if(memberAddResult){
      let groupData: any = {error:false,message:'Group is created successfully.'}
      this.dialogRef.close(groupData);
    }else{
      let groupData: any = {error:false,message:'Group is not created. Try after sometimes.'}
      this.dialogRef.close(groupData);
    }
  };


}
