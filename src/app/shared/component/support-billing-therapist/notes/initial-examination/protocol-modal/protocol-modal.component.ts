import { Component,Inject,OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { validationMessages } from '../../../../../../utils/validation-messages';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog'; 
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Validators, FormGroup, FormBuilder,FormArray, FormControl, ValidationErrors } from '@angular/forms';
export interface PeriodicElement {
  file_name: string;
  actions: string;
}
const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-protocol-modal', 
  templateUrl: './protocol-modal.component.html',
  styleUrl: './protocol-modal.component.scss'
})
export class ProtocolModalComponent {
  appointmentId: string;
  protocolForm: FormGroup;
  searchDirectory:string=''
  displayedColumns: string[] = ['file_name', 'actions'];
  directoryItmList:any =[];
  data_not_found:boolean=false;
  validationMessages = validationMessages; 
  //dataSource = new MatTableDataSource(ELEMENT_DATA);
  //directoryItmList =  new MatTableDataSource(ELEMENT_DATA);//new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  public userId: string = this.authService.getLoggedInInfo('_id');
  public userRole: string = this.authService.getLoggedInInfo('role');
  
  constructor( private router: Router,public dialog: MatDialog,private fb: FormBuilder, private route: ActivatedRoute, public authService: AuthService, public commonService: CommonService,private _liveAnnouncer: LiveAnnouncer, public dialogRef: MatDialogRef<ProtocolModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.appointmentId = data.appointmentId;
  } 
  
  ngOnInit() {
    this.getProtocolDetails();
  }

  lodForm(){
    this.protocolForm = new FormGroup({
        selectedElements: this.fb.array([this.fb.group({
         check: ["",[Validators.required]]
        })
      ])
    });
    this.addCheckboxControls();
  }

  private addCheckboxControls() {
    const formArray = this.protocolForm.get('selectedElements') as FormArray;
    formArray.removeAt(0)
    this.directoryItmList.data.forEach((element:any) => {
      formArray.push(this.fb.group({
        check: [false]
      }))
    });
  }


  get selectedElements(): FormArray {
    return this.protocolForm.get('selectedElements') as FormArray;
  }

   // Check if any checkbox is checked
   isAtLeastOneChecked(): boolean {
    return this.selectedElements.controls.some(control => control.get('check')?.value === true);
  }

  submit() {
    console.log('<<<<<  protocolForm form >>>>',this.protocolForm)

    if (this.protocolForm.valid && this.isAtLeastOneChecked()) {
      console.log('Form Submitted', this.protocolForm.value);
      const selectedCheckboxes = this.protocolForm.value.selectedElements
      .map((checked:any, index:any) => (checked.check ? this.directoryItmList.data[index] : null))
      .filter((value: null) => value !== null);     
      this.dialogRef.close(selectedCheckboxes); 
    } else {
      console.log('Form Invalid');
      this.protocolForm.markAllAsTouched();
    }


    // if (this.protocolForm.invalid){
    //   this.protocolForm.markAllAsTouched();
    // }else{
    //   const selectedCheckboxes = this.protocolForm.value.selectedElements
    //   .map((checked:any, index:any) => (checked.check ? this.directoryItmList.data[index] : null))
    //   .filter((value: null) => value !== null);     
    //   this.dialogRef.close(selectedCheckboxes); 
    // }

  }
 
  async getProtocolDetails() {  
    this.commonService.showLoader()
    if (this.appointmentId) {
      var searchParams = { searchValue:this.searchDirectory.trim(), userRole:this.userRole, userId:this.userId}
      await this.authService.apiRequest('post', 'admin/getDefaultDirectoriesAndItems', searchParams).subscribe(async response => {    
        this.commonService.hideLoader()    
        let finalData: any = []
        if(response.data.fileList && response.data.fileList[0]){
          this.data_not_found = true;
          await response.data.fileList[0].map((element: any) => {
            var extn = element.file_name.split('.').pop();
            var icon = "";var color = "";
            if(extn=='pdf'){
              icon = "picture_as_pdf"; color = "pdf";
            }else if(extn=='png' || extn=='jpg' || extn=='jpeg'){
              icon = "photo";color = "photo";
            }else{
              icon = "description"; color = "description";
            }

            let newColumns = {
              id: element._id,   
              file_name: element.file_name,   
              icon:icon,
              color:color,        
            }
            finalData.push(newColumns)
          })
          this.directoryItmList = new MatTableDataSource(finalData)
          this.lodForm();
        }
        // this.arrLength = directories.length
        // this.dataSource.data = directories
        // this.dataSource.paginator = this.paginator;
      })
    }
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
