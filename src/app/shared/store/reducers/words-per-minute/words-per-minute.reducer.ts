import { Action, createReducer, on } from '@ngrx/store';
import { calculateWordsPerMinute, resetCalculateWordsPerMinute } from '@shared/store/actions/words-per-minute/words-per-minute.actions';

const initialWordsPerMinute: number = 0;

const _wordsPerMinuteReducer = createReducer(
  initialWordsPerMinute,
  on(
    calculateWordsPerMinute,
    (state: number, { wordsPerMinute }): number => wordsPerMinute
  ),
  on(
    resetCalculateWordsPerMinute,
    (state: number): number => initialWordsPerMinute
  )
);

export function wordsPerMinuteReducer(
  state: undefined | number,
  action: Action
): number {
  return _wordsPerMinuteReducer(state, action);
}
