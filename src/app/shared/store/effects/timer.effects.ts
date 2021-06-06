import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ViewType } from '@shared/enums/view-type/view-type.enum';
import { AppState } from '@shared/interfaces/app-state/app-state.interface';
import { Words } from '@shared/interfaces/words/words.interface';
import { setTimerCount, startTimer, stopTimer } from '@shared/store/actions/timer/timer.actions';
import { hideView, showView } from '@shared/store/actions/view/view.actions';
import { ObservableInput, of, timer } from 'rxjs';
import { switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { setLetter } from '../actions/words/words.actions';

@Injectable()
export class TimerEffects {

  constructor(
    private store$: Store<AppState>,
    private actions$: Actions
  ) { }

  public startTimer$ = createEffect(() => this.actions$.pipe(
    ofType(setLetter.type),
    withLatestFrom(this.store$),
    switchMap(([type, appState]) => of(appState)),
    tap(({ timer, words }: AppState): void => {
      const { letter }: Words = words;

      if (letter.length === 1 && timer === 0) {
        this.store$.dispatch(startTimer());
      }
    })
  ), { dispatch: false });

  public incrementTimer$ = createEffect(() => this.actions$.pipe(
    ofType(startTimer.type),
    switchMap((): ObservableInput<number> => timer(0, 1000)
      .pipe(
        takeUntil(this.actions$.pipe(ofType(stopTimer.type))),
        tap((timer: number): void => this.store$.dispatch(setTimerCount({ timer })))
      )
    )), { dispatch: false }
  );

  public updateViews$ = createEffect(() => this.actions$.pipe(
    ofType(stopTimer.type),
    tap((): void => this.updateViews(),
      takeUntil(this.actions$.pipe(ofType(showView.type))),
    )), { dispatch: false }
  );

  private updateViews(): void {
    const viewsToHide: ViewType[] = [
      ViewType.FOOTER,
      ViewType.FORM,
      ViewType.INSTRUCTIONS
    ];

    viewsToHide.forEach((viewType: ViewType): void =>
      this.store$.dispatch(hideView({ viewType }))
    );

    this.store$.dispatch(showView({ viewType: ViewType.MODAL }));
  }

}
