import { createAction, props } from '@ngrx/store';
import { ViewType } from '@shared/enums/view-type/view-type.enum';

export const showView = createAction(
  'Show View',
  props<{ viewType: ViewType; }>()
);

export const hideView = createAction(
  'Hide View',
  props<{ viewType: ViewType; }>()
);
