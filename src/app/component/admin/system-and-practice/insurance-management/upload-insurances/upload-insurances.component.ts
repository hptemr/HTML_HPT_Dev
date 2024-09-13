import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'; 
import { MatDialog } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../../../../shared/services/helper/common.service';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';
import { ChangeDetectorRef } from '@angular/core';

// export interface PeriodicElement {
//   primaryInsuranceName: string; 
//   insuranceType: string;
//   payerId: string;
//   address: string;  
//   phoneNumber: string;
//   billingType: string; 
//   errorText: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {
//     primaryInsuranceName: 'Insurance 1',
//     insuranceType:'Medicare',
//     payerId: '1888945196',
//     phoneNumber: '9933556677',
//     billingType: 'AMA',
//     address: '674 Nader Ridge, Murraybury, Pennsylvania - 60218, Jordan',
//     errorText: 'No Error',
//   },
//   {
//     primaryInsuranceName: 'Insurance 2',
//     insuranceType:'Medicaid',
//     payerId: '1888945197',
//     phoneNumber: '9933556677',
//     billingType: 'CMS',
//     address: '675 Nader Ridge, Murraybury, Pennsylvania - 60218, Jordan',
//     errorText: 'No Error',
//   },
//   {
//     primaryInsuranceName: 'Insurance 3',
//     insuranceType:'Tricare',
//     payerId: '1888945198',
//     phoneNumber: '9933556677',
//     billingType: 'AMA',
//     address: '676 Nader Ridge, Murraybury, Pennsylvania - 60218, Jordan',
//     errorText: 'No Error',
//   },
//   {
//     primaryInsuranceName: 'Insurance 4',
//     insuranceType:'CHAMPVA',
//     payerId: '1888945199',
//     phoneNumber: '9933556677',
//     billingType: 'CMS',
//     address: '677 Nader Ridge, Murraybury, Pennsylvania - 60218, Jordan',
//     errorText: 'No Error',
//   },
//   {
//     primaryInsuranceName: 'Insurance 5',
//     insuranceType:'Group Health Plan',
//     payerId: '1888945200',
//     phoneNumber: '9933556677',
//     billingType: 'AMA',
//     address: '676 Nader Ridge, Murraybury, Pennsylvania - 60218, Jordan',
//     errorText: 'No Error',
//   },
//   {
//     primaryInsuranceName: 'Insurance 6',
//     insuranceType:'Other',
//     payerId: '1888945201',
//     phoneNumber: '9933556677',
//     billingType: 'CMS',
//     address: '677 Nader Ridge, Murraybury, Pennsylvania - 60218, Jordan',
//     errorText: 'No Error',
//   },
// ]


export interface InsuranceList {
  insuranceName: string; 
  insuranceType: string;
  insuranceAddress: string;
  payerID: string;  
  phoneNumber: string;
  billingType: string; 
  errors: Array<string>;
}
const INSURANCE_DATA: InsuranceList[] = []

@Component({
  selector: 'app-upload-insurances',
  templateUrl: './upload-insurances.component.html',
  styleUrl: './upload-insurances.component.scss'
})
export class UploadInsurancesComponent {
  // displayedColumns: string[] = ['primaryInsuranceName', 'insuranceType', 'payerId','address', 'phoneNumber','billingType','errorText'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  displayedColumns: string[] = ['insuranceName', 'insuranceType', 'payerID','insuranceAddress', 'phoneNumber','billingType','errors'];
  dataSource = new MatTableDataSource(INSURANCE_DATA);

  selectedFile: File | null = null;
  isFileError: boolean = false;
  // maxFileSize: number = 15 * 1024 * 1024; // 15 MB in bytes
  maxFileSize: number = 4024; //3 MB for test
  fileError: string | null = null;
  fileName: string | null = null;
  totalRecordFound : number = 0
  errorRecordFound : number = 0
  dataWithoutError : any =[]

  // After save
  insertRecordCount : number = 0
  updateRecordCount : number = 0
  isSaveUploadedData : boolean = false

  // Pagignator
  totalCount = 0
  pageIndex = 0
  // pageSize = pageSize
  // pageSizeOptions = pageSizeOptions
  pageSize = 100
  pageSizeOptions = [150, 200, 250]

  showTable:boolean = false

