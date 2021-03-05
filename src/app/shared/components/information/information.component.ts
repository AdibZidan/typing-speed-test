import { Component } from '@angular/core';
import { Difficulty } from '@shared/enums/difficulty/difficulty.enum';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent {

  public totalWords: number = 0;
  public totalErrors: number = 0;
  public difficulty: Difficulty = Difficulty.INTERMEDIATE;

}
