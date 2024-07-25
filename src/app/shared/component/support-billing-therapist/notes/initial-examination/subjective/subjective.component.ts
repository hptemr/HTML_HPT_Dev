import { Component,OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { icd_data } from '../../../../../../ICD';
// interface codes {
//   icd_code: string;
// }
@Component({
  selector: 'app-subjective', 
  templateUrl: './subjective.component.html',
  styleUrl: './subjective.component.scss',
})
export class SubjectiveComponent implements OnInit {
  icd_data = icd_data;
  isDisabled = true;
  clickedIndex = 0;
  model: NgbDateStruct;
  selectedValue: number;

  tabs = [
    {number: '1'}, {number: '2'}, {number: '3'},
    {number: '4'}, {number: '5'}, {number: '6'},
    {number: '7'}, {number: '8'}, {number: '9'},
    {number: '10'}
  ];

  appointmentId: string;
  public userId: string;
  public userRole: string;
  selectedCode:any;
  icdCodeList:any = [];

  constructor( private router: Router, private route: ActivatedRoute, public authService: AuthService, public commonService: CommonService) {
    this.route.params.subscribe((params: Params) => {
      this.appointmentId = params['appointmentId'];
    })
  }

  ngOnInit() {
    this.userId = this.authService.getLoggedInInfo('_id')
    this.userRole = this.authService.getLoggedInInfo('role')
  }

  ngAfterViewInit() {
  }

  onChange(event: MatRadioChange) {
    //console.log(this.selectedValue = event.value)
  }

  onCodeChange(event: any) {
    let selectedData =  icd_data.filter(city => city.code === this.selectedCode);
    let item = {'code':selectedData[0].code,'name':selectedData[0].name};
    this.icdCodeList.push(item);
    //console.log('icd Code List >>>',this.icdCodeList);
  }

  removeIcd(index:number) {
    this.icdCodeList.splice(index, 1);
    //console.log('icd Code List >>>>>',this.icdCodeList);
  }



}
