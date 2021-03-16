import { Directive, ElementRef, HostListener, Input, OnChanges, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@shared/interfaces/app-state/app-state.interface';
import { updateErrorCount } from '@shared/store/actions/error/error.actions';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnChanges {

  @Input()
  public words!: string;

  @Input()
  public letter!: string;

  @HostListener('document:keyup', ['$event'])
  public handleErrorCountOnKeyUp(keyboardEvent: KeyboardEvent): void {
    this.updateErrorCount(keyboardEvent);
  }

  public color!: string;

  constructor(
    private store$: Store<AppState>,
    private elementRef: ElementRef,
    private renderer2: Renderer2
  ) { }

  public ngOnChanges(): void {
    this.renderer2.setProperty(
      this.elementRef.nativeElement,
      'innerHTML',
      this.getHighlightedLetters()
    );
  }

  private updateErrorCount(keyboardEvent: KeyboardEvent) {
    if (keyboardEvent.key === 'Backspace') {
      this.color = '';
    }

    if (this.color === 'red') {
      this.store$.dispatch(updateErrorCount());
    }
  }

  private getHighlightedLetters(): string {
    return this.words
      .split('')
      .map((letter: string, index: number): string => {
        let color: string = '';

        if (index < this.letter.length) {
          color = this.isTypedLetterExact(letter, index) ? 'green' : 'red';
          this.color = color;
        }

        return `<span class='${color}'>${letter}</span>`;
      }).join('');
  }

  private isTypedLetterExact(letter: string, index: number): boolean {
    return letter === this.letter[index];
  }

}
