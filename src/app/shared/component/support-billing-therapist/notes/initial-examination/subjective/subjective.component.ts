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
  selector: 'app-subjective', 
  templateUrl: './subjective.component.html',
  styleUrl: './subjective.component.scss',
})
export class SubjectiveComponent implements OnInit {
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
  rateYourPain:string = '';
  
  constructor( private router: Router,private fb: FormBuilder, private route: ActivatedRoute, public authService: AuthService, public commonService: CommonService,public dialog: MatDialog) {
    this.route.params.subscribe((params: Params) => {
      this.appointmentId = params['appointmentId'];
    })
  }

  ngOnInit() {
    this.userId = this.authService.getLoggedInInfo('_id')
    this.userRole = this.authService.getLoggedInInfo('role')

    this.subjectiveForm = this.fb.group({
      appointmentId:[this.appointmentId],
      note_date: ['', [Validators.required]],
      diagnosis_code: this.fb.array([this.fb.group({
        code: ['',Validators.required],
        name: ['',Validators.required]
      })]),
      treatment_side: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      surgery_date: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(35)]],
      surgery_type: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      subjective_note: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2500)]],
    });

    this.getSubjectiveRecord()
  }

  getSubjectiveRecord(){

    // var reqVars = {
    //   appointmentId:this.appointmentId,
    //   soap_note_type:'initial_examination'
    // }
    let reqVars = {
      query: {appointmentId:this.appointmentId,soap_note_type:'initial_examination'},     
    }
    this.authService.apiRequest('post', 'soapNote/getSubjectiveData', reqVars).subscribe(async response => {
    
      if(response.data && response.data.subjectiveData){
        let subjectiveData = response.data.subjectiveData;

   
        this.subjectiveId = subjectiveData._id;
        this.subjectiveForm.controls['note_date'].setValue(subjectiveData.note_date);
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
      }

      if(response.data && response.data.appointmentDatesList){
        this.appointment_dates = response.data.appointmentDatesList       
      }

      if(response.data && response.data.appointmentData){
        this.appointment_data = response.data.appointmentData
        if(this.appointment_data && this.appointment_data?.patientMedicalHistory){
          this.cancerSelf = this.appointment_data?.patientMedicalHistory?.cancerSelf;//=='Yes' ? true : false;
          this.cancerFamily = this.appointment_data?.patientMedicalHistory?.cancerFamily;//=='Yes' ? true : false;

          
          this.diabetesSelf = this.appointment_data?.patientMedicalHistory?.diabetesSelf;
          this.diabetesSelfYes = this.appointment_data?.patientMedicalHistory?.diabetesSelfYes;
          this.diabetesFamily = this.appointment_data?.patientMedicalHistory?.diabetesFamily;
          this.diabetesFamilyYes = this.appointment_data?.patientMedicalHistory?.diabetesFamilyYes;
          this.highBloodPressureSelf = this.appointment_data?.patientMedicalHistory?.highBloodPressureSelf;
          this.highBloodPressureSelfYes = this.appointment_data?.patientMedicalHistory?.highBloodPressureSelfYes;         
          this.highBloodPressureFamily= this.appointment_data?.patientMedicalHistory?.highBloodPressureFamily;
          this.highBloodPressureFamilyYes= this.appointment_data?.patientMedicalHistory?.highBloodPressureFamilyYes;
          this.heartDiseaseSelf= this.appointment_data?.patientMedicalHistory?.heartDiseaseSelf;
          this.heartDiseaseSelfYes= this.appointment_data?.patientMedicalHistory?.heartDiseaseSelfYes;
          this.heartDiseaseFamily= this.appointment_data?.patientMedicalHistory?.heartDiseaseFamily;
          this.heartDiseaseFamilyYes= this.appointment_data?.patientMedicalHistory?.heartDiseaseFamilyYes;
          this.anginaChestPainSelf= this.appointment_data?.patientMedicalHistory?.anginaChestPainSelf;
          this.anginaChestPainSelfYes= this.appointment_data?.patientMedicalHistory?.anginaChestPainSelfYes;
          this.anginaChestPainFamily= this.appointment_data?.patientMedicalHistory?.anginaChestPainFamily;
          this.anginaChestPainFamilyYes= this.appointment_data?.patientMedicalHistory?.anginaChestPainFamilyYes;
          this.strokeSelf= this.appointment_data?.patientMedicalHistory?.strokeSelf;
          this.strokeSelfYes= this.appointment_data?.patientMedicalHistory?.strokeSelfYes;
          this.strokeFamily= this.appointment_data?.patientMedicalHistory?.strokeFamily;
          this.strokeFamilyYes= this.appointment_data?.patientMedicalHistory?.strokeFamilyYes;
          this.osteoporosisSelf= this.appointment_data?.patientMedicalHistory?.osteoporosisSelf;
          this.osteoporosisSelfYes= this.appointment_data?.patientMedicalHistory?.osteoporosisSelfYes;
          this.osteoporosisFamily= this.appointment_data?.patientMedicalHistory?.osteoporosisFamily;
          this.osteoporosisFamilyYes= this.appointment_data?.patientMedicalHistory?.osteoporosisFamilyYes;
          this.osteoarthritisSelf= this.appointment_data?.patientMedicalHistory?.osteoarthritisSelf;
          this.osteoarthritisSelfYes= this.appointment_data?.patientMedicalHistory?.osteoarthritisSelfYes;
          this.osteoarthritisFamily= this.appointment_data?.patientMedicalHistory?.osteoarthritisFamily;
          this.osteoarthritisFamilyYes= this.appointment_data?.patientMedicalHistory?.osteoarthritisFamilyYes;
          this.rheumatoidArthritisSelf= this.appointment_data?.patientMedicalHistory?.rheumatoidArthritisSelf;
          this.rheumatoidArthritisSelfYes= this.appointment_data?.patientMedicalHistory?.rheumatoidArthritisSelfYes;
          this.rheumatoidArthritisFamily= this.appointment_data?.patientMedicalHistory?.rheumatoidArthritisFamily;
          this.rheumatoidArthritisFamilyYes= this.appointment_data?.patientMedicalHistory?.rheumatoidArthritisFamilyYes;

          this.bleedingDisordersSelf= this.appointment_data?.patientMedicalHistory?.bleedingDisordersSelf;
          this.bleedingDisordersSelfYes= this.appointment_data?.patientMedicalHistory?.bleedingDisordersSelfYes;
          this.bleedingDisordersFamily= this.appointment_data?.patientMedicalHistory?.bleedingDisordersFamily;
          this.bleedingDisordersFamilyYes= this.appointment_data?.patientMedicalHistory?.bleedingDisordersFamilyYes;

          this.changeYourHealthSelf= this.appointment_data?.patientMedicalHistory?.changeYourHealthSelf;
          this.changeYourHealthSelfYes= this.appointment_data?.patientMedicalHistory?.changeYourHealthSelfYes;
          this.nauseaVomitingSelf= this.appointment_data?.patientMedicalHistory?.nauseaVomitingSelf;
          this.nauseaVomitingSelfYes= this.appointment_data?.patientMedicalHistory?.nauseaVomitingSelfYes;
          this.feverChillsSweatsSelf= this.appointment_data?.patientMedicalHistory?.feverChillsSweatsSelf;
          this.feverChillsSweatsSelfYes= this.appointment_data?.patientMedicalHistory?.feverChillsSweatsSelfYes;
          this.unexplainedWeightChangeSelf= this.appointment_data?.patientMedicalHistory?.unexplainedWeightChangeSelf;
          this.unexplainedWeightChangeSelfYes= this.appointment_data?.patientMedicalHistory?.unexplainedWeightChangeSelfYes;
          this.numbnessTinglingSelf= this.appointment_data?.patientMedicalHistory?.numbnessTinglingSelf;
          this.numbnessTinglingSelfYes= this.appointment_data?.patientMedicalHistory?.numbnessTinglingSelfYes;       
          this.changesAppetiteSelf= this.appointment_data?.patientMedicalHistory?.changesAppetiteSelf;
          this.changesAppetiteSelfYes= this.appointment_data?.patientMedicalHistory?.changesAppetiteSelfYes;
          this.difficultySwallowingSelf= this.appointment_data?.patientMedicalHistory?.difficultySwallowingSelf;
          this.difficultySwallowingSelfYes= this.appointment_data?.patientMedicalHistory?.difficultySwallowingSelfYes;
          this.bowelBladderSelf= this.appointment_data?.patientMedicalHistory?.bowelBladderSelf;
          this.bowelBladderSelfYes= this.appointment_data?.patientMedicalHistory?.bowelBladderSelfYes;       
          this.shortnessBreathSelf= this.appointment_data?.patientMedicalHistory?.shortnessBreathSelf;
          this.shortnessBreathSelfYes= this.appointment_data?.patientMedicalHistory?.shortnessBreathSelfYes;
          this.dizzinessSelf= this.appointment_data?.patientMedicalHistory?.dizzinessSelf;
          this.dizzinessSelfYes= this.appointment_data?.patientMedicalHistory?.dizzinessSelfYes;
          this.upperRespiratoryInfectionSelf= this.appointment_data?.patientMedicalHistory?.upperRespiratoryInfectionSelf;       
          this.upperRespiratoryInfectionSelfYes= this.appointment_data?.patientMedicalHistory?.upperRespiratoryInfectionSelfYes;
          this.urinaryTractInfectionSelf= this.appointment_data?.patientMedicalHistory?.urinaryTractInfectionSelf;
          this.urinaryTractInfectionSelfYes= this.appointment_data?.patientMedicalHistory?.urinaryTractInfectionSelfYes;
          this.allergiesToMedicationsSelf= this.appointment_data?.patientMedicalHistory?.allergiesToMedicationsSelf;
          this.allergiesToMedications_AllergyArray= this.appointment_data?.patientMedicalHistory?.allergiesToMedications_AllergyArray;        
          this.allergiesToMedications_SurgeryArray= this.appointment_data?.patientMedicalHistory?.allergiesToMedications_SurgeryArray;
          this.allergiesToMedications_MedicationArray= this.appointment_data?.patientMedicalHistory?.allergiesToMedications_MedicationArray;
          this.allergiesAsthmaSelf= this.appointment_data?.patientMedicalHistory?.allergiesAsthmaSelf;
          this.allergiesAsthmaSelfYes= this.appointment_data?.patientMedicalHistory?.allergiesAsthmaSelfYes;
          this.headachesSelf= this.appointment_data?.patientMedicalHistory?.headachesSelf;       
          this.headachesSelfYes= this.appointment_data?.patientMedicalHistory?.headachesSelfYes;
          this.bronchitisSelf= this.appointment_data?.patientMedicalHistory?.bronchitisSelf;
          this.bronchitisSelfYes= this.appointment_data?.patientMedicalHistory?.bronchitisSelfYes;

          this.kidneyDiseaseSelf= this.appointment_data?.patientMedicalHistory?.kidneyDiseaseSelf;
          this.kidneyDiseaseSelfYes= this.appointment_data?.patientMedicalHistory?.kidneyDiseaseSelfYes;
          this.rheumaticFeverSelf= this.appointment_data?.patientMedicalHistory?.rheumaticFeverSelf;       
          this.rheumaticFeverSelfYes= this.appointment_data?.patientMedicalHistory?.rheumaticFeverSelfYes;
          this.ulcersSelf= this.appointment_data?.patientMedicalHistory?.ulcersSelf;
          this.ulcersSelfYes= this.appointment_data?.patientMedicalHistory?.ulcersSelfYes;
          this.sexuallyTransmittedDiseaseSelf= this.appointment_data?.patientMedicalHistory?.sexuallyTransmittedDiseaseSelf;
          this.sexuallyTransmittedDiseaseSelfYes= this.appointment_data?.patientMedicalHistory?.sexuallyTransmittedDiseaseSelfYes;

          this.seizuresSelf= this.appointment_data?.patientMedicalHistory?.seizuresSelf;
          this.seizuresSelfYes= this.appointment_data?.patientMedicalHistory?.seizuresSelfYes;
          this.pacemakerSelf= this.appointment_data?.patientMedicalHistory?.pacemakerSelf;       
          this.pacemakerSelfYes= this.appointment_data?.patientMedicalHistory?.pacemakerSelfYes;
          this.anyMetalInBodySelf= this.appointment_data?.patientMedicalHistory?.anyMetalInBodySelf;
          this.anyMetalInBodySelfYes= this.appointment_data?.patientMedicalHistory?.anyMetalInBodySelfYes;
          this.areYouPregnantSelf= this.appointment_data?.patientMedicalHistory?.areYouPregnantSelf;
          this.areYouPregnantSelfYes= this.appointment_data?.patientMedicalHistory?.areYouPregnantSelfYes;

          this.areYouDepressedSelf= this.appointment_data?.patientMedicalHistory?.areYouDepressedSelf;
          this.areYouDepressedSelfYes= this.appointment_data?.patientMedicalHistory?.areYouDepressedSelfYes;
          this.areYouUnderStressSelf= this.appointment_data?.patientMedicalHistory?.areYouUnderStressSelf;
          this.areYouUnderStressSelfYes= this.appointment_data?.patientMedicalHistory?.areYouUnderStressSelfYes;


          this.symptoms= this.appointment_data?.patientMedicalHistory?.symptoms;
          this.symptomsSame= this.appointment_data?.patientMedicalHistory?.symptomsSame;
          this.rateYourPain= this.appointment_data?.patientMedicalHistory?.rateYourPain;

        }
        
      }
       console.log('>>>>>',this.allergiesToMedications_AllergyArray)

       console.log('>>>>>',this.allergiesToMedications_SurgeryArray)

      // console.log('>>>',this.appointment_data?.patientMedicalHistory?.cancerFamily,'--------',this.appointment_data?.patientMedicalHistory?.cancerSelf)
    })
  }

  getDiagnosisCodes(Obj:any) {
    return this.fb.group({      
      code: [Obj.code, Validators.compose([ Validators.required ])],
      name: [Obj.name, Validators.compose([ Validators.required ])],
    });
  }


  subjectiveSubmit(formData:any){
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
          Object.assign(formData, {updateInfo:updateInfo,appointmentId:this.appointmentId,soap_note_type:'initial_examination',status:'Draft',createdBy:this.userId})
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

  
  ngAfterViewInit() {
    
  }

  bodyClick() {
    const dialogRef = this.dialog.open(BodyDetailsModalComponent,{
      panelClass: 'custom-alert-container', 
    });  
  }
  
}
