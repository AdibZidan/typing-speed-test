import { createAction, props } from '@ngrx/store';

export const calculateWordsPerMinute = createAction(
  'Calculate Words Per Minute',
  props<{ length: number, words: string; }>()
);
