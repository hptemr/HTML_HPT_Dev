import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';

@Component({
  selector: 'app-billing', 
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.scss'
})
export class BillingComponent {
  isDisabled: boolean = false;
  totalTreatmentMinutes = ""
  totalDirectMinutes = ""
  totalUnites = ""
  appointmentId =""
  userId =""
  actionType = ""
  unitedPtList = [
    {name:"PT Evaluation: Low Complexity",value:"low_complexity",units:"",selected:false},
    {name:"PT Evaluation: Moderate Complexity",value:"moderate_complexity",units:"",selected:false},
    {name:"PT Evaluation: High Complexity",value:"high_complexity",units:"",selected:false},
    {name:"PT Re-Evaluation",value:"re_evaluation",units:"",selected:false},
    {name:"Paraffin Bath",value:"paraffin_bath",units:"",selected:false},
    {name:"Vasopneumatic device",value:"vasopneumatic_device",units:"",selected:false},
    {name:"Mechanical traction",value:"mechanical_traction",units:"",selected:false},
    {name:"E-Stim Unattended for Medicate/UHC",value:"e_stim_unattended",units:"",selected:false}
  ]
  unitedOtList = [
    {name:"PT Evaluation: Low Complexity",value:"low_complexity",units:"",selected:false},
    {name:"PT Evaluation: Moderate Complexity",value:"moderate_complexity",units:"",selected:false},
    {name:"PT Evaluation: High Complexity",value:"high_complexity",units:"",selected:false},
    {name:"PT Re-Evaluation",value:"re_evaluation",units:"",selected:false},
    {name:"Paraffin Bath",value:"paraffin_bath",units:"",selected:false},
    {name:"Vasopneumatic device",value:"vasopneumatic_device",units:"",selected:false},
    {name:"Mechanical traction",value:"mechanical_traction",units:"",selected:false},
    {name:"E-Stim Unattended for Medicate/UHC",value:"e_stim_unattended",units:"",selected:false}
  ]
  unitedSlpList = [
    {name:"Evaluation of speech sound production",value:"evaluation_of_speech",units:"",selected:false},
    {name:"Evaluation of speech sound production including language comprehension & expression",value:"evaluation_of_speech_language",units:"",selected:false},
    {name:"Behavioral and qualitative analysis of voice and resonance",value:"voice_and_resonance",units:"",selected:false},
    {name:"Evaluation of oral and pharyngeal swallowing function",value:"evaluation_of_oral",units:"",selected:false},
    {name:"Use of speech device service",value:"use_of_speech_device",units:"",selected:false},
    {name:"SLP Treatment; individual",value:"slp_treatment",units:"",selected:false},
    {name:"Treatment of swallowing dysfunction and/or oral function for feeding",value:"treatment_of_swallowing_dysfunction",units:"",selected:false},
    {name:"Assessment of aphasia",value:"assessment_of_aphasia",units:"",selected:false},
    {name:"Standardized cognitive performance testing, per hour",value:"standardized_cognitive_performance",units:"",selected:false},
    {name:"Therapeutic interventions that focus on cognitive function e.g., attention, memory, reasoning, executive function, problem solving and/or pragmatic functioning) and compensatory strategies to manage the performance of an activity (e.g., managing time or schedules, initiating, organizing and sequencing tasks)",value:"therapeutic_interventions",units:"",selected:false}
  ]

