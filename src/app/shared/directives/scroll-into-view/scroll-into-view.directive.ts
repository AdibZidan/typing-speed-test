import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appScrollIntoView]'
})
export class ScrollIntoViewDirective implements OnChanges {

  @Input()
  public letter!: string;

  constructor(
    private elementRef: ElementRef
  ) { }

  public ngOnChanges(): void {
    this.scrollIntoLastCorrectTypedLetter();
  }

  private scrollIntoLastCorrectTypedLetter(): void {
    const lastElement: number = this.elementRef.nativeElement?.getElementsByClassName('green')?.length - 1;

    this.elementRef.nativeElement?.getElementsByClassName('green')[lastElement]?.scrollIntoView();
  }

}
