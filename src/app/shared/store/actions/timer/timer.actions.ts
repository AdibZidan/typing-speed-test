import { createAction, props } from '@ngrx/store';

export const startTimer = createAction('Start the Timer');
export const stopTimer = createAction('Stop the Timer');
export const resetTimer = createAction('Reset the Timer');

export const setTimerCount = createAction(
  'Set the Timer Count',
  props<{ timer: number; }>()
);
