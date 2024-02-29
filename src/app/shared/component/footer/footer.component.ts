import { Component } from '@angular/core';
import { NavservicesService } from '../../services/nav/navservices.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent {

  constructor(public navService: NavservicesService) { }

}
