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
  pathValues:any = []
  tempPathValues:any = []
  constructor(private router: Router,private authService: AuthService) {
    this.userType = this.authService.getLoggedInInfo('role').replace('_','-')
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
    localStorage.removeItem("pathValues")
    this.pathValues = []
    this.pathValues.push({link:"/manage-documents/"+url,name:type})
    localStorage.setItem("pathValues",JSON.stringify(this.pathValues))
    this.labelName = type
    this.rootDirectoryUrl = url
  }

  ngOnInit() {
    var pathValues = localStorage.getItem("pathValues")
    this.tempPathValues = (pathValues && pathValues!=null)?JSON.parse(pathValues):[]
    this.tempPathValues.forEach((value:any) => {
      let index = this.pathValues.findIndex((item:any) => item.name === value.name);
      if (index === -1) {
        this.pathValues.push(value)
      }
    })
  }

  removeElementsFromIndex(arr:any, startIndex:any) {
    if (startIndex < 0 || startIndex >= arr.length) {
      return arr;
    }
    
    arr.splice(startIndex);
    return arr;
  }
  
  async backToDirectory(item:any){
    var index = this.pathValues.findIndex((obj:any) => obj.name === item.name);
    this.tempPathValues = await this.removeElementsFromIndex(this.pathValues, index+1);
    localStorage.setItem("pathValues",JSON.stringify(this.tempPathValues))
    window.open(`${window.location.origin}`+"/"+`${this.userType}`+item.link,"_self");
  }

}
