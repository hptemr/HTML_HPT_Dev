import { Component } from '@angular/core';

@Component({
  selector: 'app-signup-support-team', 
  templateUrl: './signup-support-team.component.html',
  styleUrl: './signup-support-team.component.scss'
})
export class SignupSupportTeamComponent {
  public show: boolean = false;
  
  showPassword() {
    this.show = !this.show;
  }
}
