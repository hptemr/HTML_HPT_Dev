import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss'
})
export class Step3Component {
  @ViewChild('insuranceFileInput') insuranceFileInput: any

  step3Form: FormGroup
  clickedIndex = 0
  step1FormData: any
  step2FormData: any
  step3FormData: any

  allowedFileTypes = ['png', 'jpg', 'jpeg', 'webp', 'pdf', 'doc', 'docx']
  fileError: any = ''
  uploadedPrescriptionFiles: any = []
  uploadedPrescriptionFilesTotal = 0

  constructor(public dialog: MatDialog, private router: Router,
    private fb: FormBuilder, private commonService: CommonService,
    private authService: AuthService) {
  }

  ngOnInit() {
    let step1: any
    step1 = localStorage.getItem("step1FormData")
    this.step1FormData = JSON.parse(step1)

    this.step3FormData = localStorage.getItem("step3FormData")
    if (this.step3FormData == null) {
      let step2: any
      step2 = localStorage.getItem("step2FormData")
      this.step2FormData = JSON.parse(step2)
    } else {
      this.step3FormData = JSON.parse(this.step3FormData)
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

      allergiesToMedications_AllergyArray: this.fb.array([this.fb.group({
        name: [""]
      })]),

      allergiesToMedications_SurgeryArray: this.fb.array([this.fb.group({
        details: [""],
        surDate: [""]
      })]),

      allergiesToMedications_MedicationArray: this.fb.array([this.fb.group({
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
      symptomsSame: new FormControl((this.step3FormData ? this.step3FormData.symptomsSame : '')),

      rateYourPain: new FormControl((this.step3FormData ? this.step3FormData.rateYourPain : '')),

    })

    this.clickedIndex = this.step3FormData ? this.step3FormData.rateYourPain : 0
    this.step3Form.controls['dob'].setValue(this.step1FormData.dob)
    this.step3Form.controls['appointmentDate'].setValue(this.step1FormData.appointmentDate)
    this.step3Form.controls['fullName'].setValue(this.step1FormData.firstName + " " + this.step1FormData.middleName + " " + this.step1FormData.lastName)

    let allergies = this.step3FormData ? this.step3FormData.allergiesToMedications_AllergyArray : []
    if (allergies && allergies.length > 0) {
      this.getNewAllergy.removeAt(0)
      for (let i = 0; i < allergies.length; i++) {
        if (allergies[i].name && allergies[i].name.trim() != '') {
          this.getNewAllergy.push(this.fb.group({
            name: [allergies[i].name]
          }))
        }
      }
    }

    let surgery = this.step3FormData ? this.step3FormData.allergiesToMedications_SurgeryArray : []
    if (surgery && surgery.length > 0) {
      this.getNewSurgery.removeAt(0)
      for (let i = 0; i < surgery.length; i++) {
        if (surgery[i].details && surgery[i].details.trim() != '' || surgery[i].surDate) {
          this.getNewSurgery.push(this.fb.group({
            details: [surgery[i].details],
            surDate: [surgery[i].surDate]
          }))
        }
      }
    }

    let medication = this.step3FormData ? this.step3FormData.allergiesToMedications_MedicationArray : []
    if (medication && medication.length > 0) {
      this.getNewMedication.removeAt(0)
      for (let i = 0; i < medication.length; i++) {
        if (medication[i].name && medication[i].name.trim() != '') {
          this.getNewMedication.push(this.fb.group({
            name: [medication[i].name]
          }))
        }
      }
    }
  }

  checkSpace(colName: any, event: any) {
    this.step3Form.controls[colName].setValue(this.commonService.capitalize(event.target.value.trim()))
  }

  painRate(i: any) {
    this.clickedIndex = i
    this.step3Form.controls['rateYourPain'].setValue(i)
  }

  getPrescriptionFiles() {
    let filesName: any = []
    if (localStorage.getItem("uploadedPrescriptionFiles")) {
      let files: any
      files = localStorage.getItem("uploadedPrescriptionFiles")
      filesName = JSON.parse(files).map((item: any) => item.name);
    }
    return filesName
  }

  bookAppointmentStep3() {
    let formData = this.step3Form.value
    let prescriptionFiles = this.getPrescriptionFiles()
    if (prescriptionFiles.length > 0) {
      Object.assign(formData, { prescriptionFiles: prescriptionFiles })
    }
    localStorage.setItem("step3FormData", JSON.stringify(formData));
    this.router.navigate(['/patient/book-appointment/step-4'])
  }

  get getNewAllergy() {
    return this.step3Form.get('allergiesToMedications_AllergyArray') as FormArray;
  }

  addNewAllergy() {
    this.getNewAllergy.push(this.fb.group({
      name: [""]
    }))
  }

  deleteAllergy(i: any) {
    this.getNewAllergy.removeAt(i)
  }

  get getNewSurgery() {
    return this.step3Form.get('allergiesToMedications_SurgeryArray') as FormArray;
  }

  addNewSurgery() {
    this.getNewSurgery.push(this.fb.group({
      details: [""],
      surDate: [""],
    }))
  }

  deleteSurgery(i: any) {
    this.getNewSurgery.removeAt(i)
  }

  get getNewMedication() {
    return this.step3Form.get('allergiesToMedications_MedicationArray') as FormArray;
  }

  addNewMedication() {
    this.getNewMedication.push(this.fb.group({
      name: [""]
    }))
  }

  deleteMedication(i: any) {
    this.getNewMedication.removeAt(i)
  }

  getExtension(fileName: any) {
    if (fileName && fileName != undefined) {
      return fileName.split(/[#?]/)[0].split('.').pop().trim();
    }
  }

  deletePrescription(index: any) {
    this.insuranceFileInput.nativeElement.value = '';
    this.uploadedPrescriptionFiles.splice(index, 1);
    localStorage.setItem("uploadedPrescriptionFiles", JSON.stringify(this.uploadedPrescriptionFiles))
    this.uploadedPrescriptionFilesTotal = this.uploadedPrescriptionFiles.length
  }

  uploadPrescription($event: any) {
    let file: File = $event.target.files[0]
    let fileType = this.getExtension(file.name)
    let datenow = Date.now()
    if (!this.allowedFileTypes.includes(fileType)) {
      this.fileError = "File type should be pdf, image, doc only"
    } else if (file.size / (1024 * 1024) >= 5) {
      this.fileError = 'File max size should be less than 5MB'
    } else {
      let icon = ''
      this.fileError = ""
      if (['png', 'jpg', 'jpeg', 'webp'].includes(fileType)) {
        icon = 'image'
      } else if (['doc', 'docx'].includes(fileType)) {
        icon = 'description'
      } else {
        icon = 'picture_as_pdf'
      }

      let myReader: FileReader = new FileReader()
      myReader.readAsDataURL(file)
      let that = this
      myReader.onloadend = function (loadEvent: any) {
        that.uploadedPrescriptionFiles = that.uploadedPrescriptionFiles || [];
        that.uploadedPrescriptionFiles.push({
          //size: file.size,
          name: datenow + "." + fileType,
          data: loadEvent.target.result,
          icon: icon
        })
        that.uploadedPrescriptionFilesTotal = that.uploadedPrescriptionFiles.length
        localStorage.setItem("uploadedPrescriptionFiles", JSON.stringify(that.uploadedPrescriptionFiles))
      }
    }
  }

}
