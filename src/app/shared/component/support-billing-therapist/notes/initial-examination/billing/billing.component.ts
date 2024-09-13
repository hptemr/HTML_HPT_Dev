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
  totalTreatmentMinutes = 0
  totalDirectMinutes = 0
  totalUnites = 0
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
  dmeCptList = [
    {name:"Half Foam Roll 12\"",value:"half_foam_roll_12",quantity:""},
    {name:"Pulley",value:"pulley",quantity:""},
    {name:"Half Foam Roll 36\"",value:"half_foam_roll_36",quantity:""},
    {name:"WHO; Cock Up; Pre-fab",value:"who_free_fab",quantity:""},
    {name:"WHO; w/o Joints; Custom",value:"who_custom",quantity:""},
    {name:"Padding Bandage; w >= 3\"",value:"padding_bandage",quantity:""},
    {name:"Elastomull 1\"",value:"elastomull",quantity:""},
    {name:"Putty",value:"putty",quantity:""},
    {name:"HFO; w/o Joints; Custom",value:"hfo_custom",quantity:""},
    {name:"HO Static - Custom",value:"ho_custom",quantity:""},
    {name:"Patellofemoral Sleeve",value:"patellofemoral_sleeve",quantity:""},
    {name:"Knee Orthosis - Prefab",value:"knee_orthosis",quantity:""},
    {name:"ASO Brace",value:"aso_brace",quantity:""},
    {name:"FO; w/o Joints; Custom",value:"fo_custom",quantity:""},
    {name:"WHFO; w/o Joints; Custom",value:"whfo_custom",quantity:""}
  ]
  noVisitCharge  = false
  cptDesc = ""
  cptCode = ""
  quantity = ""
  additionalCodes:any = []
  caseType = "PT"
  constructor(private route: ActivatedRoute,public authService: AuthService, public commonService: CommonService) {
    this.appointmentId = this.route.snapshot.params['appointmentId'];
    this.userId = this.authService.getLoggedInInfo('_id')
  }

  ngOnInit() {   
    var params = {
      appointmentId:this.appointmentId
    }
    this.authService.apiRequest('post', 'soapNote/getBillingNote', params).subscribe(async response => {
      let result = response.data
      if(response.message.caseType!=''){
        this.caseType = response.message.caseType
      }
      if(response.data && response.data.appointmentId){
        this.actionType = "update"
        this.totalTreatmentMinutes = result.total_treatment_minutes
        this.totalDirectMinutes = result.total_direct_minutes
        this.totalUnites = result.total_units
        this.noVisitCharge = result.no_visit_charges
        //united codes prefil
        this.unitedPtList.forEach((code:any,index:any) => {
          this.unitedPtList[index].selected =  result.united_pt_codes[this.unitedPtList[index].value]['selected']
          this.unitedPtList[index].units =  result.united_pt_codes[this.unitedPtList[index].value]['units']
        })
        this.unitedOtList.forEach((code:any,index:any) => {
          this.unitedOtList[index].selected =  result.united_ot_codes[this.unitedOtList[index].value]['selected']
          this.unitedOtList[index].units =  result.united_ot_codes[this.unitedOtList[index].value]['units']
        })
        this.unitedSlpList.forEach((code:any,index:any) => {
          this.unitedSlpList[index].selected =  result.united_slp_codes[this.unitedSlpList[index].value]['selected']
          this.unitedSlpList[index].units =  result.united_slp_codes[this.unitedSlpList[index].value]['units']
        })
        //direct codes prefil
        this.directPtList.forEach((code:any,index:any) => {
          this.directPtList[index].minutes =  result.direct_pt_codes[this.directPtList[index].value]['minutes']
          this.directPtList[index].units =  result.direct_pt_codes[this.directPtList[index].value]['units']
        })
        this.directOtList.forEach((code:any,index:any) => {
          this.directOtList[index].minutes =  result.direct_ot_codes[this.directOtList[index].value]['minutes']
          this.directOtList[index].units =  result.direct_ot_codes[this.directOtList[index].value]['units']
        })
        this.directSlpList.forEach((code:any,index:any) => {
          this.directSlpList[index].minutes =  result.direct_slp_codes[this.directSlpList[index].value]['minutes']
          this.directSlpList[index].units =  result.direct_slp_codes[this.directSlpList[index].value]['units']
        })
        //DME codes prefil
        this.dmeCptList.forEach((code:any,index:any) => {
          this.dmeCptList[index].quantity =  result.dme_cpt_codes[this.dmeCptList[index].value]['quantity']
        })
        this.additionalCodes = result.additional_cpt_code
        result.additional_cpt_code.forEach((code:any,index:any) => {
          this.dmeCptList.push({name:code.cptDesc,value:"",quantity:code.quantity},)
        })
      } else {
        this.actionType = "create"
      }
    })

  }

  showOptions(event:any,index:any,type:any,sourceType:any){
    if(sourceType=='unitedCode'){
      let tempArr:any = []
      if(type=='ptCode'){
        this.unitedPtList[index].selected = event.checked
        tempArr = this.unitedPtList
      }else if(type=='otCode'){
        this.unitedOtList[index].selected = event.checked
        tempArr = this.unitedOtList
      }else if(type=='slpCode'){
        this.unitedSlpList[index].selected = event.checked
        tempArr = this.unitedSlpList
      }
      this.calclulateTotal('units',tempArr,sourceType)
    }
  }

  onKey(event:any,index:any,type:any,sourceType:any,fieldType:any){
    if(fieldType=='units'){
      let tempArr:any = []
      if(sourceType=='unitedCode'){
        if(type=='ptCode'){
          this.unitedPtList[index].units = event.target.value
          tempArr = this.unitedPtList
        }else if(type=='otCode'){
          this.unitedOtList[index].units = event.target.value
          tempArr = this.unitedOtList
        }else if(type=='slpCode'){
          this.unitedSlpList[index].units = event.target.value
          tempArr = this.unitedSlpList
        }
      }else if(sourceType=='directCode'){
          if(type=='ptCode'){
            this.directPtList[index].units = event.target.value
            tempArr = this.directPtList
          }else if(type=='otCode'){
            this.directOtList[index].units = event.target.value
            tempArr = this.directOtList
          }else if(type=='slpCode'){
            this.directSlpList[index].units = event.target.value
            tempArr = this.directSlpList
          }

      } 
      this.calclulateTotal('units',tempArr,sourceType)
    }else if(fieldType=='minutes'){
      let tempArr:any = []
      if(sourceType=='directCode'){
        if(type=='ptCode'){
          this.directPtList[index].minutes = event.target.value
          tempArr = this.directPtList
        }else if(type=='otCode'){
          this.directOtList[index].minutes = event.target.value
          tempArr = this.directOtList
        }else if(type=='slpCode'){
          this.directSlpList[index].minutes = event.target.value
          tempArr = this.directSlpList
        }
        this.calclulateTotal('minutes',tempArr,sourceType)
      }
    }else if(fieldType=='quantity'){
      if(sourceType=='dmeCode'){
        this.dmeCptList[index].quantity = event.target.value
      }
    }
  }

  calclulateTotal(type:any,tempArr:any,sourceType:any){
    if(type=='units'){
      this.totalUnites = 0
      this.unitedPtList.forEach((code:any) => {
        if(code.units!="" && code.selected){ this.totalUnites += parseInt(code.units) }
      })
      this.unitedOtList.forEach((code:any) => {
        if(code.units!="" && code.selected){ this.totalUnites += parseInt(code.units) }
      })
      this.unitedSlpList.forEach((code:any) => {
        if(code.units!="" && code.selected){ this.totalUnites += parseInt(code.units) }
      })
      this.directPtList.forEach((code:any) => {
        if(code.units!=""){ this.totalUnites += parseInt(code.units) }
      })
      this.directOtList.forEach((code:any) => {
        if(code.units!=""){ this.totalUnites += parseInt(code.units) }
      })
      this.directSlpList.forEach((code:any) => {
        if(code.units!=""){ this.totalUnites += parseInt(code.units) }
      })
    }else if(type=='minutes'){
      this.totalDirectMinutes = 0
      tempArr.forEach((code:any) => {
        if(code.minutes!=""){ this.totalDirectMinutes += parseInt(code.minutes) }
      })
    }
  }
  
  addNewCode(){
    this.dmeCptList.push({name:this.cptDesc,value:"",quantity:this.quantity})
    this.additionalCodes.push({cptDesc:this.cptDesc,cptCode:this.cptCode,quantity:this.quantity})
    this.cptCode = ""
    this.cptDesc = ""
    this.quantity = ""
  }

  submit(submitType:any){
    if(submitType=='draft'){
      var tempUnitedPtList:any = {}
      var tempUnitedOtList:any = {}
      var tempUnitedSlpList:any = {}
      var tempDirectPtList:any = {}
      var tempDirectOtList:any = {}
      var tempDirectSlpList:any = {}
      var tempDmeCptList:any = {}

      this.unitedPtList.forEach((code) => {  
        tempUnitedPtList[code.value] = { selected: code.selected, units:code.units} 
      })
      this.unitedOtList.forEach((code) => {  
        tempUnitedOtList[code.value] = { selected: code.selected, units:code.units} 
      })
      this.unitedSlpList.forEach((code) => {  
        tempUnitedSlpList[code.value] = { selected: code.selected, units:code.units} 
      })

      this.directPtList.forEach((code) => {  
        tempDirectPtList[code.value] = { minutes: code.minutes, units:code.units} 
      })

      this.directOtList.forEach((code) => {  
        tempDirectOtList[code.value] = { minutes: code.minutes, units:code.units} 
      })

      this.directSlpList.forEach((code) => {  
        tempDirectSlpList[code.value] = { minutes: code.minutes, units:code.units} 
      })

      this.dmeCptList.forEach((code) => {  
        if(code.value!=""){
          tempDmeCptList[code.value] = { quantity:code.quantity}
        }
      })

      let inputParams = {
        totalTreatmentMinutes:this.totalTreatmentMinutes,
        totalDirectMinutes:this.totalDirectMinutes,
        totalUnites:this.totalUnites,
        noVisitCharge:this.noVisitCharge,
        unitedPtList:tempUnitedPtList,
        unitedOtList:tempUnitedOtList,
        unitedSlpList:tempUnitedSlpList,
        directPtList:tempDirectPtList,
        directOtList:tempDirectOtList,
        directSlpList:tempDirectSlpList,
        dmeCptList:tempDmeCptList,
        appointmentId : this.appointmentId,
        soapNoteType : "initial_examination",
        additionalCodes:this.additionalCodes

      }
      if(this.actionType=='create'){
        this.authService.apiRequest('post', 'soapNote/createBillingNote', inputParams).subscribe(async response => {
          this.commonService.openSnackBar("Created Successfully", "SUCCESS")
          window.open(`${this.commonService.getLoggedInRoute()}`+"/initial-examination/billing/"+this.appointmentId, "_self");
        })
      }else{
        this.authService.apiRequest('post', 'soapNote/updateBillingNote', inputParams).subscribe(async response => {
          this.commonService.openSnackBar("Updated Successfully", "SUCCESS")
          window.open(`${this.commonService.getLoggedInRoute()}`+"/initial-examination/billing/"+this.appointmentId, "_self");
        })
      }
    }else{
      let inputParams = {
        appointmentId : this.appointmentId
      }
      this.authService.apiRequest('post', 'soapNote/finalizeNote', inputParams).subscribe(async response => {
        this.commonService.openSnackBar("Note Finalized Successfully", "SUCCESS")
      })
    }
  }

}
