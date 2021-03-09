import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AutoFocusComponentMock } from '@shared/mocks/auto-focus/auto-focus.component.mock';
import { AutoFocusDirective } from './auto-focus.directive';

describe('AutoFocusDirective', () => {

  let component: AutoFocusComponentMock;
  let fixture: ComponentFixture<AutoFocusComponentMock>;
  let debugElement: DebugElement;
  let directive: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AutoFocusComponentMock,
        AutoFocusDirective
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoFocusComponentMock);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    directive = debugElement.query(By.directive(AutoFocusDirective));
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeDefined();
  });

  describe('After initialization', () => {
    it('Should auto focus', () => {
      expect(directive).toBeTruthy();
      expect(directive.nativeElement.autofocus).toEqual(true);
    });
  });

});
