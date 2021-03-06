import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ViewType } from '@shared/enums/view-type/view-type.enum';
import { AppState } from '@shared/interfaces/app-state/app-state.interface';
import { View } from '@shared/interfaces/view/view.interface';
import { selectView } from '@shared/store/selectors/view/view.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

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

  private initializeForm(): void {
    this.formGroup = this.formBuilder.group({
      text: ['', Validators.required]
    });
  }

}
