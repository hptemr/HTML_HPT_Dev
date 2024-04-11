import { Component, HostListener } from '@angular/core';
import { LayoutService } from '../../../services/layout/layout.service';
import { NavservicesService } from '../../../../shared/services/nav/navservices.service';
import * as feather from 'feather-icons';
import { Router } from '@angular/router';
import { SupportTeamNavservicesService } from 'src/app/shared/services/nav/support-team-navservices.service';

@Component({
  selector: 'app-support-team-layout',
  templateUrl: './support-team-layout.component.html',
  styleUrls: ['./support-team-layout.component.scss']
})
export class SupportTeamLayoutComponent {

  public isShow: boolean = false;
  public urrentRoute!: string;
  public urlPath!: string;
  public innerWidth!: number;

  @HostListener('window:resize', ['$event'])

  onResize(event: any) {
    if (window.innerWidth < 1200) {
      this.layout.config.settings.sidebar_type = 'compact-sidebar compact-small material-icon'
    }
  }

  constructor(
    public navService: SupportTeamNavservicesService,
    public layout: LayoutService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const url = this.router.url;
    this.innerWidth = window.innerWidth;

  }

  ngAfterViewInit() {
    feather.replace();
  }

  get layoutClass() {
    return (
      this.layout.config.settings.sidebar_type +
      ' ' +
      this.layout.config.settings.layout.replace('layout', 'sidebar')

    )
  }

}
