import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { InvitePopupComponent } from '../../invite-popup/invite-popup.component';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/api/auth.service';
import { CommonService } from 'src/app/shared/services/helper/common.service';
import { AdminService } from 'src/app/shared/services/api/admin.service';
import { pageSize, pageSizeOptions, practiceLocations } from 'src/app/config';
import { validationMessages } from 'src/app/utils/validation-messages';

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
  validationMessages = validationMessages; 
  adminUsersDataSource = new MatTableDataSource<AdminUsers>(ADMIN_USERS_DATA);
  displayedColumns: string[] = ['name', 'email', 'practiceLocation', 'status', 'action'];

  practiceLocationData:string[] = practiceLocations
  searchAdminUsers = new FormControl('');
  userRole :string =''
  pageTitle :string =''
  profileUrlSegment: string =''

  orderBy: any = { createdAt: -1 }
  whereCond: any = {}
  totalCount = 0
  pageIndex = 0
  pageSize = pageSize
  pageSizeOptions = pageSizeOptions
  searchQuery:any =""

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
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('locationSelect') locationSelect: ElementRef;
  @ViewChild('statusSelect') statusSelect: ElementRef;

  ngOnInit() {
    this.getRouteSegment()
    this.adminUsers()
  }


  announceSortChange(sortState: Sort) {
    let order
    if (sortState.direction == 'desc') {
      order = -1
    } else {
      order = 1
    }
    if (sortState.active == 'name') {
      this.orderBy = {
        firstName:order
      }
    } else{
      this.orderBy = {
        [sortState.active]:order
      }
    }
    this.adminUsers()
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

    getRouteSegment(){
      this.route.url.subscribe(segments => {
        const {userRole, profileUrlSegment, pageTitle} = this.commonService.getUserRoleBaseOnUrlSegment(segments);
        this.userRole = userRole
        this.pageTitle = pageTitle
        this.profileUrlSegment = profileUrlSegment
  
        this.whereCond = { role:  this.userRole }
      });
    }

    async adminUsers() {
      this.commonService.showLoader()
      Object.assign(this.whereCond, { 
        $or: [
          { firstName: { $regex: this.searchQuery, $options: 'i' } },
           { lastName: { $regex: this.searchQuery, $options: 'i' } },
          { email: this.searchQuery },
          { status: this.searchQuery },
          { practiceLocation: this.searchQuery }
        ]
      })

      let reqVars = {
        query: this.whereCond,
        fields: { _id:1, firstName: 1, lastName: 1, email: 1, status: 1, practiceLocation: 1 },
        order: this.orderBy,
        limit: this.pageSize,
        offset: (this.pageIndex * this.pageSize)
      }
   
      await this.authService.apiRequest('post', 'admin/users', reqVars).subscribe(async response => {
        this.totalCount = response.data.totalCount
        let userDetails: any = []
        await response.data.userList.map((element: any) => {
          let newColumns = {
            name: `${element.firstName} ${element.lastName}`,
            email: element.email,
            practiceLocation: element.practiceLocation,
            status: element.status,
            _id: element._id,
            statusClass: element.status.toLowerCase()
          }
          userDetails.push(newColumns)
        })
        this.adminUsersDataSource = new MatTableDataSource<AdminUsers>(userDetails)
        this.commonService.hideLoader()
      })
    }

    onLocationChange(event:any){
      const practiceLocation = event.target.value;
      if(practiceLocation){
        this.searchQuery = practiceLocation
        this.adminUsers()
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
      this.searchQuery = searchQuery
      this.adminUsers()
    }

    onStatusChange(event:any){
      let status = event.target.value;
      if(status){
        this.searchQuery = status
        this.adminUsers()
      }
    }

    resetFilter(){
      this.locationSelect.nativeElement.selectedIndex = 0;
      this.statusSelect.nativeElement.selectedIndex = 0;
      this.searchAdminUsers.setValue('');
      
      this.totalCount = 0
      this.pageIndex = 0
      this.pageSize = pageSize
      this.pageSizeOptions = pageSizeOptions
      this.searchQuery =""
      this.adminUsers()
    }

    navigateToAdminUserDetails(userId: any){
      this.router.navigate([`/system-admin/user-managment/${this.profileUrlSegment}`, userId]);
    }

    handlePageEvent(event: any) {
      this.pageSize = event.pageSize;
      this.pageIndex = event.pageIndex;
      this.adminUsers()
    }

}
