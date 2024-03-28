import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPagesRoutingModule } from './error-pages-routing.module';
import { Error400Component } from './error400/error400.component'; 


@NgModule({
  declarations: [
    Error400Component, 
  ],
  imports: [
    CommonModule,
    ErrorPagesRoutingModule
  ]
})
export class ErrorPagesModule { }
