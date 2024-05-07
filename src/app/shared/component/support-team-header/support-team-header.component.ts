import { Component, HostListener } from '@angular/core'; 
import { SupportTeamNavservicesService } from '../../services/nav/support-team-navservices.service';
import { Menu, NavservicesService } from '../../services/nav/navservices.service';
import { AuthService } from '../../services/api/auth.service';

@Component({
  selector: 'app-support-team-header',
  templateUrl: './support-team-header.component.html',
  styleUrls: ['./support-team-header.component.scss']
})

export class SupportTeamHeaderComponent {

  public menuItems: Menu[] = [];
  public items: Menu[] = [];

  public searchResult: boolean = false;
  public searchResultEmpty: boolean = false;
  public text: string = '';
  public open: boolean = false;
  fullName:any

  @HostListener('window:resize', ['$event'])
  onResize(event: number) {
    this.navService.isDisplay = window.innerWidth < 1200 ? true : false;
  }

  constructor(public navService: SupportTeamNavservicesService,private authService: AuthService) {
    this.fullName = this.authService.getFullName()
    this.navService.items.subscribe(menuItems => this.items = menuItems);
  }


  openSearch() {
    this.open = !this.open
  }

  openMenu() {
    this.navService.isDisplay = !this.navService.isDisplay;
  }

  languageToggle() {
    this.navService.language = !this.navService.language;
  }

  searchToggle() {
    this.navService.search = false;
    document.getElementsByTagName('body')[0].classList.remove('offcanvas');
  }

  searchTerm(term: any) {
    term ? this.addFix() : this.removeFix();
    if (!term) return this.menuItems = [];
    let items: Menu[] = [];
    term = term.toLowerCase();
    this.items.forEach((data) => {
      data.item?.filter(menuItems => {
        if (menuItems.title?.toLowerCase().includes(term) && menuItems.type === 'link') {
          items.push(menuItems);
        }
        menuItems.children?.filter(subItems => {
          if (subItems.title?.toLowerCase().includes(term) && subItems.type === 'link') {
            subItems.icon = menuItems.icon
            items.push(subItems);
          }
          subItems.children?.filter(suSubItems => {
            if (suSubItems.title?.toLowerCase().includes(term)) {
              suSubItems.icon = menuItems.icon
              items.push(suSubItems);
            }
          })
          return
        })
        this.checkSearchResultEmpty(items)
        this.menuItems = items
      })
    })
    return
  }

  clickOutside(): void {
    this.searchResult = false
    this.searchResultEmpty = false;
    console.log('yee')
  }

  checkSearchResultEmpty(items: Menu[]) {
    if (!items.length)
      this.searchResultEmpty = true;
    else
      this.searchResultEmpty = false;
  }

  addFix() {
    this.searchResult = true;
    document.body.classList.add('offcanvas')
  }

  removeFix() {
    this.searchResult = false;
    this.text = "";
    document.body.classList.remove('offcanvas')
  }
}
