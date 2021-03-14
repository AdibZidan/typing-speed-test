import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fadeIn } from '@animations';
import { Store } from '@ngrx/store';
import { ViewType } from '@shared/enums/view-type/view-type.enum';
import { AppState } from '@shared/interfaces/app-state/app-state.interface';
import { View } from '@shared/interfaces/view/view.interface';
import { startTimer, stopTimer } from '@shared/store/actions/timer/timer.actions';
import { calculateWordsPerMinute } from '@shared/store/actions/words-per-minute/words-per-minute.actions';
import { setLetter } from '@shared/store/actions/words/words.actions';
import { selectView } from '@shared/store/selectors/view/view.selector';
import { selectWords } from '@shared/store/selectors/words/words.selector';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  animations: [fadeIn]
})
export class FormComponent implements OnInit, OnDestroy, AfterViewInit {

  private _subscriptions: Subscription[] = [];

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
    this._subscriptions
      .forEach((subscription: Subscription): void =>
        subscription.unsubscribe()
      );
  }

  public ngAfterViewInit(): void {
    this.handleUserInput();
    this.startTimerOnceAfterTyping();
  }

  private initializeForm(): void {
    this.formGroup = this.formBuilder.group({
      text: ['', Validators.required]
    });
  }

  private handleUserInput(): void {
    const subscription: Subscription = combineLatest([
      this.store$.select(selectWords),
      this.formGroup.valueChanges
    ]).pipe(map(([words, { text }]) => {
      this.store$.dispatch(setLetter({ letter: text }));
      this.store$.dispatch(calculateWordsPerMinute({
        length: text.length,
        words
      }));
      this.stopTimerConditionally(words, text);

      return { words, text };
    })).subscribe();

    this._subscriptions.push(subscription);
  }

  private stopTimerConditionally(words: string, text: string): void {
    if (this.areExactAndEquals(words, text)) {
      setTimeout((): void => this.formGroup.controls.text.disable(), 10);

      this.store$.dispatch(stopTimer());
    }
  }

  private areExactAndEquals(words: string, text: any): boolean {
    return (words.length === text.length) && (words === text);
  }

  private startTimerOnceAfterTyping(): void {
    const subscription: Subscription = this.formGroup.valueChanges
      .pipe(
        take(1),
        tap((): void =>
          this.store$.dispatch(startTimer())
        )
      )
      .subscribe();

    this._subscriptions.push(subscription);
  }

}
