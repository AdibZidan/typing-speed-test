import { Component, OnDestroy, OnInit } from '@angular/core';
import { fadeIn } from '@animations';
import { Store } from '@ngrx/store';
import { ViewType } from '@shared/enums/view-type/view-type.enum';
import { AppState } from '@shared/interfaces/app-state/app-state.interface';
import { View } from '@shared/interfaces/view/view.interface';
import { Words } from '@shared/interfaces/words/words.interface';
import { selectView } from '@shared/store/selectors/view/view.selector';
import { selectLetter } from '@shared/store/selectors/words/words.selector';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss'],
  animations: [fadeIn]
})
export class WordsComponent implements OnInit, OnDestroy {

  private _subscription: Subscription = new Subscription();

  public view$!: Observable<View>;
  public words$!: Observable<Words>;
  public letter!: string;

  constructor(
    private store$: Store<AppState>
  ) { }

  public ngOnInit(): void {
    this.view$ = this.store$.select(selectView(ViewType.FORM));
    this.words$ = this.store$.select('words');
    this.selectLetter();
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private selectLetter(): void {
    this._subscription = this.store$
      .select(selectLetter)
      .subscribe((letter: string): string =>
        this.letter = letter
      );
  }

}
