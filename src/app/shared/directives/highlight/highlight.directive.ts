import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';
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

    this.updateErrorCount();
  }

  private getHighlightedLetters(): string {
    return this.words
      .split('')
      .map((letter: string, index: number): string => {
        let color: string = '';

        if (index < this.letter.length) {
          color = this.isTypedLetterExact(letter, index) ? 'green' : 'red';
        }

        return `<span class='${color}'>${letter}</span>`;
      }).join('');
  }

  private isTypedLetterExact(letter: string, index: number): boolean {
    return letter === this.letter[index];
  }

  private updateErrorCount(): void {
    const totalIncorrectUserInput: number = this.elementRef.nativeElement.innerHTML.match(/red/g)?.length;

    if (totalIncorrectUserInput) {
      this.store$.dispatch(updateErrorCount({ count: totalIncorrectUserInput }));
    }
  }

}
