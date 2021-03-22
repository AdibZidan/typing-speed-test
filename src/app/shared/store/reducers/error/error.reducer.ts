import { Action, createReducer, on } from '@ngrx/store';
import { resetErrorCount, updateErrorCount } from '@shared/store/actions/error/error.actions';

const initialErrorCount: number = 0;

const _errorReducer = createReducer(
  initialErrorCount,
  on(
    updateErrorCount,
    (state: number): number => state + 1
  ),
  on(
    resetErrorCount,
    (state: number): number => initialErrorCount
  )
);

export function errorReducer(
  state: undefined | number,
  action: Action
): number {
  return _errorReducer(state, action);
}
