import { Injectable } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private history: string[] = [];
  private previousUrl: string | null = null;
  private currentUrl: string | null = null;


  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.urlAfterRedirects;
      }
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.history.push(event.url);
      }
    });
  }


  getPreviousUrl(): string | null {
    return this.previousUrl;
  }

  public getPreviousUrls(): string | null {
    //console.log('history url >>>>',this.history)
    if (this.history.length > 1) {
      return this.history[this.history.length - 2];
    }
    return null;
  }


  // constructor(private router: Router) {
  //   this.router.events.subscribe(event => {
  //     if (event instanceof NavigationStart) {
  //       this.history.push(event.url);
  //     }
  //   });
  // }


}
