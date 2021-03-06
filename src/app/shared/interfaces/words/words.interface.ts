import { Difficulty } from '@shared/enums/difficulty/difficulty.enum';

export interface Words {
  words: string[],
  difficulty: Difficulty;
  totalErrors: number;
}
