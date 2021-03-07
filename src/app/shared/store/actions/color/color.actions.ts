import { createAction, props } from '@ngrx/store';

export const setTextColor = createAction(
  'Set Text Color',
  props<{ color: string; }>()
);
