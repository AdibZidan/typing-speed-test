import { ViewType } from '@shared/enums/view-type/view-type.enum';
import { View } from '@shared/interfaces/view/view.interface';
import { Views } from '@shared/interfaces/views/views.interface';

export class ViewsHelper {

  private constructor() { }

  public static getUpdatedView(state: Views, viewType: ViewType, isShown: boolean): Views {
    const keys: string[] = Object.keys(state);

    if (keys.includes(viewType)) {
      return this.updateViewState(state, viewType, isShown);
    }

    return state;
  }

  private static updateViewState(views: Views, viewType: ViewType, isShown: boolean): Views {
    const view: View = views[viewType];
    const updatedView: View = { ...view, isShown };

    return {
      ...views,
      [viewType]: updatedView
    };
  }

}
