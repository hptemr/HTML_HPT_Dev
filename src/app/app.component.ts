import { Component, NgZone } from '@angular/core';

const MINUTES_UNITL_AUTO_LOGOUT = 1 // in Minutes
const CHECK_INTERVALL = 1000 // in ms
const STORE_KEY = 'lastAction';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  timediff = 0
  checkUserActivity: any
  constructor(
    private ngZone: NgZone
    // private router: Router,
    // private activeRoute: ActivatedRoute,
    // public dialog: MatDialog,
    // private snack: MatSnackBar,
    // private locationStrategy: LocationStrategy,
  ) {
  }

  ngOnInit() {
    this.checkIdleUser()
  }

  checkIdleUser() {
    if (localStorage.getItem('user') != null) { 
      this.lastAction = Date.now();
      this.check();
      this.initListener();
      this.initInterval();
    }else{
      console.log("*****Not loggin***")
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
      document.body.addEventListener('mousemove', () => this.reset());
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
    const now = Date.now();
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
    console.log("*****diff***", diff, "**timeleft**", timeleft)
    if (isTimeout && this.timediff >= 0) {
      console.log("*****Logout***")
      console.log("*****Logout***")
      console.log("*****Logout***")
      console.log("*****Logout***")
      console.log("*****Logout***")
    }
    this.timediff = diff
  }

}
