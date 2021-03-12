import { Component, OnInit } from '@angular/core';
import { fadeIn } from '@animations';
import { Store } from '@ngrx/store';
import { ViewType } from '@shared/enums/view-type/view-type.enum';
import { AppState } from '@shared/interfaces/app-state/app-state.interface';
import { View } from '@shared/interfaces/view/view.interface';
import { hideView, showView } from '@shared/store/actions/view/view.actions';
import { selectView } from '@shared/store/selectors/view/view.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  animations: [fadeIn]
})
export class FooterComponent implements OnInit {

  public view$!: Observable<View>;

  public get currentYear(): number {
    return new Date().getFullYear();
  }

  constructor(
    private store$: Store<AppState>
  ) { }

  public ngOnInit(): void {
    this.view$ = this.store$.select(selectView(ViewType.FOOTER));
  }

  public showInstructions(): void {
    this.store$.dispatch(showView({ viewType: ViewType.INSTRUCTIONS }));
    this.hideViews();
  }

  private hideViews(): void {
    this.store$.dispatch(hideView({ viewType: ViewType.FORM }));
    this.store$.dispatch(hideView({ viewType: ViewType.FOOTER }));
  }

}
