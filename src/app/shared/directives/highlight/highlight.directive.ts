import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnChanges {

  @Input()
  public words!: string;

  @Input()
  public letter!: string;

  constructor(
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

  private getHighlightedLetters(): string {
    return this.words
      .split('')
      .map((letter: string, index: number): string => {
        let color = '';

        if (index < this.letter.length) {
          color = this.isTypedLetterExact(letter, index) ? 'green' : 'red';
        }

        return `<span class='${color}'>${letter}</span>`;
      }).join('');
  }

  private isTypedLetterExact(letter: string, index: number): boolean {
    return letter === this.letter[index];
  }

}
