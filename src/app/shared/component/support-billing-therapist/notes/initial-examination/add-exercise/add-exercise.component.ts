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
  exerciseType:string;
  public userId: string = this.authService.getLoggedInInfo('_id');
  public userRole: string = this.authService.getLoggedInInfo('role');
  isSubmit:boolean=false;
  exercisesOptions:any = exercisesOptionsList
  todayDate = new Date()
  constructor( private router: Router,public dialog: MatDialog,private fb: FormBuilder, private route: ActivatedRoute, public authService: AuthService, public commonService: CommonService,private _liveAnnouncer: LiveAnnouncer, public dialogRef: MatDialogRef<AddExerciseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.appointmentId = data.appointmentId;
    this.exerciseType = data.type;
  } 

  ngOnInit() {
      this.addExerciseForm = this.fb.group({
        exercises: ["",[Validators.required]],
        exercise_date: [this.todayDate],
        sets: [""],
        reps: [""],
        weight_resistance: [""],
        weight_resistance_unit: [""],
        distance: [""],
        exercise_time: [""],
        exercise_time_mints: [""],
    });
  }

  async addExerciseFormSubmit(formData: any){
    console.log('Add Exercise Form  >>>>',this.addExerciseForm)
    if (this.addExerciseForm.invalid){
      this.addExerciseForm.markAllAsTouched();
    }else{
      Object.assign(formData, {
        createdBy: this.userId,
      })
      this.isSubmit = true
      let reqVars = {
        query: {
          appointmentId: this.appointmentId,soap_note_type:"initial_examination"
        },
        userId:this.userId,
        type:'exercise',        
        exerciseType:this.exerciseType,
        data: formData
      }
      await this.authService.apiRequest('post', 'soapNote/submitObjectiveExercise', reqVars).subscribe(async (response) => {
        let assessmentData = response.data
        if (response.error) {
          if (response.message) {
            this.commonService.openSnackBar(response.message, "ERROR");
          }           
        } else {
          this.isSubmit = false;
          this.commonService.openSnackBar(response.message,"SUCCESS");
        }     
        this.dialogRef.close();    
      })
    }
  }



}
