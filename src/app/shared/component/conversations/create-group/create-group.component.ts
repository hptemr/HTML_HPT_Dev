import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button'; 
import { MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-create-group', 
  standalone: true,
  imports: [MatIconModule,MatCheckboxModule,MatButtonModule,MatDialogModule],
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.scss'
})
export class CreateGroupComponent {

}
