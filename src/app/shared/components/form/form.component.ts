import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fadeIn } from '@animations';
import { Store } from '@ngrx/store';
import { ViewType } from '@shared/enums/view-type/view-type.enum';
import { AppState } from '@shared/interfaces/app-state/app-state.interface';
import { View } from '@shared/interfaces/view/view.interface';
import { calculateWordsPerMinute } from '@shared/store/actions/words-per-minute/words-per-minute.actions';
import { setLetter } from '@shared/store/actions/words/words.actions';
import { selectView } from '@shared/store/selectors/view/view.selector';
import { selectWords } from '@shared/store/selectors/words/words.selector';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  animations: [fadeIn]
})
export class FormComponent implements OnInit, OnDestroy, AfterViewInit {

  private _subscription: Subscription = new Subscription();

  public view$!: Observable<View>;
  public formGroup!: FormGroup;

  constructor(
    private store$: Store<AppState>,
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.view$ = this.store$.select(selectView(ViewType.FORM));
    this.initializeForm();
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public ngAfterViewInit(): void {
    this.handleUserInput();
  }

  private initializeForm(): void {
    this.formGroup = this.formBuilder.group({
      text: ['', Validators.required]
    });
  }

  private handleUserInput(): void {
    this._subscription = combineLatest([
      this.store$.select(selectWords),
      this.formGroup.valueChanges
    ]).pipe(map(([words, { text }]) => {
      this.store$.dispatch(setLetter({ letter: text }));
      this.store$.dispatch(calculateWordsPerMinute({
        length: text.length,
        words
      }));

      return { words, text };
    })).subscribe();
  }

}
