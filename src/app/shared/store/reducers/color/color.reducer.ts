import { Action, createReducer, on } from '@ngrx/store';
import { setTextColor } from '@shared/store/actions/color/color.actions';

const initialColorState: string = '';

const _colorReducer = createReducer(
  initialColorState,
  on(
    setTextColor,
    (state: string, { color }): string => color
  )
);

export function colorReducer(
  state: undefined | string,
  action: Action
): string {
  return _colorReducer(state, action);
}
