import { Component } from '@angular/core';

@Component({
  selector: 'app-therapist-signup', 
  templateUrl: './therapist-signup.component.html',
  styleUrl: './therapist-signup.component.scss'
})
export class TherapistSignupComponent {
  public show: boolean = false;
  
  showPassword() {
    this.show = !this.show;
  }
}
