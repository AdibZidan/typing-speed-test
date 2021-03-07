import { Action, createReducer, on } from '@ngrx/store';
import { incrementErrorCount } from '@shared/store/actions/error/error.actions';

const initialErrorCount: number = 0;

const _errorReducer = createReducer(
  initialErrorCount,
  on(
    incrementErrorCount,
    (state: number): number => state + 1
  )
);

export function errorReducer(
  state: undefined | number,
  action: Action
): number {
  return _errorReducer(state, action);
}
