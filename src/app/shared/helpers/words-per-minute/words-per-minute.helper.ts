export class WordsPerMinuteHelper {

  private constructor() { }

  public static getAverage(words: string): number {
    return this.calculateAverage(this.getLength(words));
  }

  private static getLength(words: string): number[] {
    return words.split(' ').map((word: string): number => word.length);
  }

  private static calculateAverage(value: number[]): number {
    return Math.round(value.reduce((
      accumulator: number,
      currentValue: number
    ): number => accumulator + currentValue) / value.length);
  }

}
