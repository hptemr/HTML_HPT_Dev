import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

export interface Menu {
  id?: number;
  activeMenu?: string;
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
export class PatientNavservicesService {
  @HostListener('window:resize', ['$event'])

  public language: boolean = false;
  public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;
  public horizontal: boolean = window.innerWidth < 991 ? false : true;
  public isDisplay: boolean;
  public pinned: boolean;
  public search: boolean;
  public isShow: boolean = false;

  constructor() { }

  Nvabarmenu: Menu[] = [
    {
      id: 1,
      activeMenu: 'dashboard',
      icon: 'dashboard_outline',
      mainTitle: 'Dashboard',
      headTitle1: 'Dashboard',
      path: '/patient/dashboard',
      active: false,
      item: []
    },
    {
      id: 2,
      activeMenu: 'appointments',
      icon: 'pending_actions',
      mainTitle: 'Appointments',
      headTitle1: '',
      path: '/patient/appointments',
      active: false,
      type: 'link', 
    },
    // {
    //   id: 3,
    //   activeMenu: 'notifications',
    //   icon: 'health_and_safety',
    //   mainTitle: 'Insurance',
    //   headTitle1: '',
    //   path: '/patient/appointments',
    //   active: false,
    //   type: 'link',
    //   item: [
    //     {
    //       title: 'Insurance',
    //       icon: 'health_and_safety',
    //       type: 'link',
    //       active: false,
    //     },
    //   ]
    // },
    // {
    //   id: 4,
    //   activeMenu: 'notifications',
    //   icon: 'smart_display',
    //   mainTitle: 'Home Exercise',
    //   headTitle1: '',
    //   path: '/patient/appointments',
    //   active: false,
    //   type: 'link',
    //   item: [
    //     {
    //       title: 'Home Exercise',
    //       icon: 'smart_display',
    //       type: 'link',
    //       active: false,
    //     },
    //   ]
    // },
  ]
  items = new BehaviorSubject<Menu[]>(this.Nvabarmenu);

};