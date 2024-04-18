import { Component } from '@angular/core';

@Component({
  selector: 'app-practice-admin-signup', 
  templateUrl: './practice-admin-signup.component.html',
  styleUrl: './practice-admin-signup.component.scss'
})
export class PracticeAdminSignupComponent {
  public show: boolean = false;
  
  showPassword() {
    this.show = !this.show;
  }
}
