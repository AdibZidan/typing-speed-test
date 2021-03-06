import { SpecHelper } from './spec.helper';

describe('SpecHelper', () => {
  let spy: jasmine.Spy;

  beforeEach(() => {
    spy = jasmine.createSpy('dispatch');

    spy({ one: '1' });
    spy({ two: '2' });
    spy({ three: '3' });
  });

  it('Should get the arguments from the spy', () => {
    const actual: any[][] = SpecHelper.getArguments(spy);
    const expected: any[][] = [[{ one: '1' }], [{ two: '2' }], [{ three: '3' }]];

    expect(actual.length).toEqual(3);
    expect(actual).toEqual(expected);
  });

  it('Should flatten an array', () => {
    const array: any[] = [[1, 2], [3, 4], [5, 6]];
    const actual: any[] = SpecHelper.flatten(array);
    const expected: any[] = [1, 2, 3, 4, 5, 6];

    expect(actual).toEqual(expected);
  });
});
