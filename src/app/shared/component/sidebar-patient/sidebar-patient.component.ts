import { Component, HostListener } from '@angular/core';
import { LayoutService } from '../../services/layout/layout.service';
import { PatientNavservicesService, Menu } from '../../services/nav/patient-navservices.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-patient',
  templateUrl: './sidebar-patient.component.html',
  styleUrls: ['./sidebar-patient.component.scss']
})
export class SidebarPatientComponent {

  public menus = this.navService.Nvabarmenu;
  public mainMenu: boolean = false;
  public menuItem = {}
  public active: boolean = false;
  public screenWidth: number;
  public screenHeight: number;
  public currentMainMenu: any = ''
  public itemsLength: any = 0;
  public subMenus: any = ["book-appointment", "appointment-details", "intake-form"]

  constructor(public navService: PatientNavservicesService, public layout: LayoutService, private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        const locationArray = event.url.split('/')
        this.currentMainMenu = locationArray[2]
        if (this.subMenus.includes(this.currentMainMenu)) {
          this.currentMainMenu = 'appointments'
        }
        if(this.currentMainMenu=='edit-emergency-contact' || this.currentMainMenu=='add-emergency-contact' || this.currentMainMenu=='view-emergency-contact'){
          this.currentMainMenu = 'emergency-contact'
        }
        if(this.currentMainMenu=='add-insurance' || this.currentMainMenu=='edit-insurance' || this.currentMainMenu=='view-insurance'){
             this.currentMainMenu = 'insurance-listing'
        }
      }
    })
  }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  toggleMenu(item: Menu) {
    console.log('toggleMenu > item>>>',item)
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
        });
        return;
      });
    }
    if (this.itemsLength > 0) {
      item.active = !item.active;
    }
    if (item.active == true) {
      this.navService.isShow = true;
    } else {
      this.navService.isShow = false;
    }
  }

  toggle(item: Menu, mainMenu?: Menu) {
    console.log('item>>>',item)
    console.log('mainMenu>>>',mainMenu)
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








