import { Component } from '@angular/core';

@Component({
  selector: 'app-billing-team-signup', 
  templateUrl: './billing-team-signup.component.html',
  styleUrl: './billing-team-signup.component.scss'
})
export class BillingTeamSignupComponent {
  public show: boolean = false;
  
  showPassword() {
    this.show = !this.show;
  }
}
