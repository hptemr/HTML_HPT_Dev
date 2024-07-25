import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';

@Component({
  selector: 'app-assessment', 
  templateUrl: './assessment.component.html',
  styleUrl: './assessment.component.scss'
})
export class AssessmentComponent {
  isDisabled: boolean = false;
  addNewProblemField:boolean= true;
  appointmentId: string;
  public userId: string;
  public userRole: string;
  
  constructor( private router: Router, private route: ActivatedRoute, public authService: AuthService, public commonService: CommonService) {
    this.route.params.subscribe((params: Params) => {
      this.appointmentId = params['appointmentId'];
    })
  }


  ngOnInit() {
    this.userId = this.authService.getLoggedInInfo('_id')
    this.userRole = this.authService.getLoggedInInfo('role')
  
  }


  addNewProblem(){
    this.addNewProblemField = false;
  }
  removeNewProblem(){
    this.addNewProblemField = true;
  }
}
