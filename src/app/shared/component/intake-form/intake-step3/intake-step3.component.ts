import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';

@Component({
  selector: 'app-intake-step3',
  templateUrl: './intake-step3.component.html',
  styleUrl: './intake-step3.component.scss'
})
export class IntakeStep3Component {


  clickedIndex = 0;
  model: NgbDateStruct;
  selectedValue: number;

  appId: any


  constructor(public dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router, private commonService: CommonService,
    private authService: AuthService, private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => {
      this.appId = params['appId']
    })
  }




  onChange(event: MatRadioChange) {
    console.log(this.selectedValue = event.value)
  }
  tabs = [
    { number: '1' }, { number: '2' }, { number: '3' },
    { number: '4' }, { number: '5' }, { number: '6' },
    { number: '7' }, { number: '8' }, { number: '9' },
    { number: '10' }
  ];
}