  constructor(
    private _liveAnnouncer: LiveAnnouncer,  
    public dialog: MatDialog,
    public commonService: CommonService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(){
    // this.dataSource = new MatTableDataSource(INSURANCE_DATA);
  }
 
  downloadSampleFile(){
    const link = document.createElement('a');
    link.href = 'assets/images/sample_insurance_management.csv';
    link.download = 'sample_insurance_management.csv';
    link.click();
  }

  onFileSelected(event: Event, fileInput: HTMLInputElement){
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.isFileError = false; // Reset error flag

      // Check file size and type
      const fileName = file.name;
      const fileType = file.type;
      if (!fileName.endsWith('.csv') || fileType !== 'text/csv') {
        this.isFileError = true;
        this.fileError = 'File format not supported.';
        this.selectedFile = null;
        this.fileName = null;
        return
      }else if (file.size > this.maxFileSize) {
        this.isFileError = true;
        this.fileError = 'File size exceeds the 15 MB limit.';
        this.selectedFile = null;
        this.fileName = null;
        return;
      }
      
      // Set selected file
      this.selectedFile = file;
      this.fileName = file.name;
      this.uploadInsurance(this.selectedFile)

       // Reset the file input so that the same file can be selected again
       fileInput.value = '';
    }
  }


  async uploadInsurance(file: File){
    this.commonService.showLoader()
    this.totalRecordFound = 0
    this.errorRecordFound = 0
    const formData: FormData = new FormData();
    formData.append('file', file);

    await this.authService.apiRequest('post', 'admin/uploadInsurances', formData).subscribe(async (res) => {
      if (res && !res.error) {
        this.totalRecordFound = res.data.totalRecordCount
        this.errorRecordFound = res.data.errorRecordCount
        this.dataSource = new MatTableDataSource<InsuranceList>(res.data.totalRecord)
        this.dataWithoutError = res.data.dataWithoutError
        this.commonService.openSnackBar(res.message, "SUCCESS");
        // Pagignation
        this.totalCount = res.data.totalRecordCount
        this.dataSource.paginator = this.paginator;
        if(this.errorRecordFound>0){
          this.showTable = true
        }
        // this.cdr.detectChanges(); // Manually trigger change detection
      }
      this.commonService.hideLoader()
    }, (err) => {
      err.error?.error ? this.commonService.openSnackBar(err.error?.message, "ERROR") : "";
      this.commonService.hideLoader()
      this.resetFileAndRecordData()
    })
  }

  removeFile(fileInput: HTMLInputElement){
    const dialogRef = this.dialog.open(AlertComponent, {
      panelClass: 'custom-alert-container',
      data: {
        warningNote: 'Are you sure want to cancel the upload? No records will be updated.'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && !result.error){
        this.resetFileAndRecordData()

        // Reset the file input value to allow re-uploading the same file
        fileInput.value = '';
      }
    });
  }

  resetFileAndRecordData(){
    // Reset file related data
    this.selectedFile = null;
    this.fileName = null;
    this.isFileError = false;

    // Reset Record
    this.totalRecordFound = 0
    this.errorRecordFound = 0
    this.dataSource = new MatTableDataSource<InsuranceList>([])
    this.dataWithoutError =[]
    this.isSaveUploadedData = false
    // Pagignation
    this.totalCount = 0

  }

  saveUploadedData(){
    let uploadAlertMessage = "Are you sure you want to processs all records?"
    if(this.errorRecordFound>0){
      uploadAlertMessage = `${this.errorRecordFound} out of ${this.totalRecordFound} records have an error. Are you sure want to process ${this.dataWithoutError.length} records?`
    }
    const dialogRef = this.dialog.open(AlertComponent, {
      panelClass: 'custom-alert-container',
      data: {
        warningNote: uploadAlertMessage
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && !result.error){
        console.log("this.dataWithoutError>>>",this.dataWithoutError)
        // Here remove error key from array object - dataWithoutError
        const updatedArray = this.dataWithoutError.map(({ errors, ...rest }:InsuranceList) => rest);
        console.log("updatedArray>>>",updatedArray);
        this.authService.apiRequest('post', 'admin/saveUploadedInsurancesData', updatedArray).subscribe(async (res) => {
          console.log("res res>>>",res);
          if (res && !res.error) {
            this.insertRecordCount = res.data.insertCount
            this.updateRecordCount = res.data.updateCount
            this.isSaveUploadedData = true
            this.commonService.openSnackBar(res.message, "SUCCESS");
            // Resest File
            this.selectedFile = null;
            this.fileName = null;
          }
          this.commonService.hideLoader()
        }, (err) => {
          err.error?.error ? this.commonService.openSnackBar(err.error?.message, "ERROR") : "";
          this.commonService.hideLoader()
        })
      }
    });
  }


/* ---------------------  ------------------------- ------------------------*/

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) { 
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
