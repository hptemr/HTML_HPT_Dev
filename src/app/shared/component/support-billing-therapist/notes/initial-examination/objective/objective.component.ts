import { Component,OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { validationMessages } from '../../../../../../utils/validation-messages';
import { Validators, FormGroup, FormBuilder,FormArray, AbstractControl,FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatRadioChange, MatRadioButton } from '@angular/material/radio';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { PreviewModalComponent } from 'src/app/shared/comman/preview-modal/preview-modal.component';
import { AddExerciseComponent } from '../add-exercise/add-exercise.component';
import { ProtocolModalComponent } from '../protocol-modal/protocol-modal.component';
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
  selector: 'app-objective', 
  templateUrl: './objective.component.html',
  styleUrl: './objective.component.scss',
  providers: [DatePipe]
})
export class ObjectiveComponent {
  isDisabled = true;
  selectedValue:string = '';  
  clickedIndex = 0; 
  clickedIndexLefs = 0;
  clickedIndexs:any =[]
  land_exercise_list:any =[]
  land_exercise_grouped_list:any =[]
  land_exercises_names:any =[]
  aquatic_exercises_names:any =[]
  aquatic_exercise_list:any =[]
  aquatic_exercise_grouped_list:any =[]
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
    items:1,
    navText: [
      "<i class='fa fa-arrow-left'></i>",
      "<i class='fa fa-arrow-right'></i>"
  ],  
  responsive:{
      0:{
          items:1,
          autoWidth:true,
      },
      600:{
          items:2,
          slideBy: 2
      },
      1000:{
          items:3,
          slideBy: 3
      },
      1200:{
        items:4,
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
  appointment_dates:any=[];
  appointment_data:any=[];
  objectiveId:string='';
  surgery_date:any=''
  surgery_type:string=''
  mctsib_total: number = 0;
  @ViewChild(MatRadioButton) radioButton: MatRadioButton | undefined;
  //Date of Surgery: June 1\n2 week: June 14\n4 week: June 28\n6 week: July 12\n8 week: July 26\n10 week: August 9\n12 week: August 23

  constructor( private router: Router,private datePipe: DatePipe,private fb: FormBuilder, private route: ActivatedRoute, public authService: AuthService, public commonService: CommonService,public dialog: MatDialog) {
    this.route.params.subscribe((params: Params) => {
      this.appointmentId = params['appointmentId'];
    })
  }
 
  ngOnInit() {
    this.objectiveForm = this.fb.group({
      appointmentId:[this.appointmentId],
      protocols:[''],
      precautions:['',[Validators.required]],
      patient_consent: ['', [Validators.required]],
      chaperone : this.fb.group({
        flag: ['No', [Validators.required]], 
        name: ['',[Validators.minLength(1), Validators.maxLength(50)]] 
      }),
      observation: ['', [Validators.minLength(1), Validators.maxLength(2500)]],
      range_of_motion: ['', [ Validators.minLength(1), Validators.maxLength(2500)]],
      strength: ['', [Validators.minLength(1), Validators.maxLength(2500)]],
      neurological: ['', [Validators.minLength(1), Validators.maxLength(2500)]],
      special_test: ['', [Validators.minLength(1), Validators.maxLength(2500)]],
      palpation: ['', [Validators.minLength(1), Validators.maxLength(2500)]],
      slp: ['', [Validators.minLength(1), Validators.maxLength(2500)]],
      ot: ['', [Validators.minLength(1), Validators.maxLength(500)]],
      treatment_provided: ['', [Validators.minLength(1), Validators.maxLength(500)]],     
      outcome_measures : this.fb.group({
        name: ['',],
        neck_rate_your_pain: [''],
        pain_intensity: [''],
        personal_care: [''],
        lifting: [''],
        headache: [''],
        recreation: [''],
        reading: [''],
        work: [''],
        sleeping: [''],
        concentration: [''],
        driving: [''],
        score: [''],     
        quick_dash_question1: [''], 
        quick_dash_question2: [''], 
        quick_dash_question3: [''], 
        quick_dash_question4: [''], 
        quick_dash_question5: [''], 
        quick_dash_question6: [''], 
        quick_dash_question7: [''], 
        quick_dash_question8: [''], 
        quick_dash_question9: [''], 
        quick_dash_question10: [''], 
        quick_dash_question11: [''], 
        quick_dash_score: [''], 
        oswestry_pain_intensity: [''], 
        oswestry_standing: [''], 
        oswestry_personal_care: [''], 
        oswestry_sleeping: [''], 
        oswestry_lifting: [''], 
        oswestry_social_life: [''], 
        oswestry_walking: [''], 
        oswestry_traveling: [''], 
        oswestry_sitting: [''], 
        oswestry_employment_homemaking: [''],
        lefs_rate_your_pain: [''],
        lefs_question1: [''],
        lefs_question2: [''],
        lefs_question3: [''],
        lefs_question4: [''],
        lefs_question5: [''],
        lefs_question6: [''],
        lefs_question7: [''],
        lefs_question8: [''],
        lefs_question9: [''],
        lefs_question10: [''],
        lefs_question11: [''],
        lefs_question12: [''],
        lefs_question13: [''],
        lefs_question14: [''],
        lefs_question15: [''],
        lefs_question16: [''],
        lefs_question17: [''],
        lefs_question18: [''],
        lefs_question19: [''],
        lefs_question20: [''],
        lefs_score: [''],
        fabq_1_rate_your_pain: [''],
        fabq_2_rate_your_pain: [''],
        fabq_3_rate_your_pain: [''],
        fabq_4_rate_your_pain: [''],
        fabq_5_rate_your_pain: [''],
        fabq_6_rate_your_pain: [''],
        fabq_7_rate_your_pain: [''],
        fabq_8_rate_your_pain: [''],
        fabq_9_rate_your_pain: [''],
        fabq_10_rate_your_pain: [''],
        fabq_11_rate_your_pain: [''],
        fabq_12_rate_your_pain: [''],
        fabq_13_rate_your_pain: [''],
        fabq_14_rate_your_pain: [''],
        fabq_15_rate_your_pain: [''],
        fabq_16_rate_your_pain: [''],
        fabq_score: [''],

        eat_1_rate_your_pain: [''],
        eat_2_rate_your_pain: [''],
        eat_3_rate_your_pain: [''],
        eat_4_rate_your_pain: [''],
        eat_5_rate_your_pain: [''],
        eat_6_rate_your_pain: [''],
        eat_7_rate_your_pain: [''],
        eat_8_rate_your_pain: [''],
        eat_9_rate_your_pain: [''],
        eat_10_rate_your_pain: [''],        
        eat_total: [''],
                
        mctsib_condition1_1: [''],
        mctsib_condition1_2: [''],
        mctsib_condition1_3: [''],
        mctsib_condition2_1: [''],
        mctsib_condition2_2: [''],
        mctsib_condition2_3: [''],
        mctsib_condition3_1: [''],
        mctsib_condition3_2: [''],
        mctsib_condition3_3: [''],
        mctsib_condition4_1: [''],
        mctsib_condition4_2: [''],
        mctsib_condition4_3: [''],
        mctsib_total: [''],
        sts_number: [''],
        sts_score: [''],

      }),
    });
    //this.initializeFormValidation();
    this.onFlagChange();
    this.getObjectiveRecord();  
    this.onMctsibChange()    
  }


 async getObjectiveRecord(){
    let reqVars = {
      query: {appointmentId:this.appointmentId,soap_note_type:'initial_examination'},     
    }
   await this.authService.apiRequest('post', 'soapNote/getObjectiveData', reqVars).subscribe(async response => {
      let subjectiveData: never[] = []; let objectiveData = [];
      if(response.data){
        objectiveData = response.data.objectiveData;
        subjectiveData = response.data.subjectiveData;

        this.objectiveId = objectiveData?._id;
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

          if(response.data && response.data.appointmentDatesList){
            this.appointment_dates = response.data.appointmentDatesList       
          }
    
          if(response.data && response.data.appointmentData){
            this.appointment_data = response.data.appointmentData    
          }       
    
          this.loadForm(objectiveData,subjectiveData,this.appointment_data);
      }
    })
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

  loadForm(objectiveData:any,subjectiveData:any,appointment_data:any){
      if(objectiveData?.protocols){
        this.selectedProtocols = objectiveData?.protocols;
      }
      this.objectiveForm.controls['protocols'].setValue(objectiveData?.protocols);
      this.objectiveForm.controls['patient_consent'].setValue(objectiveData?.patient_consent);
      this.objectiveForm.controls['precautions'].setValue(objectiveData?.precautions);

      if(objectiveData === null){
        if(subjectiveData && subjectiveData?.surgery_type){
          this.surgery_type = subjectiveData?.surgery_type;
          this.surgery_date = this.datePipe.transform(subjectiveData.surgery_date, 'MMMM d');
          this.objectiveForm.controls['precautions'].setValue('Date of Surgery: '+this.surgery_date+'  ('+this.surgery_type+')');
        }
      }

      if(objectiveData?.chaperone && objectiveData?.chaperone.length>0 && objectiveData?.chaperone[0].flag){
        const chaperoneGroup = this.objectiveForm.get('chaperone') as FormGroup;
        const flagControl = chaperoneGroup.get('flag');
        const nameControl = chaperoneGroup.get('name');
        nameControl?.setValue(objectiveData.chaperone[0].name);
        flagControl?.setValue(objectiveData.chaperone[0].flag);
        const mockEvent6: MatRadioChange = { value: objectiveData.chaperone[0].flag, source: this.radioButton! }; 
        this.chaperoneRadio(mockEvent6);
      }      
      this.objectiveForm.controls['observation'].setValue(objectiveData?.observation);
      this.objectiveForm.controls['range_of_motion'].setValue(objectiveData?.range_of_motion);
      this.objectiveForm.controls['strength'].setValue(objectiveData?.strength);
      this.objectiveForm.controls['neurological'].setValue(objectiveData?.neurological);
      this.objectiveForm.controls['special_test'].setValue(objectiveData?.special_test);
      this.objectiveForm.controls['palpation'].setValue(objectiveData?.palpation);
      this.objectiveForm.controls['slp'].setValue(objectiveData?.slp);
      this.objectiveForm.controls['ot'].setValue(objectiveData?.ot);
      this.objectiveForm.controls['treatment_provided'].setValue(objectiveData?.treatment_provided);  

      const outcome_measures_group = this.objectiveForm.get('outcome_measures') as FormGroup;
      outcome_measures_group.get('name')?.setValue(objectiveData?.outcome_measures?.name ? objectiveData.outcome_measures?.name : '')
      outcome_measures_group.get('neck_rate_your_pain')?.setValue(objectiveData?.outcome_measures?.neck_rate_your_pain ? objectiveData?.outcome_measures.neck_rate_your_pain : null)
      if(objectiveData?.outcome_measures && objectiveData?.outcome_measures?.neck_rate_your_pain){
        this.painRate('neck_rate_your_pain',0,objectiveData.outcome_measures.neck_rate_your_pain)
        this.clickedIndex = objectiveData.outcome_measures.neck_rate_your_pain;
      }

      outcome_measures_group.get('pain_intensity')?.setValue(objectiveData?.outcome_measures?.pain_intensity ? objectiveData?.outcome_measures.pain_intensity : null)
      outcome_measures_group.get('personal_care')?.setValue(objectiveData?.outcome_measures?.personal_care)
      outcome_measures_group.get('lifting')?.setValue(objectiveData?.outcome_measures?.lifting)
      outcome_measures_group.get('headache')?.setValue(objectiveData?.outcome_measures?.headache)
      outcome_measures_group.get('recreation')?.setValue(objectiveData?.outcome_measures?.recreation)
      outcome_measures_group.get('reading')?.setValue(objectiveData?.outcome_measures?.reading)
      outcome_measures_group.get('work')?.setValue(objectiveData?.outcome_measures?.work)
      outcome_measures_group.get('sleeping')?.setValue(objectiveData?.outcome_measures?.sleeping)
      outcome_measures_group.get('concentration')?.setValue(objectiveData?.outcome_measures?.concentration)
      outcome_measures_group.get('driving')?.setValue(objectiveData?.outcome_measures?.driving)
      outcome_measures_group.get('score')?.setValue(objectiveData?.outcome_measures?.score)

      outcome_measures_group.get('quick_dash_question1')?.setValue(objectiveData?.outcome_measures?.quick_dash_question1)
      outcome_measures_group.get('quick_dash_question2')?.setValue(objectiveData?.outcome_measures?.quick_dash_question2)
      outcome_measures_group.get('quick_dash_question3')?.setValue(objectiveData?.outcome_measures?.quick_dash_question3)
      outcome_measures_group.get('quick_dash_question4')?.setValue(objectiveData?.outcome_measures?.quick_dash_question4)
      outcome_measures_group.get('quick_dash_question5')?.setValue(objectiveData?.outcome_measures?.quick_dash_question5)
      outcome_measures_group.get('quick_dash_question6')?.setValue(objectiveData?.outcome_measures?.quick_dash_question6)
      outcome_measures_group.get('quick_dash_question7')?.setValue(objectiveData?.outcome_measures?.quick_dash_question7)
      outcome_measures_group.get('quick_dash_question8')?.setValue(objectiveData?.outcome_measures?.quick_dash_question8)
      outcome_measures_group.get('quick_dash_question9')?.setValue(objectiveData?.outcome_measures?.quick_dash_question9)
      outcome_measures_group.get('quick_dash_question10')?.setValue(objectiveData?.outcome_measures?.quick_dash_question10)
      outcome_measures_group.get('quick_dash_question11')?.setValue(objectiveData?.outcome_measures?.quick_dash_question11)
      outcome_measures_group.get('quick_dash_score')?.setValue(objectiveData?.outcome_measures?.quick_dash_score)
      outcome_measures_group.get('oswestry_pain_intensity')?.setValue(objectiveData?.outcome_measures?.oswestry_pain_intensity) 
      outcome_measures_group.get('oswestry_standing')?.setValue(objectiveData?.outcome_measures?.oswestry_standing) 
      outcome_measures_group.get('oswestry_personal_care')?.setValue(objectiveData?.outcome_measures?.oswestry_personal_care) 
      outcome_measures_group.get('oswestry_sleeping')?.setValue(objectiveData?.outcome_measures?.oswestry_sleeping) 
      outcome_measures_group.get('oswestry_lifting')?.setValue(objectiveData?.outcome_measures?.oswestry_lifting) 
      outcome_measures_group.get('oswestry_social_life')?.setValue(objectiveData?.outcome_measures?.oswestry_social_life) 
      outcome_measures_group.get('oswestry_walking')?.setValue(objectiveData?.outcome_measures?.oswestry_walking) 
      outcome_measures_group.get('oswestry_traveling')?.setValue(objectiveData?.outcome_measures?.oswestry_traveling) 
      outcome_measures_group.get('oswestry_sitting')?.setValue(objectiveData?.outcome_measures?.oswestry_sitting) 
      outcome_measures_group.get('oswestry_employment_homemaking')?.setValue(objectiveData?.outcome_measures?.oswestry_employment_homemaking)
      outcome_measures_group.get('lefs_rate_your_pain')?.setValue(objectiveData?.outcome_measures?.lefs_rate_your_pain ? objectiveData?.outcome_measures.lefs_rate_your_pain : null)
      outcome_measures_group.get('lefs_question1')?.setValue(objectiveData?.outcome_measures?.lefs_question1) 
      outcome_measures_group.get('lefs_question2')?.setValue(objectiveData?.outcome_measures?.lefs_question2) 
      outcome_measures_group.get('lefs_question3')?.setValue(objectiveData?.outcome_measures?.lefs_question3) 
      outcome_measures_group.get('lefs_question4')?.setValue(objectiveData?.outcome_measures?.lefs_question4) 
      outcome_measures_group.get('lefs_question5')?.setValue(objectiveData?.outcome_measures?.lefs_question5) 
      outcome_measures_group.get('lefs_question6')?.setValue(objectiveData?.outcome_measures?.lefs_question6) 
      outcome_measures_group.get('lefs_question7')?.setValue(objectiveData?.outcome_measures?.lefs_question7) 
      outcome_measures_group.get('lefs_question8')?.setValue(objectiveData?.outcome_measures?.lefs_question8) 
      outcome_measures_group.get('lefs_question9')?.setValue(objectiveData?.outcome_measures?.lefs_question9) 
      outcome_measures_group.get('lefs_question10')?.setValue(objectiveData?.outcome_measures?.lefs_question10)
      outcome_measures_group.get('lefs_question11')?.setValue(objectiveData?.outcome_measures?.lefs_question11) 
      outcome_measures_group.get('lefs_question12')?.setValue(objectiveData?.outcome_measures?.lefs_question12) 
      outcome_measures_group.get('lefs_question13')?.setValue(objectiveData?.outcome_measures?.lefs_question13) 
      outcome_measures_group.get('lefs_question14')?.setValue(objectiveData?.outcome_measures?.lefs_question14) 
      outcome_measures_group.get('lefs_question15')?.setValue(objectiveData?.outcome_measures?.lefs_question15) 
      outcome_measures_group.get('lefs_question16')?.setValue(objectiveData?.outcome_measures?.lefs_question16) 
      outcome_measures_group.get('lefs_question17')?.setValue(objectiveData?.outcome_measures?.lefs_question17) 
      outcome_measures_group.get('lefs_question18')?.setValue(objectiveData?.outcome_measures?.lefs_question18) 
      outcome_measures_group.get('lefs_question19')?.setValue(objectiveData?.outcome_measures?.lefs_question19) 
      outcome_measures_group.get('lefs_question20')?.setValue(objectiveData?.outcome_measures?.lefs_question20)
      outcome_measures_group.get('lefs_score')?.setValue(objectiveData?.outcome_measures?.lefs_score)
      outcome_measures_group.get('fabq_1_rate_your_pain')?.setValue(objectiveData?.outcome_measures?.fabq_1_rate_your_pain)       
      outcome_measures_group.get('fabq_2_rate_your_pain')?.setValue(objectiveData?.outcome_measures?.fabq_2_rate_your_pain) 
      this.clickedIndexs[1]=objectiveData?.outcome_measures?.fabq_1_rate_your_pain;
      this.clickedIndexs[2]=objectiveData?.outcome_measures?.fabq_2_rate_your_pain;
      this.clickedIndexs[3]=objectiveData?.outcome_measures?.fabq_3_rate_your_pain;
      this.clickedIndexs[4]=objectiveData?.outcome_measures?.fabq_4_rate_your_pain;
      this.clickedIndexs[5]=objectiveData?.outcome_measures?.fabq_5_rate_your_pain;
      this.clickedIndexs[6]=objectiveData?.outcome_measures?.fabq_6_rate_your_pain;
      this.clickedIndexs[7]=objectiveData?.outcome_measures?.fabq_7_rate_your_pain;
      this.clickedIndexs[8]=objectiveData?.outcome_measures?.fabq_8_rate_your_pain;
      this.clickedIndexs[9]=objectiveData?.outcome_measures?.fabq_9_rate_your_pain;
      this.clickedIndexs[10]=objectiveData?.outcome_measures?.fabq_10_rate_your_pain;
      this.clickedIndexs[11]=objectiveData?.outcome_measures?.fabq_11_rate_your_pain;
      this.clickedIndexs[12]=objectiveData?.outcome_measures?.fabq_12_rate_your_pain;
      this.clickedIndexs[13]=objectiveData?.outcome_measures?.fabq_13_rate_your_pain;
      this.clickedIndexs[14]=objectiveData?.outcome_measures?.fabq_14_rate_your_pain;
      this.clickedIndexs[15]=objectiveData?.outcome_measures?.fabq_15_rate_your_pain;
      this.clickedIndexs[16]=objectiveData?.outcome_measures?.fabq_16_rate_your_pain;
      outcome_measures_group.get('fabq_3_rate_your_pain')?.setValue(objectiveData?.outcome_measures?.fabq_3_rate_your_pain) 
      outcome_measures_group.get('fabq_4_rate_your_pain')?.setValue(objectiveData?.outcome_measures?.fabq_4_rate_your_pain) 
      outcome_measures_group.get('fabq_5_rate_your_pain')?.setValue(objectiveData?.outcome_measures?.fabq_5_rate_your_pain) 
      outcome_measures_group.get('fabq_6_rate_your_pain')?.setValue(objectiveData?.outcome_measures?.fabq_6_rate_your_pain) 
      outcome_measures_group.get('fabq_7_rate_your_pain')?.setValue(objectiveData?.outcome_measures?.fabq_7_rate_your_pain) 
      outcome_measures_group.get('fabq_8_rate_your_pain')?.setValue(objectiveData?.outcome_measures?.fabq_8_rate_your_pain) 
      outcome_measures_group.get('fabq_9_rate_your_pain')?.setValue(objectiveData?.outcome_measures?.fabq_9_rate_your_pain) 
      outcome_measures_group.get('fabq_10_rate_your_pain')?.setValue(objectiveData?.outcome_measures?.fabq_10_rate_your_pain)
      outcome_measures_group.get('fabq_11_rate_your_pain')?.setValue(objectiveData?.outcome_measures?.fabq_11_rate_your_pain) 
      outcome_measures_group.get('fabq_12_rate_your_pain')?.setValue(objectiveData?.outcome_measures?.fabq_12_rate_your_pain) 
      outcome_measures_group.get('fabq_13_rate_your_pain')?.setValue(objectiveData?.outcome_measures?.fabq_13_rate_your_pain) 
      outcome_measures_group.get('fabq_14_rate_your_pain')?.setValue(objectiveData?.outcome_measures?.fabq_14_rate_your_pain) 
      outcome_measures_group.get('fabq_15_rate_your_pain')?.setValue(objectiveData?.outcome_measures?.fabq_15_rate_your_pain) 
      outcome_measures_group.get('fabq_16_rate_your_pain')?.setValue(objectiveData?.outcome_measures?.fabq_16_rate_your_pain) 
      outcome_measures_group.get('fabq_score')?.setValue(objectiveData?.outcome_measures?.fabq_score);     
      outcome_measures_group.get('eat_1_rate_your_pain')?.setValue(objectiveData?.outcome_measures?.eat_1_rate_your_pain) 
      outcome_measures_group.get('eat_2_rate_your_pain')?.setValue(objectiveData?.outcome_measures?.eat_2_rate_your_pain) 
      outcome_measures_group.get('eat_3_rate_your_pain')?.setValue(objectiveData?.outcome_measures?.eat_2_rate_your_pain) 
      outcome_measures_group.get('eat_4_rate_your_pain')?.setValue(objectiveData?.outcome_measures?.eat_4_rate_your_pain) 
      outcome_measures_group.get('eat_5_rate_your_pain')?.setValue(objectiveData?.outcome_measures?.eat_5_rate_your_pain) 
      outcome_measures_group.get('eat_6_rate_your_pain')?.setValue(objectiveData?.outcome_measures?.eat_6_rate_your_pain) 
      outcome_measures_group.get('eat_7_rate_your_pain')?.setValue(objectiveData?.outcome_measures?.eat_7_rate_your_pain) 
      outcome_measures_group.get('eat_8_rate_your_pain')?.setValue(objectiveData?.outcome_measures?.eat_8_rate_your_pain) 
      outcome_measures_group.get('eat_9_rate_your_pain')?.setValue(objectiveData?.outcome_measures?.eat_9_rate_your_pain) 
      outcome_measures_group.get('eat_10_rate_your_pain')?.setValue(objectiveData?.outcome_measures?.eat_10_rate_your_pain)
      this.clickedIndexs[17]=objectiveData?.outcome_measures?.eat_1_rate_your_pain;
      this.clickedIndexs[18]=objectiveData?.outcome_measures?.eat_2_rate_your_pain;
      this.clickedIndexs[19]=objectiveData?.outcome_measures?.eat_3_rate_your_pain;
      this.clickedIndexs[20]=objectiveData?.outcome_measures?.eat_4_rate_your_pain;
      this.clickedIndexs[21]=objectiveData?.outcome_measures?.eat_5_rate_your_pain;
      this.clickedIndexs[22]=objectiveData?.outcome_measures?.eat_6_rate_your_pain;
      this.clickedIndexs[23]=objectiveData?.outcome_measures?.eat_7_rate_your_pain;
      this.clickedIndexs[24]=objectiveData?.outcome_measures?.eat_8_rate_your_pain;
      this.clickedIndexs[25]=objectiveData?.outcome_measures?.eat_9_rate_your_pain;
      this.clickedIndexs[26]=objectiveData?.outcome_measures?.eat_10_rate_your_pain;
      outcome_measures_group.get('eat_total')?.setValue(objectiveData?.outcome_measures?.eat_total);
      outcome_measures_group.get('mctsib_condition1_1')?.setValue(objectiveData?.outcome_measures?.mctsib_condition1_1) 
      outcome_measures_group.get('mctsib_condition1_2')?.setValue(objectiveData?.outcome_measures?.mctsib_condition1_2) 
      outcome_measures_group.get('mctsib_condition1_3')?.setValue(objectiveData?.outcome_measures?.mctsib_condition1_3) 
      outcome_measures_group.get('mctsib_condition2_1')?.setValue(objectiveData?.outcome_measures?.mctsib_condition2_1) 
      outcome_measures_group.get('mctsib_condition2_2')?.setValue(objectiveData?.outcome_measures?.mctsib_condition2_2) 
      outcome_measures_group.get('mctsib_condition2_3')?.setValue(objectiveData?.outcome_measures?.mctsib_condition2_3) 
      outcome_measures_group.get('mctsib_condition3_1')?.setValue(objectiveData?.outcome_measures?.mctsib_condition3_1) 
      outcome_measures_group.get('mctsib_condition3_2')?.setValue(objectiveData?.outcome_measures?.mctsib_condition3_2) 
      outcome_measures_group.get('mctsib_condition3_3')?.setValue(objectiveData?.outcome_measures?.mctsib_condition3_3) 
      outcome_measures_group.get('mctsib_condition4_1')?.setValue(objectiveData?.outcome_measures?.mctsib_condition4_1) 
      outcome_measures_group.get('mctsib_condition4_2')?.setValue(objectiveData?.outcome_measures?.mctsib_condition4_2) 
      outcome_measures_group.get('mctsib_condition4_3')?.setValue(objectiveData?.outcome_measures?.mctsib_condition4_3) 
      outcome_measures_group.get('mctsib_total')?.setValue(objectiveData?.outcome_measures?.mctsib_total) 


      const mockEvent = { target: { value: objectiveData?.outcome_measures?.name ? objectiveData?.outcome_measures?.name : '' } }; 
      this.outcomeMeasuresChange(mockEvent)
  }

  painRate(id:string,val:number,i: any) {  
    if(id=='neck_rate_your_pain' || id=='lefs_rate_your_pain'){
        if(id=='neck_rate_your_pain'){
          this.clickedIndex = i;
        }
          
        if(id=='lefs_rate_your_pain'){
          this.clickedIndexLefs = i;
        }        
    }else{
      this.clickedIndexs[val] = i;     
    }    
    const outcome_measures_group = this.objectiveForm.get('outcome_measures') as FormGroup;
    outcome_measures_group.get(id)?.setValue(i)
    if(val>0 || val<17){
      this.FabqMeasuresChange()
    } 
    if(val>16 || val<27){
      this.EatMeasuresChange()
    }
    //this.objectiveForm.controls[id].setValue(i)
  }

  NeckDisabilityMeasuresChange(event: MatRadioChange): void {
    let score:number=0;
    const outcome_measures_group = this.objectiveForm.get('outcome_measures') as FormGroup;
    score += outcome_measures_group.get('pain_intensity')?.value
    score += outcome_measures_group.get('personal_care')?.value
    score += outcome_measures_group.get('lifting')?.value
    score += outcome_measures_group.get('headache')?.value
    score += outcome_measures_group.get('recreation')?.value
    score += outcome_measures_group.get('reading')?.value
    score += outcome_measures_group.get('work')?.value
    score += outcome_measures_group.get('sleeping')?.value
    score += outcome_measures_group.get('concentration')?.value
    score += outcome_measures_group.get('driving')?.value
  
    outcome_measures_group.get('score')?.setValue(score)
  }


  QuickDashMeasuresChange(event: MatRadioChange): void {
    let score:number=0;
    const outcome_measures_group = this.objectiveForm.get('outcome_measures') as FormGroup;
    score += outcome_measures_group.get('quick_dash_question1')?.value
    score += outcome_measures_group.get('quick_dash_question2')?.value
    score += outcome_measures_group.get('quick_dash_question3')?.value
    score += outcome_measures_group.get('quick_dash_question4')?.value
    score += outcome_measures_group.get('quick_dash_question5')?.value
    score += outcome_measures_group.get('quick_dash_question6')?.value
    score += outcome_measures_group.get('quick_dash_question7')?.value
    score += outcome_measures_group.get('quick_dash_question8')?.value
    score += outcome_measures_group.get('quick_dash_question9')?.value
    score += outcome_measures_group.get('quick_dash_question10')?.value
    score += outcome_measures_group.get('quick_dash_question11')?.value
  
    outcome_measures_group.get('quick_dash_score')?.setValue(score)
  }

  LefsMeasuresChange(event: MatRadioChange): void {
    let score:number=0;
    const outcome_measures_group = this.objectiveForm.get('outcome_measures') as FormGroup;
    score += outcome_measures_group.get('lefs_question1')?.value
    score += outcome_measures_group.get('lefs_question2')?.value
    score += outcome_measures_group.get('lefs_question3')?.value
    score += outcome_measures_group.get('lefs_question4')?.value
    score += outcome_measures_group.get('lefs_question5')?.value
    score += outcome_measures_group.get('lefs_question6')?.value
    score += outcome_measures_group.get('lefs_question7')?.value
    score += outcome_measures_group.get('lefs_question8')?.value
    score += outcome_measures_group.get('lefs_question9')?.value
    score += outcome_measures_group.get('lefs_question10')?.value
    score += outcome_measures_group.get('lefs_question11')?.value
    score += outcome_measures_group.get('lefs_question12')?.value
    score += outcome_measures_group.get('lefs_question13')?.value
    score += outcome_measures_group.get('lefs_question14')?.value
    score += outcome_measures_group.get('lefs_question15')?.value
    score += outcome_measures_group.get('lefs_question16')?.value
    score += outcome_measures_group.get('lefs_question17')?.value
    score += outcome_measures_group.get('lefs_question18')?.value
    score += outcome_measures_group.get('lefs_question19')?.value
    score += outcome_measures_group.get('lefs_question20')?.value
  
    outcome_measures_group.get('lefs_score')?.setValue(score)
  }

  FabqMeasuresChange() {
    let score:number=0;
    const outcome_measures_group = this.objectiveForm.get('outcome_measures') as FormGroup;
    score += outcome_measures_group.get('fabq_1_rate_your_pain')?.value
    score += outcome_measures_group.get('fabq_2_rate_your_pain')?.value
    score += outcome_measures_group.get('fabq_3_rate_your_pain')?.value
    score += outcome_measures_group.get('fabq_4_rate_your_pain')?.value
    score += outcome_measures_group.get('fabq_5_rate_your_pain')?.value
    score += outcome_measures_group.get('fabq_6_rate_your_pain')?.value
    score += outcome_measures_group.get('fabq_7_rate_your_pain')?.value
    score += outcome_measures_group.get('fabq_8_rate_your_pain')?.value
    score += outcome_measures_group.get('fabq_9_rate_your_pain')?.value
    score += outcome_measures_group.get('fabq_10_rate_your_pain')?.value
    score += outcome_measures_group.get('fabq_11_rate_your_pain')?.value
    score += outcome_measures_group.get('fabq_12_rate_your_pain')?.value
    score += outcome_measures_group.get('fabq_13_rate_your_pain')?.value
    score += outcome_measures_group.get('fabq_14_rate_your_pain')?.value
    score += outcome_measures_group.get('fabq_15_rate_your_pain')?.value
    score += outcome_measures_group.get('fabq_16_rate_your_pain')?.value
  
    outcome_measures_group.get('fabq_score')?.setValue(score)
  }

  EatMeasuresChange() {
    let score:number=0;
    const outcome_measures_group = this.objectiveForm.get('outcome_measures') as FormGroup;
    score += outcome_measures_group.get('eat_1_rate_your_pain')?.value
    score += outcome_measures_group.get('eat_2_rate_your_pain')?.value
    score += outcome_measures_group.get('eat_3_rate_your_pain')?.value
    score += outcome_measures_group.get('eat_4_rate_your_pain')?.value
    score += outcome_measures_group.get('eat_5_rate_your_pain')?.value
    score += outcome_measures_group.get('eat_6_rate_your_pain')?.value
    score += outcome_measures_group.get('eat_7_rate_your_pain')?.value
    score += outcome_measures_group.get('eat_8_rate_your_pain')?.value
    score += outcome_measures_group.get('eat_9_rate_your_pain')?.value
    score += outcome_measures_group.get('eat_10_rate_your_pain')?.value
  
    outcome_measures_group.get('eat_total')?.setValue(score)
  }

  outcomeMeasuresChange(e:any) {
    const outcome_measures_group = this.objectiveForm.get('outcome_measures') as FormGroup;

    Object.keys(outcome_measures_group.controls).forEach(key => {
      const control = outcome_measures_group.get(key);
      //control?.reset();
      control?.markAsUntouched();
      control?.clearValidators();
      control?.updateValueAndValidity();
    });

    //console.log('Name value >>>>',outcome_measures_group.get('name')?.value)
    if(outcome_measures_group.get('name')?.value!='Neck Disability Index'){
      //console.log('HERE 1 Neck Disability Index');
      outcome_measures_group.get('neck_rate_your_pain')?.setValue(null)
      outcome_measures_group.get('pain_intensity')?.setValue(null)
      outcome_measures_group.get('personal_care')?.setValue(null)
      outcome_measures_group.get('lifting')?.setValue(null)
      outcome_measures_group.get('headache')?.setValue(null)
      outcome_measures_group.get('recreation')?.setValue(null)
      outcome_measures_group.get('reading')?.setValue(null)
      outcome_measures_group.get('work')?.setValue(null)
      outcome_measures_group.get('sleeping')?.setValue(null)
      outcome_measures_group.get('concentration')?.setValue(null)
      outcome_measures_group.get('driving')?.setValue(null)
      outcome_measures_group.get('score')?.setValue(null)
    }

    if(outcome_measures_group.get('name')?.value=='Neck Disability Index'){
      outcome_measures_group.get('neck_rate_your_pain')?.setValidators([Validators.required])      
      outcome_measures_group.get('neck_rate_your_pain')?.updateValueAndValidity();
      outcome_measures_group.get('pain_intensity')?.setValidators(Validators.required)
      outcome_measures_group.get('pain_intensity')?.updateValueAndValidity();
      outcome_measures_group.get('personal_care')?.setValidators(Validators.required)
      outcome_measures_group.get('personal_care')?.updateValueAndValidity();
      outcome_measures_group.get('lifting')?.setValidators(Validators.required)
      outcome_measures_group.get('lifting')?.updateValueAndValidity();
      outcome_measures_group.get('headache')?.setValidators(Validators.required)
      outcome_measures_group.get('headache')?.updateValueAndValidity();
      outcome_measures_group.get('recreation')?.setValidators(Validators.required)
      outcome_measures_group.get('recreation')?.updateValueAndValidity();
      outcome_measures_group.get('reading')?.setValidators(Validators.required)
      outcome_measures_group.get('reading')?.updateValueAndValidity();
      outcome_measures_group.get('work')?.setValidators(Validators.required)
      outcome_measures_group.get('work')?.updateValueAndValidity();
      outcome_measures_group.get('sleeping')?.setValidators(Validators.required)
      outcome_measures_group.get('sleeping')?.updateValueAndValidity();
      outcome_measures_group.get('concentration')?.setValidators(Validators.required)
      outcome_measures_group.get('concentration')?.updateValueAndValidity();
      outcome_measures_group.get('driving')?.setValidators(Validators.required)
      outcome_measures_group.get('driving')?.updateValueAndValidity();
      outcome_measures_group.get('score')?.setValidators(Validators.required)
      outcome_measures_group.get('score')?.updateValueAndValidity();
    }

    if(outcome_measures_group.get('name')?.value!='QuickDASH'){
      //console.log('HERE 2 QuickDASH');
      outcome_measures_group.get('quick_dash_question1')?.setValue(null)
      outcome_measures_group.get('quick_dash_question2')?.setValue(null)
      outcome_measures_group.get('quick_dash_question3')?.setValue(null)
      outcome_measures_group.get('quick_dash_question4')?.setValue(null)
      outcome_measures_group.get('quick_dash_question5')?.setValue(null)
      outcome_measures_group.get('quick_dash_question6')?.setValue(null)
      outcome_measures_group.get('quick_dash_question7')?.setValue(null)
      outcome_measures_group.get('quick_dash_question8')?.setValue(null)
      outcome_measures_group.get('quick_dash_question9')?.setValue(null)
      outcome_measures_group.get('quick_dash_question10')?.setValue(null)
      outcome_measures_group.get('quick_dash_question11')?.setValue(null)
      outcome_measures_group.get('quick_dash_score')?.setValue(null)
    }

    if(outcome_measures_group.get('name')?.value=='QuickDASH'){
      outcome_measures_group.get('quick_dash_question1')?.setValidators([Validators.required])      
      outcome_measures_group.get('quick_dash_question1')?.updateValueAndValidity();
      outcome_measures_group.get('quick_dash_question2')?.setValidators(Validators.required)
      outcome_measures_group.get('quick_dash_question2')?.updateValueAndValidity();
      outcome_measures_group.get('quick_dash_question3')?.setValidators(Validators.required)
      outcome_measures_group.get('quick_dash_question3')?.updateValueAndValidity();
      outcome_measures_group.get('quick_dash_question4')?.setValidators(Validators.required)
      outcome_measures_group.get('quick_dash_question4')?.updateValueAndValidity();
      outcome_measures_group.get('quick_dash_question5')?.setValidators(Validators.required)
      outcome_measures_group.get('quick_dash_question5')?.updateValueAndValidity();
      outcome_measures_group.get('quick_dash_question6')?.setValidators(Validators.required)
      outcome_measures_group.get('quick_dash_question6')?.updateValueAndValidity();
      outcome_measures_group.get('quick_dash_question7')?.setValidators(Validators.required)
      outcome_measures_group.get('quick_dash_question7')?.updateValueAndValidity();
      outcome_measures_group.get('quick_dash_question8')?.setValidators(Validators.required)
      outcome_measures_group.get('quick_dash_question8')?.updateValueAndValidity();
      outcome_measures_group.get('quick_dash_question9')?.setValidators(Validators.required)
      outcome_measures_group.get('quick_dash_question9')?.updateValueAndValidity();
      outcome_measures_group.get('quick_dash_question10')?.setValidators(Validators.required)
      outcome_measures_group.get('quick_dash_question10')?.updateValueAndValidity();
      outcome_measures_group.get('quick_dash_question11')?.setValidators(Validators.required)
      outcome_measures_group.get('quick_dash_question11')?.updateValueAndValidity();
      outcome_measures_group.get('quick_dash_score')?.setValidators(Validators.required)
      outcome_measures_group.get('quick_dash_score')?.updateValueAndValidity();
    }
    
    if(outcome_measures_group.get('name')?.value!='Oswestry LBP'){
      //console.log('HERE 3 Oswestry ');
      outcome_measures_group.get('oswestry_pain_intensity')?.setValue(null) 
      outcome_measures_group.get('oswestry_standing')?.setValue(null) 
      outcome_measures_group.get('oswestry_personal_care')?.setValue(null) 
      outcome_measures_group.get('oswestry_sleeping')?.setValue(null) 
      outcome_measures_group.get('oswestry_lifting')?.setValue(null) 
      outcome_measures_group.get('oswestry_social_life')?.setValue(null) 
      outcome_measures_group.get('oswestry_walking')?.setValue(null) 
      outcome_measures_group.get('oswestry_traveling')?.setValue(null) 
      outcome_measures_group.get('oswestry_sitting')?.setValue(null) 
      outcome_measures_group.get('oswestry_employment_homemaking')?.setValue(null)
    }

    if(outcome_measures_group.get('name')?.value=='Oswestry LBP'){
      outcome_measures_group.get('oswestry_pain_intensity')?.setValidators([Validators.required])      
      outcome_measures_group.get('oswestry_pain_intensity')?.updateValueAndValidity();
      outcome_measures_group.get('oswestry_standing')?.setValidators(Validators.required)
      outcome_measures_group.get('oswestry_standing')?.updateValueAndValidity();
      outcome_measures_group.get('oswestry_personal_care')?.setValidators(Validators.required)
      outcome_measures_group.get('oswestry_personal_care')?.updateValueAndValidity();
      outcome_measures_group.get('oswestry_sleeping')?.setValidators(Validators.required)
      outcome_measures_group.get('oswestry_sleeping')?.updateValueAndValidity();
      outcome_measures_group.get('oswestry_lifting')?.setValidators(Validators.required)
      outcome_measures_group.get('oswestry_lifting')?.updateValueAndValidity();
      outcome_measures_group.get('oswestry_social_life')?.setValidators(Validators.required)
      outcome_measures_group.get('oswestry_social_life')?.updateValueAndValidity();
      outcome_measures_group.get('oswestry_walking')?.setValidators(Validators.required)
      outcome_measures_group.get('oswestry_walking')?.updateValueAndValidity();
      outcome_measures_group.get('oswestry_traveling')?.setValidators(Validators.required)
      outcome_measures_group.get('oswestry_traveling')?.updateValueAndValidity();
      outcome_measures_group.get('oswestry_sitting')?.setValidators(Validators.required)
      outcome_measures_group.get('oswestry_sitting')?.updateValueAndValidity();
      outcome_measures_group.get('oswestry_employment_homemaking')?.setValidators(Validators.required)
      outcome_measures_group.get('oswestry_employment_homemaking')?.updateValueAndValidity();
    }

    if(outcome_measures_group.get('name')?.value!='Lower Extremity Functional Scales (LEFS)'){
      //console.log('HERE 3 Lower Extremity Functional Scales (LEFS) ');
      outcome_measures_group.get('lefs_question1')?.setValue(null) 
      outcome_measures_group.get('lefs_question2')?.setValue(null) 
      outcome_measures_group.get('lefs_question3')?.setValue(null) 
      outcome_measures_group.get('lefs_question4')?.setValue(null) 
      outcome_measures_group.get('lefs_question5')?.setValue(null) 
      outcome_measures_group.get('lefs_question6')?.setValue(null) 
      outcome_measures_group.get('lefs_question7')?.setValue(null) 
      outcome_measures_group.get('lefs_question8')?.setValue(null) 
      outcome_measures_group.get('lefs_question9')?.setValue(null) 
      outcome_measures_group.get('lefs_question10')?.setValue(null)
      outcome_measures_group.get('lefs_question11')?.setValue(null) 
      outcome_measures_group.get('lefs_question12')?.setValue(null) 
      outcome_measures_group.get('lefs_question13')?.setValue(null) 
      outcome_measures_group.get('lefs_question14')?.setValue(null) 
      outcome_measures_group.get('lefs_question15')?.setValue(null) 
      outcome_measures_group.get('lefs_question16')?.setValue(null) 
      outcome_measures_group.get('lefs_question17')?.setValue(null) 
      outcome_measures_group.get('lefs_question18')?.setValue(null) 
      outcome_measures_group.get('lefs_question19')?.setValue(null) 
      outcome_measures_group.get('lefs_question20')?.setValue(null)
      outcome_measures_group.get('lefs_score')?.setValue(null)
    }
    
    if(outcome_measures_group.get('name')?.value=='Lower Extremity Functional Scales (LEFS)'){
      outcome_measures_group.get('lefs_question1')?.setValidators([Validators.required])      
      outcome_measures_group.get('lefs_question1')?.updateValueAndValidity();      
      outcome_measures_group.get('lefs_question2')?.setValidators([Validators.required])      
      outcome_measures_group.get('lefs_question2')?.updateValueAndValidity();
      outcome_measures_group.get('lefs_question3')?.setValidators([Validators.required])      
      outcome_measures_group.get('lefs_question3')?.updateValueAndValidity();
      outcome_measures_group.get('lefs_question4')?.setValidators([Validators.required])      
      outcome_measures_group.get('lefs_question4')?.updateValueAndValidity();
      outcome_measures_group.get('lefs_question5')?.setValidators([Validators.required])      
      outcome_measures_group.get('lefs_question5')?.updateValueAndValidity();
      outcome_measures_group.get('lefs_question6')?.setValidators([Validators.required])      
      outcome_measures_group.get('lefs_question6')?.updateValueAndValidity();
      outcome_measures_group.get('lefs_question7')?.setValidators([Validators.required])      
      outcome_measures_group.get('lefs_question7')?.updateValueAndValidity();
      outcome_measures_group.get('lefs_question8')?.setValidators([Validators.required])      
      outcome_measures_group.get('lefs_question8')?.updateValueAndValidity();
      outcome_measures_group.get('lefs_question9')?.setValidators([Validators.required])      
      outcome_measures_group.get('lefs_question9')?.updateValueAndValidity();
      outcome_measures_group.get('lefs_question10')?.setValidators([Validators.required])      
      outcome_measures_group.get('lefs_question10')?.updateValueAndValidity();
      outcome_measures_group.get('lefs_question11')?.setValidators([Validators.required])      
      outcome_measures_group.get('lefs_question11')?.updateValueAndValidity();
      outcome_measures_group.get('lefs_question12')?.setValidators([Validators.required])      
      outcome_measures_group.get('lefs_question12')?.updateValueAndValidity();
      outcome_measures_group.get('lefs_question13')?.setValidators([Validators.required])      
      outcome_measures_group.get('lefs_question13')?.updateValueAndValidity();
      outcome_measures_group.get('lefs_question14')?.setValidators([Validators.required])      
      outcome_measures_group.get('lefs_question14')?.updateValueAndValidity();
      outcome_measures_group.get('lefs_question15')?.setValidators([Validators.required])      
      outcome_measures_group.get('lefs_question15')?.updateValueAndValidity();
      outcome_measures_group.get('lefs_question16')?.setValidators([Validators.required])      
      outcome_measures_group.get('lefs_question16')?.updateValueAndValidity();
      outcome_measures_group.get('lefs_question17')?.setValidators([Validators.required])      
      outcome_measures_group.get('lefs_question17')?.updateValueAndValidity();
      outcome_measures_group.get('lefs_question18')?.setValidators([Validators.required])      
      outcome_measures_group.get('lefs_question18')?.updateValueAndValidity();
      outcome_measures_group.get('lefs_question19')?.setValidators([Validators.required])      
      outcome_measures_group.get('lefs_question19')?.updateValueAndValidity();
      outcome_measures_group.get('lefs_question20')?.setValidators([Validators.required])      
      outcome_measures_group.get('lefs_question20')?.updateValueAndValidity();
      outcome_measures_group.get('lefs_score')?.setValidators([Validators.required])      
      outcome_measures_group.get('lefs_score')?.updateValueAndValidity();
    }

    if(outcome_measures_group.get('name')?.value!='FABQ'){
      //console.log('HERE 4 FABQ');
      outcome_measures_group.get('fabq_1_rate_your_pain')?.setValue(null) 
      outcome_measures_group.get('fabq_2_rate_your_pain')?.setValue(null) 
      outcome_measures_group.get('fabq_3_rate_your_pain')?.setValue(null)
      outcome_measures_group.get('fabq_4_rate_your_pain')?.setValue(null) 
      outcome_measures_group.get('fabq_5_rate_your_pain')?.setValue(null) 
      outcome_measures_group.get('fabq_6_rate_your_pain')?.setValue(null) 
      outcome_measures_group.get('fabq_7_rate_your_pain')?.setValue(null) 
      outcome_measures_group.get('fabq_8_rate_your_pain')?.setValue(null) 
      outcome_measures_group.get('fabq_9_rate_your_pain')?.setValue(null) 
      outcome_measures_group.get('fabq_10_rate_your_pain')?.setValue(null)
      outcome_measures_group.get('fabq_11_rate_your_pain')?.setValue(null) 
      outcome_measures_group.get('fabq_12_rate_your_pain')?.setValue(null) 
      outcome_measures_group.get('fabq_13_rate_your_pain')?.setValue(null)
      outcome_measures_group.get('fabq_14_rate_your_pain')?.setValue(null) 
      outcome_measures_group.get('fabq_15_rate_your_pain')?.setValue(null) 
      outcome_measures_group.get('fabq_16_rate_your_pain')?.setValue(null) 
      outcome_measures_group.get('fabq_score')?.setValue(null) 
    }
    
    if(outcome_measures_group.get('name')?.value=='FABQ'){
      outcome_measures_group.get('fabq_1_rate_your_pain')?.setValidators([Validators.required])      
      outcome_measures_group.get('fabq_1_rate_your_pain')?.updateValueAndValidity();      
      outcome_measures_group.get('fabq_2_rate_your_pain')?.setValidators([Validators.required])      
      outcome_measures_group.get('fabq_2_rate_your_pain')?.updateValueAndValidity();    
      outcome_measures_group.get('fabq_3_rate_your_pain')?.setValidators([Validators.required])      
      outcome_measures_group.get('fabq_3_rate_your_pain')?.updateValueAndValidity();    
      outcome_measures_group.get('fabq_4_rate_your_pain')?.setValidators([Validators.required])      
      outcome_measures_group.get('fabq_4_rate_your_pain')?.updateValueAndValidity();    
      outcome_measures_group.get('fabq_5_rate_your_pain')?.setValidators([Validators.required])      
      outcome_measures_group.get('fabq_5_rate_your_pain')?.updateValueAndValidity();    
      outcome_measures_group.get('fabq_6_rate_your_pain')?.setValidators([Validators.required])      
      outcome_measures_group.get('fabq_6_rate_your_pain')?.updateValueAndValidity();    
      outcome_measures_group.get('fabq_7_rate_your_pain')?.setValidators([Validators.required])      
      outcome_measures_group.get('fabq_7_rate_your_pain')?.updateValueAndValidity();    
      outcome_measures_group.get('fabq_8_rate_your_pain')?.setValidators([Validators.required])      
      outcome_measures_group.get('fabq_8_rate_your_pain')?.updateValueAndValidity();    
      outcome_measures_group.get('fabq_9_rate_your_pain')?.setValidators([Validators.required])      
      outcome_measures_group.get('fabq_9_rate_your_pain')?.updateValueAndValidity();    
      outcome_measures_group.get('fabq_10_rate_your_pain')?.setValidators([Validators.required])      
      outcome_measures_group.get('fabq_10_rate_your_pain')?.updateValueAndValidity();    
      outcome_measures_group.get('fabq_11_rate_your_pain')?.setValidators([Validators.required])      
      outcome_measures_group.get('fabq_11_rate_your_pain')?.updateValueAndValidity();    
      outcome_measures_group.get('fabq_12_rate_your_pain')?.setValidators([Validators.required])      
      outcome_measures_group.get('fabq_12_rate_your_pain')?.updateValueAndValidity();    
      outcome_measures_group.get('fabq_13_rate_your_pain')?.setValidators([Validators.required])      
      outcome_measures_group.get('fabq_13_rate_your_pain')?.updateValueAndValidity();    
      outcome_measures_group.get('fabq_14_rate_your_pain')?.setValidators([Validators.required])      
      outcome_measures_group.get('fabq_14_rate_your_pain')?.updateValueAndValidity();    
      outcome_measures_group.get('fabq_15_rate_your_pain')?.setValidators([Validators.required])      
      outcome_measures_group.get('fabq_15_rate_your_pain')?.updateValueAndValidity();    
      outcome_measures_group.get('fabq_16_rate_your_pain')?.setValidators([Validators.required])      
      outcome_measures_group.get('fabq_16_rate_your_pain')?.updateValueAndValidity();    
      outcome_measures_group.get('fabq_score')?.setValidators([Validators.required])      
      outcome_measures_group.get('fabq_score')?.updateValueAndValidity();   
    }

    if(outcome_measures_group.get('name')?.value!='EAT-10'){
      //console.log('HERE 5 EAT-10');
      outcome_measures_group.get('eat_1_rate_your_pain')?.setValue(null) 
      outcome_measures_group.get('eat_2_rate_your_pain')?.setValue(null) 
      outcome_measures_group.get('eat_3_rate_your_pain')?.setValue(null)
      outcome_measures_group.get('eat_4_rate_your_pain')?.setValue(null) 
      outcome_measures_group.get('eat_5_rate_your_pain')?.setValue(null) 
      outcome_measures_group.get('eat_6_rate_your_pain')?.setValue(null) 
      outcome_measures_group.get('eat_7_rate_your_pain')?.setValue(null) 
      outcome_measures_group.get('eat_8_rate_your_pain')?.setValue(null) 
      outcome_measures_group.get('eat_9_rate_your_pain')?.setValue(null) 
      outcome_measures_group.get('eat_10_rate_your_pain')?.setValue(null)
      outcome_measures_group.get('eat_total')?.setValue(null) 
    }
    
    if(outcome_measures_group.get('name')?.value=='EAT-10'){
      outcome_measures_group.get('eat_1_rate_your_pain')?.setValidators([Validators.required])      
      outcome_measures_group.get('eat_1_rate_your_pain')?.updateValueAndValidity();      
      outcome_measures_group.get('eat_2_rate_your_pain')?.setValidators([Validators.required])      
      outcome_measures_group.get('eat_2_rate_your_pain')?.updateValueAndValidity();
      outcome_measures_group.get('eat_3_rate_your_pain')?.setValidators([Validators.required])      
      outcome_measures_group.get('eat_3_rate_your_pain')?.updateValueAndValidity();      
      outcome_measures_group.get('eat_4_rate_your_pain')?.setValidators([Validators.required])      
      outcome_measures_group.get('eat_4_rate_your_pain')?.updateValueAndValidity();
      outcome_measures_group.get('eat_5_rate_your_pain')?.setValidators([Validators.required])      
      outcome_measures_group.get('eat_5_rate_your_pain')?.updateValueAndValidity();      
      outcome_measures_group.get('eat_6_rate_your_pain')?.setValidators([Validators.required])      
      outcome_measures_group.get('eat_6_rate_your_pain')?.updateValueAndValidity();
      outcome_measures_group.get('eat_7_rate_your_pain')?.setValidators([Validators.required])      
      outcome_measures_group.get('eat_7_rate_your_pain')?.updateValueAndValidity();      
      outcome_measures_group.get('eat_8_rate_your_pain')?.setValidators([Validators.required])      
      outcome_measures_group.get('eat_8_rate_your_pain')?.updateValueAndValidity();
      outcome_measures_group.get('eat_9_rate_your_pain')?.setValidators([Validators.required])      
      outcome_measures_group.get('eat_9_rate_your_pain')?.updateValueAndValidity();      
      outcome_measures_group.get('eat_10_rate_your_pain')?.setValidators([Validators.required])      
      outcome_measures_group.get('eat_10_rate_your_pain')?.updateValueAndValidity();
      outcome_measures_group.get('eat_total')?.setValidators([Validators.required])      
      outcome_measures_group.get('eat_total')?.updateValueAndValidity();      
    }

    if(outcome_measures_group.get('name')?.value!='mCTSIB'){
      //console.log('HERE 6 mCTSIB');
      outcome_measures_group.get('mctsib_condition1_1')?.setValue(null) 
      outcome_measures_group.get('mctsib_condition1_2')?.setValue(null) 
      outcome_measures_group.get('mctsib_condition1_3')?.setValue(null)
      outcome_measures_group.get('mctsib_condition2_1')?.setValue(null) 
      outcome_measures_group.get('mctsib_condition2_2')?.setValue(null) 
      outcome_measures_group.get('mctsib_condition2_3')?.setValue(null) 
      outcome_measures_group.get('mctsib_condition3_1')?.setValue(null) 
      outcome_measures_group.get('mctsib_condition3_2')?.setValue(null) 
      outcome_measures_group.get('mctsib_condition3_3')?.setValue(null) 
      outcome_measures_group.get('mctsib_condition4_1')?.setValue(null)
      outcome_measures_group.get('mctsib_condition4_2')?.setValue(null) 
      outcome_measures_group.get('mctsib_condition4_3')?.setValue(null)
      outcome_measures_group.get('mctsib_total')?.setValue(null) 
    }

    if(outcome_measures_group.get('name')?.value=='mCTSIB'){
      outcome_measures_group.get('mctsib_condition1_1')?.setValidators([Validators.required, Validators.min(0), Validators.max(30)])      
      outcome_measures_group.get('mctsib_condition1_1')?.updateValueAndValidity();     
      outcome_measures_group.get('mctsib_condition1_2')?.setValidators([Validators.required, Validators.min(0), Validators.max(30)])      
      outcome_measures_group.get('mctsib_condition1_2')?.updateValueAndValidity(); 
      outcome_measures_group.get('mctsib_condition1_3')?.setValidators([Validators.required, Validators.min(0), Validators.max(30)])      
      outcome_measures_group.get('mctsib_condition1_3')?.updateValueAndValidity(); 
      outcome_measures_group.get('mctsib_condition2_1')?.setValidators([Validators.required, Validators.min(0), Validators.max(30)])      
      outcome_measures_group.get('mctsib_condition2_1')?.updateValueAndValidity(); 
      outcome_measures_group.get('mctsib_condition2_2')?.setValidators([Validators.required, Validators.min(0), Validators.max(30)])      
      outcome_measures_group.get('mctsib_condition2_2')?.updateValueAndValidity(); 
      outcome_measures_group.get('mctsib_condition2_3')?.setValidators([Validators.required, Validators.min(0), Validators.max(30)])      
      outcome_measures_group.get('mctsib_condition2_3')?.updateValueAndValidity(); 
      outcome_measures_group.get('mctsib_condition3_1')?.setValidators([Validators.required, Validators.min(0), Validators.max(30)])      
      outcome_measures_group.get('mctsib_condition3_1')?.updateValueAndValidity(); 
      outcome_measures_group.get('mctsib_condition3_2')?.setValidators([Validators.required, Validators.min(0), Validators.max(30)])      
      outcome_measures_group.get('mctsib_condition3_2')?.updateValueAndValidity(); 
      outcome_measures_group.get('mctsib_condition3_3')?.setValidators([Validators.required, Validators.min(0), Validators.max(30)])      
      outcome_measures_group.get('mctsib_condition3_3')?.updateValueAndValidity(); 
      outcome_measures_group.get('mctsib_condition4_1')?.setValidators([Validators.required, Validators.min(0), Validators.max(30)])      
      outcome_measures_group.get('mctsib_condition4_1')?.updateValueAndValidity(); 
      outcome_measures_group.get('mctsib_condition4_2')?.setValidators([Validators.required, Validators.min(0), Validators.max(30)])      
      outcome_measures_group.get('mctsib_condition4_2')?.updateValueAndValidity(); 
      outcome_measures_group.get('mctsib_condition4_3')?.setValidators([Validators.required, Validators.min(0), Validators.max(30)])      
      outcome_measures_group.get('mctsib_condition4_3')?.updateValueAndValidity(); 
    }
    if(outcome_measures_group.get('name')?.value!='30 sec STS'){
      outcome_measures_group.get('sts_number')?.setValue(null)
      outcome_measures_group.get('sts_score')?.setValue(null) 
    }   
    
    if(outcome_measures_group.get('name')?.value=='30 sec STS'){      
      outcome_measures_group.get('sts_number')?.setValidators([Validators.required, Validators.min(0), Validators.max(200)])      
      outcome_measures_group.get('sts_number')?.updateValueAndValidity(); 
      outcome_measures_group.get('sts_score')?.setValidators([Validators.required, Validators.min(0), Validators.max(200)])      
      outcome_measures_group.get('sts_score')?.updateValueAndValidity(); 
    }
  }

  onFlagChange() {
    const chaperoneGroup = this.objectiveForm.get('chaperone') as FormGroup;
    const flagControl = chaperoneGroup.get('flag');
    const nameControl = chaperoneGroup.get('name');

    flagControl?.valueChanges.subscribe((flagValue: string) => {
      console.log('flag Value >>>>',flagValue)
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
 
  // Function to allow only numeric input
  allowOnlyNumbers(event: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'];
    const isNumber = (event.key >= '0' && event.key <= '9');  
    if (!isNumber && !allowedKeys.includes(event.key)) {
      event.preventDefault(); // Prevent any non-numeric input
    }  
  }
    
  onMctsibChange() {
      const outcome_measures_group = this.objectiveForm.get('outcome_measures') as FormGroup;
      outcome_measures_group.get('mctsib_condition1_1')?.valueChanges.subscribe(() => {
        this.calculateTotal();
      });

      outcome_measures_group.get('mctsib_condition1_2')?.valueChanges.subscribe(() => {
        this.calculateTotal();
      });

      outcome_measures_group.get('mctsib_condition1_3')?.valueChanges.subscribe(() => {
        this.calculateTotal();
      });

      outcome_measures_group.get('mctsib_condition2_1')?.valueChanges.subscribe(() => {
        this.calculateTotal();
      });

      outcome_measures_group.get('mctsib_condition2_2')?.valueChanges.subscribe(() => {
        this.calculateTotal();
      });
      
      outcome_measures_group.get('mctsib_condition2_3')?.valueChanges.subscribe(() => {
        this.calculateTotal();
      });

      outcome_measures_group.get('mctsib_condition3_1')?.valueChanges.subscribe(() => {
        this.calculateTotal();
      });

      outcome_measures_group.get('mctsib_condition3_2')?.valueChanges.subscribe(() => {
        this.calculateTotal();
      });

      outcome_measures_group.get('mctsib_condition3_3')?.valueChanges.subscribe(() => {
        this.calculateTotal();
      });

      outcome_measures_group.get('mctsib_condition4_1')?.valueChanges.subscribe(() => {
        this.calculateTotal();
      });

      outcome_measures_group.get('mctsib_condition4_2')?.valueChanges.subscribe(() => {
        this.calculateTotal();
      });

      outcome_measures_group.get('mctsib_condition4_3')?.valueChanges.subscribe(() => {
        this.calculateTotal();
      });
  }
    
  calculateTotal(): void {

    const outcome_measures_group = this.objectiveForm.get('outcome_measures') as FormGroup;
    const field1: number = parseInt(outcome_measures_group.get('mctsib_condition1_1')?.value || '0', 10);
    const field2: number = parseInt(outcome_measures_group.get('mctsib_condition1_2')?.value || '0', 10);
    const field3: number = parseInt(outcome_measures_group.get('mctsib_condition1_3')?.value || '0', 10);
    const field1_total: number = (field1 + field2 + field3)/3;
    console.log('field1_total >>>>',field1_total)

    const field4: number = parseInt(outcome_measures_group.get('mctsib_condition2_1')?.value || '0', 10);
    const field5: number = parseInt(outcome_measures_group.get('mctsib_condition2_2')?.value || '0', 10);
    const field6: number = parseInt(outcome_measures_group.get('mctsib_condition2_3')?.value || '0', 10);
    const field2_total: number = (field4 + field5 + field6)/3;
    console.log('field2_total >>>>',field2_total)

    const field7: number = parseInt(outcome_measures_group.get('mctsib_condition3_1')?.value || '0', 10);
    const field8: number = parseInt(outcome_measures_group.get('mctsib_condition3_2')?.value || '0', 10);
    const field9: number = parseInt(outcome_measures_group.get('mctsib_condition3_3')?.value || '0', 10);
    const field3_total: number = (field7 + field8 + field9)/3;
    console.log('field3_total >>>>',field3_total)

    const field10: number = parseInt(outcome_measures_group.get('mctsib_condition4_1')?.value || '0', 10);
    const field11: number = parseInt(outcome_measures_group.get('mctsib_condition4_2')?.value || '0', 10);
    const field12: number = parseInt(outcome_measures_group.get('mctsib_condition4_3')?.value || '0', 10);
    console.log('field10 >>>>',field10,'  field11 >>>',field11,'  field12 >>>',field12)

    const field4_total: number = (field10 + field11 + field12)/3;
    console.log('field4_total >>>>',field4_total)

    const fields_total = (field1_total + field2_total + field3_total + field4_total)/120;
    console.log(' >>> fields_total >>>>',fields_total)

    const fields_total_round = Math.ceil(fields_total * 100) / 100
    console.log(' >>> fields_total_round >>>>',fields_total_round)
    
    //this.mctsib_total = field1 + field2 + field3 + field4 + field5 + field6 + field7 + field8 + field9 + field10 + field11 + field12;
    outcome_measures_group.get('mctsib_total')?.setValue(fields_total_round);
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
          soap_note_type:"initial_examination",
          createdBy: this.userId,
        })
        let reqVars = {
          query: {
            appointmentId: this.appointmentId
          },
          type:'objective',
          userId: this.userId,
          data: formData,
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

  chaperoneRadio(event: any) {
    const flagControl = this.objectiveForm.get('chaperone.flag');
    this.chaperoneFlag = false;
    if (flagControl?.value === 'Yes') {
        this.chaperoneFlag = true;
    }
    this.onFlagChange();
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
        type:type,
        soap_note_type:"initial_examination",        
       }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(' >> result >>>>',result)
      if (result) { 
        this.getObjectiveRecord();
      } else {
        console.log('Modal closed without saving data.');
      }
    });
  }
  
  previewModal(fileId:string) {
    window.open(`${window.location.origin}`+"/"+`${this.userType}`+"/file-preview/"+fileId, '_blank');
    // const dialogRef = this.dialog.open(PreviewModalComponent, {
    //   panelClass:[ 'preview--modal'],
    //   data : {
    //     fileId:id
    //    }
    // });
  }

}
