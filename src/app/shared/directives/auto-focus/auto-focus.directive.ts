import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[autoFocus]'
})
export class AutoFocusDirective implements OnInit {

  constructor(
    private elementRef: ElementRef
  ) { }

  public ngOnInit(): void {
    this.elementRef.nativeElement.focus();
  }

}
