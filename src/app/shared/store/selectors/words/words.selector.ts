import { createSelector } from '@ngrx/store';
import { Difficulty } from '@shared/enums/difficulty/difficulty.enum';
import { AppState } from '@shared/interfaces/app-state/app-state.interface';
import { Words } from '@shared/interfaces/words/words.interface';

const initialWordsState = (state: AppState): Words => state.words;

export const selectWords = createSelector(
  initialWordsState,
  ({ words }): string => words
);

export const selectDifficulty = createSelector(
  initialWordsState,
  ({ difficulty }): Difficulty => difficulty
);

export const selectLetter = createSelector(
  initialWordsState,
  ({ letter }): string => letter
);

export const selectWordsLength = createSelector(
  initialWordsState,
  ({ words }): number => {
    if (words.length > 0) {
      return words.split(' ').length;
    }

    return 0;
  }
);
