import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';

@Component({
  selector: 'app-intake-step4', 
  templateUrl: './intake-step4.component.html',
  styleUrl: './intake-step4.component.scss'
})
export class IntakeStep4Component {

  appId:any

  
  toggle:boolean = true;
  selectedValue: number;

  model: NgbDateStruct;
  
  constructor(public dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router, private commonService: CommonService,
    private authService: AuthService, private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => {
      this.appId = params['appId']
    })
  }

  change(){
    this.toggle = !this.toggle;
  }

  onChange(event: MatRadioChange) {
    console.log(this.selectedValue = event.value)
  }
}
