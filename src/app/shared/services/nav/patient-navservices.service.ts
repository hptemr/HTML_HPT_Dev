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
    {
      id: 3,
      activeMenu: 'health_and_safety',
      icon: 'health_and_safety',
      mainTitle: 'Insurance',
      headTitle1: '',
      path: ' ',
      active: false,
      type: 'link', 
    },
    {
      id: 4,
      activeMenu: '',
      icon: 'smart_display',
      mainTitle: 'Home Exercise',
      headTitle1: '',
      path: ' ',
      active: false,
      type: 'link', 
    }, 
    {
      id: 4,
      activeMenu: 'emergency-contact',
      icon: 'perm_phone_msg',
      mainTitle: 'Emergency Contact',
      headTitle1: '',
      path: '/patient/emergency-contact',
      active: false,
      type: 'link', 
    },
    {
      id: 44,
      activeMenu: 'notifications',
      icon: 'notifications',
      mainTitle: 'Notifications',
      headTitle1: '',
      path: '/patient/notifications',
      active: false,
      type: 'link', 
    },
  ]
  items = new BehaviorSubject<Menu[]>(this.Nvabarmenu);

};