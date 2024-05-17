import { HostListener, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AuthService } from '../api/auth.service';

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
})

export class NavservicesService implements OnInit {
  @HostListener('window:resize', ['$event'])

  public language: boolean = false;
  public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;
  public horizontal: boolean = window.innerWidth < 991 ? false : true;
  public isDisplay: boolean;
  public pinned: boolean;
  public search: boolean;
  public isShow: boolean = false;
  public navigationMenu: any = []
  constructor(public authservice: AuthService) {
    this.getMenu()
  }

  ngOnInit() {

  }

  getMenu() {
    let userType = this.authservice.getLoggedInInfo('role')
    if (userType == 'practice_admin') {
      this.navigationMenu = [
        {
          id: 1,
          activeMenu: 'dashboard',
          icon: 'dashboard_outline',
          mainTitle: 'Dashboard',
          headTitle1: 'Dashboard',
          path: '/practice-admin/dashboard',
          active: false,
          item: []
        },
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
          ]
        },
        {
          id: 3,
          activeMenu: 'patients',
          icon: 'group',
          mainTitle: 'Patients',
          headTitle1: '',
          path: '/practice-admin/patients/list',
          active: false,
          item: []
        },
        {
          id: 4,
          icon: 'home',
          mainTitle: 'Manage Practice',
          headTitle1: 'Manage Practice',
          path: '/practice-admin/manage-practice',
          active: false,
          item: []
        },
        // {
        //   id: 5,
        //   icon: 'chat_bubble_outline',
        //   mainTitle: 'Conversations',
        //   headTitle1: '',
        //   path: '/practice-admin/conversations',
        //   active: false,
        //   item: []
        // },
        // {
        //   id: 6,
        //   icon: 'print',
        //   mainTitle: ' E-Fax',
        //   headTitle1: '',
        //   path: '/practice-admin/e-fax',
        //   active: false,
        //   item: []
        // },
        // {
        //   id: 7,
        //   icon: 'people_outline',
        //   mainTitle: 'Manage Profile',
        //   headTitle1: '',
        //   path: '/practice-admin/manage-profile',
        //   active: false,
        //   type: 'link',
        //   item: []
        // },
        // {
        //   id: 8,
        //   icon: 'notifications_none',
        //   mainTitle: 'Notifications',
        //   headTitle1: '',
        //   path: '/practice-admin/notifications',
        //   active: false,
        //   type: 'link',
        //   item: []
        // },
      ]
    } else if (userType == 'therapist') {
      this.navigationMenu = [
        {
          id: 1,
          activeMenu: 'dashboard',
          icon: 'dashboard_outline',
          mainTitle: 'Dashboard',
          headTitle1: 'Dashboard',
          path: '/therapist/dashboard',
          active: false,
          item: []
        },
        // {
        //   id: 2,
        //   icon: 'pending_actions',
        //   mainTitle: 'Appointments',
        //   headTitle1: '',
        //   path: '/therapist/appointments',
        //   active: false,
        //   type: 'link',
        //   item: []
        // },
        // {
        //   id: 3,
        //   icon: 'people',
        //   mainTitle: 'Referrals',
        //   headTitle1: '',
        //   path: ' ',
        //   active: false,
        //   type: 'link',
        //   item: []
        // },
        // {
        //   id: 4,
        //   icon: 'chat_bubble_outline',
        //   mainTitle: 'Conversations',
        //   headTitle1: '',
        //   path: ' ',
        //   active: false,
        //   type: 'link',
        //   item: []
        // },
        // {
        //   id: 5,
        //   icon: 'person_outline',
        //   mainTitle: 'Patients',
        //   headTitle1: '',
        //   path: ' ',
        //   active: false,
        //   type: 'link',
        //   item: []
        // },
        // {
        //   id: 6,
        //   icon: 'people_outline',
        //   mainTitle: 'Manage Profile',
        //   headTitle1: '',
        //   path: '/therapist/manage-profile',
        //   active: false,
        //   type: 'link',
        //   item: []
        // },
      ]
    } else if (userType == 'billing_team') {
      this.navigationMenu = [
        {
          id: 1,
          activeMenu: 'dashboard',
          icon: 'dashboard_outline',
          mainTitle: 'Dashboard',
          headTitle1: 'Dashboard',
          path: '/billing-team/dashboard',
          active: false,
          item: []
        },
        // {
        //   id: 2,
        //   icon: 'pending_actions',
        //   mainTitle: 'Appointments',
        //   headTitle1: '',
        //   path: '/billing-team/appointments',
        //   active: false,
        //   type: 'link',
        //   item: []
        // },
        // {
        //   id: 3,
        //   icon: 'assignment',
        //   mainTitle: 'Reports',
        //   headTitle1: '',
        //   path: ' ',
        //   active: false,
        //   type: 'link',
        //   item: []
        // },
        // {
        //   id: 4,
        //   icon: 'chat_bubble_outline',
        //   mainTitle: 'Conversations',
        //   headTitle1: '',
        //   path: ' ',
        //   active: false,
        //   type: 'link',
        //   item: []
        // },
        // {
        //   id: 5,
        //   icon: 'person_outline',
        //   mainTitle: 'Patients',
        //   headTitle1: '',
        //   path: ' ',
        //   active: false,
        //   type: 'link',
        //   item: []
        // },
        // {
        //   id: 6,
        //   icon: 'people_outline',
        //   mainTitle: 'Manage Profile',
        //   headTitle1: '',
        //   path: '/billing-team/manage-profile',
        //   active: false,
        //   type: 'link',
        //   item: []
        // },
      ]

    } else if (userType == 'support_team') {
      this.navigationMenu = [
        {
          id: 1,
          activeMenu: 'dashboard',
          icon: 'dashboard_outline',
          mainTitle: 'Dashboard',
          headTitle1: 'Dashboard',
          path: '/support-team/dashboard',
          active: false,
          item: []
        },
        // {
        //   id: 2,
        //   icon: 'pending_actions',
        //   mainTitle: 'Appointments',
        //   headTitle1: '',
        //   path: '/support-team/appointments',
        //   active: false,
        //   type: 'link',
        //   item: []
        // },
        // {
        //   id: 3,
        //   icon: 'people',
        //   mainTitle: 'Referrals',
        //   headTitle1: '',
        //   path: ' ',
        //   active: false,
        //   type: 'link',
        //   item: []
        // },
        // {
        //   id: 4,
        //   icon: 'chat_bubble_outline',
        //   mainTitle: 'Conversations',
        //   headTitle1: '',
        //   path: ' ',
        //   active: false,
        //   type: 'link',
        //   item: []
        // },
        // {
        //   id: 5,
        //   icon: 'person_outline',
        //   mainTitle: 'Patients',
        //   headTitle1: '',
        //   path: ' ',
        //   active: false,
        //   type: 'link',
        //   item: []
        // },
        // {
        //   id: 6,
        //   icon: 'people_outline',
        //   mainTitle: 'Manage Profile',
        //   headTitle1: '',
        //   path: '/support-team/manage-profile',
        //   active: false,
        //   type: 'link',
        //   item: []
        // },
      ]

    } else { //system_admin
      this.navigationMenu = [
        {
          id: 1,
          activeMenu: 'dashboard',
          icon: 'dashboard_outline',
          mainTitle: 'Dashboard',
          headTitle1: 'Dashboard',
          active: false,
          path: '/system-admin/dashboard',
          item: []
        },
        {
          id: 2,
          activeMenu: 'user-managment',
          icon: 'person_outline',
          mainTitle: 'User Management',
          headTitle1: 'User Management',
          path: '/system-admin/user-managment/practice-admin',
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
            }
          ]
        },
        {
          id: 3,
          activeMenu: 'patients',
          icon: 'group',
          mainTitle: 'Patients',
          headTitle1: '',
          path: '/system-admin/patients/list',
          active: false,
          item: []
        },
        {
          id: 4,
          activeMenu: 'manage-practice',
          icon: 'home',
          mainTitle: 'Manage Practice',
          headTitle1: 'Manage Practice',
          path: '/system-admin/manage-practice',
          active: false,
          item: []
        },
        // {
        //   id: 5,
        //   activeMenu: 'conversations',
        //   icon: 'chat_bubble_outline',
        //   mainTitle: 'Conversations',
        //   headTitle1: '',
        //   path: '/system-admin/conversations',
        //   active: false,
        //   item: []
        // },
        // {
        //   id: 6,
        //   activeMenu: 'e-fax',
        //   icon: 'print',
        //   mainTitle: ' E-Fax',
        //   headTitle1: '',
        //   path: '/system-admin/e-fax',
        //   active: false,
        //   item: []
        // },
        // {
        //   id: 7,
        //   activeMenu: 'manage-profile',
        //   icon: 'people_outline',
        //   mainTitle: 'Manage Profile',
        //   headTitle1: '',
        //   path: '/system-admin/manage-profile',
        //   active: false,
        //   type: 'link',
        //   item: []
        // },
        // {
        //   id: 8,
        //   activeMenu: 'notifications',
        //   icon: 'notifications_none',
        //   mainTitle: 'Notifications',
        //   headTitle1: '',
        //   path: '/system-admin/notifications',
        //   active: false,
        //   item: []
        // },
      ]
    }
  }

  items = new BehaviorSubject<Menu[]>(this.navigationMenu);
};