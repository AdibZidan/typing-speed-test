import { createAction, props } from '@ngrx/store';

export const calculateWordsPerMinute = createAction(
  'Calculate Words Per Minute',
  props<{ wordsPerMinute: number; }>()
);

export const resetCalculateWordsPerMinute = createAction('Reset Calculate Words Per Minute');
