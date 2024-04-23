 

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InvitePopupComponent } from '../../invite-popup/invite-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../../../shared/services/api/admin.service';
import { CommonService } from '../../../../shared/services/helper/common.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

// export interface PeriodicElement {
//   name: string; 
//   email: string;
//   practicelocatn: string; 
//   status: string;
//   action: string;  
// }
// const ELEMENT_DATA: PeriodicElement[] = [
//   { 
//     name: 'Jane Cooper', 
//     email: 'jane@gmail.com', 
//     practicelocatn: 'Hamilton PT',
//     status: 'Active',
//     action : ''
//   }, 
//   { 
//     name: 'Floyd Miles', 
//     email: 'miles@yahoo.com', 
//     practicelocatn: 'Hamilton PT at The Canyons Active',
//     status: 'Pending',
//     action : ''
//   }, 
//   { 
//     name: 'Ronald Richards', 
//     email: 'richard@gmail.com', 
//     practicelocatn: 'Hamilton PT',
//     status: 'Suspended',
//     action : ''
//   }, 
//   { 
//     name: 'Marvin McKinney', 
//     email: 'marvin21@gamil.com', 
//     practicelocatn: 'Corvallis PT',
//     status: 'Deleted',
//     action : ''
//   },
// ];

export interface Therapists {
  name: string; 
  email: string;
  practiceLocation: string; 
  status: string;
  action: string;  
  _id: string;  
}
const THERAPIST_DATA: Therapists[] = [];

@Component({
  selector: 'app-therapists', 
  templateUrl: './therapists.component.html',
  styleUrl: './therapists.component.scss'
})
export class TherapistsComponent {
  // displayedColumns: string[] = ['name', 'email', 'practicelocatn', 'status', 'action'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  therapistsDataSource = new MatTableDataSource<Therapists>(THERAPIST_DATA);
  displayedColumns: string[] = ['name', 'email', 'practiceLocation', 'status', 'action'];

  userRole :string ='therapist'
  practiceLocationData :any = []
  searchTherapist = new FormControl('');

  constructor(
    private adminService: AdminService,
    private commonService:CommonService,
    private _liveAnnouncer: LiveAnnouncer,  
    public dialog: MatDialog
  ) {
    this.searchControlTherapistInitialization()
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('locationSelect') locationSelect: ElementRef;
  @ViewChild('statusSelect') statusSelect: ElementRef;

  ngOnInit() {
    this.getPracticeLocation()
    this.therapistUsers()
  }

  ngAfterViewInit() {
    this.therapistsDataSource.sort = this.sort;
    this.therapistsDataSource.paginator = this.paginator;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  async getPracticeLocation() {
    this.practiceLocationData = await this.commonService.getPracticeLocation().catch(()=>[])
  }


  invitePopup() {
    const dialogRef = this.dialog.open(InvitePopupComponent,{
      disableClose :true,
      panelClass: 'inivite--modal',
      data : {
        heading: 'Invite Therapist',
        userRole:this.userRole
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && !result.error){
        this.therapistUsers()
        this.commonService.openSnackBar(result.message,"SUCCESS")
      }
    });
  }

  therapistUsers(searchQuery:string=''){
    this.adminService.adminUsers(searchQuery,this.userRole).subscribe({
      next: (res) => {
        let userDetails = []
        if(!res.error && res.data.length){
           userDetails = res.data.map((user:any) => ({
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            practiceLocation: user.practiceLocation,
            status: user.status,
            _id: user._id
          }));
        }
        console.log("userDetails>>>",userDetails)
        this.therapistsDataSource = new MatTableDataSource<Therapists>(userDetails);
      },error: (err) => {
        err.error?.error?this.commonService.openSnackBar(err.error?.message,"ERROR"):''
      }
    });
  }

  onLocationChange(event:any){
    const practiceLocation = event.target.value;
    if(practiceLocation){
      this.therapistUsers(practiceLocation)
    }
  }

  onStatusChange(event:any){
    let status = event.target.value;
    if(status){
      this.therapistUsers(status)
    }
  }

  searchControlTherapistInitialization(){
    this.searchTherapist.valueChanges
    .pipe(debounceTime(300)) // Debounce for 300ms
    .subscribe(value => {
      // Perform search when value changes
      this.searchTherapistUsers(value);
    });
  }

  searchTherapistUsers(searchQuery: any) {
    this.therapistUsers(searchQuery)
  }

  resetFilter(){
    this.locationSelect.nativeElement.selectedIndex = 0;
    this.statusSelect.nativeElement.selectedIndex = 0;
    this.searchTherapist.setValue('');
    this.therapistUsers()
  }

}
