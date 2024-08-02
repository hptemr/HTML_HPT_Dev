import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/api/auth.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss'
})
export class DocumentsComponent {
  labelName = ""
  userType = ""
  rootDirectoryUrl = ""
  constructor(private router: Router,private authService: AuthService ) {
    this.userType = this.authService.getLoggedInInfo('role').replace('_','-')
    console.log(this.rootDirectoryUrl)
    if(this.router.url.split('/')[this.router.url.split('/').length-1]=='appointment-documents'){
      this.labelName = "Apppointment Documents"
      this.rootDirectoryUrl = 'apppointment-documents'
    }else if(this.router.url.split('/')[this.router.url.split('/').length-1]=='protocols'){
      this.labelName = "Protocol Documents"
      this.rootDirectoryUrl = 'protocols'
    }else{
      this.labelName = "System Documents"
      this.rootDirectoryUrl = 'system-documents'
    }
  }

  goTo(type:any, url:any){
    this.labelName = type
    this.rootDirectoryUrl = url
  }

}
