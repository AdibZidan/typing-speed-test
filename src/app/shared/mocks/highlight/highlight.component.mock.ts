import { Component } from '@angular/core';

@Component({
  template: `<span
    appHighlight
    [words]="words"
    [letter]="letter"></span>`
})
export class HighlightComponentMock {

  public words!: string;
  public letter!: string;

}
