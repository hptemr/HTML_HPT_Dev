import { Component,OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { MatDialog } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { icd_data } from '../../../../../../ICD';
import { validationMessages } from '../../../../../../utils/validation-messages';
import { Validators, FormGroup, FormBuilder,FormArray, AbstractControl,FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { BodyDetailsModalComponent } from 'src/app/shared/component/intake-form/intake-step3/body-details-modal/body-details-modal.component';
//import { AppointmentService } from 'src/app/shared/services/appointment.service';
@Component({
  selector: 'app-pn-subjective', 
  templateUrl: './pn-subjective.component.html',
  styleUrl: './pn-subjective.component.scss',
})
export class PnSubjectiveComponent implements OnInit {
  icd_data = icd_data;
  isDisabled = true;
  clickedIndex = 0;
  model: NgbDateStruct;
  selectedValue: number;
  appointment_dates:any=[];
  appointment_data:any=[];
  tabs = [
    {number: '1'}, {number: '2'}, {number: '3'},
    {number: '4'}, {number: '5'}, {number: '6'},
    {number: '7'}, {number: '8'}, {number: '9'},
    {number: '10'}
  ];
  appointmentId: string;
  public userId: string;
  public userRole: string;
  selectedCode:any;
  icdCodeList:any = [];
  public subjectiveForm: FormGroup;
  validationMessages = validationMessages; 
  todayDate = new Date();
  appointment: any = null
  submitted:boolean=false;
  subjectiveId: string = '';
  cancerSelf:string = '';
  cancerSelfYes:string = '';
  cancerFamilyYes:string = '';
  cancerFamily:string = '';
  diabetesSelf:string = '';
  diabetesSelfYes:string = '';
  diabetesFamily:string = '';
  diabetesFamilyYes:string = '';
  highBloodPressureSelf:string = '';
  highBloodPressureSelfYes:string = '';
  highBloodPressureFamily:string = '';
  highBloodPressureFamilyYes:string = '';
  heartDiseaseSelfYes:string = '';
  heartDiseaseSelf:string = '';
  heartDiseaseFamily:string = '';
  heartDiseaseFamilyYes:string = '';
  anginaChestPainSelf:string = '';
  anginaChestPainSelfYes:string = '';
  anginaChestPainFamily:string = '';
  anginaChestPainFamilyYes:string = '';
  strokeSelf:string = '';
  strokeSelfYes:string = '';
  strokeFamily:string = '';
  strokeFamilyYes:string = '';
  osteoporosisSelf:string = '';
  osteoporosisSelfYes:string = '';
  osteoporosisFamily:string = '';
  osteoporosisFamilyYes:string = '';
  osteoarthritisSelf:string = '';
  osteoarthritisSelfYes:string = '';
  osteoarthritisFamily:string = '';
  osteoarthritisFamilyYes:string = '';
  rheumatoidArthritisSelf:string = '';
  rheumatoidArthritisSelfYes:string = '';
  rheumatoidArthritisFamily:string = '';
  rheumatoidArthritisFamilyYes:string = '';
  bleedingDisordersSelf:string = '';
  bleedingDisordersSelfYes:string = '';
  bleedingDisordersFamily:string = '';
  bleedingDisordersFamilyYes:string = '';
  changeYourHealthSelf:string = '';
  changeYourHealthSelfYes:string = '';
  nauseaVomitingSelf:string = '';
  nauseaVomitingSelfYes:string = '';
  feverChillsSweatsSelf:string = '';
  feverChillsSweatsSelfYes:string = '';
  unexplainedWeightChangeSelf:string = '';
  unexplainedWeightChangeSelfYes:string = '';
  numbnessTinglingSelf:string = '';
  numbnessTinglingSelfYes:string = '';
  changesAppetiteSelf:string = '';
  changesAppetiteSelfYes:string = '';
  difficultySwallowingSelf:string = '';
  difficultySwallowingSelfYes:string = '';
  bowelBladderSelf:string = '';
  bowelBladderSelfYes:string = '';
  shortnessBreathSelf:string = '';
  shortnessBreathSelfYes:string = '';
  dizzinessSelf:string = '';
  dizzinessSelfYes:string = '';
  upperRespiratoryInfectionSelf:string = '';
  upperRespiratoryInfectionSelfYes:string = '';
  urinaryTractInfectionSelf:string = '';
  urinaryTractInfectionSelfYes:string = '';
  allergiesToMedicationsSelf:string = '';
  allergiesToMedications_AllergyArray:any;
  allergiesToMedications_SurgeryArray:any;
  allergiesToMedications_MedicationArray:any;
  allergiesAsthmaSelf:string = '';
  allergiesAsthmaSelfYes:string = '';
  headachesSelf:string = '';
  headachesSelfYes:string = '';
  bronchitisSelf:string = '';
  bronchitisSelfYes:string = '';
  kidneyDiseaseSelf:string = '';
  kidneyDiseaseSelfYes:string = '';
  rheumaticFeverSelf:string = '';
  rheumaticFeverSelfYes:string = '';
  ulcersSelf:string = '';
  ulcersSelfYes:string = '';
  sexuallyTransmittedDiseaseSelf:string = '';
  sexuallyTransmittedDiseaseSelfYes:string = '';
  seizuresSelf:string = '';
  seizuresSelfYes:string = '';
  pacemakerSelf:string = '';
  pacemakerSelfYes:string = '';
  anyMetalInBodySelf:string = '';
  anyMetalInBodySelfYes:string = '';
  areYouPregnantSelf:string = '';
  areYouPregnantSelfYes:string = '';
  areYouDepressedSelf:string = '';
  areYouDepressedSelfYes:string = '';
  areYouUnderStressSelf:string = '';
  areYouUnderStressSelfYes:string = '';
  symptoms:string = '';
  symptomsSame:string = '';
  rateYourPain:number = 0;
  initialName:string = '';
  selectedPartsFront: string[] = [];
  selectedPartsBack: string[] = [];
  bodyPartFront:any=[]
  bodyPartBack:any=[]
  diagnosisClicked = false
  readOnly = false
  status:string = 'Draft';
  addendumId:string=''
  constructor( private router: Router,private fb: FormBuilder, private route: ActivatedRoute, public authService: AuthService, public commonService: CommonService,public dialog: MatDialog) {
    this.route.params.subscribe((params: Params) => {
      this.appointmentId = params['appointmentId'];
      this.addendumId = params['addendumId'];
      let lengthVal = 2
      if(this.addendumId!=undefined){
        lengthVal = 3
      }
      const locationArray = location.href.split('/')
      if(locationArray[locationArray.length - 2] == 'subjective-view'){
        this.readOnly = true
      }
    })
  }

  ngOnInit() {
    this.userId = this.authService.getLoggedInInfo('_id')
    this.userRole = this.authService.getLoggedInInfo('role')

    this.subjectiveForm = this.fb.group({
      appointmentId:[this.appointmentId],
      note_date: [''],
      diagnosis_code: this.fb.array([this.fb.group({
        code: ['',Validators.required],
        name: ['',Validators.required]
      })]),
      treatment_side: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      surgery_date: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      surgery_type: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      subjective_note: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2500)]],
    });
    if(this.readOnly){
        this.subjectiveForm.disable()
        this.icd_data = []
    }
    this.getSubjectiveRecord()
  }

  getSubjectiveRecord(type:string='progress_note'){
    let reqVars = {
      query: {appointmentId:this.appointmentId,soap_note_type:type},     
      soap_note_type:'progress_note'
    }
    this.authService.apiRequest('post', 'soapNote/getSubjectiveData', reqVars).subscribe(async response => {
      
      if(response.data && response.data.subjectiveData){
        let subjectiveData = response.data.subjectiveData;
        this.status = subjectiveData.status;  
        if (subjectiveData.status!='Finalized' &&  type=='progress_note' && this.appointmentId==subjectiveData.appointmentId) this.subjectiveId = subjectiveData._id
        if(type=='initial_examination' && subjectiveData.status=='Finalized'){
          this.status = 'Draft';
        }       
               
        let note_date = '';
        if (subjectiveData.note_date && subjectiveData.status!='Finalized' && !this.readOnly){
          note_date = subjectiveData.note_date
        }
        if (subjectiveData.note_date && this.readOnly){
          note_date = subjectiveData.note_date
        }
        this.subjectiveForm.controls['note_date'].setValue(note_date)
        
        this.subjectiveForm.controls['treatment_side'].setValue(subjectiveData.treatment_side);
        this.subjectiveForm.controls['surgery_date'].setValue(subjectiveData.surgery_date);
        this.subjectiveForm.controls['surgery_type'].setValue(subjectiveData.surgery_type);
        this.subjectiveForm.controls['subjective_note'].setValue(subjectiveData.subjective_note); 
        subjectiveData.diagnosis_code.forEach((element: any,index:number) => {
          let item = {'code':element.code,'name':element.name};      
          if(this.icdCodeList.length==0){
            const ctrls = this.subjectiveForm.get('diagnosis_code') as FormArray;
            ctrls.removeAt(0)  
          }      
          this.diagnosisCodeInfo.push(this.fb.group({
            code: [element.code, Validators.required],
            name: [element.name, Validators.required],
          }));
          this.icdCodeList.push(item);
        })
        this.selectedCode = this.icdCodeList.length>0 ? true : false;
        
        
      }else{
        if(type=='progress_note'){
          this.selectedPartsFront = [];
          this.selectedPartsBack = [];
          this.getSubjectiveRecord('initial_examination')
        }
      }

      if(type=='progress_note' && response.data && response.data.appointmentDatesList){
        this.appointment_dates = this.commonService.checkappointmentDatesList(response.data.appointmentDatesList,'progress_note')    
      }

      if(response.data && response.data.appointmentData){
        this.appointment_data = response.data.appointmentData

          //if(this.appointment_data.checkInDateTime){ this.subjectiveForm.controls['note_date'].setValue(this.commonService.formatUTCDate(this.appointment_data.checkInDateTime));}
          if(this.appointment_data?.patientId && this.appointment_data?.patientId.firstName && this.appointment_data?.patientId.lastName){
            this.initialName = this.appointment_data?.patientId?.firstName.charAt(0)+''+this.appointment_data?.patientId?.lastName.charAt(0)
          }
          
          this.bodyPartFront = this.appointment_data?.bodyPartFront;
          if(this.appointment_data?.adminBodyPartFront){
            this.bodyPartFront = this.appointment_data?.adminBodyPartFront;
          }
          this.bodyPartBack = this.appointment_data?.bodyPartBack;
          if(this.appointment_data?.adminBodyPartBack){
            this.bodyPartBack = this.appointment_data?.adminBodyPartBack;
          }

          if(this.bodyPartFront){          
            this.bodyPartFront.forEach((element: any) => {
              if (!this.selectedPartsFront.includes(element.part)) {
                this.selectedPartsFront.push(element.part);
              } else {
                this.selectedPartsFront = this.selectedPartsFront.filter(p => p[0] !== element.part);
              }
            });
          }

          if(this.bodyPartBack){          
            this.bodyPartBack.forEach((element: any) => {
              if (!this.selectedPartsBack.includes(element.part)) {
                this.selectedPartsBack.push(element.part);
              } else {
                this.selectedPartsBack = this.selectedPartsBack.filter(p => p[0] !== element.part);
              }
            });
          } 
          
        let medicalHistory = this.appointment_data?.patientMedicalHistory;
        if(this.appointment_data?.adminPatientMedicalHistory && this.appointment_data?.adminPatientMedicalHistory.fullName){
          medicalHistory = this.appointment_data?.adminPatientMedicalHistory;
        }
        
        if(this.appointment_data && medicalHistory){
          this.cancerSelf = medicalHistory?.cancerSelf;//=='Yes' ? true : false;
          this.cancerSelfYes = medicalHistory?.cancerSelfYes;
          
          this.cancerFamily = medicalHistory?.cancerFamily;//=='Yes' ? true : false;
          this.cancerFamilyYes = medicalHistory?.cancerFamilyYes;
          
          this.diabetesSelf = medicalHistory?.diabetesSelf;
          this.diabetesSelfYes = medicalHistory?.diabetesSelfYes;
          this.diabetesFamily = medicalHistory?.diabetesFamily;
          this.diabetesFamilyYes = medicalHistory?.diabetesFamilyYes;
          this.highBloodPressureSelf = medicalHistory?.highBloodPressureSelf;
          this.highBloodPressureSelfYes = medicalHistory?.highBloodPressureSelfYes;         
          this.highBloodPressureFamily= medicalHistory?.highBloodPressureFamily;
          this.highBloodPressureFamilyYes= medicalHistory?.highBloodPressureFamilyYes;
          this.heartDiseaseSelf= medicalHistory?.heartDiseaseSelf;
          this.heartDiseaseSelfYes= medicalHistory?.heartDiseaseSelfYes;
          this.heartDiseaseFamily= medicalHistory?.heartDiseaseFamily;
          this.heartDiseaseFamilyYes= medicalHistory?.heartDiseaseFamilyYes;
          this.anginaChestPainSelf= medicalHistory?.anginaChestPainSelf;
          this.anginaChestPainSelfYes= medicalHistory?.anginaChestPainSelfYes;
          this.anginaChestPainFamily= medicalHistory?.anginaChestPainFamily;
          this.anginaChestPainFamilyYes= medicalHistory?.anginaChestPainFamilyYes;
          this.strokeSelf= medicalHistory?.strokeSelf;
          this.strokeSelfYes= medicalHistory?.strokeSelfYes;
          this.strokeFamily= medicalHistory?.strokeFamily;
          this.strokeFamilyYes= medicalHistory?.strokeFamilyYes;
          this.osteoporosisSelf= medicalHistory?.osteoporosisSelf;
          this.osteoporosisSelfYes= medicalHistory?.osteoporosisSelfYes;
          this.osteoporosisFamily= medicalHistory?.osteoporosisFamily;
          this.osteoporosisFamilyYes= medicalHistory?.osteoporosisFamilyYes;
          this.osteoarthritisSelf= medicalHistory?.osteoarthritisSelf;
          this.osteoarthritisSelfYes= medicalHistory?.osteoarthritisSelfYes;
          this.osteoarthritisFamily= medicalHistory?.osteoarthritisFamily;
          this.osteoarthritisFamilyYes= medicalHistory?.osteoarthritisFamilyYes;
          this.rheumatoidArthritisSelf= medicalHistory?.rheumatoidArthritisSelf;
          this.rheumatoidArthritisSelfYes= medicalHistory?.rheumatoidArthritisSelfYes;
          this.rheumatoidArthritisFamily= medicalHistory?.rheumatoidArthritisFamily;
          this.rheumatoidArthritisFamilyYes= medicalHistory?.rheumatoidArthritisFamilyYes;
          this.bleedingDisordersSelf= medicalHistory?.bleedingDisordersSelf;
          this.bleedingDisordersSelfYes= medicalHistory?.bleedingDisordersSelfYes;
          this.bleedingDisordersFamily= medicalHistory?.bleedingDisordersFamily;
          this.bleedingDisordersFamilyYes= medicalHistory?.bleedingDisordersFamilyYes;
          this.changeYourHealthSelf= medicalHistory?.changeYourHealthSelf;
          this.changeYourHealthSelfYes= medicalHistory?.changeYourHealthSelfYes;
          this.nauseaVomitingSelf= medicalHistory?.nauseaVomitingSelf;
          this.nauseaVomitingSelfYes= medicalHistory?.nauseaVomitingSelfYes;
          this.feverChillsSweatsSelf= medicalHistory?.feverChillsSweatsSelf;
          this.feverChillsSweatsSelfYes= medicalHistory?.feverChillsSweatsSelfYes;
          this.unexplainedWeightChangeSelf= medicalHistory?.unexplainedWeightChangeSelf;
          this.unexplainedWeightChangeSelfYes= medicalHistory?.unexplainedWeightChangeSelfYes;
          this.numbnessTinglingSelf= medicalHistory?.numbnessTinglingSelf;
          this.numbnessTinglingSelfYes= medicalHistory?.numbnessTinglingSelfYes;       
          this.changesAppetiteSelf= medicalHistory?.changesAppetiteSelf;
          this.changesAppetiteSelfYes= medicalHistory?.changesAppetiteSelfYes;
          this.difficultySwallowingSelf= medicalHistory?.difficultySwallowingSelf;
          this.difficultySwallowingSelfYes= medicalHistory?.difficultySwallowingSelfYes;
          this.bowelBladderSelf= medicalHistory?.bowelBladderSelf;
          this.bowelBladderSelfYes= medicalHistory?.bowelBladderSelfYes;       
          this.shortnessBreathSelf= medicalHistory?.shortnessBreathSelf;
          this.shortnessBreathSelfYes= medicalHistory?.shortnessBreathSelfYes;
          this.dizzinessSelf= medicalHistory?.dizzinessSelf;
          this.dizzinessSelfYes= medicalHistory?.dizzinessSelfYes;
          this.upperRespiratoryInfectionSelf= medicalHistory?.upperRespiratoryInfectionSelf;       
          this.upperRespiratoryInfectionSelfYes= medicalHistory?.upperRespiratoryInfectionSelfYes;
          this.urinaryTractInfectionSelf= medicalHistory?.urinaryTractInfectionSelf;
          this.urinaryTractInfectionSelfYes= medicalHistory?.urinaryTractInfectionSelfYes;
          this.allergiesToMedicationsSelf= medicalHistory?.allergiesToMedicationsSelf;
          this.allergiesToMedications_AllergyArray= medicalHistory?.allergiesToMedications_AllergyArray;        
          this.allergiesToMedications_SurgeryArray= medicalHistory?.allergiesToMedications_SurgeryArray;
          this.allergiesToMedications_MedicationArray= medicalHistory?.allergiesToMedications_MedicationArray;
          this.allergiesAsthmaSelf= medicalHistory?.allergiesAsthmaSelf;
          this.allergiesAsthmaSelfYes= medicalHistory?.allergiesAsthmaSelfYes;
          this.headachesSelf= medicalHistory?.headachesSelf;       
          this.headachesSelfYes= medicalHistory?.headachesSelfYes;
          this.bronchitisSelf= medicalHistory?.bronchitisSelf;
          this.bronchitisSelfYes= medicalHistory?.bronchitisSelfYes;
          this.kidneyDiseaseSelf= medicalHistory?.kidneyDiseaseSelf;
          this.kidneyDiseaseSelfYes= medicalHistory?.kidneyDiseaseSelfYes;
          this.rheumaticFeverSelf= medicalHistory?.rheumaticFeverSelf;       
          this.rheumaticFeverSelfYes= medicalHistory?.rheumaticFeverSelfYes;
          this.ulcersSelf= medicalHistory?.ulcersSelf;
          this.ulcersSelfYes= medicalHistory?.ulcersSelfYes;
          this.sexuallyTransmittedDiseaseSelf= medicalHistory?.sexuallyTransmittedDiseaseSelf;
          this.sexuallyTransmittedDiseaseSelfYes= medicalHistory?.sexuallyTransmittedDiseaseSelfYes;
          this.seizuresSelf= medicalHistory?.seizuresSelf;
          this.seizuresSelfYes= medicalHistory?.seizuresSelfYes;
          this.pacemakerSelf= medicalHistory?.pacemakerSelf;       
          this.pacemakerSelfYes= medicalHistory?.pacemakerSelfYes;
          this.anyMetalInBodySelf= medicalHistory?.anyMetalInBodySelf;
          this.anyMetalInBodySelfYes= medicalHistory?.anyMetalInBodySelfYes;
          this.areYouPregnantSelf= medicalHistory?.areYouPregnantSelf;
          this.areYouPregnantSelfYes= medicalHistory?.areYouPregnantSelfYes;
          this.areYouDepressedSelf= medicalHistory?.areYouDepressedSelf;
          this.areYouDepressedSelfYes= medicalHistory?.areYouDepressedSelfYes;
          this.areYouUnderStressSelf= medicalHistory?.areYouUnderStressSelf;
          this.areYouUnderStressSelfYes= medicalHistory?.areYouUnderStressSelfYes;                              
          this.symptoms = medicalHistory?.symptoms;
          this.symptomsSame = medicalHistory?.symptomsSame;
          this.rateYourPain = medicalHistory?.rateYourPain ? medicalHistory?.rateYourPain : 0;                
        }       
      }    

      // if(this.status=='Finalized'){
      //   this.readOnly = true
      //   this.subjectiveForm.disable()
      //   this.icd_data = []
      // }
    })
  }

  getDiagnosisCodes(Obj:any) {
    return this.fb.group({      
      code: [Obj.code, Validators.compose([ Validators.required ])],
      name: [Obj.name, Validators.compose([ Validators.required ])],
    });
  }


  subjectiveSubmit(formData:any){
    this.diagnosisClicked = true
    if (this.subjectiveForm.invalid){
      this.subjectiveForm.markAllAsTouched();
    }else{
        this.submitted = true
        this.commonService.showLoader();       
        let updateInfo = [];
        updateInfo.push({
          fromAdminId:this.userId,
          userRole:this.userRole,
          updatedAt:new Date()
        });

        if(this.subjectiveId){
          Object.assign(formData, {updateInfo:updateInfo})
        }else{
          Object.assign(formData, {updateInfo:updateInfo,appointmentId:this.appointmentId,soap_note_type:'progress_note',status:'Draft',createdBy:this.userId})
        }
        
        let reqVars = {
          userId: this.userId,
          data: formData,
          subjectiveId:this.subjectiveId
        }        
        this.authService.apiRequest('post', 'soapNote/submitSubjective', reqVars).subscribe(async (response) => {    
          if (response.error) {
            if (response.message) {
              this.commonService.openSnackBar(response.message, "ERROR");
            }           
          } else {         
            if (response.message) {
              //this.successModal(response.message);
              this.commonService.openSnackBar(response.message, "SUCCESS");
            }

            setTimeout(() => {
              if(this.addendumId && this.addendumId!=undefined){
                this.router.navigate([this.commonService.getLoggedInRoute()+'/progress-notes/objective/'+this.appointmentId+'/'+this.addendumId]);
              }else{
                this.router.navigate([this.commonService.getLoggedInRoute()+'/progress-notes/objective/'+this.appointmentId]);
              } 
            }, 1000)
          }
          this.commonService.hideLoader();
          setTimeout(() => {
            this.submitted = false
          }, 3000)
          
        })
    }
  }

  onChange(event: MatRadioChange) {
    //console.log(this.selectedValue = event.value)
  }

  onCodeChange(event: any) {
    let selectedData =  icd_data.filter(city => city.code === event.code);
    if(selectedData[0]){
      let item = {'code':selectedData[0].code,'name':selectedData[0].name};      
      if(this.icdCodeList.length==0){
        const ctrls = this.subjectiveForm.get('diagnosis_code') as FormArray;
        ctrls.removeAt(0)  
      }      
      this.diagnosisCodeInfo.push(this.fb.group({
        code: [selectedData[0].code, Validators.required],
        name: [selectedData[0].name, Validators.required],
      }));
      this.icdCodeList.push(item);
    }    
    this.selectedCode = this.icdCodeList.length>0 ? true : false;
  }

  removeIcd(index:number) {
    this.icdCodeList.splice(index, 1);
    const control = <FormArray>this.subjectiveForm.controls['diagnosis_code'];
    control.removeAt(index);
  }


  get diagnosisCodeInfo() {
    return this.subjectiveForm.get('diagnosis_code') as FormArray;
  }

  
  checkSpace(colName: any, event: any) {
    this.subjectiveForm.controls[colName].setValue(this.commonService.capitalize(event.target.value.trim()))
  }

  bodyClick(from:string,partName:string) {   
    if (this.selectedPartsFront.includes(partName) || this.selectedPartsBack.includes(partName)) {
      const dialogRef = this.dialog.open(BodyDetailsModalComponent,{
        panelClass: 'custom-alert-container', 
        data : {
          heading: '',
          partName:partName,
          appId:this.appointment_data._id,
          from:from,
          bodyPartFront:this.bodyPartFront,
          bodyPartBack:this.bodyPartBack,
          appointmentUpdateInfo:this.appointment_data.appointmentUpdateInfo,
          readOnly:true
        }
      });  


      dialogRef.afterClosed().subscribe(result => {
        if(result && !result.error){
            if(from=='bodyPartFront'){
              this.selectedPartsFront.push(partName);
            }else if(from=='bodyPartBack'){
              this.selectedPartsBack.push(partName);
            }
        }
      });
     }
    }
  
}
