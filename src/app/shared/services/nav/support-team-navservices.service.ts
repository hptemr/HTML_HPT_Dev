import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

export interface Menu {
  id?: number;
  headTitle1?: string;
  mainTitle?: string;
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  badgeType?: string;
  badgeValue?: string;
  active?: boolean;
  bookmark?: boolean;
  item?: Menu[]
  children?: Menu[];
}

@Injectable({
  providedIn: 'root'
}

)
export class SupportTeamNavservicesService {

  public language: boolean = false;
  public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;
  public horizontal: boolean = window.innerWidth < 991 ? false : true;
  public isDisplay: boolean;
  public pinned: boolean;
  public search: boolean;
  public isShow: boolean = false;

  constructor() { }


  @HostListener('window:resize', ['$event'])


  Nvabarmenu: Menu[] = [  
    {
      id: 1,
      icon: 'dashboard_outline',
      mainTitle: 'Dashboard',
      headTitle1: 'Dashboard', 
      active: false,
      item: [ 
        {
          title: 'Dashboard',
          icon: 'notifications_none',
          type: 'link',
          active: false,  
        },
      ]
    },
    {
      id: 2,
      icon: 'pending_actions',
      mainTitle: 'Appointments',  
      headTitle1: '',
      path: '/support-team/appointments',
      active: false, 
      type: 'link', 
      item: [ 
        {
          title: 'Appointments',
          icon: 'pending_actions',
          type: 'link',
          active: false,  
        },
      ]
    }, 
    {
      id: 3,
      icon: 'health_and_safety',
      mainTitle: 'Referrals',  
      headTitle1: '',
      path: ' ',
      active: false, 
      type: 'link', 
      item: [ 
        {
          title: 'Insurance',
          icon: 'health_and_safety',
          type: 'link',
          active: false,  
        },
      ]
    }, 
    {
      id: 4,
      icon: 'smart_display',
      mainTitle: 'Conversations',  
      headTitle1: '',
      path: ' ',
      active: false, 
      type: 'link', 
      item: [ 
        {
          title: 'Home Exercise',
          icon: 'smart_display',
          type: 'link',
          active: false,  
        },
      ]
    }, 
    {
      id: 5,
      icon: 'smart_display',
      mainTitle: 'Patients',  
      headTitle1: '',
      path: ' ',
      active: false, 
      type: 'link', 
      item: [ 
        {
          title: 'Home Exercise',
          icon: 'smart_display',
          type: 'link',
          active: false,  
        },
      ]
    },
    
  ]
  items = new BehaviorSubject<Menu[]>(this.Nvabarmenu);

};