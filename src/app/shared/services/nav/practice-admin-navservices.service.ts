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
export class PracticeAdminNavservicesService {

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
      id: 2,
      icon: 'person_outline',
      mainTitle: 'User Management',
      headTitle1: 'User Management',
      path: '/practice-admin/user-managment/therapists', 
      active: false,
      item: [  
        {
          title: 'Therapists',
          icon: 'accessibility',
          type: 'link',
          active: false,
          path: '/practice-admin/user-managment/therapists', 
        },
        {
          title: 'Support Team',
          icon: 'help_outline',
          type: 'link',
          active: false,
          path: '/practice-admin/user-managment/support-team', 
        },
        {
          title: 'Billing Team',
          icon: 'receipt',
          type: 'link',
          active: false,
          path: '/practice-admin/user-managment/billing-team', 
        },
        {
          title: 'Patients',
          icon: 'group',
          type: 'link',
          active: false,
          path: '/practice-admin/user-managment/patients', 
        },
      ]
    },
    {
      id: 3,
      icon: 'home',
      mainTitle: 'Manage Practice',
      headTitle1: 'Manage Practice',
      path: '/practice-admin/manage-practice',
      active: false, 
      item: [ 
        {
          title: 'Therapists',
          icon: 'accessibility',
          type: 'link',
          active: false,
          path: '/practice-admin/manage-practice', 
        }, 
        {
          title: 'Support Team',
          icon: 'help_outline',
          type: 'link',
          active: false,
          path: '/practice-admin/manage-practice', 
        },
      ]
    },
    {
      id: 4,
      icon: 'chat_bubble_outline',
      mainTitle: 'Conversations',
      headTitle1: '',
      path: '/practice-admin/conversations', 
      active: false, 
      item: [ 
        {
          title: 'Conversations',
          icon: 'chat',
          type: 'link',
          active: false,
          path: '/practice-admin/conversations', 
        },
      ]
    },
    {
      id: 5,
      icon: 'print',
      mainTitle: ' E-Fax',
      headTitle1: '',
      path: '/practice-admin/e-fax',
      active: false, 
      item: [ 
        {
          title: 'E-Fax',
          icon: 'print',
          type: 'link',
          active: false,
          path: '/practice-admin/e-fax', 
        },
      ]
    }, 
    {
      id: 6,
      icon: 'people_outline',
      mainTitle: 'Manage Profile',  
      headTitle1: '',
      path: '/practice-admin/manage-profile',
      active: false, 
       type: 'link',
       item: [ 
        {
          title: 'Manage Profile',
           icon: 'portrait',
          type: 'link',
          active: false,
          path: '/practice-admin/manage-profile', 
        },
      ]
    },
    {
      id: 7,
      icon: 'notifications_none',
      mainTitle: 'Notifications',  
      headTitle1: '',
      path: '/practice-admin/notifications',
      active: false, 
       type: 'link',
       item: [ 
        {
          title: 'Notifications',
           icon: 'notifications_none',
          type: 'link',
          active: false,
          path: '/practice-admin/notifications', 
        },
      ]
    },
    
   
  ]
  items = new BehaviorSubject<Menu[]>(this.Nvabarmenu);

};