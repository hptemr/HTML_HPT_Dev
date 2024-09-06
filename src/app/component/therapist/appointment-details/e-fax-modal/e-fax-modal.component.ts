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
          const filterValue = value;
  
          return this.allOptions.filter(option => option.includes(filterValue));
        })
      );
    }
    allOptions = ['Eithan Novak', 'Josie Mayo', 'Amora Stevens', 'Briella George', 'Calliope Stark'];

    selectedOptions: string[] = [];
  
    addOption(option: string) {
      this.selectedOptions.push(option);
      // this.myControl.setValue(this.selectedOptions);
    }
  
    removeOption(option: string) {
      console.log(this.selectedOptions)

      this.selectedOptions = this.selectedOptions.filter(item => item !== option);

      console.log(this.selectedOptions)

      // this.myControl.setValue(this.selectedOptions);
    }
}
