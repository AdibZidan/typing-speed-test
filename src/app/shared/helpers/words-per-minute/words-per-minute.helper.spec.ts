import { WordsPerMinuteHelper } from './words-per-minute.helper';

describe('WordsPerMinuteHelper', () => {

  it('Should calculate the average', () => {
    const words: string = 'Typing Speed Test HYPE ! ! !';
    const actual: number = WordsPerMinuteHelper.getAverage(words);

    expect(actual).toEqual(3);
  });

});
