import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';

@Component({
  selector: 'app-e-fax-modal', 
  templateUrl: './e-fax-modal.component.html',
  styleUrl: './e-fax-modal.component.scss'
})
export class EFaxModalComponent {
  toppings = new FormControl('');
  sendToList: string[] = [ ];
  patientName = ""
  noteType = ""
  appointmentId = ""
  whereDocCond: any = {status:"Active"}
  NewFaxNumbers:any = []
  newFaxNumber = ""
  treatmentToBeProvided = ""
  noteData :any
  subjectiveData:any
  assessmentData:any
  appointmentData:any
  submitted = false
  dateOfService:any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog,public authService: AuthService,public commonService: CommonService,private dialogRef: MatDialogRef<EFaxModalComponent >) {
    this.patientName = data.patientName;
    this.noteType = data.soapNoteType;
    this.appointmentId = data.appointmentId;
    this.treatmentToBeProvided = data.treatmentToBeProvided
    this.noteData = data.noteData
    this.subjectiveData = data.subjectiveData
    this.assessmentData = data.assessmentData
    this.appointmentData = data.appointmentData
    this.dateOfService = data.dateOfService
    this.getDoctorsList()
  } 

    myControl = new FormControl();
    options: Observable<string[]>;

    ngOnInit() {
      this.options = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => {
          const filterValue = value;
          return this.allOptions.filter((option: any | any[]) => option.name.includes(filterValue));
        })
      );
      this.allOptions  = []
    }
    allOptions:any = [];
    selectedOptions: string[] = [];

    addOption(option: any) {
      const existingIds = this.selectedOptions.map((addedPerson:any) => addedPerson.id);
      if (! existingIds.includes(option.id)) {
        this.selectedOptions.push(option);
      }
    }
  
    removeOption(option: any) {
      this.selectedOptions = this.selectedOptions.filter((item: any | any[]) => item.id !== option.id);
    }

    soapNoteType(soap_note_type: string): string {
      switch (soap_note_type) {
        case 'initial_examination':
          return 'Initial Examinations';
        case 'daily_note':
          return 'Daily Notes';
        case 'progress_note':
          return 'Progress Notes';
        case 'discharge_note':
          return 'Discharge Notes';
        case 'case_note':
            return 'Case Notes';
        default:
          return soap_note_type.replace('_','-');
      }
    }

    getDoctorsList(){
      let reqVars = {
        query: this.whereDocCond,
        fields: {_id:1, name: 1,faxNumber:1 },     
        order: {name:1}
      }
      this.authService.apiRequest('post', 'appointment/getDoctorList', reqVars).subscribe(async response => {
        let finalData: any = []
        if (response.data && response.data.doctorList && response.data.doctorList.length > 0) {
          response.data.doctorList.map((element: any) => {
            let newColumns = {
             id: element._id,
             name: element.name,
             faxNumber: element.faxNumber,
            }
            finalData.push(newColumns)
          })
        }
        this.allOptions = finalData;    
      })
    }

    loadData(option:any){
      return option.name
    }

    addNewFax(){
      if (! this.NewFaxNumbers.includes(this.newFaxNumber)) {
        this.NewFaxNumbers.push(this.newFaxNumber);
        this.newFaxNumber = ""
      }
    }

    removeNewFax(option: any) {
      this.NewFaxNumbers = this.NewFaxNumbers.filter((item: any | any[]) => item !== option);
    }

    sendEFax(){
      let tempFaxNumbers:any = []
      this.selectedOptions.forEach((code:any) => {
        tempFaxNumbers.push(code.faxNumber)
      })
      this.NewFaxNumbers.forEach((code:any) => {
        tempFaxNumbers.push(code)
      })
      if(tempFaxNumbers.length>0){
        let reqVars = {
          faxNumbers: tempFaxNumbers,
          noteType : this.noteType,
          patientName : this.patientName,
          treatmentToBeProvided : this.treatmentToBeProvided,
          noteData : this.noteData,
          subjectiveData : this.subjectiveData,
          assessmentData : this.assessmentData,
          appointmentData : this.appointmentData,
        }
        this.submitted = true
        this.commonService.showLoader();
        this.authService.apiRequest('post', 'soapNote/sendFax', reqVars).subscribe(async response => {
          this.submitted = false
          this.commonService.hideLoader();
          this.commonService.openSnackBar("Fax sent successfully", "SUCCESS")
          this.dialogRef.close()
        })
      }
    }
}
