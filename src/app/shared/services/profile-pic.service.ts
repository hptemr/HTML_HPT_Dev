
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from './api/auth.service';
import { s3Details } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class ProfilePicService {
 itemValue = new Subject();
 profileImage:any='';
//  private triggerSubject = new Subject<void>();
//  triggerObservable$ = this.triggerSubject.asObservable();

 constructor(private authService: AuthService) {}  

 set setProfilePic(value:any) {
  console.log('hi here also',value)
  console.log('hi here also...........',s3Details.awsS3Url + s3Details.userProfileFolderPath+value)
   this.itemValue.next(s3Details.awsS3Url + s3Details.userProfileFolderPath+value);
 }


//  get getProfilePic() {
//   this.profileImage = s3Details.awsS3Url + s3Details.userProfileFolderPath + this.authService.getLoggedInInfo('profileImage')
//    return this.profileImage;
//  }

//  triggerHeaderUpdate(profileImage:any) {
//   console.log('hi here.........',profileImage)
//   this.triggerSubject.next(profileImage); // Emit an profile pic to notify the header component
// }


}