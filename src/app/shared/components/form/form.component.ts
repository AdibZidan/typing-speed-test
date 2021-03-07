import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ViewType } from '@shared/enums/view-type/view-type.enum';
import { AppState } from '@shared/interfaces/app-state/app-state.interface';
import { View } from '@shared/interfaces/view/view.interface';
import { setTextColor } from '@shared/store/actions/color/color.actions';
import { incrementErrorCount } from '@shared/store/actions/error/error.actions';
import { selectView } from '@shared/store/selectors/view/view.selector';
import { selectWords } from '@shared/store/selectors/words/words.selector';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
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
      let color: string = '';

      color = this.determineTextColor(text, words, color);

      if (color === 'red') {
        this.store$.dispatch(incrementErrorCount());
      }

      return { words, text };
    })).subscribe();
  }

  private determineTextColor(text: string, words: string, color: string): string {
    text.split('').map((letter: string, index: number): void => {
      if (index < words.length) {
        color = (letter === words[index]) ? 'green' : 'red';
        this.store$.dispatch(setTextColor({ color }));
      }
    });

    return color;
  }

}
