import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-plan', 
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.scss'
})
export class PlanComponent {
  isDisabled: boolean = false;
  clickedIndex = 0;
  clickedIndex2 = 0;
  appointmentId =""
  userId =""
  planNoteForm: FormGroup;
  ptList = [
    {name:"Therapeutic Activity",value:"therapeutic_activity",selected:false},
    {name:"Neuromuscular Rehabilitation",value:"neuromuscular_rehabilitation",selected:false},
    {name:"Aquatic Therapy",value:"aquatic_therapy",selected:false},
    {name:"Therapeutic Exercise",value:"therapeutic_exercise",selected:false},
    {name:"Patient Ed./ HEP/ RTM",value:"patient_ed_hep_rtm",selected:false},
    {name:"Manual Therapy",value:"manual_therapy",selected:false},
    {name:"Modalities",value:"modalities",selected:false},
    {name:"Splinting/Bracing/Orthotics",value:"splinting",selected:false},
    {name:"Wound Care/Debridament",value:"wound_care",selected:false},
    {name:"Self Care",value:"self_care",selected:false},
    {name:"Group Therapy",value:"group_therapy",selected:false},
    {name:"Cognition",value:"cognition",selected:false},
  ]
  otList = [
    {name:"Therapeutic Activity",value:"therapeutic_activity",selected:false},
    {name:"Neuromuscular Rehabilitation",value:"neuromuscular_rehabilitation",selected:false},
    {name:"Aquatic Therapy",value:"aquatic_therapy",selected:false},
    {name:"Therapeutic Exercise",value:"therapeutic_exercise",selected:false},
    {name:"Patient Ed./ HEP/ RTM",value:"patient_ed_hep_rtm",selected:false},
    {name:"Manual Therapy",value:"manual_therapy",selected:false},
    {name:"Modalities",value:"modalities",selected:false},
    {name:"Splinting/Bracing/Orthotics",value:"splinting",selected:false},
    {name:"Wound Care/Debridament",value:"wound_care",selected:false},
    {name:"Self Care",value:"self_care",selected:false},
    {name:"Group Therapy",value:"group_therapy",selected:false},
    {name:"Cognition",value:"cognition",selected:false},
  ]
  slpList = [
    {name:"Evaluation of Oral and Pharyngeal Swallowing Function",value:"evaluation_of_oral",selected:false},
    {name:"SLP Treatment; Individual",value:"individual",selected:false},
    {name:"Treatment of swallowing dysfunction and/or oral function for feeding",value:"treatment_of_swallowing",selected:false},
    {name:"Speech-generating augmentative/ alternative device",value:"Speech_generating_augmentative",selected:false},
    {name:"Aphasia assessment",value:"aphasia_assessment",selected:false},
    {name:"Development of Cognitive Skills",value:"cognitive_skills",selected:false}
  ]
  actionType = ""
  submitted = false
  minDate = new Date();
  readOnly = false
  caseType = ""
  addendumId =""
  constructor(private route: ActivatedRoute,public authService: AuthService, public commonService: CommonService,private fb: FormBuilder,private router: Router) {
    this.route.params.subscribe((params: Params) => {
      this.appointmentId = params['appointmentId'];
      this.addendumId = params['addendumId'];
      let lengthVal = 2
      if(this.addendumId!=undefined){
        lengthVal = 3
      }
      const locationArray = location.href.split('/')
      if(locationArray[locationArray.length - lengthVal] == 'plan-view'){
        this.readOnly = true
      }
    })
    this.userId = this.authService.getLoggedInInfo('_id')
  }

