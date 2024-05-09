import { Component, NgZone } from '@angular/core';

//const MINUTES_UNITL_AUTO_LOGOUT = 180 //in Minutes => 3Hours

const MINUTES_UNITL_AUTO_LOGOUT = 15 //in Minutes => for Testing purpose only actual is 3hours
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
  constructor(private ngZone: NgZone) {
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
      localStorage.removeItem('user')
      window.location.href = '/'
    }
    this.timediff = diff
  }
  /****
   * Idle User Code END
  */

}
