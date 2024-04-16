import { Component, HostListener } from '@angular/core'; 
import { LayoutService } from '../../services/layout/layout.service'; 
import { PracticeAdminNavservicesService, Menu} from '../../services/nav/practice-admin-navservices.service';

@Component({
  selector: 'app-sidebar-practice-admin',
  templateUrl: './sidebar-practice-admin.component.html',
  styleUrls: ['./sidebar-practice-admin.component.scss']
})
export class SidebarPracticeAdminComponent {

  public menus = this.navService.Nvabarmenu;
  public mainMenu: boolean = false;
  public menuItem = {}
  public active: boolean = false;
  public screenWidth: number;
  public screenHeight: number;

  constructor(public navService: PracticeAdminNavservicesService, public layout: LayoutService) { }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  toggleMenu(item: Menu) {
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
    item.active = !item.active;
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








