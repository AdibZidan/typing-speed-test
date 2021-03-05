import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Difficulty } from '@shared/enums/difficulty/difficulty.enum';
import { ViewType } from '@shared/enums/view-type/view-type.enum';
import { AppState } from '@shared/interfaces/app-state/app-state.interface';
import { View } from '@shared/interfaces/view/view.interface';
import { selectView } from '@shared/store/selectors/view/view.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-difficulty-selector',
  templateUrl: './difficulty-selector.component.html',
  styleUrls: ['./difficulty-selector.component.scss']
})
export class DifficultySelectorComponent implements OnInit {

  public view$!: Observable<View>;
  public difficulties: Difficulty[] = [Difficulty.EASY, Difficulty.INTERMEDIATE, Difficulty.CHALLENGING];

  constructor(
    private store$: Store<AppState>
  ) { }

  public ngOnInit(): void {
    this.view$ = this.store$.select(selectView(ViewType.DIFFICULTY_SELECTOR));
  }

}
