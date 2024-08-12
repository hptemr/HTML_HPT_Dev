import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CometChatLocalize, CometChatTheme, CometChatThemeService, fontHelper } from '@cometchat/chat-uikit-angular';
import { Location } from '@angular/common';
import { CreateChatGroupComponent } from '../create-chat-group/create-chat-group.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { BaseStyle } from '@cometchat/uikit-elements';
@Component({
  selector: 'app-conversations-chat',
  templateUrl: './conversations-chat.component.html',
  styleUrl: './conversations-chat.component.scss'
})
export class ConversationsChatComponent {
  withMessagesStyle:any={
    width: "100%",
    height: "100%",
    // background: "transparent",
     background: "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
    borderRadius: "none",
    border: "none",
    messageTextColor: "rgba(20, 20, 20, 0.33)", 
    textFont: "Nunito Sans, sans-serif"
  }

  bStyle = new BaseStyle({
    background: "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)"
  });

  public replaceTheme:boolean = false;
  isMobileView: boolean=false;
  innerWidth!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private themeService:CometChatThemeService,
    private location: Location,
    private dialog: MatDialog,
    private commonService: CommonService
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        if(this.router.getCurrentNavigation()?.extras.state!["pageLanguage"]){
          CometChatLocalize.init(this.router.getCurrentNavigation()?.extras.state!["pageLanguage"])
        }
        if(this.router.getCurrentNavigation()?.extras.state!["customTheme"] == true){
          this.replaceTheme = true
        }
      }
    });
  }

  ngOnInit(): void {
    this.setTheme()
    this.onResize()
  }

  /**
 * Checks when window size is changed in realtime
 */
  @HostListener("window:resize", [])
  onResize(): boolean {
    try {
      this.innerWidth = window.innerWidth;
      if (
        this.innerWidth >= 320 &&
        this.innerWidth <= 760
      ) {
        this.isMobileView = true;
      } else {
        this.isMobileView = false
      }
    } catch (error) {

    }
    return true;
  }

  setTheme(){
    this.withMessagesStyle.background = this.themeService.theme.palette.getBackground();
    this.withMessagesStyle.messageTextFont = fontHelper(this.themeService.theme.typography.heading);
    this.withMessagesStyle.messageTextColor = "this.themeService.theme.palette.getAccent400()";
  }

  ngOnDestroy(){
    CometChatLocalize.init(CometChatLocalize.getBrowserLanguage());
    if(this.replaceTheme){
      let mode = this.themeService.theme.palette.mode
      this.themeService.theme = new CometChatTheme({});
      this.themeService.theme.palette.setMode(mode)
    }
  }

  // Create group popup 
  createGroup() {
    const dialogRef = this.dialog.open(CreateChatGroupComponent,{
      disableClose :true,
      panelClass: 'inivite--modal',
      data : {
        heading: `Create Group`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.commonService.openSnackBar(result.message,result.error?'ERROR':'SUCCESS')
        setTimeout(function () {
          location.reload();
        }, 2000);
      }
    });
  }

}
