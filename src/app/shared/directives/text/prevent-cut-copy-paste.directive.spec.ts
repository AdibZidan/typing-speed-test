import { DebugElement, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AutoFocusComponentMock } from '@shared/mocks/auto-focus/auto-focus.component.mock';
import { PreventCutCopyPasteDirective } from './prevent-cut-copy-paste.directive';

describe('PreventCutCopyPasteDirective', () => {

  let component: AutoFocusComponentMock;
  let fixture: ComponentFixture<AutoFocusComponentMock>;
  let debugElement: DebugElement;
  let directive: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AutoFocusComponentMock,
        PreventCutCopyPasteDirective
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoFocusComponentMock);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    directive = debugElement.query(By.directive(PreventCutCopyPasteDirective));
  });

  it('Should create', () => {
    expect(component).toBeDefined();
    expect(directive).toBeTruthy();
  });

  describe('After initialization', () => {
    let renderer2ListenSpy: jasmine.Spy;

    beforeEach(() => {
      const renderer2: Renderer2 = fixture.componentRef.injector.get(Renderer2);

      renderer2ListenSpy = spyOn(renderer2, 'listen');
    });

    it(`Shouldn't allow for cut, copy or paste events`, () => {
      const cutEvent = new ClipboardEvent('cut');
      const copyEvent = new ClipboardEvent('copy');
      const pasteEvent = new ClipboardEvent('paste');

      directive.triggerEventHandler('cut', cutEvent);
      directive.triggerEventHandler('copy', copyEvent);
      directive.triggerEventHandler('paste', pasteEvent);

      fixture.detectChanges();

      const eventNames: string[] = renderer2ListenSpy.calls.allArgs().map(arg => arg[1]);

      expect(renderer2ListenSpy).toHaveBeenCalled();
      expect(renderer2ListenSpy).toHaveBeenCalledTimes(3);
      expect(eventNames).toBeDefined();
      expect(eventNames.length).toEqual(3);
      expect(eventNames).toEqual(['cut', 'copy', 'paste']);
      expect(directive.nativeElement.innerText).toEqual('');
    });
  });

});
