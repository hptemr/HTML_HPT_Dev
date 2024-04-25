import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-signup', 
  templateUrl: './admin-signup.component.html',
  styleUrl: './admin-signup.component.scss'
})
export class AdminSignupComponent {
  public show: boolean = false;
  
  showPassword() {
    this.show = !this.show;
  }
}
