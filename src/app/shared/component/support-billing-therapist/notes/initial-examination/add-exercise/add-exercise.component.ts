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
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
@Component({
  selector: 'app-add-exercise', 
  templateUrl: './add-exercise.component.html',
  styleUrl: './add-exercise.component.scss'
})
export class AddExerciseComponent {
  addExerciseForm: FormGroup;
  appointmentId:string;
  public userId: string = this.authService.getLoggedInInfo('_id');
  public userRole: string = this.authService.getLoggedInInfo('role');
  isSubmit:boolean=false;
  constructor( private router: Router,public dialog: MatDialog,private fb: FormBuilder, private route: ActivatedRoute, public authService: AuthService, public commonService: CommonService,private _liveAnnouncer: LiveAnnouncer, public dialogRef: MatDialogRef<AddExerciseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.appointmentId = data.appointmentId;
  } 

  ngOnInit() {
      this.addExerciseForm = this.fb.group({
        appointmentId:[this.appointmentId],
        exercises: [""],
        exercise_date: [""],
        sets: [""],
        reps: [""],
        weight_resistance: [""],
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
      this.isSubmit = true
      let reqVars = {
        userId: this.userId,
        data: formData,
        appointmentId: this.appointmentId
      }
      await this.authService.apiRequest('post', 'soapNote/submitObjective', reqVars).subscribe(async (response) => {
        let assessmentData = response.data
        if (response.error) {
          if (response.message) {
            this.commonService.openSnackBar(response.message, "ERROR");
          }           
        } else {
          this.isSubmit = false;
          this.commonService.openSnackBar(response.message,"SUCCESS");
        }        
      })
    }
  }



}