  directPtList = [
    {name:"Therapeutic Activity",value:"therapeutic_activity",units:"",minutes:""},
    {name:"Neuro Muscular Re-Education",value:"neuro_muscular_re_education",units:"",minutes:""},
    {name:"Aquatic Exercise",value:"aquatic_exercise",units:"",minutes:""},
    {name:"Therapeutic Exercise",value:"therapeutic_exercise",units:"",minutes:""},
    {name:"Manual Therapy",value:"manual_therapy",units:"",minutes:""}
  ]
  directOtList = [
    {name:"Therapeutic Activity",value:"therapeutic_activity",units:"",minutes:""},
    {name:"Neuro Muscular Re-Education",value:"neuro_muscular_re_education",units:"",minutes:""},
    {name:"Aquatic Exercise",value:"aquatic_exercise",units:"",minutes:""},
    {name:"Therapeutic Exercise",value:"therapeutic_exercise",units:"",minutes:""},
    {name:"Manual Therapy",value:"manual_therapy",units:"",minutes:""},
    {name:"Therapeutic interventions that focus on cognitive function (eg, attention, memory, executive function) and compensatory strategies to manage the performance of an activity (eg, managing time), direct (one-to-one) patinet contact; initial 15 minutes",value:"therapeutic_interventions",units:"",minutes:""}
  ]
  directSlpList = [
    {name:"Gait Training",value:"gait_train",units:"",minutes:""},
    {name:"FCE/Performance Test",value:"performance_test",units:"",minutes:""}
  ]
  dmePtList = [
    {name:"Half Foam Roll 12\"",value:"half_foam_roll_12",units:""},
    {name:"Pulley",value:"pulley",units:""},
    {name:"Half Foam Roll 36\"",value:"half_foam_roll_36",units:""},
    {name:"WHO; Cock Up; Pre-fab",value:"who_free_fab",units:""},
    {name:"WHO; w/o Joints; Custom",value:"who_custom",units:""}
  ]
  dmeOtList = [
    {name:"Padding Bandage; w >= 3\"",value:"padding_bandage",units:""},
    {name:"Elastomull 1\"",value:"elastomull",units:""},
    {name:"Putty",value:"putty",units:""},
    {name:"HFO; w/o Joints; Custom",value:"hfo_custom",units:""},
    {name:"HO Static - Custom",value:"ho_custom",units:""}
  ]
  dmeSlpList = [
    {name:"Patellofemoral Sleeve",value:"patellofemoral_sleeve",units:""},
    {name:"Knee Orthosis - Prefab",value:"knee_orthosis",units:""},
    {name:"ASO Brace",value:"aso_brace",units:""},
    {name:"FO; w/o Joints; Custom",value:"fo_custom",units:""},
    {name:"WHFO; w/o Joints; Custom",value:"whfo_custom",units:""}
  ]
  constructor(private route: ActivatedRoute,public authService: AuthService, public commonService: CommonService) {
    this.appointmentId = this.route.snapshot.params['appointmentId'];
    this.userId = this.authService.getLoggedInInfo('_id')
  }

  ngOnInit() {   
    // var params = {
    //   appointmentId:this.appointmentId
    // }
    // this.authService.apiRequest('post', 'soapNote/getPlanNote', params).subscribe(async response => {
    //   if(response.data && response.data.appointmentId){
    //     this.actionType = "update"
        
    //   } else {
    //     this.actionType = "create"
    //   }
    // })

  }

  showOptions(event:any,index:any,type:any,sourceType:any){
    if(sourceType=='unitedCode'){
      if(type=='ptCode'){
        this.unitedPtList[index].selected = event.checked
      }else if(type=='otCode'){
        this.unitedOtList[index].selected = event.checked
      }else if(type=='slpCode'){
        this.unitedSlpList[index].selected = event.checked
      }
    }
  }

  onKey(event:any,index:any,type:any,sourceType:any,fieldType:any){
    if(fieldType=='units'){
      if(sourceType=='unitedCode'){
        if(type=='ptCode'){
          this.unitedPtList[index].units = event.target.value
        }else if(type=='otCode'){
          this.unitedOtList[index].units = event.target.value
        }else if(type=='slpCode'){
          this.unitedSlpList[index].units = event.target.value
        }
      }else if(sourceType=='directCode'){
          if(type=='ptCode'){
            this.directPtList[index].units = event.target.value
          }else if(type=='otCode'){
            this.directOtList[index].units = event.target.value
          }else if(type=='slpCode'){
            this.directSlpList[index].units = event.target.value
          }
      } else if(sourceType=='dmeCode'){
        if(type=='ptCode'){
          this.dmePtList[index].units = event.target.value
        }else if(type=='otCode'){
          this.dmeOtList[index].units = event.target.value
        }else if(type=='slpCode'){
          this.dmeSlpList[index].units = event.target.value
        }
      }
    }else if(fieldType=='minutes'){
      if(sourceType=='directCode'){
        if(type=='ptCode'){
          this.directPtList[index].minutes = event.target.value
        }else if(type=='otCode'){
          this.directOtList[index].minutes = event.target.value
        }else if(type=='slpCode'){
          this.directSlpList[index].minutes = event.target.value
        }
      }
    }
    
    
  }

  submit(submitType:any){
    console.log(this.totalTreatmentMinutes,"=====",this.totalDirectMinutes,"======",this.totalUnites)
    console.log("unitedPtList",this.unitedPtList)
    console.log("unitedOtList",this.unitedOtList)
    console.log("unitedSlpList",this.unitedSlpList)
    console.log("directPtList",this.directPtList)
    console.log("directOtList",this.directOtList)
    console.log("directSlpList",this.directSlpList)
    console.log("dmePtList",this.dmePtList)
    console.log("dmeOtList",this.dmeOtList)
    console.log("dmeSlpList",this.dmeSlpList)
  }

}
