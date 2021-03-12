import { Component, OnInit } from '@angular/core';
import { fadeIn } from '@animations';
import { Store } from '@ngrx/store';
import { Difficulty } from '@shared/enums/difficulty/difficulty.enum';
import { ViewType } from '@shared/enums/view-type/view-type.enum';
import { DifficultyHelper } from '@shared/helpers/difficulty/difficulty.helper';
import { AppState } from '@shared/interfaces/app-state/app-state.interface';
import { View } from '@shared/interfaces/view/view.interface';
import { hideView, showView } from '@shared/store/actions/view/view.actions';
import { setDifficulty } from '@shared/store/actions/words/words.actions';
import { selectView } from '@shared/store/selectors/view/view.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-difficulty-selector',
  templateUrl: './difficulty-selector.component.html',
  styleUrls: ['./difficulty-selector.component.scss'],
  animations: [fadeIn]
})
export class DifficultySelectorComponent implements OnInit {

  public view$!: Observable<View>;
  public difficulties: Difficulty[] = DifficultyHelper.difficulties;

  constructor(
    private store$: Store<AppState>
  ) { }

  public ngOnInit(): void {
    this.view$ = this.store$.select(selectView(ViewType.DIFFICULTY_SELECTOR));
  }

  public selectDifficulty(difficulty: Difficulty) {
    this.store$.dispatch(setDifficulty({ difficulty }));
    this.updateViewStates();
  }

  private updateViewStates(): void {
    this.store$.dispatch(hideView({ viewType: ViewType.DIFFICULTY_SELECTOR }));
    this.store$.dispatch(showView({ viewType: ViewType.FORM }));
    this.store$.dispatch(showView({ viewType: ViewType.FOOTER }));
  }

}
