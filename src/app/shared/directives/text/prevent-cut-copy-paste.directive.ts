import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPreventCutCopyPaste]'
})
export class PreventCutCopyPasteDirective implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  public ngOnInit(): void {
    this.preventCutCopyAndPaste();
  }

  private preventCutCopyAndPaste() {
    const eventNames: string[] = ['cut', 'copy', 'paste'];

    eventNames.forEach((eventName: string): () => void =>
      this.renderer.listen(
        this.elementRef.nativeElement,
        eventName,
        (event: Event): void => event.preventDefault()
      )
    );
  }

}
