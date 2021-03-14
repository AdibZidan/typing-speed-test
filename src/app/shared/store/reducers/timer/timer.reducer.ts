import { Action, createReducer, on } from '@ngrx/store';
import { setTimerCount } from '@shared/store/actions/timer/timer.actions';

const initialTimerCountState: number = 0;

const _timerReducer = createReducer(
  initialTimerCountState,
  on(
    setTimerCount, (state: number, { timer }): number => (timer * 1000)
  )
);

export function timerReducer(
  state: undefined | number,
  action: Action
): number {
  return _timerReducer(state, action);
}
