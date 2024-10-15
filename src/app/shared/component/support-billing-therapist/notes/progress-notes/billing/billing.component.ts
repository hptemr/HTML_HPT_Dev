import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';

@Component({
  selector: 'app-billing-daily-note', 
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.scss'
})
export class ProgressNoteBillingComponent {
  isDisabled: boolean = false;
  totalTreatmentMinutes = 0
  totalDirectMinutes = 0
  totalUnites = 0
  appointmentId =""
  userId =""
  actionType = ""
  unitedPtList = [
    {name:"PT Evaluation: Low Complexity",value:"low_complexity",units:"",minutes:"",selected:false,isError:false,errorMsg:""},
    {name:"PT Evaluation: Moderate Complexity",value:"moderate_complexity",units:"",minutes:"",selected:false,isError:false,errorMsg:""},
    {name:"PT Evaluation: High Complexity",value:"high_complexity",units:"",minutes:"",selected:false,isError:false,errorMsg:""},
    {name:"PT Re-Evaluation",value:"re_evaluation",units:"",minutes:"",selected:false,isError:false,errorMsg:""},
    {name:"Paraffin Bath",value:"paraffin_bath",units:"",minutes:"",selected:false,isError:false,errorMsg:""},
    {name:"Vasopneumatic device",value:"vasopneumatic_device",units:"",minutes:"",selected:false,isError:false,errorMsg:""},
    {name:"Mechanical traction",value:"mechanical_traction",units:"",minutes:"",selected:false,isError:false,errorMsg:""},
    {name:"E-Stim Unattended for Medicate/UHC",value:"e_stim_unattended",units:"",minutes:"",selected:false,isError:false,errorMsg:""}
  ]
  unitedOtList = [
    {name:"PT Evaluation: Low Complexity",value:"low_complexity",units:"",minutes:"",selected:true,isError:false,errorMsg:""},
    {name:"PT Evaluation: Moderate Complexity",value:"moderate_complexity",units:"",minutes:"",selected:true,isError:false,errorMsg:""},
    {name:"PT Evaluation: High Complexity",value:"high_complexity",units:"",minutes:"",selected:true,isError:false,errorMsg:""},
    {name:"PT Re-Evaluation",value:"re_evaluation",units:"",minutes:"",selected:true,isError:false,errorMsg:""},
    {name:"Paraffin Bath",value:"paraffin_bath",units:"",minutes:"",selected:false,isError:false,errorMsg:""},
    {name:"Vasopneumatic device",value:"vasopneumatic_device",units:"",minutes:"",selected:false,isError:false,errorMsg:""},
    {name:"Mechanical traction",value:"mechanical_traction",units:"",minutes:"",selected:false,isError:false,errorMsg:""},
    {name:"E-Stim Unattended for Medicate/UHC",value:"e_stim_unattended",units:"",minutes:"",selected:false,isError:false,errorMsg:""}
  ]
  unitedSlpList = [
    {name:"Evaluation of speech sound production",value:"evaluation_of_speech",units:"",minutes:"",selected:false,isError:false,errorMsg:""},
    {name:"Evaluation of speech sound production including language comprehension & expression",value:"evaluation_of_speech_language",units:"",minutes:"",selected:false,isError:false,errorMsg:""},
    {name:"Behavioral and qualitative analysis of voice and resonance",value:"voice_and_resonance",units:"",minutes:"",selected:false,isError:false,errorMsg:""},
    {name:"Evaluation of oral and pharyngeal swallowing function",value:"evaluation_of_oral",units:"",minutes:"",selected:false,isError:false,errorMsg:""},
    {name:"Use of speech device service",value:"use_of_speech_device",units:"",minutes:"",selected:false,isError:false,errorMsg:""},
    {name:"SLP Treatment; individual",value:"slp_treatment",units:"",minutes:"",selected:false,isError:false,errorMsg:""},
    {name:"Treatment of swallowing dysfunction and/or oral function for feeding",value:"treatment_of_swallowing_dysfunction",units:"",minutes:"",selected:false,isError:false,errorMsg:""},
    {name:"Assessment of aphasia",value:"assessment_of_aphasia",units:"",minutes:"",selected:false},
    {name:"Standardized cognitive performance testing, per hour",value:"standardized_cognitive_performance",units:"",minutes:"",selected:false,isError:false,errorMsg:""},
    {name:"Therapeutic interventions that focus on cognitive function e.g., attention, memory, reasoning, executive function, problem solving and/or pragmatic functioning) and compensatory strategies to manage the performance of an activity (e.g., managing time or schedules, initiating, organizing and sequencing tasks)",value:"therapeutic_interventions",units:"",minutes:"",selected:false,isError:false,errorMsg:""}
  ]

