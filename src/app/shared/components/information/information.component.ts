import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Difficulty } from '@shared/enums/difficulty/difficulty.enum';
import { AppState } from '@shared/interfaces/app-state/app-state.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  public totalWords: number = 0;
  public totalErrors: number = 0;
  public difficulty$!: Observable<Difficulty>;

  constructor(
    private store$: Store<AppState>
  ) { }

  public ngOnInit(): void {
    this.difficulty$ = this.store$.select('difficulty');
  }

}
