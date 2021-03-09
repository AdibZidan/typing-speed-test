import { Action, createReducer, on } from '@ngrx/store';
import { WordsPerMinuteHelper } from '@shared/helpers/words-per-minute/words-per-minute.helper';
import { calculateWordsPerMinute } from '@shared/store/actions/words-per-minute/words-per-minute.actions';

const initialWordsPerMinute: number = 0;

const _wordsPerMinuteReducer = createReducer(
  initialWordsPerMinute,
  on(
    calculateWordsPerMinute,
    (state: number, { length, words }): number => {
      const average: number = WordsPerMinuteHelper.getAverage(words);

      if (length >= average) {
        return Math.round(length / average);
      }

      return 0;
    }
  )
);

export function wordsPerMinuteReducer(
  state: undefined | number,
  action: Action
): number {
  return _wordsPerMinuteReducer(state, action);
}
