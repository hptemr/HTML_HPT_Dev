import { Component,OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { validationMessages } from '../../../../../../utils/validation-messages';
import { Validators, FormGroup, FormBuilder,FormArray, AbstractControl,FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatRadioChange, MatRadioButton } from '@angular/material/radio';
import { AddExerciseComponent } from '../../initial-examination/add-exercise/add-exercise.component';
import { ProtocolModalComponent } from '../../initial-examination/protocol-modal/protocol-modal.component';
import { DatePipe } from '@angular/common';
type Exercise = {
  exercises: string;
  sets: string;
  reps: string;
  weight_resistance: number | string;
  weight_resistance_unit: string;
  distance: number | string;
  exercise_time: number | string;
  exercise_time_mints: string;
  createdBy: string;
};
interface FileItem {
  id: string;
  file_name: string;
  icon: string;
  color: string;
}
@Component({
  selector: 'app-dn-objective', 
  templateUrl: './dn-objective.component.html',
  styleUrl: './dn-objective.component.scss'
})
export class DnObjectiveComponent {
  isDisabled: boolean = false;
  selectedValue:string = '';  
  tabs = [
    {number: '1'}, {number: '2'}, {number: '3'},
    {number: '4'}, {number: '5'}, {number: '6'},
    {number: '7'}, {number: '8'}, {number: '9'},
    {number: '10'}
  ];

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    nav: true,
    items: 1,
    navText: [
      "<i class='fa fa-arrow-left'></i>",
      "<i class='fa fa-arrow-right'></i>"
    ],
    responsive: {
      0: {
        items: 1,
        autoWidth: true,
      },
      600: {
        items: 2,
        slideBy: 2
      },
      1000: {
        items: 3,
        slideBy: 3
      },
      1200: {
        items: 4,
        slideBy: 4
      }
    }

  }
 
  appointmentId: string;
  public userId: string = this.authService.getLoggedInInfo('_id');
  public userRole: string = this.authService.getLoggedInInfo('role');
  userType = this.authService.getLoggedInInfo('role').replace('_','-')
  selectedProtocols:any=[]
  public objectiveForm: FormGroup;
  validationMessages = validationMessages; 
  chaperoneFlag:boolean=false;
  isSubmit:boolean=false;
  land_exercise_list:any =[]
  land_exercise_grouped_list:any =[]
  land_exercises_names:any =[]
  aquatic_exercises_names:any =[]
  aquatic_exercise_list:any =[]
  aquatic_exercise_grouped_list:any =[]
  @ViewChild(MatRadioButton) radioButton: MatRadioButton | undefined;
  readOnly = false
  addendumId =""
  constructor( private router: Router,private datePipe: DatePipe,private fb: FormBuilder, private route: ActivatedRoute, public authService: AuthService, public commonService: CommonService,public dialog: MatDialog) {
    this.route.params.subscribe((params: Params) => {
      this.appointmentId = params['appointmentId'];
      this.addendumId = params['addendumId'];
      let lengthVal = 2
      if(this.addendumId!=undefined){
        lengthVal = 3
      }
      const locationArray = location.href.split('/')
      if(locationArray[locationArray.length - lengthVal] == 'objective-view'){
        this.readOnly = true
      }
    })
  }

  ngOnInit() {
    this.objectiveForm = this.fb.group({
      appointmentId:[this.appointmentId],
      protocols:[''],
      chaperone : this.fb.group({
        flag: ['No', [Validators.required]], 
        name: ['',[Validators.minLength(1), Validators.maxLength(50)]] 
      }),
    
      treatment_provided: ['', [Validators.minLength(1), Validators.maxLength(500)]]
    });
    if(this.readOnly){
      this.objectiveForm.disable()
    }
    this.onFlagChange();
    this.getObjectiveRecord();  
  }


  onFlagChange() {
    const chaperoneGroup = this.objectiveForm.get('chaperone') as FormGroup;
    const flagControl = chaperoneGroup.get('flag');
    const nameControl = chaperoneGroup.get('name');

    flagControl?.valueChanges.subscribe((flagValue: string) => {
      if (flagValue === 'Yes') {
        nameControl?.setValidators([Validators.required, Validators.minLength(1), Validators.maxLength(50)]);  // If flag is true, 'name' is required
      } else {
        nameControl?.clearValidators();  // If flag is false, clear validators on 'name'
        nameControl?.setValue('');
        nameControl?.markAsUntouched();
      }
      nameControl?.updateValueAndValidity();  // Recalculate the validity of the control
    });
  }

  async getObjectiveRecord(){
    let reqVars = {
      query: {appointmentId:this.appointmentId,soap_note_type:'daily_note',addendumId:this.addendumId},     
    }
   await this.authService.apiRequest('post', 'soapNote/getObjectiveData', reqVars).subscribe(async response => {
      let subjectiveData: never[] = []; let objectiveData = [];
      if(response.data && response.data.objectiveData && response.data.objectiveData.status=='Finalized'){
        this.objectiveForm.disable()
        this.readOnly = true
      }
      if(response.data){
        objectiveData = response.data.objectiveData;
        this.land_exercise_list = objectiveData?.land_exercise;
        this.aquatic_exercise_list = objectiveData?.aquatic_exercise;
        
        const groupedExercisesNames:any = []; const groupedExercises:any = {};
         if(this.land_exercise_list && this.land_exercise_list.length>0){
            this.land_exercise_list.forEach((element:any,index:number) => {
              if(element.exercise_date){
                const exists = groupedExercisesNames.some((e: any) => e.exercises === element.exercises);
                if (!exists) {
                  groupedExercisesNames.push({exercises: element.exercises});
                }
              }
            });
            this.land_exercises_names = groupedExercisesNames;
        
            this.land_exercise_list.forEach((element:any,index:number) => {
                if(element.exercise_date) {
                  const excersize_date = this.formatDate(element.exercise_date);
                        if(!groupedExercises[excersize_date]){
                            groupedExercises[excersize_date] = [];
                        }
                        groupedExercises[excersize_date].push({
                          exercises: element.exercises,
                          sets: element.sets,
                          reps: element.reps,
                          weight_resistance: element.weight_resistance,
                          weight_resistance_unit: element.weight_resistance_unit,
                          distance: element.distance,
                          exercise_time: element.exercise_time,
                          exercise_time_mints: element.exercise_time_mints,
                          createdBy: element.createdBy
                        });                     
                }          
            });        
    
            //let land_exercise_grouped_list = Object.entries(groupedExercises);         
            Object.keys(groupedExercises).forEach(date => {
                groupedExercisesNames.forEach((item: { exercises: string; }) => {
                    if (!this.exerciseExists(item.exercises, groupedExercises[date])) {
                        groupedExercises[date].push({
                            exercises: item.exercises,
                            sets: "N/A",
                            reps: "N/A",
                            weight_resistance: "N/A",
                            weight_resistance_unit: "N/A",
                            distance: "N/A",
                            exercise_time: "N/A",
                            exercise_time_mints: "N/A",
                            createdBy: "N/A"
                        });
                    }
                });
            });
        
            const reorderedArray = this.reorderExercises(groupedExercises, groupedExercisesNames);
            this.land_exercise_grouped_list = Object.entries(reorderedArray); 
          }
          if(this.aquatic_exercise_list && this.aquatic_exercise_list.length>0){
            const groupedAquaticExercisesNames:any = [];
            this.aquatic_exercise_list.forEach((element:any,index:number) => {
              if(element.exercise_date){
                const exists = groupedAquaticExercisesNames.some((e: any) => e.exercises === element.exercises);
                if (!exists) {
                  groupedAquaticExercisesNames.push({exercises: element.exercises});
                }
              }
            });
    
            this.aquatic_exercises_names = groupedAquaticExercisesNames;
        
            const aquaticGroupedExercises:any = {};
            this.aquatic_exercise_list.forEach((element:any,index:number) => {
                if(element.exercise_date) {
                  const excersize_date = this.formatDate(element.exercise_date);
                        if(!aquaticGroupedExercises[excersize_date]){
                          aquaticGroupedExercises[excersize_date] = [];
                        }
                        aquaticGroupedExercises[excersize_date].push({
                          exercises: element.exercises,
                          sets: element.sets,
                          reps: element.reps,
                          weight_resistance: element.weight_resistance,
                          weight_resistance_unit: element.weight_resistance_unit,
                          distance: element.distance,
                          exercise_time: element.exercise_time,
                          exercise_time_mints: element.exercise_time_mints,
                          createdBy: element.createdBy
                        });                     
                }          
            }); 

            Object.keys(aquaticGroupedExercises).forEach(date => {
              groupedAquaticExercisesNames.forEach((item: { exercises: string; }) => {
                  if (!this.exerciseExists(item.exercises, aquaticGroupedExercises[date])) {
                    aquaticGroupedExercises[date].push({
                          exercises: item.exercises,
                          sets: "N/A",
                          reps: "N/A",
                          weight_resistance: "N/A",
                          weight_resistance_unit: "N/A",
                          distance: "N/A",
                          exercise_time: "N/A",
                          exercise_time_mints: "N/A",
                          createdBy: "N/A"
                      });
                  }
              });
            });
            const aquaticReorderedArray = this.reorderExercises(aquaticGroupedExercises, groupedAquaticExercisesNames);
            this.aquatic_exercise_grouped_list = Object.entries(aquaticReorderedArray); 
          }
          this.loadForm(objectiveData);
      }
    })
  }

  loadForm(objectiveData:any){
    if(objectiveData?.protocols){
      this.selectedProtocols = objectiveData?.protocols;
    }
    this.objectiveForm.controls['protocols'].setValue(objectiveData?.protocols);
    this.objectiveForm.controls['treatment_provided'].setValue(objectiveData?.treatment_provided);  
    if(objectiveData?.chaperone && objectiveData?.chaperone.length>0 && objectiveData?.chaperone[0].flag){
      const chaperoneGroup = this.objectiveForm.get('chaperone') as FormGroup;
      const flagControl = chaperoneGroup.get('flag');
      const nameControl = chaperoneGroup.get('name');
      nameControl?.setValue(objectiveData.chaperone[0].name);
      flagControl?.setValue(objectiveData.chaperone[0].flag);
      const mockEvent6: MatRadioChange = { value: objectiveData.chaperone[0].flag, source: this.radioButton! }; 
      this.chaperoneRadio(mockEvent6);
    } 
  }
  
  reorderExercises(data: any, order: any) {
    const orderedData: any = {};
    for (const date in data) {
        orderedData[date] = order.map((nameObj: { exercises: string }) => {
            return data[date].find((exercise: { exercises: string }) => exercise.exercises === nameObj.exercises) || null;
        }).filter((exercise: null) => exercise !== null); 
    }
    return orderedData;
  };

  exerciseExists(exercise:string, array:any) {
    return array.some((item: { exercises: string; }) => item.exercises === exercise);
  }

  formatDate(dateString:any) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed in JS
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  }

  chaperoneRadio(event: any) {
    const flagControl = this.objectiveForm.get('chaperone.flag');
    this.chaperoneFlag = false;
    if (flagControl?.value === 'Yes') {
        this.chaperoneFlag = true;
    }
    this.onFlagChange();
  }

  async objectiveSubmit(formData: any){
    console.log('<<<<<  objective form >>>>',this.objectiveForm)
    if (this.objectiveForm.invalid){
      this.objectiveForm.markAllAsTouched();
    }else{
      if (this.objectiveForm.invalid){
        this.objectiveForm.markAllAsTouched();
      }else{
        this.isSubmit = true
        Object.assign(formData, {
          soap_note_type:"daily_note",
          createdBy: this.userId,
        })
        let reqVars = {
          query: {
            appointmentId: this.appointmentId,soap_note_type:"daily_note"
          },
          type:'objective',
          userId: this.userId,
          data: formData,
          addendumId:this.addendumId,
          appointmentId:this.appointmentId,
          soap_note_type:'daily_note'
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
            setTimeout(() => {
              window.open(`${this.commonService.getLoggedInRoute()}`+"/daily-notes/assessment/"+this.appointmentId, "_self");
            }, 2000)
          }        
        })
      }
    }
  }

  addProtocolModal() {
     const dialogRef = this.dialog.open(ProtocolModalComponent,{
      panelClass: [ 'custom-alert-container','modal--wrapper'],
      data : {
       appointmentId:this.appointmentId
      }
     });
     dialogRef.afterClosed().subscribe(result => {
      if (result && result.length>0) {

        this.selectedProtocols = result
        this.objectiveForm.controls['protocols'].setValue(result)
      } else {
        console.log('Modal closed without saving data.');
      }
    });
  }

  removeProtocols(id:string) {
    let newArray: FileItem[] = this.selectedProtocols.filter((item: FileItem) => item.id !== id);
    this.selectedProtocols = newArray;
    this.objectiveForm.controls['protocols'].setValue(this.selectedProtocols);
  }

  addExersiceModal(type:string) {
    const dialogRef = this.dialog.open(AddExerciseComponent, {
      disableClose: true,
      panelClass:[ 'custom-alert-container','modal--wrapper'],
      data : {
        appointmentId:this.appointmentId,
        addendumId:this.addendumId,
        type:type,
        soap_note_type:"daily_note",
       }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(' >> Result **** >>>>',result)
      if (result) {
        this.getObjectiveRecord();
      } else {
        console.log('Modal closed without saving data.');
      }
    });
  }

  previewModal(fileId:string) {
    window.open(`${window.location.origin}`+"/"+`${this.userType}`+"/file-preview/"+fileId, '_blank');
  }

}