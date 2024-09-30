import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button'; 
import { MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-add-participants',
  standalone: true,
  imports: [MatIconModule, MatCheckboxModule,MatButtonModule,MatDialogModule], 
  templateUrl: './add-participants.component.html',
  styleUrl: './add-participants.component.scss'
})
export class AddParticipantsComponent {

}
