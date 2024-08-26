import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { BodyDetailsModalComponent } from './body-details-modal/body-details-modal.component';

@Component({
  selector: 'app-intake-step3',
  templateUrl: './intake-step3.component.html',
  styleUrl: './intake-step3.component.scss'
})
export class IntakeStep3Component {
  @ViewChild('insuranceFileInput') insuranceFileInput: any
  appId: any
  clickedIndex = 0
  step3Form: FormGroup
  step3FormData: any

  allowedFileTypes = ['png', 'jpg', 'jpeg', 'webp', 'pdf', 'doc', 'docx']
  fileError: any = ''
  uploadedPrescriptionFiles: any = []
  uploadedPrescriptionFilesTotal = 0
  isFormEditable = false
  activeUserRoute = this.commonService.getLoggedInRoute()

  constructor(public dialog: MatDialog, private router: Router,
    private fb: FormBuilder, private commonService: CommonService,
    private authService: AuthService, private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => {
      this.appId = params['appId']
    })
  }


  ngOnInit() {
    this.commonService.showLoader()
    this.getAppointmentDetails()
  }

  async getAppointmentDetails() {
    const req_vars = {
      query: { _id: this.appId },
      fields: { checkIn: 0 },
      patientFields: { _id: 1 },
      therapistFields: { _id: 1 }
    }
    await this.authService.apiRequest('post', 'appointment/getAppointmentDetails', req_vars).subscribe(async response => {
      if (response.error != undefined && response.error == true) {
        this.router.navigate([this.activeUserRoute, 'appointments'])
      } else {
        this.step3FormData = response.data.appointmentData
        this.loadForm()

        if (this.authService.getLoggedInInfo('role') == 'patient' && this.step3FormData.status == 'Pending') {
          //patient can update the info
          this.isFormEditable = true
        } else {
          this.isFormEditable = false
          this.step3Form.disable()
        }
        this.commonService.hideLoader()

        if (this.step3FormData.patientMedicalHistory && this.step3FormData.patientMedicalHistory.prescriptionFiles && this.step3FormData.patientMedicalHistory.prescriptionFiles.length > 0) {
          let filesArr: any = []
          let prescriptionFiles = this.step3FormData.patientMedicalHistory.prescriptionFiles
          prescriptionFiles.forEach((element: any) => {
            filesArr.push({
              name: element,
              data: '',
              icon: this.getIcon(this.getExtension(element))
            })
          });
          this.uploadedPrescriptionFiles = filesArr
          localStorage.setItem("uploadedPrescriptionFiles", JSON.stringify(this.uploadedPrescriptionFiles))
          this.uploadedPrescriptionFilesTotal = prescriptionFiles.length
        }
      }
    })
  }

  getIcon(fileType: any) {
    let icon = ''
    if (['png', 'jpg', 'jpeg', 'webp'].includes(fileType)) {
      icon = 'image'
    } else if (['doc', 'docx'].includes(fileType)) {
      icon = 'description'
    } else {
      icon = 'picture_as_pdf'
    }
    return icon
  }


  get form() {
    return this.step3Form.controls;
  }

  bodyBackClick(){
    const dialogRef = this.dialog.open(BodyDetailsModalComponent,{
      panelClass: 'custom-alert-container', 
      data : {
        heading: '',
        partName:'1',
        appId:this.appId
      }
    });

  }
  bodyClick(partName:number) {
   
    const dialogRef = this.dialog.open(BodyDetailsModalComponent,{
      panelClass: 'custom-alert-container', 
      data : {
        heading: '',
        partName:partName,
        appId:this.appId
      }
    });  
    // dialogRef.afterClosed().subscribe(result => {
    //   if(result && !result.error){
    //     this.adminUsers('invite')
    //     this.commonService.openSnackBar(result.message,"SUCCESS")
    //   }
    // });
  }

  loadForm() {
    let step3info: any = this.step3FormData ? this.step3FormData.patientMedicalHistory : null

    this.step3Form = new FormGroup({
      dob: new FormControl(''),
      fullName: new FormControl(''),
      appointmentDate: new FormControl(''),

      cancerSelf: new FormControl((this.step3FormData ? step3info?.cancerSelf : 'No')),
      cancerSelfYes: new FormControl((this.step3FormData ? step3info?.cancerSelfYes : '')),
      cancerFamily: new FormControl((this.step3FormData ? step3info?.cancerSelf : 'No')),
      cancerFamilyYes: new FormControl((this.step3FormData ? step3info?.cancerFamilyYes : '')),

      diabetesSelf: new FormControl((this.step3FormData ? step3info?.diabetesSelf : 'No')),
      diabetesSelfYes: new FormControl((this.step3FormData ? step3info?.diabetesSelfYes : '')),
      diabetesFamily: new FormControl((this.step3FormData ? step3info?.diabetesFamily : 'No')),
      diabetesFamilyYes: new FormControl((this.step3FormData ? step3info?.diabetesFamilyYes : '')),

      highBloodPressureSelf: new FormControl((this.step3FormData ? step3info?.highBloodPressureSelf : 'No')),
      highBloodPressureSelfYes: new FormControl((this.step3FormData ? step3info?.highBloodPressureSelfYes : '')),
      highBloodPressureFamily: new FormControl((this.step3FormData ? step3info?.highBloodPressureFamily : 'No')),
      highBloodPressureFamilyYes: new FormControl((this.step3FormData ? step3info?.highBloodPressureFamilyYes : '')),

      heartDiseaseSelf: new FormControl((this.step3FormData ? step3info?.heartDiseaseSelf : 'No')),
      heartDiseaseSelfYes: new FormControl((this.step3FormData ? step3info?.heartDiseaseSelfYes : '')),
      heartDiseaseFamily: new FormControl((this.step3FormData ? step3info?.heartDiseaseFamily : 'No')),
      heartDiseaseFamilyYes: new FormControl((this.step3FormData ? step3info?.heartDiseaseFamilyYes : '')),

      anginaChestPainSelf: new FormControl((this.step3FormData ? step3info?.anginaChestPainSelf : 'No')),
      anginaChestPainSelfYes: new FormControl((this.step3FormData ? step3info?.anginaChestPainSelfYes : '')),
      anginaChestPainFamily: new FormControl((this.step3FormData ? step3info?.anginaChestPainFamily : 'No')),
      anginaChestPainFamilyYes: new FormControl((this.step3FormData ? step3info?.anginaChestPainFamilyYes : '')),

      strokeSelf: new FormControl((this.step3FormData ? step3info?.strokeSelf : 'No')),
      strokeSelfYes: new FormControl((this.step3FormData ? step3info?.strokeSelfYes : '')),
      strokeFamily: new FormControl((this.step3FormData ? step3info?.strokeFamily : 'No')),
      strokeFamilyYes: new FormControl((this.step3FormData ? step3info?.strokeFamilyYes : '')),

      osteoporosisSelf: new FormControl((this.step3FormData ? step3info?.osteoporosisSelf : 'No')),
      osteoporosisSelfYes: new FormControl((this.step3FormData ? step3info?.osteoporosisSelfYes : '')),
      osteoporosisFamily: new FormControl((this.step3FormData ? step3info?.osteoporosisFamily : 'No')),
      osteoporosisFamilyYes: new FormControl((this.step3FormData ? step3info?.osteoporosisFamilyYes : '')),

      osteoarthritisSelf: new FormControl((this.step3FormData ? step3info?.osteoarthritisSelf : 'No')),
      osteoarthritisSelfYes: new FormControl((this.step3FormData ? step3info?.osteoarthritisSelfYes : '')),
      osteoarthritisFamily: new FormControl((this.step3FormData ? step3info?.osteoarthritisFamily : 'No')),
      osteoarthritisFamilyYes: new FormControl((this.step3FormData ? step3info?.osteoarthritisFamilyYes : '')),

      rheumatoidArthritisSelf: new FormControl((this.step3FormData ? step3info?.rheumatoidArthritisSelf : 'No')),
      rheumatoidArthritisSelfYes: new FormControl((this.step3FormData ? step3info?.rheumatoidArthritisSelfYes : '')),
      rheumatoidArthritisFamily: new FormControl((this.step3FormData ? step3info?.rheumatoidArthritisFamily : 'No')),
      rheumatoidArthritisFamilyYes: new FormControl((this.step3FormData ? step3info?.rheumatoidArthritisFamilyYes : '')),

      bleedingDisordersSelf: new FormControl((this.step3FormData ? step3info?.bleedingDisordersSelf : 'No')),
      bleedingDisordersSelfYes: new FormControl((this.step3FormData ? step3info?.bleedingDisordersSelfYes : '')),
      bleedingDisordersFamily: new FormControl((this.step3FormData ? step3info?.bleedingDisordersSelf : 'No')),
      bleedingDisordersFamilyYes: new FormControl((this.step3FormData ? step3info?.bleedingDisordersSelfYes : '')),

      changeYourHealthSelf: new FormControl((this.step3FormData ? step3info?.changeYourHealthSelf : 'No')),
      changeYourHealthSelfYes: new FormControl((this.step3FormData ? step3info?.changeYourHealthSelfYes : '')),

      nauseaVomitingSelf: new FormControl((this.step3FormData ? step3info?.nauseaVomitingSelf : 'No')),
      nauseaVomitingSelfYes: new FormControl((this.step3FormData ? step3info?.nauseaVomitingSelfYes : '')),

      feverChillsSweatsSelf: new FormControl((this.step3FormData ? step3info?.feverChillsSweatsSelf : 'No')),
      feverChillsSweatsSelfYes: new FormControl((this.step3FormData ? step3info?.feverChillsSweatsSelfYes : '')),

      unexplainedWeightChangeSelf: new FormControl((this.step3FormData ? step3info?.unexplainedWeightChangeSelf : 'No')),
      unexplainedWeightChangeSelfYes: new FormControl((this.step3FormData ? step3info?.unexplainedWeightChangeSelfYes : '')),

      numbnessTinglingSelf: new FormControl((this.step3FormData ? step3info?.numbnessTinglingSelf : 'No')),
      numbnessTinglingSelfYes: new FormControl((this.step3FormData ? step3info?.numbnessTinglingSelfYes : '')),

      changesAppetiteSelf: new FormControl((this.step3FormData ? step3info?.changesAppetiteSelf : 'No')),
      changesAppetiteSelfYes: new FormControl((this.step3FormData ? step3info?.changesAppetiteSelfYes : '')),

      difficultySwallowingSelf: new FormControl((this.step3FormData ? step3info?.difficultySwallowingSelf : 'No')),
      difficultySwallowingSelfYes: new FormControl((this.step3FormData ? step3info?.difficultySwallowingSelfYes : '')),

      bowelBladderSelf: new FormControl((this.step3FormData ? step3info?.bowelBladderSelf : 'No')),
      bowelBladderSelfYes: new FormControl((this.step3FormData ? step3info?.bowelBladderSelfYes : '')),

      shortnessBreathSelf: new FormControl((this.step3FormData ? step3info?.shortnessBreathSelf : 'No')),
      shortnessBreathSelfYes: new FormControl((this.step3FormData ? step3info?.shortnessBreathSelfYes : '')),

      dizzinessSelf: new FormControl((this.step3FormData ? step3info?.dizzinessSelf : 'No')),
      dizzinessSelfYes: new FormControl((this.step3FormData ? step3info?.dizzinessSelfYes : '')),

      upperRespiratoryInfectionSelf: new FormControl((this.step3FormData ? step3info?.upperRespiratoryInfectionSelf : 'No')),
      upperRespiratoryInfectionSelfYes: new FormControl((this.step3FormData ? step3info?.upperRespiratoryInfectionSelfYes : '')),

      urinaryTractInfectionSelf: new FormControl((this.step3FormData ? step3info?.urinaryTractInfectionSelf : 'No')),
      urinaryTractInfectionSelfYes: new FormControl((this.step3FormData ? step3info?.urinaryTractInfectionSelfYes : '')),

      allergiesToMedicationsSelf: new FormControl((this.step3FormData ? step3info?.allergiesToMedicationsSelf : 'No')),

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

      allergiesAsthmaSelf: new FormControl((this.step3FormData ? step3info?.allergiesAsthmaSelf : 'No')),
      allergiesAsthmaSelfYes: new FormControl((this.step3FormData ? step3info?.allergiesAsthmaSelfYes : '')),

      headachesSelf: new FormControl((this.step3FormData ? step3info?.headachesSelf : 'No')),
      headachesSelfYes: new FormControl((this.step3FormData ? step3info?.headachesSelfYes : '')),

      bronchitisSelf: new FormControl((this.step3FormData ? step3info?.bronchitisSelf : 'No')),
      bronchitisSelfYes: new FormControl((this.step3FormData ? step3info?.bronchitisSelfYes : '')),

      kidneyDiseaseSelf: new FormControl((this.step3FormData ? step3info?.kidneyDiseaseSelf : 'No')),
      kidneyDiseaseSelfYes: new FormControl((this.step3FormData ? step3info?.kidneyDiseaseSelfYes : '')),

      rheumaticFeverSelf: new FormControl((this.step3FormData ? step3info?.rheumaticFeverSelf : 'No')),
      rheumaticFeverSelfYes: new FormControl((this.step3FormData ? step3info?.rheumaticFeverSelfYes : '')),

      ulcersSelf: new FormControl((this.step3FormData ? step3info?.ulcersSelf : 'No')),
      ulcersSelfYes: new FormControl((this.step3FormData ? step3info?.ulcersSelfYes : '')),

      sexuallyTransmittedDiseaseSelf: new FormControl((this.step3FormData ? step3info?.sexuallyTransmittedDiseaseSelf : 'No')),
      sexuallyTransmittedDiseaseSelfYes: new FormControl((this.step3FormData ? step3info?.sexuallyTransmittedDiseaseSelfYes : '')),

      seizuresSelf: new FormControl((this.step3FormData ? step3info?.seizuresSelf : 'No')),
      seizuresSelfYes: new FormControl((this.step3FormData ? step3info?.seizuresSelfYes : '')),

      pacemakerSelf: new FormControl((this.step3FormData ? step3info?.pacemakerSelf : 'No')),
      pacemakerSelfYes: new FormControl((this.step3FormData ? step3info?.pacemakerSelfYes : '')),

      anyMetalInBodySelf: new FormControl((this.step3FormData ? step3info?.anyMetalInBodySelf : 'No')),
      anyMetalInBodySelfYes: new FormControl((this.step3FormData ? step3info?.anyMetalInBodySelfYes : '')),


      areYouPregnantSelf: new FormControl((this.step3FormData ? step3info?.areYouPregnantSelf : 'No')),
      areYouPregnantSelfYes: new FormControl((this.step3FormData ? step3info?.areYouPregnantSelfYes : '')),

      areYouDepressedSelf: new FormControl((this.step3FormData ? step3info?.areYouDepressedSelf : 'No')),
      areYouDepressedSelfYes: new FormControl((this.step3FormData ? step3info?.areYouDepressedSelfYes : '')),

      areYouUnderStressSelf: new FormControl((this.step3FormData ? step3info?.areYouUnderStressSelf : 'No')),
      areYouUnderStressSelfYes: new FormControl((this.step3FormData ? step3info?.areYouUnderStressSelfYes : '')),

      symptoms: new FormControl((this.step3FormData ? step3info?.symptoms : '')),
      symptomsSame: new FormControl((this.step3FormData ? step3info?.symptomsSame : '')),

      rateYourPain: new FormControl((this.step3FormData ? step3info?.rateYourPain : '')),

    })

    this.clickedIndex = this.step3FormData ? step3info?.rateYourPain : 0
    this.step3Form.controls['dob'].setValue(this.step3FormData.patientInfo.dob)
    this.step3Form.controls['appointmentDate'].setValue(this.step3FormData.appointmentDate)
    this.step3Form.controls['fullName'].setValue(this.step3FormData.patientInfo.firstName + " " + this.step3FormData.patientInfo.middleName + " " + this.step3FormData.patientInfo.lastName)

    let allergies = this.step3FormData ? step3info?.allergiesToMedications_AllergyArray : []
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

    let surgery = this.step3FormData ? step3info?.allergiesToMedications_SurgeryArray : []
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

    let medication = this.step3FormData ? step3info?.allergiesToMedications_MedicationArray : []
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

  async bookAppointmentStep3() {
    if (this.isFormEditable) {
      let formData = this.step3Form.value
      let uploadedPrescriptionFiles: any = localStorage.getItem('uploadedPrescriptionFiles')
      let prescriptionFiles = this.getPrescriptionFiles()
      if (prescriptionFiles.length > 0) {
        Object.assign(formData, { prescriptionFiles: prescriptionFiles })
      }

      let params = {
        query: { _id: this.appId },
        updateInfo: {
          patientMedicalHistory: formData
        },
        uploadedPrescriptionFiles: JSON.parse(uploadedPrescriptionFiles),
      }
      await this.authService.apiRequest('post', 'appointment/updateAppointment', params).subscribe(async response => {
        localStorage.removeItem('uploadedPrescriptionFiles')
        this.router.navigate([this.activeUserRoute, 'intake-form', 'step-4', this.appId])
      })
    } else {
      localStorage.removeItem('uploadedPrescriptionFiles')
      this.router.navigate([this.activeUserRoute, 'intake-form', 'step-4', this.appId])
    }
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
