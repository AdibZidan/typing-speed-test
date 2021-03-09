import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ViewType } from '@shared/enums/view-type/view-type.enum';
import { AppState } from '@shared/interfaces/app-state/app-state.interface';
import { View } from '@shared/interfaces/view/view.interface';
import { hideView, showView } from '@shared/store/actions/view/view.actions';
import { selectView } from '@shared/store/selectors/view/view.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit {

  public view$!: Observable<View>;

  constructor(
    private store$: Store<AppState>
  ) { }

  public ngOnInit(): void {
    this.view$ = this.store$.select(selectView(ViewType.INSTRUCTIONS));
  }

  public goBackToFormView(): void {
    this.store$.dispatch(hideView({ viewType: ViewType.INSTRUCTIONS }));
    this.store$.dispatch(showView({ viewType: ViewType.FORM }));
    this.store$.dispatch(showView({ viewType: ViewType.FOOTER }));
  }

}
