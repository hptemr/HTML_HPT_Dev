
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { s3Details } from 'src/app/config';
@Injectable({
  providedIn: 'root'
})
export class ProfilePicService {
 itemValue = new Subject();
 profileImage:any='';
//  private triggerSubject = new Subject<void>();
//  triggerObservable$ = this.triggerSubject.asObservable();

 constructor() {}  

 set setProfilePic(value:any) {
   this.itemValue.next(s3Details.awsS3Url + s3Details.userProfileFolderPath+value);
 }

//  triggerHeaderUpdate(profileImage:any) {
//   console.log('hi here.........',profileImage)
//   this.triggerSubject.next(profileImage); // Emit an profile pic to notify the header component
// }


}