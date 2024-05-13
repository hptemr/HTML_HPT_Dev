import { Component, NgZone } from '@angular/core';
import { AuthService } from './shared/services/api/auth.service';

const MINUTES_UNITL_AUTO_LOGOUT = 180 //in Minutes => 3Hours
const CHECK_INTERVALL = 60000 // in ms => 1 minute

const STORE_KEY = 'lastAction';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  timediff = 0
  isPopUpShow = true
  checkUserActivity: any
  constructor(private ngZone: NgZone, private authService: AuthService) {
  }

  ngOnInit() {
    this.checkIdleUser()
  }

  /****
   * Idle User Code START
   * Code to check Logged in User is Idle or not, if User is idle for 3 hours then logout it  
  */
  checkIdleUser() {
    if (localStorage.getItem('user') != null) {
      this.lastAction = Date.now();
      this.check();
      this.initListener();
      this.initInterval();
    }
  }

  get lastAction() {
    let last: any
    last = localStorage.getItem(STORE_KEY) ? localStorage.getItem(STORE_KEY) : 0
    return parseInt(last);
  }

  set lastAction(value) {
    localStorage.setItem(STORE_KEY, value.toString());
  }

  initListener() {
    this.ngZone.runOutsideAngular(() => {
      document.body.addEventListener('click', () => this.reset());
      //document.body.addEventListener('mousemove', () => this.reset());
    });
  }

  initInterval() {
    this.ngZone.runOutsideAngular(() => {
      this.checkUserActivity = setInterval(() => {
        this.check();
      }, CHECK_INTERVALL);
    })
  }

  reset() {
    const now = Date.now()
    const timeleft = this.lastAction + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
    const diff = timeleft - now;
    if (diff > 0) {
      this.lastAction = Date.now();
    }
  }

  stopUserActivityCheck() {
    clearInterval(this.checkUserActivity);
  }

  check() {
    const now = Date.now();
    const timeleft = this.lastAction + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
    const diff = timeleft - now;
    const isTimeout = diff < 0;
    if (this.isPopUpShow && diff < 600000) {
      console.log("<==Show popup 10minutes before==>:")
      this.isPopUpShow = false
    }

    if (isTimeout && this.timediff >= 0) {
      let redirect = '/'
      if (this.authService.getLoggedInInfo("role") != 'patient') {
        redirect = '/admin/login'
      }

      let req_vars = { _id: this.authService.getLoggedInInfo("_id") }
      this.authService.apiRequest('post', 'auth/logout', req_vars).subscribe(result => {
        localStorage.removeItem('user')
        window.location.href = redirect
      })
    }
    this.timediff = diff
  }
  /****
   * Idle User Code END
  */

}
