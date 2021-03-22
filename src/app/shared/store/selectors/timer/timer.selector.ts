import { createSelector } from '@ngrx/store';
import { AppState } from '@shared/interfaces/app-state/app-state.interface';

const initialTimerState = (state: AppState): number => state.timer;

export const selectTimer = createSelector(
  initialTimerState,
  (state: number): number => state
);
