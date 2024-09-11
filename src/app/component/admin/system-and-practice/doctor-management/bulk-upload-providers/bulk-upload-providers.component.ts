import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'; 
import { MatDialog } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from 'src/app/shared/comman/alert/alert.component';
import { CommonService } from '../../../../../shared/services/helper/common.service';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { pageSize, pageSizeOptions, practiceLocations } from 'src/app/config';

// export interface PeriodicElement {
//   docCredentials: string; 
//   npi: string;
//   docName: string;
//   address: string;  
//   phoneNumber: string;
//   faxNumber: string; 
//   errorText: string;
// }

// const ELEMENT_DATA: ProviderList[] = [
//   {
//     Name: 'Doc 1 Test',
//     Credentials:'123',
//     NPI: '1888945196',
//     phoneNumber: '9933556677',
//     faxNumber: '9933556677',
//     Address: '674 Nader Ridge, Murraybury, Pennsylvania - 60218, Jordan',
//     errors: [],
//   },
//   {
//     Name: 'Doc 2 Test',
//     Credentials:'123',
//     NPI: '1888945196',
//     phoneNumber: '9933556677',
//     faxNumber: '9933556677',
//     Address: '674 Nader Ridge, Murraybury, Pennsylvania - 60218, Jordan',
//     errors: [],
//   },
//   {
//     Name: 'Doc 3 Test',
//     Credentials:'123',
//     NPI: '1888945196',
//     phoneNumber: '9933556677',
//     faxNumber: '9933556677',
//     Address: '674 Nader Ridge, Murraybury, Pennsylvania - 60218, Jordan',
//     errors: [],
//   },
//   {
//     Name: 'Doc 4 Test',
//     Credentials:'123',
//     NPI: '1888945196',
//     phoneNumber: '9933556677',
//     faxNumber: '9933556677',
//     Address: '674 Nader Ridge, Murraybury, Pennsylvania - 60218, Jordan',
//     errors: [],
//   },
//   {
//     Name: 'Doc 1 Test',
//     Credentials:'123',
//     NPI: '1888945196',
//     phoneNumber: '9933556677',
//     faxNumber: '9933556677',
//     Address: '674 Nader Ridge, Murraybury, Pennsylvania - 60218, Jordan',
//     errors: [],
//   },
//   {
//     Name: 'Doc 2 Test',
//     Credentials:'123',
//     NPI: '1888945196',
//     phoneNumber: '9933556677',
//     faxNumber: '9933556677',
//     Address: '674 Nader Ridge, Murraybury, Pennsylvania - 60218, Jordan',
//     errors: [],
//   },
//   {
//     Name: 'Doc 3 Test',
//     Credentials:'123',
//     NPI: '1888945196',
//     phoneNumber: '9933556677',
//     faxNumber: '9933556677',
//     Address: '674 Nader Ridge, Murraybury, Pennsylvania - 60218, Jordan',
//     errors: [],
//   },
//   {
//     Name: 'Doc 4 Test',
//     Credentials:'123',
//     NPI: '1888945196',
//     phoneNumber: '9933556677',
//     faxNumber: '9933556677',
//     Address: '674 Nader Ridge, Murraybury, Pennsylvania - 60218, Jordan',
//     errors: [],
//   },
//   {
//     Name: 'Doc 1 Test',
//     Credentials:'123',
//     NPI: '1888945196',
//     phoneNumber: '9933556677',
//     faxNumber: '9933556677',
//     Address: '674 Nader Ridge, Murraybury, Pennsylvania - 60218, Jordan',
//     errors: [],
//   },
//   {
//     Name: 'Doc 2 Test',
//     Credentials:'123',
//     NPI: '1888945196',
//     phoneNumber: '9933556677',
//     faxNumber: '9933556677',
//     Address: '674 Nader Ridge, Murraybury, Pennsylvania - 60218, Jordan',
//     errors: [],
//   },
//   {
//     Name: 'Doc 3 Test',
//     Credentials:'123',
//     NPI: '1888945196',
//     phoneNumber: '9933556677',
//     faxNumber: '9933556677',
//     Address: '674 Nader Ridge, Murraybury, Pennsylvania - 60218, Jordan',
//     errors: [],
//   },
//   {
//     Name: 'Doc 4 Test',
//     Credentials:'123',
//     NPI: '1888945196',
//     phoneNumber: '9933556677',
//     faxNumber: '9933556677',
//     Address: '674 Nader Ridge, Murraybury, Pennsylvania - 60218, Jordan',
//     errors: [],
//   }
// ]

export interface ProviderList {
  Name: string; 
  Credentials: string;
  Address: string;
  phoneNumber: string;  
  faxNumber: string;
  NPI: string; 
  errors: Array<string>;
}

// const PROVIDER_DATA: ProviderList[] = ELEMENT_DATA
const PROVIDER_DATA: ProviderList[] = []

@Component({
  selector: 'app-bulk-upload-providers',
  templateUrl: './bulk-upload-providers.component.html',
  styleUrl: './bulk-upload-providers.component.scss'
})
export class BulkUploadProvidersComponent {
  // displayedColumns: string[] = ['docCredentials', 'docName', 'npi','address', 'phoneNumber','faxNumber','errorText'];
  displayedColumns: string[] = ['Credentials', 'Name', 'NPI','Address', 'phoneNumber','faxNumber','errors'];
  dataSource = new MatTableDataSource<ProviderList>(PROVIDER_DATA);

  selectedFile: File | null = null;
  isFileError: boolean = false;
  // maxFileSize: number = 15 * 1024 * 1024; // 15 MB in bytes
  maxFileSize: number = 3000; //3 MB for test
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
    private authService: AuthService
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

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

/* ---------------------  ------------------------- ------------------------*/
  downloadSampleFile(){
    const link = document.createElement('a');
    link.href = 'assets/images/sample_doctor_management.csv';
    link.download = 'sample_doctor_management.csv';
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
      this.uploadProviders(this.selectedFile)

       // Reset the file input so that the same file can be selected again
       fileInput.value = '';
    }
  }

  async uploadProviders(file: File){
    this.commonService.showLoader()
    this.totalRecordFound = 0
    this.errorRecordFound = 0
    const formData: FormData = new FormData();
    formData.append('file', file);

    this.authService.apiRequest('post', 'admin/uploadProviders', formData).subscribe(async (res) => {
      if (res && !res.error) {
        this.totalRecordFound = res.data.totalRecordCount
        this.errorRecordFound = res.data.errorRecordCount
        this.dataSource = new MatTableDataSource<ProviderList>(res.data.totalRecord)
        this.dataWithoutError = res.data.dataWithoutError
        this.commonService.openSnackBar(res.message, "SUCCESS");
        // Pagignation
        this.totalCount = res.data.totalRecordCount
        this.dataSource.paginator = this.paginator;
        if(this.errorRecordFound>0){
          this.showTable = true
        }
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
    this.dataSource = new MatTableDataSource<ProviderList>([])
    this.dataWithoutError =[]
    this.isSaveUploadedData = false
    // Pagignation
    this.totalCount = 0

  }

  saveUploadedData(){
    let uploadAlertMessage = "Are you sure want to processs all records?"
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
        const updatedArray = this.dataWithoutError.map(({ errors, ...rest }:ProviderList) => rest);
        console.log("updatedArray>>>",updatedArray);
        this.authService.apiRequest('post', 'admin/saveUploadedProviderData', updatedArray).subscribe(async (res) => {
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

}
