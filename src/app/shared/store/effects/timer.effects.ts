import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '@shared/interfaces/app-state/app-state.interface';
import { setTimerCount, startTimer, stopTimer } from '@shared/store/actions/timer/timer.actions';
import { ObservableInput, timer } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

@Injectable()
export class TimerEffects {

  constructor(
    private store$: Store<AppState>,
    private actions$: Actions
  ) { }

  public startTimer$ = createEffect(() => this.actions$.pipe(
    ofType(startTimer.type),
    switchMap((): ObservableInput<number> => timer(0, 1000)
      .pipe(
        takeUntil(this.actions$.pipe(ofType(stopTimer.type))),
        tap((timer: number): void => this.store$.dispatch(setTimerCount({ timer })))
      )
    )), { dispatch: false }
  );

}
