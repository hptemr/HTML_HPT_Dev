import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatRadioChange } from '@angular/material/radio';
import { MatTableDataSource } from '@angular/material/table'; 
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface InsuranceList {
  _id:string; 
  insuranceName: string; 
  insuranceType: string;
  insuranceAddress: string;
  payerID: string;  
  phoneNumber: string;
  billingType: string; 
  status: string;
}

const INSURANCE_DATA: InsuranceList[] = []

@Component({
  selector: 'app-select-primary-insu-modal', 
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatDialogModule, MatTableModule, MatRadioModule, ReactiveFormsModule, CommonModule],
  templateUrl: './select-primary-insu-modal.component.html',
  styleUrl: './select-primary-insu-modal.component.scss'
})
export class SelectPrimaryInsuModalComponent {
  // displayedColumns: string[] = ['insuranceName', 'payerId', 'address', 'symbol'];
  // dataSource = ELEMENT_DATA;

  displayedColumns: string[] = ['insuranceName','payerID','insuranceAddress','symbol'];
  dataSource = new MatTableDataSource(INSURANCE_DATA);

  popupData:any;
  insuranceInfo:any;
  isInsuranceList:boolean=true
  searchInsurance = new FormControl('');

  orderBy: any = { createdAt: -1 }
  whereCond: any = {status:'Active'}
  totalCount = 0
  pageIndex = 0
  // pageSize = pageSize
  searchQuery:any =""

  selectedInsurance:any;

  constructor( 
    private commonService: CommonService,
    private authService: AuthService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<SelectPrimaryInsuModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    this.searchControlInsurance()
  }

  ngOnInit() {
    console.log("Data>>>",this.data)
    this.popupData = this.data
    this.insuranceInfo = this.data.insuranceInfo
    this.InsuranceList()
  }

  async InsuranceList(action="") {
    if(action==""){ 
      this.commonService.showLoader() 
    }
    Object.assign(this.whereCond, { 
      $or: [
        { insuranceName: { $regex: this.searchQuery, $options: 'i' } },
        { payerID: this.searchQuery }
      ]
    })

    let reqVars = {
      query: this.whereCond,
      fields: { _id:1, insuranceName: 1, insuranceType: 1, insuranceAddress: 1, payerID: 1, phoneNumber: 1, billingType: 1, status: 1, createdAt: 1, updatedAt: 1 },
      order: this.orderBy,
      // limit: this.pageSize,
      // offset: (this.pageIndex * this.pageSize)
    }
    await this.authService.apiRequest('post', 'admin/getUploadInsuranceList', reqVars).subscribe(async response => {
      this.commonService.hideLoader()
      let insuranceDetails: any = []
      await response.data.insuranceList.map((element: any) => {
        let newColumns = {
          _id: element._id,
          insuranceName:  element.insuranceName,
          insuranceType: element.insuranceType,
          insuranceAddress: element.insuranceAddress,
          payerID: element.payerID,
          phoneNumber: element.phoneNumber,
          billingType: element.billingType,
          status: element.status,
          createdAt: element.createdAt,
          updatedAt: element.updatedAt
        }
        insuranceDetails.push(newColumns)
      })
      this.isInsuranceList = response.data.totalCount>0?true:false 
      this.dataSource = new MatTableDataSource<InsuranceList>(insuranceDetails)
    })
  }

  searchControlInsurance(){
    this.searchInsurance.valueChanges
    .pipe(debounceTime(500)) // Debounce for 500ms
    .subscribe(value => {
      // Perform search when value changes
      this.searchInsuranceByQuery(value);
    });
  }

  searchInsuranceByQuery(searchQuery: any) {
    this.searchQuery = searchQuery
    this.InsuranceList()
  }

  onSelectionChange(event: MatRadioChange) {
    this.selectedInsurance = event.value
  }

  selectInsurance(){
    this.dialogRef.close(this.selectedInsurance);
  }

}

// export interface PeriodicElement {
//   payerId: string;
//   insuranceName: string;
//   address: string;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {insuranceName: 'Insurance Name 1', payerId: '123456789', address: 'Keas 69 Str. 15234, Chalandri Athens, Greece', symbol: ' '},
//   {insuranceName: 'Insurance Name 2', payerId: '987654321', address: '114 W 17th St, Fl 2, New York, NY 10011, US', symbol: ' '},
//   {insuranceName: 'Insurance Name 3', payerId: '369852147', address:'Keas 69 Str. 15234, Chalandri Athens', symbol: ' '}, 
//   {insuranceName: 'Insurance Name 1', payerId: '123456789', address: 'Keas 69 Str. 15234, Chalandri Athens, Greece', symbol: ' '},
//   {insuranceName: 'Insurance Name 2', payerId: '987654321', address: '114 W 17th St, Fl 2, New York, NY 10011, US', symbol: ' '},
//   {insuranceName: 'Insurance Name 1', payerId: '123456789', address: 'Keas 69 Str. 15234, Chalandri Athens, Greece', symbol: ' '},
//   {insuranceName: 'Insurance Name 2', payerId: '987654321', address: '114 W 17th St, Fl 2, New York, NY 10011, US', symbol: ' '},
//   {insuranceName: 'Insurance Name 1', payerId: '123456789', address: 'Keas 69 Str. 15234, Chalandri Athens, Greece', symbol: ' '},
//   {insuranceName: 'Insurance Name 2', payerId: '987654321', address: '114 W 17th St, Fl 2, New York, NY 10011, US', symbol: ' '},
//   {insuranceName: 'Insurance Name 1', payerId: '123456789', address: 'Keas 69 Str. 15234, Chalandri Athens, Greece', symbol: ' '},
//   {insuranceName: 'Insurance Name 2', payerId: '987654321', address: '114 W 17th St, Fl 2, New York, NY 10011, US', symbol: ' '},
//   {insuranceName: 'Insurance Name 1', payerId: '123456789', address: 'Keas 69 Str. 15234, Chalandri Athens, Greece', symbol: ' '},
//   {insuranceName: 'Insurance Name 2', payerId: '987654321', address: '114 W 17th St, Fl 2, New York, NY 10011, US', symbol: ' '},
//   {insuranceName: 'Insurance Name 1', payerId: '123456789', address: 'Keas 69 Str. 15234, Chalandri Athens, Greece', symbol: ' '},
//   {insuranceName: 'Insurance Name 2', payerId: '987654321', address: '114 W 17th St, Fl 2, New York, NY 10011, US', symbol: ' '},
//   {insuranceName: 'Insurance Name 1', payerId: '123456789', address: 'Keas 69 Str. 15234, Chalandri Athens, Greece', symbol: ' '},
//   {insuranceName: 'Insurance Name 2', payerId: '987654321', address: '114 W 17th St, Fl 2, New York, NY 10011, US', symbol: ' '},
//   {insuranceName: 'Insurance Name 1', payerId: '123456789', address: 'Keas 69 Str. 15234, Chalandri Athens, Greece', symbol: ' '},
//   {insuranceName: 'Insurance Name 2', payerId: '987654321', address: '114 W 17th St, Fl 2, New York, NY 10011, US', symbol: ' '},
// ];