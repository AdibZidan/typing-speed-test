import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { WordsPerMinuteHelper } from '@shared/helpers/words-per-minute/words-per-minute.helper';
import { AppState } from '@shared/interfaces/app-state/app-state.interface';
import { calculateWordsPerMinute } from '@shared/store/actions/words-per-minute/words-per-minute.actions';
import { setLetter } from '@shared/store/actions/words/words.actions';
import { ObservableInput, of } from 'rxjs';
import { switchMap, tap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class WordsPerMinuteEffects {

  constructor(
    private store$: Store<AppState>,
    private actions$: Actions
  ) { }

  public calculateWordsPerMinute$ = createEffect(() => this.actions$.pipe(
    ofType(setLetter.type),
    withLatestFrom(this.store$),
    switchMap(([type, appState]): ObservableInput<AppState> => of(appState)),
    tap(({ words, totalErrors }): void => {
      const average: number = WordsPerMinuteHelper.getAverage(words.words);
      const length: number = words.letter.length;

      if (length >= average) {
        const round: number = Math.round(length / average);
        const wordsPerMinute: number = Math.abs(round - totalErrors);

        this.store$.dispatch(calculateWordsPerMinute({ wordsPerMinute }));
      }
    })),
    { dispatch: false }
  );

}
