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
          title: 'Sample-page',
          icon: 'sample-page',
          type: 'link',
          active: true,
          path: '', 
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
          path: '/system-admin/practice-admin', 
        },
        {
          title: 'Therapists',
          icon: 'sample-page',
          type: 'link',
          active: true,
          path: '/system-admin/therapists', 
        },
        {
          title: 'Support Team',
          icon: 'info',
          type: 'link',
          active: true,
          path: '/system-admin/support-team', 
        },
        {
          title: 'Billing Team',
          icon: 'sample-page',
          type: 'link',
          active: true,
          path: '/system-admin/billing-team', 
        },
        {
          title: 'Patients',
          icon: 'sample-page',
          type: 'link',
          active: true,
          path: '/system-admin/patients', 
        },
      ]
    },
    {
      id: 3,
      icon: 'home',
      mainTitle: 'Manage Practice',
      headTitle1: 'Manage Practice',
      // path: '/pages/sample-page1',
      active: false, 
    },
    {
      id: 4,
      icon: 'home',
      mainTitle: 'Conversations',
      headTitle1: 'Conversations',
      // path: '/pages/sample-page1',
      active: false, 
    },
    {
      id: 5,
      icon: 'home',
      mainTitle: 'E-Fax',
      headTitle1: 'E-Fax',
      // path: '/pages/sample-page1',
      active: false, 
    },  
  ]
  items = new BehaviorSubject<Menu[]>(this.Nvabarmenu);

};