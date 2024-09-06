import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OnePageNoteModalComponent } from '../one-page-note-modal/one-page-note-modal.component';
 
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-e-fax-modal', 
  templateUrl: './e-fax-modal.component.html',
  styleUrl: './e-fax-modal.component.scss'
})
export class EFaxModalComponent {
  toppings = new FormControl('');

  sendToList: string[] = [
    'Dr. Ponnappa', 
    'Dr.Stanbrige', 
    'Dr.Campbell-Gillies', 
    'Dr.Anderson', 
    'Dr.Kazantzis', 
    'Dr.Meldrum'];

    constructor(public dialog: MatDialog) {} 
    backtoOnePageModal(){
      const dialogRef = this.dialog.open(OnePageNoteModalComponent,{
        width:"960px",
      });
    }

    myControl = new FormControl();
    options: Observable<string[]>;

    ngOnInit() {
      this.options = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => {
          const filterValue = value.toLowerCase();
  
          return this.allOptions.filter(option => option.toLowerCase().includes(filterValue));
        })
      );
    }
    allOptions = ['Apple', 'Banana', 'Orange', 'Pear', 'Grape'];

    selectedOptions: string[] = [];
  
    addOption(option: string) {
      this.selectedOptions.push(option);
      this.myControl.setValue(this.selectedOptions);
    }
  
    removeOption(option: string) {
      this.selectedOptions = this.selectedOptions.filter(item => item !== option);
      this.myControl.setValue(this.selectedOptions);
    }
}
