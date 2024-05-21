import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private history: string[] = [];

  constructor(private router: Router) {
   // console.log('HERE we are >',this.history)
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.history.push(event.url);
      }
    });
  }

  public getPreviousUrl(): string | null {
    console.log(this.history.length,'>>>>',this.history)
    if (this.history.length > 1) {
      //console.log('>>>>',this.history[this.history.length - 2])
      return this.history[this.history.length - 2];
    }
    return null;
  }
}
