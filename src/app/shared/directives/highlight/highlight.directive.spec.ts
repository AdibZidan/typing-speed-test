import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import { HighlightComponentMock } from '@shared/mocks/highlight/highlight.component.mock';
import { HighlightDirective } from './highlight.directive';

describe('HighlightDirective', () => {

  let component: HighlightComponentMock;
  let fixture: ComponentFixture<HighlightComponentMock>;
  let debugElement: DebugElement;
  let directive: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        HighlightComponentMock,
        HighlightDirective
      ],
      providers: [provideMockStore()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightComponentMock);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    directive = debugElement.query(By.directive(HighlightDirective));
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
    expect(directive).toBeTruthy();
  });

  describe('After initialization', () => {
    beforeEach(() => {
      component.words = 'Testing time!';
    });

    it('Should highlight correct and incorrect letters dynamically', () => {
      component.letter = 'T1st1ng t1me!';

      fixture.detectChanges();

      const totalCorrectLetters: number = debugElement
        .nativeElement
        .innerHTML
        .match(/green/g)
        .length;

      const totalIncorrectLetters: number = debugElement
        .nativeElement
        .innerHTML
        .match(/red/g)
        .length;

      expect(component.letter.length).toEqual(13);
      expect(totalCorrectLetters).toEqual(10);
      expect(totalIncorrectLetters).toEqual(3);
    });
  });

});
