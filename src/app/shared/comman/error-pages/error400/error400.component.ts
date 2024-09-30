import { Component } from '@angular/core';
import { CommonService } from 'src/app/shared/services/helper/common.service';

@Component({
  selector: 'app-error400',
  templateUrl: './error400.component.html',
  styleUrls: ['./error400.component.scss']
})
export class Error400Component {
  constructor(private commonService: CommonService) {
  }

  backToHome() {
    this.commonService.redirectToHome()
  }
}
