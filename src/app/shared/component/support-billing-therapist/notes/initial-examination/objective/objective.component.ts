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
@Component({
  selector: 'app-objective', 
  templateUrl: './objective.component.html',
  styleUrl: './objective.component.scss',
  providers: [DatePipe]
})
export class ObjectiveComponent {
  isDisabled = true;
  selectedValue = '0';  
  clickedIndex = 0; 
  clickedIndexLefs = 0;
  clickedIndex1 = 0; 
  clickedIndex2 = 0;
  clickedIndex3 = 0;
  clickedIndex4 = 0;
  clickedIndex5 = 0;
  clickedIndex6 = 0;
  clickedIndex7 = 0;
  clickedIndex8 = 0;
  clickedIndex9 = 0;
  clickedIndex10 = 0; 
  clickedIndex11 =0;
  clickedIndex12 = 0;
  clickedIndex13 = 0;
  clickedIndex14 = 0;
  clickedIndex15 = 0;
  clickedIndex16 = 0;
  clickedIndex17 = 0;
  clickedIndex18 = 0;
  clickedIndex19 = 0; 
  clickedIndex20 = 0;
  clickedIndex21 = 0;
  clickedIndex22 = 0;
  clickedIndex23 = 0;
  clickedIndex24 = 0;
  clickedIndex25 = 0;
  clickedIndex26 = 0;
  clickedIndex27 = 0;
  clickedIndex28 = 0;
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
  edatatable = [
    {
      set:'1',
      reps:'10',
      weight:'50 lbs',
      distance: '1',
      time: 'NA'
    },
    {
      set:'2',
      reps:'20',
      weight:'20 kg',
      distance: '1.5',
      time: '5 min'
    },
    {
      set:'3',
      reps:'30',
      weight:'100 kg',
      distance: '2',
      time: '10 min'
    },
    {
      set:'4',
      reps:'40',
      weight:'80 lbs',
      distance: '2.5',
      time: '300 sec'
    },
    {
      set:'5',
      reps:'50',
      weight:'40 lbs',
      distance: '3',
      time: '800 sec'
    },
  ]
  appointmentId: string;
  public userId: string = this.authService.getLoggedInInfo('_id');
  public userRole: string = this.authService.getLoggedInInfo('role');
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
  @ViewChild(MatRadioButton) radioButton: MatRadioButton | undefined;
  //Date of Surgery: June 1\n2 week: June 14\n4 week: June 28\n6 week: July 12\n8 week: July 26\n10 week: August 9\n12 week: August 23
  // searchDirectory:string=''
  // directoryItmList:any =[];
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
        flag: ['No', [Validators.required]],  // Default value for the flag
        name: ['']  // Initially no validation on 'name'
      }),
      observation: ['', [Validators.minLength(1), Validators.maxLength(2500)]],
      range_of_motion: ['', [ Validators.minLength(1), Validators.maxLength(2500)]],
      strength: ['', [Validators.minLength(1), Validators.maxLength(2500)]],
      neurological: ['', [Validators.minLength(1), Validators.maxLength(2500)]],
      special_test: ['', [Validators.minLength(1), Validators.maxLength(2500)]],
      palpation: ['', [Validators.minLength(1), Validators.maxLength(2500)]],
      slp: ['', [Validators.minLength(1), Validators.maxLength(2500)]],
      ot: ['', [Validators.minLength(1), Validators.maxLength(2500)]],
      treatment_provided: ['', [Validators.minLength(1), Validators.maxLength(2500)]],
     
      outcome_measures : this.fb.group({
        name: ['',[Validators.required]],
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
        mctsib_conditio1_1: [''],
        mctsib_conditio1_2: [''],
        mctsib_conditio1_3: [''],
        mctsib_conditio2_1: [''],
        mctsib_conditio2_2: [''],
        mctsib_conditio2_3: [''],
        mctsib_conditio3_1: [''],
        mctsib_conditio3_2: [''],
        mctsib_conditio3_3: [''],
        mctsib_conditio4_1: [''],
        mctsib_conditio4_2: [''],
        mctsib_conditio4_3: [''],
        mctsib_total: [''],
        sts_number: [''],
        sts_score: [''],

      }),
    });
    //this.initializeFormValidation();
    this.onFlagChange();
    this.getObjectiveRecord();
  }
  
  getObjectiveRecord(){
    let reqVars = {
      query: {appointmentId:this.appointmentId,soap_note_type:'initial_examination'},     
    }
    this.authService.apiRequest('post', 'soapNote/getObjectiveData', reqVars).subscribe(async response => {
      let subjectiveData: never[] = []; let objectiveData = [];
      if(response.data && response.data.objectiveData){
        objectiveData = response.data.objectiveData;
        this.objectiveId = objectiveData._id;

      }
      if(response.data && response.data.appointmentDatesList){
        this.appointment_dates = response.data.appointmentDatesList       
      }

      if(response.data && response.data.appointmentData){
        this.appointment_data = response.data.appointmentData    
      }       

      this.loadForm(objectiveData,subjectiveData,this.appointment_data);
      
    })
  }

  loadForm(objectiveData:any,subjectiveData:any,appointment_data:any){
      this.objectiveForm.controls['patient_consent'].setValue(objectiveData?.patient_consent);
      this.objectiveForm.controls['precautions'].setValue(objectiveData?.precautions);
      if((!objectiveData.precautions || objectiveData.precautions=='') && subjectiveData && subjectiveData.length>0){
        this.surgery_type = subjectiveData.surgery_type;
        this.surgery_date = this.datePipe.transform(subjectiveData.surgery_date, 'MMMM d');
        this.objectiveForm.controls['precautions'].setValue('Date of Surgery: '+this.surgery_date+'  ('+this.surgery_type+')');
      }
      if(objectiveData.chaperone && objectiveData.chaperone[0].flag){
        const chaperoneGroup = this.objectiveForm.get('chaperone') as FormGroup;
        const flagControl = chaperoneGroup.get('flag');
        const nameControl = chaperoneGroup.get('name');
        nameControl?.setValue(objectiveData.chaperone[0].name);
        flagControl?.setValue(objectiveData.chaperone[0].flag);
        const mockEvent6: MatRadioChange = { value: objectiveData.chaperone[0].flag, source: this.radioButton! }; 
        this.chaperoneRadio(mockEvent6);
      }      
      this.objectiveForm.controls['observation'].setValue(objectiveData.observation);
      this.objectiveForm.controls['range_of_motion'].setValue(objectiveData.range_of_motion);
      this.objectiveForm.controls['strength'].setValue(objectiveData.strength);
      this.objectiveForm.controls['neurological'].setValue(objectiveData.neurological);
      this.objectiveForm.controls['special_test'].setValue(objectiveData.special_test);
      this.objectiveForm.controls['palpation'].setValue(objectiveData.palpation);
      this.objectiveForm.controls['slp'].setValue(objectiveData.slp);
      this.objectiveForm.controls['ot'].setValue(objectiveData.ot);
      this.objectiveForm.controls['treatment_provided'].setValue(objectiveData.treatment_provided);  

      const outcome_measures_group = this.objectiveForm.get('outcome_measures') as FormGroup;
      outcome_measures_group.get('name')?.setValue(objectiveData.outcome_measures?.name ? objectiveData.outcome_measures?.name : '')
      outcome_measures_group.get('neck_rate_your_pain')?.setValue(objectiveData.outcome_measures?.neck_rate_your_pain ? objectiveData.outcome_measures.neck_rate_your_pain : null)
      if(objectiveData.outcome_measures && objectiveData.outcome_measures.neck_rate_your_pain){
        this.painRate('neck_rate_your_pain',0,objectiveData.outcome_measures.neck_rate_your_pain)
        this.clickedIndex = objectiveData.outcome_measures.neck_rate_your_pain;
      }
      outcome_measures_group.get('pain_intensity')?.setValue(objectiveData.outcome_measures?.pain_intensity ? objectiveData.outcome_measures.pain_intensity : null)
      outcome_measures_group.get('personal_care')?.setValue(objectiveData.outcome_measures?.personal_care)
      outcome_measures_group.get('lifting')?.setValue(objectiveData.outcome_measures?.lifting)
      outcome_measures_group.get('headache')?.setValue(objectiveData.outcome_measures?.headache)
      outcome_measures_group.get('recreation')?.setValue(objectiveData.outcome_measures?.recreation)
      outcome_measures_group.get('reading')?.setValue(objectiveData.outcome_measures?.reading)
      outcome_measures_group.get('work')?.setValue(objectiveData.outcome_measures?.work)
      outcome_measures_group.get('sleeping')?.setValue(objectiveData.outcome_measures?.sleeping)
      outcome_measures_group.get('concentration')?.setValue(objectiveData.outcome_measures?.concentration)
      outcome_measures_group.get('driving')?.setValue(objectiveData.outcome_measures?.driving)
      outcome_measures_group.get('score')?.setValue(objectiveData.outcome_measures?.score)

      outcome_measures_group.get('quick_dash_question1')?.setValue(objectiveData.outcome_measures?.quick_dash_question1)
      outcome_measures_group.get('quick_dash_question2')?.setValue(objectiveData.outcome_measures?.quick_dash_question2)
      outcome_measures_group.get('quick_dash_question3')?.setValue(objectiveData.outcome_measures?.quick_dash_question3)
      outcome_measures_group.get('quick_dash_question4')?.setValue(objectiveData.outcome_measures?.quick_dash_question4)
      outcome_measures_group.get('quick_dash_question5')?.setValue(objectiveData.outcome_measures?.quick_dash_question5)
      outcome_measures_group.get('quick_dash_question6')?.setValue(objectiveData.outcome_measures?.quick_dash_question6)
      outcome_measures_group.get('quick_dash_question7')?.setValue(objectiveData.outcome_measures?.quick_dash_question7)
      outcome_measures_group.get('quick_dash_question8')?.setValue(objectiveData.outcome_measures?.quick_dash_question8)
      outcome_measures_group.get('quick_dash_question9')?.setValue(objectiveData.outcome_measures?.quick_dash_question9)
      outcome_measures_group.get('quick_dash_question10')?.setValue(objectiveData.outcome_measures?.quick_dash_question10)
      outcome_measures_group.get('quick_dash_question11')?.setValue(objectiveData.outcome_measures?.quick_dash_question11)
      outcome_measures_group.get('quick_dash_score')?.setValue(objectiveData.outcome_measures?.quick_dash_score)

      outcome_measures_group.get('oswestry_pain_intensity')?.setValue(objectiveData.outcome_measures?.oswestry_pain_intensity) 
      outcome_measures_group.get('oswestry_standing')?.setValue(objectiveData.outcome_measures?.oswestry_standing) 
      outcome_measures_group.get('oswestry_personal_care')?.setValue(objectiveData.outcome_measures?.oswestry_personal_care) 
      outcome_measures_group.get('oswestry_sleeping')?.setValue(objectiveData.outcome_measures?.oswestry_sleeping) 
      outcome_measures_group.get('oswestry_lifting')?.setValue(objectiveData.outcome_measures?.oswestry_lifting) 
      outcome_measures_group.get('oswestry_social_life')?.setValue(objectiveData.outcome_measures?.oswestry_social_life) 
      outcome_measures_group.get('oswestry_walking')?.setValue(objectiveData.outcome_measures?.oswestry_walking) 
      outcome_measures_group.get('oswestry_traveling')?.setValue(objectiveData.outcome_measures?.oswestry_traveling) 
      outcome_measures_group.get('oswestry_sitting')?.setValue(objectiveData.outcome_measures?.oswestry_sitting) 
      outcome_measures_group.get('oswestry_employment_homemaking')?.setValue(objectiveData.outcome_measures?.oswestry_employment_homemaking)

      outcome_measures_group.get('lefs_rate_your_pain')?.setValue(objectiveData.outcome_measures?.lefs_rate_your_pain ? objectiveData.outcome_measures.lefs_rate_your_pain : null)
      outcome_measures_group.get('lefs_question1')?.setValue(objectiveData.outcome_measures?.lefs_question1) 
      outcome_measures_group.get('lefs_question2')?.setValue(objectiveData.outcome_measures?.lefs_question2) 
      outcome_measures_group.get('lefs_question3')?.setValue(objectiveData.outcome_measures?.lefs_question3) 
      outcome_measures_group.get('lefs_question4')?.setValue(objectiveData.outcome_measures?.lefs_question4) 
      outcome_measures_group.get('lefs_question5')?.setValue(objectiveData.outcome_measures?.lefs_question5) 
      outcome_measures_group.get('lefs_question6')?.setValue(objectiveData.outcome_measures?.lefs_question6) 
      outcome_measures_group.get('lefs_question7')?.setValue(objectiveData.outcome_measures?.lefs_question7) 
      outcome_measures_group.get('lefs_question8')?.setValue(objectiveData.outcome_measures?.lefs_question8) 
      outcome_measures_group.get('lefs_question9')?.setValue(objectiveData.outcome_measures?.lefs_question9) 
      outcome_measures_group.get('lefs_question10')?.setValue(objectiveData.outcome_measures?.lefs_question10)
      outcome_measures_group.get('lefs_question11')?.setValue(objectiveData.outcome_measures?.lefs_question11) 
      outcome_measures_group.get('lefs_question12')?.setValue(objectiveData.outcome_measures?.lefs_question12) 
      outcome_measures_group.get('lefs_question13')?.setValue(objectiveData.outcome_measures?.lefs_question13) 
      outcome_measures_group.get('lefs_question14')?.setValue(objectiveData.outcome_measures?.lefs_question14) 
      outcome_measures_group.get('lefs_question15')?.setValue(objectiveData.outcome_measures?.lefs_question15) 
      outcome_measures_group.get('lefs_question16')?.setValue(objectiveData.outcome_measures?.lefs_question16) 
      outcome_measures_group.get('lefs_question17')?.setValue(objectiveData.outcome_measures?.lefs_question17) 
      outcome_measures_group.get('lefs_question18')?.setValue(objectiveData.outcome_measures?.lefs_question18) 
      outcome_measures_group.get('lefs_question19')?.setValue(objectiveData.outcome_measures?.lefs_question19) 
      outcome_measures_group.get('lefs_question20')?.setValue(objectiveData.outcome_measures?.lefs_question20)
      outcome_measures_group.get('lefs_score')?.setValue(objectiveData.outcome_measures?.lefs_score)

      outcome_measures_group.get('fabq_1_rate_your_pain')?.setValue(objectiveData.outcome_measures?.fabq_1_rate_your_pain) 
      outcome_measures_group.get('fabq_2_rate_your_pain')?.setValue(objectiveData.outcome_measures?.fabq_2_rate_your_pain) 
      outcome_measures_group.get('fabq_3_rate_your_pain')?.setValue(objectiveData.outcome_measures?.fabq_3_rate_your_pain) 
      outcome_measures_group.get('fabq_4_rate_your_pain')?.setValue(objectiveData.outcome_measures?.fabq_4_rate_your_pain) 
      outcome_measures_group.get('fabq_5_rate_your_pain')?.setValue(objectiveData.outcome_measures?.fabq_5_rate_your_pain) 
      outcome_measures_group.get('fabq_6_rate_your_pain')?.setValue(objectiveData.outcome_measures?.fabq_6_rate_your_pain) 
      outcome_measures_group.get('fabq_7_rate_your_pain')?.setValue(objectiveData.outcome_measures?.fabq_7_rate_your_pain) 
      outcome_measures_group.get('fabq_8_rate_your_pain')?.setValue(objectiveData.outcome_measures?.fabq_8_rate_your_pain) 
      outcome_measures_group.get('fabq_9_rate_your_pain')?.setValue(objectiveData.outcome_measures?.fabq_9_rate_your_pain) 
      outcome_measures_group.get('fabq_10_rate_your_pain')?.setValue(objectiveData.outcome_measures?.fabq_10_rate_your_pain)
      outcome_measures_group.get('fabq_11_rate_your_pain')?.setValue(objectiveData.outcome_measures?.fabq_11_rate_your_pain) 
      outcome_measures_group.get('fabq_12_rate_your_pain')?.setValue(objectiveData.outcome_measures?.fabq_12_rate_your_pain) 
      outcome_measures_group.get('fabq_13_rate_your_pain')?.setValue(objectiveData.outcome_measures?.fabq_13_rate_your_pain) 
      outcome_measures_group.get('fabq_14_rate_your_pain')?.setValue(objectiveData.outcome_measures?.fabq_14_rate_your_pain) 
      outcome_measures_group.get('fabq_15_rate_your_pain')?.setValue(objectiveData.outcome_measures?.fabq_15_rate_your_pain) 
      outcome_measures_group.get('fabq_16_rate_your_pain')?.setValue(objectiveData.outcome_measures?.fabq_16_rate_your_pain) 
      outcome_measures_group.get('fabq_score')?.setValue(objectiveData.outcome_measures?.fabq_score);

      const mockEvent = { target: { value: objectiveData.outcome_measures?.name ? objectiveData.outcome_measures?.name : '' } }; 
      this.outcomeMeasuresChange(mockEvent)
  }
  clickedIndexs:any =[]
  painRate(id:string,val:number,i: any) {
    //this.clickedIndex = i;
    //this.clickedIndex1
    this.clickedIndexs[val] = i;
    const outcome_measures_group = this.objectiveForm.get('outcome_measures') as FormGroup;
    //console.log('id >>> ',id,' ......i>>>>',i)
    outcome_measures_group.get(id)?.setValue(i)
    //this.objectiveForm.controls[id].setValue(i)
  }

  outcomeMeasuresChange(e:any) {
    const outcome_measures_group = this.objectiveForm.get('outcome_measures') as FormGroup;
    console.log('Name value >>>>',outcome_measures_group.get('name')?.value)
    if(outcome_measures_group.get('name')?.value!='Neck Disability Index'){
      console.log('HERE 1 Neck Disability Index');
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

    if(outcome_measures_group.get('name')?.value!='QuickDASH'){
      console.log('HERE 2 QuickDASH');
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

    
    if(outcome_measures_group.get('name')?.value!='Oswestry LBP'){
      console.log('HERE 3 Oswestry ');
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

    if(outcome_measures_group.get('name')?.value!='Lower Extremity Functional Scales (LEFS)'){
      console.log('HERE 3 Lower Extremity Functional Scales (LEFS) ');
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
  }

  onFlagChange() {
    const chaperoneGroup = this.objectiveForm.get('chaperone') as FormGroup;
    const flagControl = chaperoneGroup.get('flag');
    const nameControl = chaperoneGroup.get('name');

    flagControl?.valueChanges.subscribe((flagValue: string) => {
      if (flagValue === 'Yes') {
        nameControl?.setValidators([Validators.required]);  // If flag is true, 'name' is required
      } else {
        nameControl?.clearValidators();  // If flag is false, clear validators on 'name'
        nameControl?.setValue('');
        nameControl?.markAsUntouched();
      }
      nameControl?.updateValueAndValidity();  // Recalculate the validity of the control
    });
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
        let file_names:any = [];
        result.forEach((element:any) => {
          file_names.push(element.file_name);
        });
        this.selectedProtocols = file_names
        this.objectiveForm.controls['protocols'].setValue(result)
      } else {
        console.log('Modal closed without saving data.');
      }
    });
  }
  
  removeProtocols(i:string) {
    const index = this.selectedProtocols.indexOf(i);
    if (index !== -1) {
      this.selectedProtocols.splice(index, 1);
    }
  }

  addExersiceModal(type:string) {
    const dialogRef = this.dialog.open(AddExerciseComponent, {
      disableClose: true,
      panelClass:[ 'custom-alert-container','modal--wrapper'],
      data : {
        appointmentId:this.appointmentId,
        type:type
       }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedProtocols = result
      } else {
        console.log('Modal closed without saving data.');
      }
    });
  }
  
  previewModal() {
    const dialogRef = this.dialog.open(PreviewModalComponent, {
      panelClass:[ 'preview--modal'],
    });
  }

}
