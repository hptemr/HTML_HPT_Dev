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
export class BillingTeamNavservicesService {

  public language: boolean = false;
  public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;
  public horizontal: boolean = window.innerWidth < 991 ? false : true;
  public isDisplay: boolean = window.innerWidth < 1080 ? true : false;
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
      path: '/billing-team/manage-profile',
      active: false,
      item: [ 
        {
          title: 'Manage Profile',
          icon: 'dashboard_outline',
          type: 'link',
          active: false,  
          path: '/billing-team/manage-profile',
        },
      ]
    },
    {
      id: 2,
      icon: 'pending_actions',
      mainTitle: 'Appointments',  
      headTitle1: '',
      path: '/billing-team/appointments',
      active: false, 
      type: 'link', 
      item: [ 
        {
          title: 'Appointments',
          icon: 'pending_actions',
          type: 'link',
          active: false,  
          path: '/billing-team/appointments',
        },
      ]
    }, 
    {
      id: 3,
      icon: 'assignment',
      mainTitle: 'Reports',  
      headTitle1: '',
      path: '/billing-team/reports/all-reports',
      active: false, 
      type: 'link', 
      item: [ 
        {
          title: 'Reports',
          icon: 'assignment',
          type: 'link',
          active: false,
          path: '/billing-team/reports/all-reports',  
        },
      ]
    }, 
    {
      id: 4,
      icon: 'chat_bubble_outline',
      mainTitle: 'Conversations',  
      headTitle1: '',
      path: ' ',
      active: false, 
      type: 'link', 
      item: [ 
        {
          title: 'Conversations',
          icon: 'chat_bubble_outline',
          type: 'link',
          active: false,  
        },
      ]
    }, 
    {
      id: 5,
      icon: 'person_outline',
      mainTitle: 'Patients',  
      headTitle1: '',
      path: ' ',
      active: false, 
      type: 'link', 
      item: [ 
        {
          title: 'person_outline Exercise',
          icon: 'Patients',
          type: 'link',
          active: false,  
        },
      ]
    },
    
  ]
  items = new BehaviorSubject<Menu[]>(this.Nvabarmenu);

};