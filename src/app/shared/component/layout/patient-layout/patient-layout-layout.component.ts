import { Component, HostListener } from '@angular/core';
import { LayoutService } from '../../../services/layout/layout.service'; 
import * as feather from 'feather-icons';
import { Router } from '@angular/router';
import { PatientNavservicesService } from 'src/app/shared/services/nav/patient-navservices.service';

@Component({
  selector: 'app-patient-layout',
  templateUrl: './patient-layout.component.html',
  styleUrls: ['./patient-layout.component.scss']
})
export class PatientLayoutComponent {

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
    public navService: PatientNavservicesService,
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
