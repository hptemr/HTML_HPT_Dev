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

// export interface PeriodicElement {
//   docCredentials: string; 
//   npi: string;
//   docName: string;
//   address: string;  
//   phoneNumber: string;
//   faxNumber: string; 
//   errorText: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {
//     docName: 'Doc 1 Test',
//     docCredentials:'123',
//     npi: '1888945196',
//     phoneNumber: '9933556677',
//     faxNumber: '9933556677',
//     address: '674 Nader Ridge, Murraybury, Pennsylvania - 60218, Jordan',
//     errorText: 'No Error',
//   },
//   {
//     docName: 'Doc 2 Test',
//     docCredentials:'123',
//     npi: '1888945196',
//     phoneNumber: '9933556677',
//     faxNumber: '9933556677',
//     address: '674 Nader Ridge, Murraybury, Pennsylvania - 60218, Jordan',
//     errorText: 'No Error',
//   },
//   {
//     docName: 'Doc 3 Test',
//     docCredentials:'123',
//     npi: '1888945196',
//     phoneNumber: '9933556677',
//     faxNumber: '9933556677',
//     address: '674 Nader Ridge, Murraybury, Pennsylvania - 60218, Jordan',
//     errorText: 'No Error',
//   },
//   {
//     docName: 'Doc 4 Test',
//     docCredentials:'123',
//     npi: '1888945196',
//     phoneNumber: '9933556677',
//     faxNumber: '9933556677',
//     address: '674 Nader Ridge, Murraybury, Pennsylvania - 60218, Jordan',
//     errorText: 'No Error',
//   },
//   {
//     docName: 'Doc 5 Test',
//     docCredentials:'123',
//     npi: '1888945196',
//     phoneNumber: '9933556677',
//     faxNumber: '9933556677',
//     address: '674 Nader Ridge, Murraybury, Pennsylvania - 60218, Jordan',
//     errorText: 'No Error',
//   },
//   {
//     docName: 'Doc 6 Test',
//     docCredentials:'123',
//     npi: '1888945196',
//     phoneNumber: '9933556677',
//     faxNumber: '9933556677',
//     address: '674 Nader Ridge, Murraybury, Pennsylvania - 60218, Jordan',
//     errorText: 'No Error',
//   },
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

const PROVIDER_DATA: ProviderList[] = []

@Component({
  selector: 'app-bulk-upload-providers',
  templateUrl: './bulk-upload-providers.component.html',
  styleUrl: './bulk-upload-providers.component.scss'
})
export class BulkUploadProvidersComponent {
  // displayedColumns: string[] = ['docCredentials', 'docName', 'npi','address', 'phoneNumber','faxNumber','errorText'];
  displayedColumns: string[] = ['Credentials', 'Name', 'NPI','Address', 'phoneNumber','faxNumber','errors'];
  dataSource = new MatTableDataSource(PROVIDER_DATA);

  selectedFile: File | null = null;
  isFileError: boolean = false;
  // maxFileSize: number = 15 * 1024 * 1024; // 15 MB in bytes
  maxFileSize: number = 1024; //1 KB for test
  fileError: string | null = null;
  fileName: string | null = null;
  totalRecordFound : number = 0
  errorRecordFound : number = 0

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

  onFileSelected(event: Event): void {
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
      this.uploadFile(this.selectedFile)
    }
  }

  async uploadFile(file: File){
    this.commonService.showLoader()
    this.totalRecordFound = 0
    this.errorRecordFound = 0
    const formData: FormData = new FormData();
    formData.append('file', file);

    this.authService.apiRequest('post', 'admin/uploadFile', formData).subscribe(async (res) => {
      console.log("uploadFile>>>", res);
      if (res && !res.error) {
        this.totalRecordFound = res.data.totalRecordCount
        this.errorRecordFound = res.data.errorRecordCount
        this.dataSource = new MatTableDataSource<ProviderList>(res.data.totalRecord)
        this.commonService.openSnackBar(res.message, "SUCCESS");
      }
      this.commonService.hideLoader()
    }, (err) => {
      err.error?.error ? this.commonService.openSnackBar(err.error?.message, "ERROR") : "";
      this.commonService.hideLoader()
    })
  }

  removeFile(): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      panelClass: 'custom-alert-container',
      data: {
        warningNote: 'Are you sure want to cancel the upload? No records will be updated.'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && !result.error){
        this.selectedFile = null;
        this.fileName = null;
        this.isFileError = false;
      }
    });
  }

}
