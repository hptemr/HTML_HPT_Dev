import { Component } from '@angular/core';
import { AddExerciseComponent } from '../add-exercise/add-exercise.component';
import { MatDialog } from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { PreviewModalComponent } from 'src/app/shared/comman/preview-modal/preview-modal.component';

@Component({
  selector: 'app-objective', 
  templateUrl: './objective.component.html',
  styleUrl: './objective.component.scss'
})
export class ObjectiveComponent {
  isDisabled = true;
  selectedValue = '0';
  
  clickedIndex = 0; 
  clickedIndex2 = 0;
  clickedIndex3 = 0;
  clickedIndex4 = 0;
  clickedIndex5 = 0;
  clickedIndex6 = 0;
  clickedIndex7 = 0;
  clickedIndex8 = 0;
  clickedIndex9 = 0;
  clickedIndex10 = 0; 
  clickedIndex11 =0;
  clickedIndex12 = 0;
  clickedIndex13 = 0;
  clickedIndex14 = 0;
  clickedIndex15 = 0;
  clickedIndex16 = 0;
  clickedIndex17 = 0;
  clickedIndex18 = 0;
  clickedIndex19 = 0; 
  clickedIndex20 = 0;
  clickedIndex21 = 0;
  clickedIndex22 = 0;
  clickedIndex23 = 0;
  clickedIndex24 = 0;
  clickedIndex25 = 0;
  clickedIndex26 = 0;
  clickedIndex27 = 0;
  clickedIndex28 = 0;
  tabs = [
    {number: '1'}, {number: '2'}, {number: '3'},
    {number: '4'}, {number: '5'}, {number: '6'},
    {number: '7'}, {number: '8'}, {number: '9'},
    {number: '10'}
  ];

  constructor(public dialog: MatDialog) {}
 
  addExersiceModal() {
    const dialogRef = this.dialog.open(AddExerciseComponent, {
      panelClass:[ 'custom-alert-container','modal--wrapper'],
    });
  }
  previewModal() {
    const dialogRef = this.dialog.open(PreviewModalComponent, {
      panelClass:[ 'preview--modal'],
    });
  }
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,  
    nav: true,
    items:1,
    navText: [
      "<i class='fa fa-arrow-left'></i>",
      "<i class='fa fa-arrow-right'></i>"
  ],
    responsive:{
      0:{
          items:1,
          autoWidth:true,
      },
      600:{
          items:2,
          slideBy: 2
      },
      1000:{
          items:3,
          slideBy: 3
      },
      1200:{
        items:4,
        slideBy: 4
    }
  }
    
  }

  edatatable = [
    {
      set:'1',
      reps:'10',
      weight:'50 lbs',
      distance: '1',
      time: 'NA'
    }, 
  ]
}