  directPtList = [
    {name:"Therapeutic Activity",value:"therapeutic_activity",units:"",minutes:"",isError:false,errorMsg:""},
    {name:"Neuro Muscular Re-Education",value:"neuro_muscular_re_education",units:"",minutes:"",isError:false,errorMsg:""},
    {name:"Aquatic Exercise",value:"aquatic_exercise",units:"",minutes:"",isError:false,errorMsg:""},
    {name:"Therapeutic Exercise",value:"therapeutic_exercise",units:"",minutes:"",isError:false,errorMsg:""},
    {name:"Manual Therapy",value:"manual_therapy",units:"",minutes:"",isError:false,errorMsg:""}
  ]
  directOtList = [
    {name:"Therapeutic Activity",value:"therapeutic_activity",units:"",minutes:"",isError:false,errorMsg:""},
    {name:"Neuro Muscular Re-Education",value:"neuro_muscular_re_education",units:"",minutes:"",isError:false,errorMsg:""},
    {name:"Aquatic Exercise",value:"aquatic_exercise",units:"",minutes:"",isError:false,errorMsg:""},
    {name:"Therapeutic Exercise",value:"therapeutic_exercise",units:"",minutes:"",isError:false,errorMsg:""},
    {name:"Manual Therapy",value:"manual_therapy",units:"",minutes:"",isError:false,errorMsg:""},
    {name:"Therapeutic interventions that focus on cognitive function (eg, attention, memory, executive function) and compensatory strategies to manage the performance of an activity (eg, managing time), direct (one-to-one) patinet contact; initial 15 minutes",value:"therapeutic_interventions",units:"",minutes:"",isError:false,errorMsg:""}
  ]
  directSlpList = [
    {name:"Gait Training",value:"gait_train",units:"",minutes:"",isError:false,errorMsg:""},
    {name:"FCE/Performance Test",value:"performance_test",units:"",minutes:"",isError:false,errorMsg:""}
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
  caseType = ""
  billingType = "CMS"
  isHold = false
  constructor(private route: ActivatedRoute,public authService: AuthService, public commonService: CommonService) {
    this.appointmentId = this.route.snapshot.params['appointmentId'];
    this.userId = this.authService.getLoggedInInfo('_id')
  }

  ngOnInit() { 
    var params = {
      appointmentId:this.appointmentId,
      noteType:"progress_note"
    }
    this.authService.apiRequest('post', 'soapNote/getBillingNote', params).subscribe(async response => {
      let result = response.data
      if(response.message && response.message.billingType==""){
        this.isHold = true
      }
      if(response.message && response.message.caseType && response.message.caseType!=''){
        this.caseType = response.message.caseType
      }
      if(response.message && response.message.billingType && response.message.billingType!=''){
        this.billingType = response.message.billingType
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
          this.unitedPtList[index].minutes =  result.united_pt_codes[this.unitedPtList[index].value]['minutes']
        })
        this.unitedOtList.forEach((code:any,index:any) => {
          this.unitedOtList[index].selected =  result.united_ot_codes[this.unitedOtList[index].value]['selected']
          this.unitedOtList[index].units =  result.united_ot_codes[this.unitedOtList[index].value]['units']
          this.unitedOtList[index].minutes =  result.united_ot_codes[this.unitedPtList[index].value]['minutes']

        })
        this.unitedSlpList.forEach((code:any,index:any) => {
          this.unitedSlpList[index].selected =  result.united_slp_codes[this.unitedSlpList[index].value]['selected']
          this.unitedSlpList[index].units =  result.united_slp_codes[this.unitedSlpList[index].value]['units']
          this.unitedSlpList[index].minutes =  result.united_slp_codes[this.unitedSlpList[index].value]['minutes']
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
      if(type=='ptCode'){
        this.unitedPtList[index].selected = event.checked
        this.unitedPtList[index].units = "1"
        if(index==0){
          this.unitedPtList[index].minutes = '20'
        }else if(index==1){
          this.unitedPtList[index].minutes = '30'
        }else if(index==2){
          this.unitedPtList[index].minutes = '45'
        }else if(index==3){
          this.unitedPtList[index].minutes = '20'
        }
        if(!event.checked){
          this.unitedPtList[index].minutes = ''
          this.unitedPtList[index].units = ''
        }
      }else if(type=='otCode'){
        this.unitedOtList[index].selected = event.checked
        this.unitedOtList[index].units = "1"
        if(index==0){
          this.unitedOtList[index].minutes = '20'
        }else if(index==1){
          this.unitedOtList[index].minutes = '30'
        }else if(index==2){
          this.unitedOtList[index].minutes = '45'
        }else if(index==3){
          this.unitedOtList[index].minutes = '20'
        }
        if(!event.checked){
          this.unitedOtList[index].minutes = ''
          this.unitedOtList[index].units = ''
        }
      }else if(type=='slpCode'){
        this.unitedSlpList[index].selected = event.checked
        this.unitedSlpList[index].units = "1"
        if(!event.checked){
          this.unitedSlpList[index].minutes = ''
          this.unitedSlpList[index].units = ''
        }
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
        this.validateMinute(event,index,type,sourceType)
      } 
      this.calclulateTotal('units')
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
      if(sourceType=='unitedCode'){
        if(type=='ptCode'){
          this.unitedPtList[index].minutes = event.target.value
        }else if(type=='otCode'){
          this.unitedOtList[index].minutes = event.target.value
        }else if(type=='slpCode'){
          this.unitedSlpList[index].minutes = event.target.value
        }
        this.calclulateTotal('minutes')
      }
      this.calclulateTotal('units')
    }else if(fieldType=='quantity'){
      if(sourceType=='dmeCode'){
        this.dmeCptList[index].quantity = event.target.value
      }
    }
    this.calclulateTotal('units')
    this.calclulateTotal('minutes')
  }

  validateMinute(event:any,index:any,caseType:any,sourceType:any){
    let addMinutes = 15
    if(sourceType=='directCode'){
      if(caseType=='ptCode'){
        let units = this.directPtList[index].units //first box value
        let finalRange = (parseInt(units) * addMinutes) + 7
        let initialRange = ((parseInt(units) -1) * addMinutes) + 8
        if((event.target.value>=initialRange && event.target.value<=finalRange) || units==""){
          this.directPtList[index].isError = false 
          this.directPtList[index].errorMsg = "" 
          this.calclulateTotal('minutes')
          this.calclulateTotal('units')
        }else{
          this.directPtList[index].isError = true 
          if(this.directPtList[index].minutes==''){
            this.directPtList[index].errorMsg = "Please Enter Minutes Value"
          }else{
            this.directPtList[index].errorMsg = "Oops! It looks like you miscalculated: For "+units+" Unit the minutes need to be between "+initialRange+" and "+finalRange+""
            this.calclulateTotal('minutes')
            this.calclulateTotal('units')
          }
        }
      }else if(caseType=='otCode'){
        let units = this.directOtList[index].units //first box value
        let finalRange = (parseInt(units) * addMinutes) + 7
        let initialRange = ((parseInt(units) -1) * addMinutes) + 8
        if((event.target.value>=initialRange && event.target.value<=finalRange) || units==""){
          this.directOtList[index].isError = false 
          this.directOtList[index].errorMsg = "" 
          this.calclulateTotal('minutes')
          this.calclulateTotal('units')
        }else{
          this.directOtList[index].isError = true 
          if(this.directOtList[index].minutes==''){
            this.directOtList[index].errorMsg = "Please Enter Minutes Value"
          }else{
            this.directOtList[index].errorMsg = "Oops! It looks like you miscalculated: For "+units+" Unit the minutes need to be between "+initialRange+" and "+finalRange+""
          }
        }
      }else if(caseType=='slpCode'){
        let units = this.directSlpList[index].units //first box value
        let finalRange = (parseInt(units) * addMinutes) + 7
        let initialRange = ((parseInt(units) -1) * addMinutes) + 8
        if((event.target.value>=initialRange && event.target.value<=finalRange) || units==""){
          this.directSlpList[index].isError = false 
          this.directSlpList[index].errorMsg = "" 
          this.calclulateTotal('minutes')
          this.calclulateTotal('units')
        }else{
          this.directSlpList[index].isError = true 
          if(this.directSlpList[index].minutes==''){
            this.directSlpList[index].errorMsg = "Please Enter Minutes Value"
          }else{
            this.directSlpList[index].errorMsg = "Oops! It looks like you miscalculated: For "+units+" Unit the minutes need to be between "+initialRange+" and "+finalRange+""
          }
        }
      }
    }
  }

  calclulateTotal(type:any){
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
        if(code.units!="" && !code.isError){ this.totalUnites += parseInt(code.units) }
      })
      this.directOtList.forEach((code:any) => {
        if(code.units!="" && !code.isError){ this.totalUnites += parseInt(code.units) }
      })
      this.directSlpList.forEach((code:any) => {
        if(code.units!="" && !code.isError){ this.totalUnites += parseInt(code.units) }
      })
    }else if(type=='minutes'){
      this.totalDirectMinutes = 0
      this.totalTreatmentMinutes = 0
      this.directPtList.forEach((code:any) => {
        if(code.minutes!="" && !code.isError){ this.totalDirectMinutes += parseInt(code.minutes) }
      })
      this.directOtList.forEach((code:any) => {
        if(code.minutes!="" && !code.isError){ this.totalDirectMinutes += parseInt(code.minutes) }
      })
      this.directSlpList.forEach((code:any) => {
        if(code.minutes!="" && !code.isError){ this.totalDirectMinutes += parseInt(code.minutes) }
      })

      this.totalTreatmentMinutes = this.totalDirectMinutes
      this.unitedPtList.forEach((code:any) => {
        if(code.minutes!="" && code.selected){ this.totalTreatmentMinutes += parseInt(code.minutes) }
      })
      this.unitedOtList.forEach((code:any) => {
        if(code.minutes!="" && code.selected){ this.totalTreatmentMinutes += parseInt(code.minutes) }
      })
      this.unitedSlpList.forEach((code:any) => {
        if(code.minutes!="" && code.selected){ this.totalTreatmentMinutes += parseInt(code.minutes) }
      })
    }
  }
  
  addNewCode(){
    if(this.quantity!="" && this.cptCode!="" && this.cptDesc!=""){
      this.dmeCptList.push({name:this.cptDesc,value:"",quantity:this.quantity})
      this.additionalCodes.push({cptDesc:this.cptDesc,cptCode:this.cptCode,quantity:this.quantity})
      this.cptCode = ""
      this.cptDesc = ""
      this.quantity = ""
    }
  }

  submit(submitType:any){
    let errorInCode = false
    var tempUnitedPtList:any = {}
    var tempUnitedOtList:any = {}
    var tempUnitedSlpList:any = {}
    var tempDirectPtList:any = {}
    var tempDirectOtList:any = {}
    var tempDirectSlpList:any = {}
    var tempDmeCptList:any = {}
    this.directPtList.forEach((code) => {  
      if(!code.isError){
        tempDirectPtList[code.value] = { minutes: code.minutes, units:code.units} 
      }else{
        errorInCode = true
      }
    })

    this.directOtList.forEach((code) => {  
      if(!code.isError){
        tempDirectOtList[code.value] = { minutes: code.minutes, units:code.units} 
      }else{
        errorInCode = true
      }
    })

    this.directSlpList.forEach((code) => { 
      if(!code.isError){ 
        tempDirectSlpList[code.value] = { minutes: code.minutes, units:code.units} 
      }else{
        errorInCode = true
      }
    })
    if(submitType=='draft'){
      this.unitedPtList.forEach((code) => {  
        tempUnitedPtList[code.value] = { selected: code.selected, units:code.units,minutes: code.minutes} 
      })
      this.unitedOtList.forEach((code) => {  
        tempUnitedOtList[code.value] = { selected: code.selected, units:code.units,minutes: code.minutes} 
      })
      this.unitedSlpList.forEach((code) => {  
        tempUnitedSlpList[code.value] = { selected: code.selected, units:code.units,minutes: code.minutes} 
      })
      this.dmeCptList.forEach((code) => {  
        if(code.value!=""){
          tempDmeCptList[code.value] = { quantity:code.quantity}
        }
      })

      if(!errorInCode){
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
          soapNoteType : "progress_note",
          additionalCodes:this.additionalCodes
        }
        if(this.actionType=='create'){
          this.authService.apiRequest('post', 'soapNote/createBillingNote', inputParams).subscribe(async response => {
            this.commonService.openSnackBar("Created Successfully", "SUCCESS")
            window.open(`${this.commonService.getLoggedInRoute()}`+"/progress-notes/billing/"+this.appointmentId, "_self");
          })
        }else{
          this.authService.apiRequest('post', 'soapNote/updateBillingNote', inputParams).subscribe(async response => {
            this.commonService.openSnackBar("Updated Successfully", "SUCCESS")
            window.open(`${this.commonService.getLoggedInRoute()}`+"/progress-notes/billing/"+this.appointmentId, "_self");
          })
        }
      }
    }else{
      if(!errorInCode){
        let inputParams = {
          appointmentId : this.appointmentId
        }
        this.authService.apiRequest('post', 'soapNote/finalizeNote', inputParams).subscribe(async response => {
          if(response.error){
            this.commonService.openSnackBar(response.message, "ERROR");
          }else{
          this.commonService.openSnackBar("Note Finalized Successfully", "SUCCESS")
          window.open(`${this.commonService.getLoggedInRoute()}`+"/case-details/"+this.appointmentId, "_self");
          }
        })
      }
    }
  }

}
