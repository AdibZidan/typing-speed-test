import { createAction, props } from '@ngrx/store';
import { Difficulty } from '@shared/enums/difficulty/difficulty.enum';

export const setDifficulty = createAction(
  'Set Difficulty',
  props<{ difficulty: Difficulty; }>()
);
