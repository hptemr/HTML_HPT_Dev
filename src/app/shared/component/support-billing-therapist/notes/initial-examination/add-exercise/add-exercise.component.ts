import { Component,Inject,OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { validationMessages } from '../../../../../../utils/validation-messages';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog'; 
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { exercisesOptionsList } from 'src/app/config';
@Component({
  selector: 'app-add-exercise', 
  templateUrl: './add-exercise.component.html',
  styleUrl: './add-exercise.component.scss'
})
export class AddExerciseComponent {
  addExerciseForm: FormGroup;
  appointmentId:string;
  addendumId:string;
  exerciseType:string;
  soap_note_type:string;
  public userId: string = this.authService.getLoggedInInfo('_id');
  public userRole: string = this.authService.getLoggedInInfo('role');
  isSubmit:boolean=false;
  validationMessages = validationMessages;
  exercisesOptions:any = exercisesOptionsList
  todayDate = new Date()
  constructor( private router: Router,public dialog: MatDialog,private fb: FormBuilder, private route: ActivatedRoute, public authService: AuthService, public commonService: CommonService,private _liveAnnouncer: LiveAnnouncer, public dialogRef: MatDialogRef<AddExerciseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.appointmentId = data.appointmentId;
    this.exerciseType = data.type;
    this.soap_note_type = data.soap_note_type;   
    this.addendumId = data.addendumId;
  } 
  
  ngOnInit() {
      this.addExerciseForm = this.fb.group({
        exercises: ["",[Validators.required]],
        exercise_date: [this.todayDate],
        sets: ['', [Validators.minLength(1), Validators.maxLength(50)]],
        reps: ["", [Validators.minLength(1), Validators.maxLength(50)]],
        weight_resistance: ["", [Validators.minLength(1), Validators.maxLength(50)]],
        weight_resistance_unit: ["lbs"],
        distance: ["", [Validators.minLength(1), Validators.maxLength(50)]],
        exercise_time: ["", [Validators.minLength(1), Validators.maxLength(50)]],
        exercise_time_mints: ["Min"],
    });
  }

  async addExerciseFormSubmit(formData: any){  
    console.log('formData11111111>>>',this.addExerciseForm)
    if (this.addExerciseForm.invalid){
      this.addExerciseForm.markAllAsTouched();
    }else{
      Object.assign(formData, {
        createdBy: this.userId,
      })
      this.isSubmit = true
      let reqVars = {
        query: {
          appointmentId: this.appointmentId,soap_note_type:this.soap_note_type,is_deleted:false
        },
        addendumId:this.addendumId,
        userId:this.userId,
        type:'exercise',        
        exerciseType:this.exerciseType,
        data: formData
      }
      console.log('reqVars>>>',reqVars)
      await this.authService.apiRequest('post', 'soapNote/submitObjectiveExercise', reqVars).subscribe(async (response) => {
        //let assessmentData = response.data
        let responseFlag = false;
        if (response.error) {
          if (response.message) {
            this.commonService.openSnackBar(response.message, "ERROR");
          }           
        } else {
          responseFlag = true;
          this.isSubmit = false;
          this.commonService.openSnackBar(response.message,"SUCCESS");
        }     
        this.dialogRef.close(responseFlag);    
      })
    }
  }



}
