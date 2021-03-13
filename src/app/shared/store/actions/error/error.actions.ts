import { createAction, props } from '@ngrx/store';

export const updateErrorCount = createAction(
  'Update Error Count',
  props<{ count: number; }>()
);
