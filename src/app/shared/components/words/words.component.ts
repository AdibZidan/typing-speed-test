import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ViewType } from '@shared/enums/view-type/view-type.enum';
import { AppState } from '@shared/interfaces/app-state/app-state.interface';
import { View } from '@shared/interfaces/view/view.interface';
import { selectView } from '@shared/store/selectors/view/view.selector';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss']
})
export class WordsComponent implements OnInit, OnDestroy {

  private _subscription: Subscription = new Subscription();

  public view$!: Observable<View>;
  public words$!: Observable<any>;
  public color!: string;

  constructor(
    private store$: Store<AppState>
  ) { }

  public ngOnInit(): void {
    this.view$ = this.store$.select(selectView(ViewType.FORM));
    this.words$ = this.store$.select('words');
    this.selectColor();
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private selectColor(): void {
    this._subscription = this.store$
      .select('color')
      .subscribe((color: string): string =>
        this.color = color
      );
  }

}
