import { Action, createReducer, on } from '@ngrx/store';
import { Difficulty } from '@shared/enums/difficulty/difficulty.enum';
import { getDifficulty, setDifficulty } from '../../actions/difficulty/difficulty.actions';

const initialDifficultyState: Difficulty = Difficulty.EASY;

const _difficultyReducer = createReducer(
  initialDifficultyState,
  on(
    getDifficulty, (state: Difficulty): Difficulty => state
  ),
  on(
    setDifficulty, (state: Difficulty, { difficulty }): Difficulty => difficulty
  )
);

export function difficultyReducer(
  state: undefined | Difficulty,
  action: Action
): Difficulty {
  return _difficultyReducer(state, action);
}
