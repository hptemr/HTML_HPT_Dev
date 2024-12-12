import { Component } from '@angular/core';
import { NavservicesService, Menu } from '../../services/nav/navservices.service';
import { LayoutService } from '../../services/layout/layout.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent {
  public menus = this.navService.navigationMenu;
  public mainMenu: boolean = false;
  public menuItem = {}
  public active: boolean = false;
  public screenWidth: number;
  public screenHeight: number;
  public currentMainMenu: any = ''
  public itemsLength: any = 0;
  constructor(public navService: NavservicesService, public layout: LayoutService, private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        const locationArray = event.url.split('/')
        this.currentMainMenu = locationArray[2]

        if(this.currentMainMenu=='create-request-appointment'){
          this.currentMainMenu = 'requests'
        }
        
        if(this.currentMainMenu=='case-details' || this.currentMainMenu=='create-appointment' || this.currentMainMenu=='initial-examination' || this.currentMainMenu=='daily-notes' || this.currentMainMenu=='progress-notes' || this.currentMainMenu=='discharge-notes' || this.currentMainMenu=='intake-form'){
           this.currentMainMenu = 'cases'
        }
        if(this.currentMainMenu=='file-preview'){
           this.currentMainMenu = 'cases'
        }
      }
    })
  }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;   
  }

  toggleMenu(item: Menu) {
    // Reload page if coversation UI Kit Chat Open
    if(item.mainTitle == 'Conversations'){
      setTimeout(function () {
        location.reload();
      }, 500)
    }

    this.itemsLength = item.item?.length;
    if (!item.active) {
      this.menus.forEach((a: Menu) => {
        if (this.menus.includes(item)) {
          a.active = false;
        }
        if (!a.children) {
          return false;
        }
        a.children.forEach((b: Menu) => {
          if (a.children?.includes(item)) {
            b.active = false;
          }
          if (!a.children) {
            return false;
          }
          a.children.forEach((b: Menu) => {
            if (a.children?.includes(item)) {
              b.active = false;
            }
          });
          return;
        });
        return;
      });
    }
    if(this.itemsLength>0){
      item.active = !item.active;
    }
    if (item.active == true) {
      this.navService.isShow = true;
    } else {
      this.navService.isShow = false;
    }
  }

  toggle(item: Menu, mainMenu?: Menu) {
    if (!item.active) {
      this.menus.forEach((a: Menu) => {
        a.item?.forEach((child) => {
          if (a.item?.includes(item)) {
            child.active = false;
          }
          if (child.children) {
            child.children.forEach((subChild) => {
              if (child.children?.includes(item)) {
                subChild.active = false;
              }
            })
          }
        })
        return;
      });
    }
    item.active = !item.active;
    if (mainMenu) {
      mainMenu.active = false
      this.navService.isShow = false
    }
  }

}








