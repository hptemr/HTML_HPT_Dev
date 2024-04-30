import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild, ElementRef  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { InvitePopupComponent } from '../../invite-popup/invite-popup.component';
import { AuthService } from '../../../../shared/services/api/auth.service';
import { CommonService } from '../../../../shared/services/helper/common.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { AdminService } from '../../../../shared/services/api/admin.service';
import { constant } from "../../../../../constant";
export interface AdminUsers {
  name: string; 
  email: string;
  practiceLocation: string; 
  status: string;
  action: string;  
  _id: string;  
}
const ADMIN_USERS_DATA: AdminUsers[] = [];

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrl: './user-listing.component.scss'
})
export class UserListingComponent {

  adminUsersDataSource = new MatTableDataSource<AdminUsers>(ADMIN_USERS_DATA);
  displayedColumns: string[] = ['name', 'email', 'practiceLocation', 'status', 'action'];

  practiceLocationData:string[] = constant.practiceLocations
  searchAdminUsers = new FormControl('');
  userRole :string =''
  pageTitle :string =''
  profileUrlSegment: string =''

  constructor(
    private _liveAnnouncer: LiveAnnouncer, 
    private router: Router, 
    public dialog: MatDialog,
    public authService:AuthService,
    public commonService:CommonService,
    public adminService:AdminService,
    private route: ActivatedRoute
  ) {
    this.searchControlAdminUsers()

    this.route.url.subscribe(segments => {
      const {userRole, profileUrlSegment, pageTitle} = this.commonService.getUserRoleBaseOnUrlSegment(segments);
      this.userRole = userRole
      this.pageTitle = pageTitle
      this.profileUrlSegment = profileUrlSegment
    });
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('locationSelect') locationSelect: ElementRef;
  @ViewChild('statusSelect') statusSelect: ElementRef;

  ngOnInit() {
    this.adminUsers()
  }

  ngAfterViewInit() {
    this.adminUsersDataSource.sort = this.sort;
    this.adminUsersDataSource.paginator = this.paginator;
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
          heading: `Invite ${this.pageTitle}`,
          userRole:this.userRole
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result && !result.error){
          this.adminUsers()
          this.commonService.openSnackBar(result.message,"SUCCESS")
        }
      });
    }
    
    adminUsers(searchQuery:string=''){
      this.adminService.adminUsers(searchQuery,this.userRole).subscribe({
        next: (res) => {
          let userDetails = []
          if(!res.error && res.data.length){
            userDetails = this.mappingAdminUsersList( res.data)
          }
          this.adminUsersDataSource = new MatTableDataSource<AdminUsers>(userDetails);
        },error: (err) => {
          err.error?.error?this.commonService.openSnackBar(err.error?.message,"ERROR"):''
        }
      });
    }

    mappingAdminUsersList(userData:any){
      let userDetails = userData.map((user:any) => ({
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        practiceLocation: user.practiceLocation,
        status: user.status,
        _id: user._id
      }));
      return userDetails
    }

    onLocationChange(event:any){
      const practiceLocation = event.target.value;
      if(practiceLocation){
        this.adminUsers(practiceLocation)
      }
    }

    searchControlAdminUsers(){
      this.searchAdminUsers.valueChanges
      .pipe(debounceTime(300)) // Debounce for 300ms
      .subscribe(value => {
        // Perform search when value changes
        this.searchAdminUsersByQuery(value);
      });
    }

    searchAdminUsersByQuery(searchQuery: any) {
      this.adminUsers(searchQuery)
    }

    onStatusChange(event:any){
      let status = event.target.value;
      if(status){
        this.adminUsers(status)
      }
    }

    resetFilter(){
      this.locationSelect.nativeElement.selectedIndex = 0;
      this.statusSelect.nativeElement.selectedIndex = 0;
      this.searchAdminUsers.setValue('');
      this.adminUsers()
    }

    navigateToAdminUserDetails(userId: any){
      this.router.navigate([`/system-admin/user-managment/${this.profileUrlSegment}`, userId]);
    }

}
