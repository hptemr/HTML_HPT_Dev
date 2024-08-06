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
      mainTitle: 'Scheduler',
      headTitle1: 'Scheduler',  
      path: '/support-team/appointment-requests',
      active: false,
      item: [ 
        {
          title: 'Scheduler',
          icon: 'notifications_none',
          type: 'link',
          active: false,  
        },
      ]
    },
    {
      id: 2,
      icon: 'pending_actions',
      mainTitle: 'Cases',  
      headTitle1: '',
      path: '/support-team/cases',
      // path: '/support-team/appointments',
      active: false, 
      type: 'link', 
      item: [ 
        {
          title: 'Cases',
          icon: 'pending_actions',
          type: 'link',
          active: false,  
        },
      ]
    }, 
    {
      id: 3,
      icon: 'people',
      mainTitle: 'Requests',  
      headTitle1: '',
      path: '/support-team/referrals',
      active: false, 
      type: 'link', 
      item: [ 
        {
          title: 'Requests',
          icon: 'people',
          type: 'link',
          active: false,  
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
      path: '/support-team/patient',
      active: false, 
      type: 'link', 
      item: [ 
        {
          title: 'Patients',
          icon: 'person_outline',
          type: 'link',
          active: false,  
          path: '/support-team/patient',
        },
      ]
    },
    {
      id: 5,
      icon: 'description',
      mainTitle: 'Documents',  
      headTitle1: '',
      path: '/support-team/document-listing',
      active: false, 
      type: 'link', 
      item: [ 
        {
          title: 'Documents',
          icon: 'description',
          type: 'link',
          active: false,  
          path: '/support-team/document-listing',
        },
      ]
    },
    
  ]
  items = new BehaviorSubject<Menu[]>(this.Nvabarmenu);

};