import { Direction } from '@angular/cdk/bidi';
import { Component, Inject, Renderer2 } from '@angular/core'; 
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: [],
})
export class AuthLayoutComponent {
  direction!: Direction; 
  constructor(
    @Inject(DOCUMENT) private document: Document, 
    private renderer: Renderer2
  ) {
     };

  
  
}
