import { Action, createReducer, on } from '@ngrx/store';
import { Difficulty } from '@shared/enums/difficulty/difficulty.enum';
import { WordsHelper } from '@shared/helpers/words/words.helper';
import { Words } from '@shared/interfaces/words/words.interface';
import { setDifficulty } from '@shared/store/actions/words/words.actions';

const initialWordsState: Words = {
  words: [],
  difficulty: Difficulty.EASY,
  totalErrors: 0
};

const _wordsreducer = createReducer(
  initialWordsState,
  on(
    setDifficulty, ({ totalErrors }, { difficulty }): Words => {
      switch (difficulty) {
        case Difficulty.EASY:
          return {
            words: WordsHelper.getEasyWords(),
            difficulty,
            totalErrors
          };

        case Difficulty.INTERMEDIATE:
          return {
            words: WordsHelper.getIntermediateWords(),
            difficulty,
            totalErrors
          };

        default:
          return {
            words: WordsHelper.getChallengingWords(),
            difficulty,
            totalErrors
          };
      }
    }
  )
);

export function wordsReducer(
  state: undefined | Words,
  action: Action
): Words {
  return _wordsreducer(state, action);
}
