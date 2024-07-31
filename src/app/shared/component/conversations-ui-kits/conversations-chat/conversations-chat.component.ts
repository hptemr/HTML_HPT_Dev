import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CometChatLocalize, CometChatTheme, CometChatThemeService, fontHelper } from '@cometchat/chat-uikit-angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-conversations-chat',
  templateUrl: './conversations-chat.component.html',
  styleUrl: './conversations-chat.component.scss'
})
export class ConversationsChatComponent {
  withMessagesStyle:any={
    width: "100%",
    height: "100%",
    background: "transparent",
    borderRadius: "none",
    border: "none",
    messageTextColor: "rgba(20, 20, 20, 0.33)",
    messageTextFont: "700 22px Inter",
  }

  public replaceTheme:boolean = false;
  isMobileView: boolean=false;
  innerWidth!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private themeService:CometChatThemeService,
    private location: Location
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
    this.withMessagesStyle.messageTextColor = this.themeService.theme.palette.getAccent400();
  }

  ngOnDestroy(){
    CometChatLocalize.init(CometChatLocalize.getBrowserLanguage());
    if(this.replaceTheme){
      let mode = this.themeService.theme.palette.mode
      this.themeService.theme = new CometChatTheme({});
      this.themeService.theme.palette.setMode(mode)
    }
  }

}
