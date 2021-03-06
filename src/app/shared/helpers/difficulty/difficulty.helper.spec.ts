import { Difficulty } from "@shared/enums/difficulty/difficulty.enum";
import { DifficultyHelper } from "./difficulty.helper";

describe('DifficultyHelper', () => {
  it('Should have a difficulties property', () => {
    expect(DifficultyHelper.difficulties).toBeDefined();
    expect(DifficultyHelper.difficulties.length).toEqual(3);
    expect(DifficultyHelper.difficulties).toEqual([
      Difficulty.EASY,
      Difficulty.INTERMEDIATE,
      Difficulty.CHALLENGING
    ]);
  });
});
