import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ViewType } from '@shared/enums/view-type/view-type.enum';
import { AppState } from '@shared/interfaces/app-state/app-state.interface';
import { showView } from '@shared/store/actions/view.actions';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    private store$: Store<AppState>
  ) { }

  public ngOnInit(): void {
    this.store$.dispatch(showView({ viewType: ViewType.DIFFICULTY_SELECTOR }));
  }

}
