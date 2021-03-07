import { Action, createReducer, on } from '@ngrx/store';
import { Difficulty } from '@shared/enums/difficulty/difficulty.enum';
import { WordsHelper } from '@shared/helpers/words/words.helper';
import { Words } from '@shared/interfaces/words/words.interface';
import { setDifficulty } from '@shared/store/actions/words/words.actions';

const initialWordsState: Words = {
  words: '',
  difficulty: Difficulty.EASY
};

const _wordsReducer = createReducer(
  initialWordsState,
  on(
    setDifficulty, (state, { difficulty }): Words => {
      switch (difficulty) {
        case Difficulty.EASY:
          return {
            words: WordsHelper.getEasyWords(),
            difficulty
          };

        case Difficulty.INTERMEDIATE:
          return {
            words: WordsHelper.getIntermediateWords(),
            difficulty
          };

        default:
          return {
            words: WordsHelper.getChallengingWords(),
            difficulty
          };
      }
    }
  )
);

export function wordsReducer(
  state: undefined | Words,
  action: Action
): Words {
  return _wordsReducer(state, action);
}