  ngOnInit() {   
    this.planNoteForm = this.fb.group({
      planType: [''],
      planNote: ['', Validators.maxLength(2500)],
      frequencyPerWeek: ['',Validators.required],
      durationPerWeek: ['',Validators.required],
      planStartDate: ['',Validators.required],
      planEndDate: ['',Validators.required],
    })
    if(this.readOnly){
      this.planNoteForm.disable()
    }
    var params = {
      appointmentId:this.appointmentId,
      soapNoteType:'initial_examination',
      addendumId:this.addendumId
    }
    this.authService.apiRequest('post', 'soapNote/getPlanNote', params).subscribe(async response => {
      if(response.data && response.data.status=='Finalized'){
        this.readOnly = true
      }
      if(response && response?.message && response.message.caseType!=''){
        this.caseType = response.message.caseType
      }
      if(response.data && response.data.appointmentId){
        this.actionType = "update"
        this.planNoteForm.controls['planType'].setValue(response.data.plan_note_type);
        this.planNoteForm.controls['planNote'].setValue(response.data.plan_note);
        this.planNoteForm.controls['frequencyPerWeek'].setValue(response.data.freequency_per_week);
        this.clickedIndex = parseInt(response.data.freequency_per_week)
        this.planNoteForm.controls['durationPerWeek'].setValue(response.data.duration_per_week);
        this.clickedIndex2 = parseInt(response.data.duration_per_week)
        this.planNoteForm.controls['planStartDate'].setValue(response.data.plan_start_date);
        this.planNoteForm.controls['planEndDate'].setValue(response.data.plan_end_date);
        this.ptList.forEach((code:any,index:any) => {
          this.ptList[index].selected =  response.data.pt_treatment_provided[this.ptList[index].value]
        })
        this.otList.forEach((code:any,index:any) => {
          this.otList[index].selected =  response.data.ot_treatment_provided[this.otList[index].value]
        })
        this.slpList.forEach((code:any,index:any) => {
          this.slpList[index].selected =  response.data.slp_treatment_provided[this.slpList[index].value]
        })
      } else {
        this.actionType = "create"
      }
    })

  }

  showOptions(event:any,index:any,type:any){
    if(type=='ptCode'){
      this.ptList[index].selected = event.checked
    }else if(type=='otCode'){
      this.otList[index].selected = event.checked
    }else if(type=='slpCode'){
      this.slpList[index].selected = event.checked
    }
  }

  clickFrequency(){
      this.planNoteForm.controls['frequencyPerWeek'].setValue(this.clickedIndex);
  }
  clickDuraction(){
    this.planNoteForm.controls['durationPerWeek'].setValue(this.clickedIndex2);
  }

  saveDraft(){
    this.submitted = true
    if(this.planNoteForm.invalid){
      return
    }
    this.planNoteForm.controls['frequencyPerWeek'].setValue(this.clickedIndex);
    this.planNoteForm.controls['durationPerWeek'].setValue(this.clickedIndex2);
    var tempPtList:any = {}
    var tempOtList:any = {}
    var tempSlpList:any = {}
    this.ptList.forEach((code) => {  
      tempPtList[code.value] = code.selected
    })
    this.otList.forEach((code) => {  
      tempOtList[code.value] = code.selected
    })
    this.slpList.forEach((code) => {  
      tempSlpList[code.value] = code.selected
    })
    this.planNoteForm.value.ptList = tempPtList
    this.planNoteForm.value.otList = tempOtList
    this.planNoteForm.value.slpList = tempSlpList
    this.planNoteForm.value.appointmentId = this.appointmentId
    this.planNoteForm.value.addendumId = this.addendumId
    this.planNoteForm.value.soapNoteType = "initial_examination"
    if(this.actionType=='create'){
      this.authService.apiRequest('post', 'soapNote/createPlanNote', this.planNoteForm.value).subscribe(async response => {
        this.submitted = false
        if(response.message)this.commonService.openSnackBar(response.message, "SUCCESS")
        setTimeout(() => {
          if(this.addendumId && this.addendumId!=undefined){
            window.open(`${this.commonService.getLoggedInRoute()}`+"/initial-examination/billing/"+this.appointmentId+'/'+this.addendumId, "_self");
          }else{
            window.open(`${this.commonService.getLoggedInRoute()}`+"/initial-examination/billing/"+this.appointmentId, "_self");
          }
        }, 2000)
      })
    }else{
      this.authService.apiRequest('post', 'soapNote/updatePlanNote', this.planNoteForm.value).subscribe(async response => {
        this.submitted = false
        if(response.message)this.commonService.openSnackBar(response.message, "SUCCESS")
          setTimeout(() => {
            if(this.addendumId && this.addendumId!=undefined){
              window.open(`${this.commonService.getLoggedInRoute()}`+"/initial-examination/billing/"+this.appointmentId+'/'+this.addendumId, "_self");
            }else{
              window.open(`${this.commonService.getLoggedInRoute()}`+"/initial-examination/billing/"+this.appointmentId, "_self");
            }
          }, 2000)
      })
    }
  }

  
  
}
