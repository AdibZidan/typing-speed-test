import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@shared/interfaces/app-state/app-state.interface';
import { Words } from '@shared/interfaces/words/words.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  public totalWords: number = 0;
  public totalErrors: number = 0;
  public words$!: Observable<Words>;

  constructor(
    private store$: Store<AppState>
  ) { }

  public ngOnInit(): void {
    this.words$ = this.store$.select('words');
  }

}
