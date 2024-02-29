import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

  public onnotifaction: boolean = false;

  notification() {
    this.onnotifaction = !this.onnotifaction
  }

}
