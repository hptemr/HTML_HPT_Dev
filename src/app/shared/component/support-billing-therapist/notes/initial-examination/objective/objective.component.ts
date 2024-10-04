import { Component,OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { validationMessages } from '../../../../../../utils/validation-messages';
import { Validators, FormGroup, FormBuilder,FormArray, AbstractControl,FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { PreviewModalComponent } from 'src/app/shared/comman/preview-modal/preview-modal.component';
import { AddExerciseComponent } from '../add-exercise/add-exercise.component';
import { ProtocolModalComponent } from '../protocol-modal/protocol-modal.component';
@Component({
  selector: 'app-objective', 
  templateUrl: './objective.component.html',
  styleUrl: './objective.component.scss'
})
export class ObjectiveComponent {
  isDisabled = true;
  selectedValue = '0';
  
  clickedIndex = 0; 
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
  constructor( private router: Router,private fb: FormBuilder, private route: ActivatedRoute, public authService: AuthService, public commonService: CommonService,public dialog: MatDialog) {
    this.route.params.subscribe((params: Params) => {
      this.appointmentId = params['appointmentId'];
    })
  }
 
  ngOnInit() {
    this.objectiveForm = this.fb.group({
      appointmentId:[this.appointmentId],
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
        rateYourPain: [''],
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


      }),


     











    });
    //this.initializeFormValidation();
    this.onFlagChange();
  }

  painRate(i: any) {
    this.clickedIndex = i
    //this.objectiveForm.controls['rateYourPain'].setValue(i)
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
      }
      nameControl?.updateValueAndValidity();  // Recalculate the validity of the control
    });
  }

  objectiveSubmit(){
    console.log('this.objectiveForm>>>>',this.objectiveForm)
    if (this.objectiveForm.invalid){
      this.objectiveForm.markAllAsTouched();
    }else{


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
      if (result) {
        this.selectedProtocols = result
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

  addExersiceModal() {
    const dialogRef = this.dialog.open(AddExerciseComponent, {
      panelClass:[ 'custom-alert-container','modal--wrapper'],
    });
  }
  
  previewModal() {
    const dialogRef = this.dialog.open(PreviewModalComponent, {
      panelClass:[ 'preview--modal'],
    });
  }

}
