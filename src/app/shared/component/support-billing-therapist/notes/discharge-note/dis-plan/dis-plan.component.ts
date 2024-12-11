import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
@Component({
  selector: 'app-dis-plan', 
  templateUrl: './dis-plan.component.html',
  styleUrl: './dis-plan.component.scss'
})
export class DisPlanComponent {
  isDisabled: boolean = false;
  appointmentId: string;
  activeUserRoute = this.commonService.getLoggedInRoute()
  constructor( private router: Router, public authService: AuthService, private route: ActivatedRoute, public commonService: CommonService) {
    this.route.params.subscribe((params: Params) => {
      this.appointmentId = params['appointmentId'];
    })
  }

  ngOnInit() {   
  }

  navigatation(to:string) {
    this.router.navigate([this.activeUserRoute+'/discharge-notes/'+to+'/'+this.appointmentId]);
  }
  
}
