import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ScrollIntoViewComponentMock } from '@shared/mocks/scroll-into-view/scroll-into-view.component.mock';
import { ScrollIntoViewDirective } from './scroll-into-view.directive';

describe('ScrollDirective', () => {

  let component: ScrollIntoViewComponentMock;
  let fixture: ComponentFixture<ScrollIntoViewComponentMock>;
  let debugElement: DebugElement;
  let directive: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ScrollIntoViewComponentMock,
        ScrollIntoViewDirective
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollIntoViewComponentMock);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    directive = debugElement.query(By.directive(ScrollIntoViewDirective));
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
    expect(directive).toBeTruthy();
  });

  describe('After initialization', () => {
    let scrollIntoSpy: jasmine.Spy;

    beforeEach(() => {
      scrollIntoSpy = spyOn(fixture.nativeElement?.getElementsByClassName('green')[0], 'scrollIntoView');
    });

    it(`Shouldn't scroll into view without detecting changes first`, () => {
      expect(scrollIntoSpy).not.toHaveBeenCalled();
      expect(scrollIntoSpy).not.toHaveBeenCalledTimes(1);
    });

    it('Should scroll into view', () => {
      component.letter = 'TEST';
      fixture.detectChanges();

      expect(scrollIntoSpy).toHaveBeenCalled();
      expect(scrollIntoSpy).toHaveBeenCalledTimes(1);
    });
  });

});
