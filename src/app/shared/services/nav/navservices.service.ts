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
export class NavservicesService {

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

    // {
    //   id: 1,
    //   icon: 'dashboard_outline',
    //   mainTitle: 'Dashboard',
    //   headTitle1: 'Dashboard', 
    //   active: false,
    //   item: [ 
    //     {
    //       title: 'Notifications',
    //       icon: 'notifications_none',
    //       type: 'link',
    //       active: false,
    //       path: '/system-admin/notifications', 
    //     },
    //   ]
    // },
    {
      id: 2,
      icon: 'person_outline',
      mainTitle: 'User Management',
      headTitle1: 'User Management',
      // path: '/system-admin/Practice Admin', 
      active: false,
      item: [ 
        {
          title: 'Practice Admin',
          icon: 'person_outline',
          type: 'link',
          active: false,
          path: '/system-admin/user-managment/practice-admin', 
        },
        {
          title: 'Therapists',
          icon: 'accessibility',
          type: 'link',
          active: false,
          path: '/system-admin/user-managment/therapists', 
        },
        {
          title: 'Support Team',
          icon: 'help_outline',
          type: 'link',
          active: false,
          path: '/system-admin/user-managment/support-team', 
        },
        {
          title: 'Billing Team',
          icon: 'receipt',
          type: 'link',
          active: false,
          path: '/system-admin/user-managment/billing-team', 
        }, 
      ]
    },
    {
      id: 11,
      icon: 'group',
      mainTitle: 'Patients',
      headTitle1: '',
      path: '/system-admin/user-managment/patients', 
      active: false, 
      item: [ 
        {
          title: 'Patients',
          icon: 'group',
          type: 'link',
          active: false,
          path: '/system-admin/user-managment/patients', 
        },
      ]
    },
    {
      id: 3,
      icon: 'home',
      mainTitle: 'Manage Practice',
      headTitle1: 'Manage Practice',
      path: '/system-admin/manage-practice',
      active: false, 
      item: [ 
        {
          title: 'Therapists',
          icon: 'accessibility',
          type: 'link',
          active: false,
          path: '/system-admin/manage-practice', 
        }, 
        {
          title: 'Support Team',
          icon: 'help_outline',
          type: 'link',
          active: false,
          path: '/system-admin/manage-practice', 
        },
      ]
    },
    {
      id: 4,
      icon: 'chat_bubble_outline',
      mainTitle: 'Conversations',
      headTitle1: '',
      path: '/system-admin/conversations', 
      active: false, 
      item: [ 
        {
          title: 'Conversations',
          icon: 'chat',
          type: 'link',
          active: false,
          path: '/system-admin/conversations', 
        },
      ]
    },
    {
      id: 5,
      icon: 'print',
      mainTitle: ' E-Fax',
      headTitle1: '',
      path: '/system-admin/e-fax',
      active: false, 
      item: [ 
        {
          title: 'E-Fax',
          icon: 'print',
          type: 'link',
          active: false,
          path: '/system-admin/e-fax', 
        },
      ]
    },
    {
      id: 6,
      icon: 'dashboard',
      mainTitle: 'Doctors Management',
      headTitle1: '',
      path: '/system-admin/provider-management',
      active: false, 
      item: [ 
        {
          title: 'Doctors Management',
          icon: 'dashboard',
          type: 'link',
          active: false,
          path: '/system-admin/provider-management', 
        },
      ]
    },
    {
      id: 7,
      icon: 'healing',
      mainTitle: 'Insurance Management',
      headTitle1: '',
      path: '/system-admin/insurance-management',
      active: false, 
      item: [ 
        {
          title: 'Insurance Management',
          icon: 'healing',
          type: 'link',
          active: false,
          path: '/system-admin/insurance-management', 
        },
      ]
    },  
    {
      id: 8,
      icon: 'people_outline',
      mainTitle: 'Manage Profile',  
      headTitle1: '',
      path: '/system-admin/manage-profile',
      active: false, 
       type: 'link',
       item: [ 
        {
          title: 'Manage Profile',
           icon: 'portrait',
          type: 'link',
          active: false,
          path: '/system-admin/manage-profile', 
        },
      ]
    }, 
    {
      id: 12,
      icon: 'notifications_none',
      mainTitle: 'Notifications',
      headTitle1: '',
      path: '/system-admin/notifications', 
      active: false, 
      item: [ 
        {
          title: 'Notifications',
          icon: 'notifications_none',
          type: 'link',
          active: false,
          path: '/system-admin/notifications', 
        },
      ]
    },
  ]
  items = new BehaviorSubject<Menu[]>(this.Nvabarmenu);

};