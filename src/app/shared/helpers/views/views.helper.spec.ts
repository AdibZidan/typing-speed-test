import { ViewType } from '@shared/enums/view-type/view-type.enum';
import { Views } from '@shared/interfaces/views/views.interface';
import { viewsMock } from '@shared/mocks/views/views.mock';
import { ViewsHelper } from './views.helper';

describe('ViewsHelper', () => {
  it('Should get the updated view', () => {
    const actual: Views = ViewsHelper.getUpdatedView(viewsMock, ViewType.DIFFICULTY_SELECTOR, true);
    const expected: Views = {
      difficultySelector: {
        isShown: true
      },
      form: {
        isShown: false
      },
      footer: {
        isShown: false
      }
    };

    expect(actual).toEqual(expected);
  });

  it('Should return the default view if given an invalid property name', () => {
    const actual: Views = ViewsHelper.getUpdatedView(viewsMock, 'test' as ViewType, true);
    const expected: Views = viewsMock;

    expect(actual).toEqual(expected);
  });
});
