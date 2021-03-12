import { Component } from '@angular/core';
import { fadeIn } from '@animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [fadeIn]
})
export class HeaderComponent {

  public title: string = 'Typing Speed Test';

}
