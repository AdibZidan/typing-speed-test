import { Component, OnInit } from '@angular/core';
import { fadeIn } from '@animations';
import { Store } from '@ngrx/store';
import { Difficulty } from '@shared/enums/difficulty/difficulty.enum';
import { AppState } from '@shared/interfaces/app-state/app-state.interface';
import { selectDifficulty, selectWordsLength } from '@shared/store/selectors/words/words.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss'],
  animations: [fadeIn]
})
export class InformationComponent implements OnInit {

  public difficulty$!: Observable<Difficulty>;
  public totalErrors$!: Observable<number>;
  public totalWords$!: Observable<number>;
  public wordsPerMinute$!: Observable<number>;

  constructor(
    private store$: Store<AppState>
  ) { }

  public ngOnInit(): void {
    this.difficulty$ = this.store$.select(selectDifficulty);
    this.totalErrors$ = this.store$.select('totalErrors');
    this.totalWords$ = this.store$.select(selectWordsLength);
    this.wordsPerMinute$ = this.store$.select('wordsPerMinute');
  }

}
