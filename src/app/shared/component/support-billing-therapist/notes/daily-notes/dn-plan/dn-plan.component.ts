import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
@Component({
  selector: 'app-dn-plan', 
  templateUrl: './dn-plan.component.html',
  styleUrl: './dn-plan.component.scss'
})
export class DnPlanComponent {
  isDisabled:boolean = false;
  planStartDate =""
  planEndDate =""
  appointmentId = ""
  userId = ""
  anticipatDC = ""
  typeHere = ""
  typeBelow:any = ""
  processPatient = ""
  actionType = "create"
  constructor(private route: ActivatedRoute,public authService: AuthService, public commonService: CommonService,private fb: FormBuilder,private router: Router) {
    this.appointmentId = this.route.snapshot.params['appointmentId'];
    this.userId = this.authService.getLoggedInInfo('_id')
  }

  ngOnInit() {
    var params = {
      appointmentId:this.appointmentId,
      soapNoteType:'daily_note'
    }
    this.authService.apiRequest('post', 'soapNote/getPlanNote', params).subscribe(async response => {
      if(response.data && response.data.appointmentId){
        this.actionType = "update"
        this.processPatient = response.data.process_patient
        this.anticipatDC = response.data.anticipat_DC
        this.typeHere = response.data.plan_note
        this.planStartDate = response.data.plan_start_date
        this.planEndDate = response.data.plan_end_date
        if(response.data.plan_note!=""){
          this.typeBelow = true
        }else{
          this.typeBelow = false
        }
      }
    })
  }

  submit(){
    let planPlans = {
      appointmentId : this.appointmentId,
      planStartDate : this.planStartDate,
      planEndDate : this.planEndDate,
      processPatient : this.processPatient,
      anticipatDC : this.anticipatDC,
      soapNoteType:"daily_note",
      planNote:""
    }
    if(this.typeBelow){
      planPlans.planNote = this.typeHere
    }else{
      planPlans.planNote = ""
    }
    if(this.actionType=='create'){
      this.authService.apiRequest('post', 'soapNote/createPlanNote', planPlans).subscribe(async response => {
        this.commonService.openSnackBar("Created Successfully", "SUCCESS")
        window.open(`${this.commonService.getLoggedInRoute()}`+"/daily-notes/plan/"+this.appointmentId, "_self");
      })
    }else{
      this.authService.apiRequest('post', 'soapNote/updatePlanNote', planPlans).subscribe(async response => {
        this.commonService.openSnackBar("Updated Successfully", "SUCCESS")
        window.open(`${this.commonService.getLoggedInRoute()}`+"/daily-notes/plan/"+this.appointmentId, "_self");
      })
    }
  }
}
