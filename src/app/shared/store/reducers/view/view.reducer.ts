import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { ViewsHelper } from '@shared/helpers/views/views.helper';
import { Views } from '@shared/interfaces/views/views.interface';
import { hideView, showView } from '../../actions/view/view.actions';

const initialViewsState: Views = {
  difficultySelector: {
    isShown: true
  },
  form: {
    isShown: false
  },
  footer: {
    isShown: false
  }
};

const _viewReducer: ActionReducer<Views, Action> = createReducer(
  initialViewsState,
  on(
    showView, (state, { viewType }): Views => ViewsHelper.getUpdatedView(state, viewType, true)
  ),
  on(
    hideView, (state, { viewType }): Views => ViewsHelper.getUpdatedView(state, viewType, false)
  )
);

export function viewReducer(
  state: undefined | Views,
  action: Action
): Views {
  return _viewReducer(state, action);
}
