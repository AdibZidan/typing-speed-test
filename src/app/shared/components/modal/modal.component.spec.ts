import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SpecHelper } from '@shared/helpers/spec/spec.helper';
import { AppState } from '@shared/interfaces/app-state/app-state.interface';
import { resetErrorCount } from '@shared/store/actions/error/error.actions';
import { resetTimer } from '@shared/store/actions/timer/timer.actions';
import { hideView, showView } from '@shared/store/actions/view/view.actions';
import { resetCalculateWordsPerMinute } from '@shared/store/actions/words-per-minute/words-per-minute.actions';
import { InformationComponent } from '../information/information.component';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {

  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let mockStore: MockStore<AppState>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        InformationComponent,
        ModalComponent
      ],
      providers: [provideMockStore()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Before initialization', () => {
    it('Should have an undefined view$ property', () => {
      expect(component.view$).toBeUndefined();
    });
  });

  describe('After initialization', () => {
    let dispatchSpy: jasmine.Spy;

    beforeEach(() => {
      dispatchSpy = spyOn(mockStore, 'dispatch');
      component.ngOnInit();
    });

    it('Should have a defined view$ property', () => {
      expect(component.view$).toBeDefined();
    });

    it('Should return back to difficulty selector view', () => {
      component.returnBackToDifficultySelector();

      const allArgs: any[][] = SpecHelper.getArguments(dispatchSpy);
      const actual: any[] = SpecHelper.flatten(allArgs);

      expect(dispatchSpy).toHaveBeenCalled();
      expect(dispatchSpy).toHaveBeenCalledTimes(2);
      expect(actual.length).toEqual(2);
      expect(actual).toEqual([
        { viewType: 'modal', type: hideView.type },
        { viewType: 'difficultySelector', type: showView.type }
      ]);
    });

    it(`Should reset the application's state`, () => {
      component.resetApplicationState();

      const allArgs: any[][] = SpecHelper.getArguments(dispatchSpy);
      const actual: any[] = SpecHelper.flatten(allArgs);

      expect(dispatchSpy).toHaveBeenCalled();
      expect(dispatchSpy).toHaveBeenCalledTimes(3);
      expect(actual.length).toEqual(3);
      expect(actual).toEqual([
        { type: resetErrorCount.type },
        { type: resetTimer.type },
        { type: resetCalculateWordsPerMinute.type }
      ]);
    });
  });

});
