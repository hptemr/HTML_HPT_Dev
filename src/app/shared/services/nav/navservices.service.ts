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
  public isDisplay: boolean;
  public pinned: boolean;
  public search: boolean;
  public isShow: boolean = false;

  constructor() { }


  @HostListener('window:resize', ['$event'])


  Nvabarmenu: Menu[] = [
    // {
    //   id: 1,
    //   icon: 'Grid',
    //   mainTitle: 'page',
    //   headTitle1: 'pages',
    //   item: [
    //     {
    //       title: 'pages',
    //       icon: 'sample-page',
    //       type: 'sub',
    //       active: true,
    //       children: [
    //         { path: '/pages/sample-page1', title: 'Sample-page1', type: 'link' },
    //         { path: '/pages/sample-page2', title: 'Sample-page2', type: 'link' },
    //       ],
    //     },
    //     {
    //       title: 'Sample-page',
    //       icon: 'sample-page',
    //       type: 'link',
    //       active: true,
    //       path: '/sample-page',
    //       bookmark:true
    //     },
    //   ]
    // },

    {
      id: 1,
      icon: 'home',
      mainTitle: 'Dashboard',
      headTitle1: 'Dashboard',
      // path: '/pages/sample-page1',
      active: false,
      item: [ 
        {
          title: 'Notifications',
          icon: 'sample-page',
          type: 'link',
          active: true,
          path: '/system-admin/notifications', 
        },
      ]
    },
    {
      id: 2,
      icon: 'user',
      mainTitle: 'User Management',
      headTitle1: 'User Management',
      // path: '/system-admin/Practice Admin', 
      active: false,
      item: [ 
        {
          title: 'Practice Admin',
          icon: 'user',
          type: 'link',
          active: true,
          path: '/system-admin/user-managment/practice-admin', 
        },
        {
          title: 'Therapists',
          icon: 'sample-page',
          type: 'link',
          active: true,
          path: '/system-admin/user-managment/therapists', 
        },
        {
          title: 'Support Team',
          icon: 'sample-page',
          type: 'link',
          active: true,
          path: '/system-admin/user-managment/support-team', 
        },
        {
          title: 'Billing Team',
          icon: 'sample-page',
          type: 'link',
          active: true,
          path: '/system-admin/user-managment/billing-team', 
        },
        {
          title: 'Patients',
          icon: 'sample-page',
          type: 'link',
          active: true,
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
          icon: 'user',
          type: 'link',
          active: true,
          path: '/system-admin/manage-practice', 
        }, 
        {
          title: 'Support Team',
          icon: 'user',
          type: 'link',
          active: true,
          path: '/system-admin/manage-practice', 
        },
      ]
    },
    {
      id: 4,
      icon: 'home',
      mainTitle: 'Conversations',
      headTitle1: '',
      path: '/system-admin/conversations', 
      active: false, 
      item: [ 
        {
          title: 'Conversations',
          icon: 'sample-page',
          type: 'link',
          active: true,
          path: '/system-admin/conversations', 
        },
      ]
    },
    {
      id: 5,
      icon: 'home',
      mainTitle: ' E-Fax',
      headTitle1: '',
      path: '/system-admin/e-fax',
      active: false, 
      item: [ 
        {
          title: 'E-Fax',
          icon: 'sample-page',
          type: 'link',
          active: true,
          path: '/system-admin/e-fax', 
        },
      ]
    }, 
    {
      id: 6,
      icon: 'home',
      mainTitle: 'Manage Profile',  
      headTitle1: '',
      path: '/system-admin/manage-profile',
      active: false, 
       type: 'link',
       item: [ 
        {
          title: 'Manage Profile',
          icon: 'sample-page',
          type: 'link',
          active: true,
          path: '/system-admin/manage-profile', 
        },
      ]
    }, 
  ]
  items = new BehaviorSubject<Menu[]>(this.Nvabarmenu);

};