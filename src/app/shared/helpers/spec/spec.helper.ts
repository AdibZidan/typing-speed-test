export class SpecHelper {

  private constructor() { }

  public static getArguments(spy: jasmine.Spy): any[][] {
    return spy.calls.all().map(all => all.args);
  }

  public static flatten(array: any[]): any[] {
    return array.reduce((accumulator, currentValue) => accumulator.concat(currentValue, []));
  }

}
