import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog,MatDialogRef } from '@angular/material/dialog';
import { EFaxModalComponent } from '../e-fax-modal/e-fax-modal.component';
import  jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-one-page-note-modal', 
  templateUrl: './one-page-note-modal.component.html',
  styleUrl: './one-page-note-modal.component.scss'
})
export class OnePageNoteModalComponent {
  patientName = ""
  noteType = ""
  appointmentId = ""
  noteData:any = {}
  treatmentToBeProvided = ""
  planPtList = [
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
  planOtList = [
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
  planSlpList = [
    {name:"Evaluation of Oral and Pharyngeal Swallowing Function",value:"evaluation_of_oral",selected:false},
    {name:"SLP Treatment; Individual",value:"individual",selected:false},
    {name:"Treatment of swallowing dysfunction and/or oral function for feeding",value:"treatment_of_swallowing",selected:false},
    {name:"Speech-generating augmentative/ alternative device",value:"Speech_generating_augmentative",selected:false},
    {name:"Aphasia assessment",value:"aphasia_assessment",selected:false},
    {name:"Development of Cognitive Skills",value:"cognitive_skills",selected:false}
  ]
  appointmentData : any = [];
  subjectiveData : any;
  assessmentData:any;
  objectiveData:any;
  visits = ""
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog,public authService: AuthService,private dialogRef: MatDialogRef<OnePageNoteModalComponent >){
    this.patientName = data.patientName;
    this.noteType = data.soap_note_type;
    this.appointmentId = data.appointmentId;
    this.appointmentData = data.appointmentData
    this.visits = data.visits
    let reqVars = {
      appointmentId:this.appointmentId
    }
    this.authService.apiRequest('post', 'soapNote/getOnePageNoteDetails', reqVars).subscribe(async response => {
      this.noteData = response.data.planData
      this.subjectiveData = response.data.subjectiveData;
      this.assessmentData = response.data.assessmentData;
      this.objectiveData = response.data.objectiveData;
      if(this.noteData!=null){
        this.planPtList.forEach((code:any,index:any) => {
          if(this.noteData.pt_treatment_provided[this.planPtList[index].value]){
            this.treatmentToBeProvided += this.planPtList[index].name +", "
          }
        })
        this.planOtList.forEach((code:any,index:any) => {
          if(this.noteData.ot_treatment_provided[this.planOtList[index].value]){
            this.treatmentToBeProvided += this.planOtList[index].name +", "
          }
        })
        this.planSlpList.forEach((code:any,index:any) => {
          if(this.noteData.slp_treatment_provided[this.planSlpList[index].value]){
            this.treatmentToBeProvided += this.planSlpList[index].name +", "
          }
        })
      }
    })
  }

  loadData(key:any){
    if(this.noteData!=null){
      return this.noteData[key]
    } else{
      return ""
    }
  }

  efaxModal() {
    this.dialogRef.close()
    const dialogRef = this.dialog.open(EFaxModalComponent,{
      width:"960px",
      data : {
        patientName:this.patientName,
        subjectiveData:this.subjectiveData,
        dateOfService:this.subjectiveData.note_date,
        assessmentData:this.assessmentData,
        soapNoteType:this.noteType,
        appointmentId:this.appointmentId,
        treatmentToBeProvided:this.treatmentToBeProvided,
        noteData:this.noteData,
        appointmentData:this.appointmentData,
        visits : this.visits,
        objectiveData:this.objectiveData,
      }
    });
  }

  downloadNote(){
      let data = document.getElementById('pdf-content');  
      if(data!=null){
        html2canvas(data).then(canvas => {
          const contentDataURL = canvas.toDataURL('image/png')  
          const pdf = new jsPDF();
          // let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
          // let pdf = new jspdf('p', 'cm', 'a4');// Generates PDF in portrait mode
          //pdf.addFont("Arimo-Regular.ttf", "Arimo", "'Nunito Sans', sans-serif");
          // pdf.setFont('"Nunito Sans", sans-serif', '"Nunito Sans", sans-serif');
          pdf.addImage(contentDataURL, 'PNG', 8, 6, 195, 280);  
          pdf.save('Filename.pdf');   
        }); 
      }
      
  }

  soapNoteType(soap_note_type: string): string {
    switch (soap_note_type) {
      case 'initial_examination':
        return 'Initial Examinations Note';
      case 'daily_note':
        return 'Daily Note';
      case 'progress_note':
        return 'Progress Note';
      case 'discharge_note':
        return 'Discharge Note';
      case 'case_note':
          return 'Case Note';
      default:
        return soap_note_type.replace('_','-');
    }
  }

}
