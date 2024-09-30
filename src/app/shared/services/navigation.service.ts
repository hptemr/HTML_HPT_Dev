import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private history: string[] = [];

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.history.push(event.url);
      }
    });
  }

  public getPreviousUrl(): string | null {
    //console.log('history url >>>>',this.history)
    if (this.history.length > 1) {
      return this.history[this.history.length - 2];
    }
    return null;
  }
}
