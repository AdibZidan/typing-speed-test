import { Action, createReducer, on } from '@ngrx/store';
import { Difficulty } from '@shared/enums/difficulty/difficulty.enum';
import { WordsHelper } from '@shared/helpers/words/words.helper';
import { Words } from '@shared/interfaces/words/words.interface';
import { setDifficulty, setLetter } from '@shared/store/actions/words/words.actions';

const initialWordsState: Words = {
  words: '',
  difficulty: Difficulty.EASY,
  letter: ''
};

const _wordsReducer = createReducer(
  initialWordsState,
  on(
    setDifficulty, (state, { difficulty }): Words => {
      switch (difficulty) {
        case Difficulty.EASY:
          return {
            ...state,
            words: WordsHelper.getEasyWords(),
            difficulty
          };

        case Difficulty.INTERMEDIATE:
          return {
            ...state,
            words: WordsHelper.getIntermediateWords(),
            difficulty
          };

        default:
          return {
            ...state,
            words: WordsHelper.getChallengingWords(),
            difficulty
          };
      }
    }
  ),
  on(
    setLetter,
    (state: Words, { letter }): Words => ({
      ...state,
      letter
    })
  )
);

export function wordsReducer(
  state: undefined | Words,
  action: Action
): Words {
  return _wordsReducer(state, action);
}
