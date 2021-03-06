import { Difficulty } from '@shared/enums/difficulty/difficulty.enum';

export class DifficultyHelper {

  private constructor() { }

  public static difficulties: Difficulty[] = [
    Difficulty.EASY,
    Difficulty.INTERMEDIATE,
    Difficulty.CHALLENGING
  ];

}
