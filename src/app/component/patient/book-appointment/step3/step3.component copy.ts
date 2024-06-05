import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss'
})
export class Step3Component {
  clickedIndex = 0;
  model: NgbDateStruct;
  selectedValue: number;

  step3Form: FormGroup

  step1FormData: any
  step2FormData: any
  step3FormData: any

  allergyAddMore = 0
  phones: FormArray

  constructor(public dialog: MatDialog, private router: Router,
    private fb: FormBuilder, private commonService: CommonService,
    private authService: AuthService) {
  }

  ngOnInit() {
    let step1: any
    step1 = localStorage.getItem("step1FormData")
    this.step1FormData = JSON.parse(step1)
    console.log(" this.step1FormData :", this.step1FormData)

    this.step3FormData = localStorage.getItem("step3FormData")
    if (this.step3FormData == null) {
      let step2: any
      step2 = localStorage.getItem("step2FormData")
      this.step2FormData = JSON.parse(step2)
      console.log(" this.step2FormData :", this.step2FormData)
    } else {
      this.step3FormData = JSON.parse(this.step3FormData)
      console.log(" this.step3FormData :", this.step3FormData)
    }
    this.loadForm()
  }

  get form() {
    return this.step3Form.controls;
  }

  loadForm() {
    this.step3Form = new FormGroup({
      dob: new FormControl(''),
      fullName: new FormControl(''),
      appointmentDate: new FormControl(''),

      cancerSelf: new FormControl((this.step3FormData ? this.step3FormData.cancerSelf : 'No')),
      cancerSelfYes: new FormControl((this.step3FormData ? this.step3FormData.cancerSelfYes : '')),
      cancerFamily: new FormControl((this.step3FormData ? this.step3FormData.cancerSelf : 'No')),
      cancerFamilyYes: new FormControl((this.step3FormData ? this.step3FormData.cancerFamilyYes : '')),

      diabetesSelf: new FormControl((this.step3FormData ? this.step3FormData.diabetesSelf : 'No')),
      diabetesSelfYes: new FormControl((this.step3FormData ? this.step3FormData.diabetesSelfYes : '')),
      diabetesFamily: new FormControl((this.step3FormData ? this.step3FormData.diabetesFamily : 'No')),
      diabetesFamilyYes: new FormControl((this.step3FormData ? this.step3FormData.diabetesFamilyYes : '')),

      highBloodPressureSelf: new FormControl((this.step3FormData ? this.step3FormData.highBloodPressureSelf : 'No')),
      highBloodPressureSelfYes: new FormControl((this.step3FormData ? this.step3FormData.highBloodPressureSelfYes : '')),
      highBloodPressureFamily: new FormControl((this.step3FormData ? this.step3FormData.highBloodPressureFamily : 'No')),
      highBloodPressureFamilyYes: new FormControl((this.step3FormData ? this.step3FormData.highBloodPressureFamilyYes : '')),

      heartDiseaseSelf: new FormControl((this.step3FormData ? this.step3FormData.heartDiseaseSelf : 'No')),
      heartDiseaseSelfYes: new FormControl((this.step3FormData ? this.step3FormData.heartDiseaseSelfYes : '')),
      heartDiseaseFamily: new FormControl((this.step3FormData ? this.step3FormData.heartDiseaseFamily : 'No')),
      heartDiseaseFamilyYes: new FormControl((this.step3FormData ? this.step3FormData.heartDiseaseFamilyYes : '')),

      anginaChestPainSelf: new FormControl((this.step3FormData ? this.step3FormData.anginaChestPainSelf : 'No')),
      anginaChestPainSelfYes: new FormControl((this.step3FormData ? this.step3FormData.anginaChestPainSelfYes : '')),
      anginaChestPainFamily: new FormControl((this.step3FormData ? this.step3FormData.anginaChestPainFamily : 'No')),
      anginaChestPainFamilyYes: new FormControl((this.step3FormData ? this.step3FormData.anginaChestPainFamilyYes : '')),

      strokeSelf: new FormControl((this.step3FormData ? this.step3FormData.strokeSelf : 'No')),
      strokeSelfYes: new FormControl((this.step3FormData ? this.step3FormData.strokeSelfYes : '')),
      strokeFamily: new FormControl((this.step3FormData ? this.step3FormData.strokeFamily : 'No')),
      strokeFamilyYes: new FormControl((this.step3FormData ? this.step3FormData.strokeFamilyYes : '')),

      osteoporosisSelf: new FormControl((this.step3FormData ? this.step3FormData.osteoporosisSelf : 'No')),
      osteoporosisSelfYes: new FormControl((this.step3FormData ? this.step3FormData.osteoporosisSelfYes : '')),
      osteoporosisFamily: new FormControl((this.step3FormData ? this.step3FormData.osteoporosisFamily : 'No')),
      osteoporosisFamilyYes: new FormControl((this.step3FormData ? this.step3FormData.osteoporosisFamilyYes : '')),

      osteoarthritisSelf: new FormControl((this.step3FormData ? this.step3FormData.osteoarthritisSelf : 'No')),
      osteoarthritisSelfYes: new FormControl((this.step3FormData ? this.step3FormData.osteoarthritisSelfYes : '')),
      osteoarthritisFamily: new FormControl((this.step3FormData ? this.step3FormData.osteoarthritisFamily : 'No')),
      osteoarthritisFamilyYes: new FormControl((this.step3FormData ? this.step3FormData.osteoarthritisFamilyYes : '')),

      rheumatoidArthritisSelf: new FormControl((this.step3FormData ? this.step3FormData.rheumatoidArthritisSelf : 'No')),
      rheumatoidArthritisSelfYes: new FormControl((this.step3FormData ? this.step3FormData.rheumatoidArthritisSelfYes : '')),
      rheumatoidArthritisFamily: new FormControl((this.step3FormData ? this.step3FormData.rheumatoidArthritisFamily : 'No')),
      rheumatoidArthritisFamilyYes: new FormControl((this.step3FormData ? this.step3FormData.rheumatoidArthritisFamilyYes : '')),

      bleedingDisordersSelf: new FormControl((this.step3FormData ? this.step3FormData.bleedingDisordersSelf : 'No')),
      bleedingDisordersSelfYes: new FormControl((this.step3FormData ? this.step3FormData.bleedingDisordersSelfYes : '')),
      bleedingDisordersFamily: new FormControl((this.step3FormData ? this.step3FormData.bleedingDisordersSelf : 'No')),
      bleedingDisordersFamilyYes: new FormControl((this.step3FormData ? this.step3FormData.bleedingDisordersSelfYes : '')),

      changeYourHealthSelf: new FormControl((this.step3FormData ? this.step3FormData.changeYourHealthSelf : 'No')),
      changeYourHealthSelfYes: new FormControl((this.step3FormData ? this.step3FormData.changeYourHealthSelfYes : '')),

      nauseaVomitingSelf: new FormControl((this.step3FormData ? this.step3FormData.nauseaVomitingSelf : 'No')),
      nauseaVomitingSelfYes: new FormControl((this.step3FormData ? this.step3FormData.nauseaVomitingSelfYes : '')),

      feverChillsSweatsSelf: new FormControl((this.step3FormData ? this.step3FormData.feverChillsSweatsSelf : 'No')),
      feverChillsSweatsSelfYes: new FormControl((this.step3FormData ? this.step3FormData.feverChillsSweatsSelfYes : '')),

      unexplainedWeightChangeSelf: new FormControl((this.step3FormData ? this.step3FormData.unexplainedWeightChangeSelf : 'No')),
      unexplainedWeightChangeSelfYes: new FormControl((this.step3FormData ? this.step3FormData.unexplainedWeightChangeSelfYes : '')),

      numbnessTinglingSelf: new FormControl((this.step3FormData ? this.step3FormData.numbnessTinglingSelf : 'No')),
      numbnessTinglingSelfYes: new FormControl((this.step3FormData ? this.step3FormData.numbnessTinglingSelfYes : '')),

      changesAppetiteSelf: new FormControl((this.step3FormData ? this.step3FormData.changesAppetiteSelf : 'No')),
      changesAppetiteSelfYes: new FormControl((this.step3FormData ? this.step3FormData.changesAppetiteSelfYes : '')),

      difficultySwallowingSelf: new FormControl((this.step3FormData ? this.step3FormData.difficultySwallowingSelf : 'No')),
      difficultySwallowingSelfYes: new FormControl((this.step3FormData ? this.step3FormData.difficultySwallowingSelfYes : '')),

      bowelBladderSelf: new FormControl((this.step3FormData ? this.step3FormData.bowelBladderSelf : 'No')),
      bowelBladderSelfYes: new FormControl((this.step3FormData ? this.step3FormData.bowelBladderSelfYes : '')),

      shortnessBreathSelf: new FormControl((this.step3FormData ? this.step3FormData.shortnessBreathSelf : 'No')),
      shortnessBreathSelfYes: new FormControl((this.step3FormData ? this.step3FormData.shortnessBreathSelfYes : '')),

      dizzinessSelf: new FormControl((this.step3FormData ? this.step3FormData.dizzinessSelf : 'No')),
      dizzinessSelfYes: new FormControl((this.step3FormData ? this.step3FormData.dizzinessSelfYes : '')),

      upperRespiratoryInfectionSelf: new FormControl((this.step3FormData ? this.step3FormData.upperRespiratoryInfectionSelf : 'No')),
      upperRespiratoryInfectionSelfYes: new FormControl((this.step3FormData ? this.step3FormData.upperRespiratoryInfectionSelfYes : '')),

      urinaryTractInfectionSelf: new FormControl((this.step3FormData ? this.step3FormData.urinaryTractInfectionSelf : 'No')),
      urinaryTractInfectionSelfYes: new FormControl((this.step3FormData ? this.step3FormData.urinaryTractInfectionSelfYes : '')),

      allergiesToMedicationsSelf: new FormControl((this.step3FormData ? this.step3FormData.allergiesToMedicationsSelf : 'No')),
      //allergiesToMedicationsSelfYes: new FormControl((this.step3FormData ? this.step3FormData.allergiesToMedicationsSelfYes : '')),
      // allergiesToMedications: this.fb.array([
      //   this.fb.control(null)
      // ]),
      // phones: this.fb.array([
      //   this.fb.control(null)
      // ]),

      phones: new FormArray([]),

      newBuildings: this.fb.array([this.fb.group({
        name: [""]
      })]),

      allergiesAsthmaSelf: new FormControl((this.step3FormData ? this.step3FormData.allergiesAsthmaSelf : 'No')),
      allergiesAsthmaSelfYes: new FormControl((this.step3FormData ? this.step3FormData.allergiesAsthmaSelfYes : '')),

      headachesSelf: new FormControl((this.step3FormData ? this.step3FormData.headachesSelf : 'No')),
      headachesSelfYes: new FormControl((this.step3FormData ? this.step3FormData.headachesSelfYes : '')),

      bronchitisSelf: new FormControl((this.step3FormData ? this.step3FormData.bronchitisSelf : 'No')),
      bronchitisSelfYes: new FormControl((this.step3FormData ? this.step3FormData.bronchitisSelfYes : '')),

      kidneyDiseaseSelf: new FormControl((this.step3FormData ? this.step3FormData.kidneyDiseaseSelf : 'No')),
      kidneyDiseaseSelfYes: new FormControl((this.step3FormData ? this.step3FormData.kidneyDiseaseSelfYes : '')),

      rheumaticFeverSelf: new FormControl((this.step3FormData ? this.step3FormData.rheumaticFeverSelf : 'No')),
      rheumaticFeverSelfYes: new FormControl((this.step3FormData ? this.step3FormData.rheumaticFeverSelfYes : '')),

      ulcersSelf: new FormControl((this.step3FormData ? this.step3FormData.ulcersSelf : 'No')),
      ulcersSelfYes: new FormControl((this.step3FormData ? this.step3FormData.ulcersSelfYes : '')),

      sexuallyTransmittedDiseaseSelf: new FormControl((this.step3FormData ? this.step3FormData.sexuallyTransmittedDiseaseSelf : 'No')),
      sexuallyTransmittedDiseaseSelfYes: new FormControl((this.step3FormData ? this.step3FormData.sexuallyTransmittedDiseaseSelfYes : '')),

      seizuresSelf: new FormControl((this.step3FormData ? this.step3FormData.seizuresSelf : 'No')),
      seizuresSelfYes: new FormControl((this.step3FormData ? this.step3FormData.seizuresSelfYes : '')),

      pacemakerSelf: new FormControl((this.step3FormData ? this.step3FormData.pacemakerSelf : 'No')),
      pacemakerSelfYes: new FormControl((this.step3FormData ? this.step3FormData.pacemakerSelfYes : '')),

      anyMetalInBodySelf: new FormControl((this.step3FormData ? this.step3FormData.anyMetalInBodySelf : 'No')),
      anyMetalInBodySelfYes: new FormControl((this.step3FormData ? this.step3FormData.anyMetalInBodySelfYes : '')),


      areYouPregnantSelf: new FormControl((this.step3FormData ? this.step3FormData.areYouPregnantSelf : 'No')),
      areYouPregnantSelfYes: new FormControl((this.step3FormData ? this.step3FormData.areYouPregnantSelfYes : '')),

      areYouDepressedSelf: new FormControl((this.step3FormData ? this.step3FormData.areYouDepressedSelf : 'No')),
      areYouDepressedSelfYes: new FormControl((this.step3FormData ? this.step3FormData.areYouDepressedSelfYes : '')),

      areYouUnderStressSelf: new FormControl((this.step3FormData ? this.step3FormData.areYouUnderStressSelf : 'No')),
      areYouUnderStressSelfYes: new FormControl((this.step3FormData ? this.step3FormData.areYouUnderStressSelfYes : '')),

      symptoms: new FormControl((this.step3FormData ? this.step3FormData.symptoms : '')),
      rateYourPain: new FormControl((this.step3FormData ? this.step3FormData.rateYourPain : '')),

    })

    this.step3Form.controls['dob'].setValue(this.step1FormData.dob)
    this.step3Form.controls['appointmentDate'].setValue(this.step1FormData.appointmentDate)
    this.step3Form.controls['fullName'].setValue(this.step1FormData.firstName + " " + this.step1FormData.middleName + " " + this.step1FormData.lastName)
  }

  checkSpace(colName: any, event: any) {
    this.step3Form.controls[colName].setValue(this.commonService.capitalize(event.target.value.trim()))
  }

  bookAppointmentStep3() {
    console.log("step3Form:", this.step3Form.value)
    console.log("phones:", this.step3Form.value.phones)
    localStorage.setItem("step3FormData", JSON.stringify(this.step3Form.value));
    //this.router.navigate(['/patient/book-appointment/step-4'])
  }


  addPhone(): void {
    (this.step3Form.get('phones') as FormArray).push(
      this.fb.control('')
    );
    this.allergyAddMore++
  }

  removePhone(index: any) {
    this.allergyAddMore--
    (this.step3Form.get('phones') as FormArray).removeAt(index);
  }

  getPhonesFormControls(): AbstractControl[] {
    return (<FormArray>this.step3Form.get('phones')).controls
  }

  get getNewBuildings() {
    return this.step3Form.get('newBuildings') as FormArray;
  }

  addRow() {
    this.getNewBuildings.push(this.fb.group({
      name: [""]
    }))
  }

  deleteRow(i: any) {
    this.getNewBuildings.removeAt(i)
  }
}
