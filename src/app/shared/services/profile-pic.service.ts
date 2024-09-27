
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from './api/auth.service';
import { s3Details } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class ProfilePicService {
 itemValue = new Subject();
 profileImage:string='';
 private triggerSubject = new Subject<void>();
 triggerObservable$ = this.triggerSubject.asObservable();

 constructor(private authService: AuthService) {}  

 set setProfilePic(value:string) {
   this.itemValue.next(value); // this will make sure to tell every subscriber about the change.  
   //this.profileImage = s3Details.awsS3Url + s3Details.userProfileFolderPath + value
 }

 get getProfilePic() {
  this.profileImage = s3Details.awsS3Url + s3Details.userProfileFolderPath + this.authService.getLoggedInInfo('profileImage')
   return this.profileImage;
 }

 triggerHeaderUpdate() {
  this.triggerSubject.next(); // Emit an profile pic to notify the header component
}


}