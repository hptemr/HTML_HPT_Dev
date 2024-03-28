import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error400Component } from './error400/error400.component'; 

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'error400',
        component: Error400Component
      }, 
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorPagesRoutingModule { }
