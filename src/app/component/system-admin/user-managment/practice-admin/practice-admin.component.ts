import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild, ElementRef  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { InvitePopupComponent } from '../../invite-popup/invite-popup.component';
import { AuthService } from '../../../../shared/services/api/auth.service';
import { CommonService } from '../../../../shared/services/helper/common.service';
import { PracticeAdminService } from '../../../../shared/services/api/practice-admin.service';
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

export interface PracticeAdmin {
  name: string; 
  email: string;
  practiceLocation: string; 
  status: string;
  action: string;  
  _id: string;  
}
const PRACTICE_ADMIN_DATA: PracticeAdmin[] = [];

@Component({
  selector: 'app-practice-admin',  
  templateUrl: './practice-admin.component.html',
  styleUrl: './practice-admin.component.scss'
})
export class PracticeAdminComponent {

    // displayedColumns: string[] = ['name', 'email', 'practicelocatn', 'status', 'action'];
  // practiceAdminDataSource = new MatTableDataSource(PRACTICE_ADMIN_DATA);
  practiceAdminDataSource = new MatTableDataSource<PracticeAdmin>(PRACTICE_ADMIN_DATA);
  displayedColumns: string[] = ['name', 'email', 'practiceLocation', 'status', 'action'];

  practiceLocationData :any = []
  searchPracticeAdmin = new FormControl('');

  constructor(
    private _liveAnnouncer: LiveAnnouncer, 
    private router: Router, 
    public dialog: MatDialog,
    public authService:AuthService,
    public commonService:CommonService,
    public practiceAdminService:PracticeAdminService
  ) {
    this.searchControlPracticeAdminInitialization()
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('locationSelect') locationSelect: ElementRef;
  @ViewChild('statusSelect') statusSelect: ElementRef;

  ngOnInit() {
    this.getPracticeLocation()
    this.practiceAdminUsers()
  }

  ngAfterViewInit() {
    this.practiceAdminDataSource.sort = this.sort;
    this.practiceAdminDataSource.paginator = this.paginator;
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

    invitePopup() {
      const dialogRef = this.dialog.open(InvitePopupComponent,{
        disableClose :true,
        panelClass: 'inivite--modal',
        data : {
          heading: 'Invite Practice Admin',
          inviteUser:'practice_admin'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result && !result.error){
          this.practiceAdminUsers()
          this.commonService.openSnackBar(result.message,"SUCCESS")
        }
      });
    }
    
    async getPracticeLocation() {
      this.practiceLocationData = await this.commonService.getPracticeLocation().catch(()=>[])
    }

    practiceAdminUsers(searchQuery:string=''){
        this.practiceAdminService.practiceAdminUsers(searchQuery).subscribe({
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
            this.practiceAdminDataSource = new MatTableDataSource<PracticeAdmin>(userDetails);
          },error: (err) => {
            err.error?.error?this.commonService.openSnackBar(err.error?.message,"ERROR"):''
          }
        });
    }

    onLocationChange(event:any){
      const practiceLocation = event.target.value;
      if(practiceLocation){
        this.practiceAdminUsers(practiceLocation)
      }
    }

    searchControlPracticeAdminInitialization(){
      this.searchPracticeAdmin.valueChanges
      .pipe(debounceTime(300)) // Debounce for 300ms
      .subscribe(value => {
        // Perform search when value changes
        this.searchPracticeAdminUsers(value);
      });
    }

    searchPracticeAdminUsers(searchQuery: any) {
      this.practiceAdminUsers(searchQuery)
    }

    onStatusChange(event:any){
      let status = event.target.value;
      if(status){
        this.practiceAdminUsers(status)
      }
    }

    resetFilter(){
      this.locationSelect.nativeElement.selectedIndex = 0;
      this.statusSelect.nativeElement.selectedIndex = 0;
      this.searchPracticeAdmin.setValue('');
      this.practiceAdminUsers()
    }

}
