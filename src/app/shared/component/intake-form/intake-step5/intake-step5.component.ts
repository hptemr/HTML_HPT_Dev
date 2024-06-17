import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';

@Component({
  selector: 'app-intake-step5', 
  templateUrl: './intake-step5.component.html',
  styleUrl: './intake-step5.component.scss'
})
export class IntakeStep5Component {

  appId:any

  
  toggle:boolean = true;
  selectedValue: number;
  

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
