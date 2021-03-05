import { createSelector, DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';
import { ViewType } from '@shared/enums/view-type/view-type.enum';
import { AppState } from '@shared/interfaces/app-state/app-state.interface';
import { View } from '@shared/interfaces/view/view.interface';
import { Views } from '@shared/interfaces/views/views.interface';

const initialViewsState = (state: AppState): Views => state.views;

export const selectView = (type: ViewType): MemoizedSelector<AppState, View, DefaultProjectorFn<View>> =>
  createSelector(
    initialViewsState,
    (state): View => state[type]
  );
