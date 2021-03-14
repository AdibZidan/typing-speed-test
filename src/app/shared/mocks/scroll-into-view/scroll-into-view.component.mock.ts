import { Component } from '@angular/core';

@Component({
  template: `<span appScrollIntoView [letter]="letter"><span class='green'>{{ letter }}</span></span>`
})
export class ScrollIntoViewComponentMock {

  public letter!: string;

}
